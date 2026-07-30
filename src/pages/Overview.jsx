import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import MonthlySummaryChart from "../components/MonthlySummaryChart";
import CalendarView from "../components/CalendarView";
import DayDetailsModal from "../components/DayDetailsModal";
import RecentChangesList from "../components/RecentChangesList";

import "../styles/overview.css";

export default function Overview() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [recentChanges, setRecentChanges] = useState([]);

  const [selectedDay, setSelectedDay] = useState(null);
  const [dayTransactions, setDayTransactions] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadOverview(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  async function loadOverview(month, year) {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (!session) {
      console.log("Geen sessie → gebruiker is niet ingelogd");
      return;
    }

    const user = session.user;

    const { data } = await supabase
      .from("transactions")
      .select("*, created_at::timestamp")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setAllTransactions(data);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const filtered = data.filter((t) => {
      const d = new Date(t.created_at);
      return d >= firstDay && d <= lastDay;
    });

    const chart = [];
    const calendar = [];

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayData = filtered.filter((t) => {
        const d = new Date(t.created_at);
        return d.getDate() === day;
      });

      const income = dayData
        .filter((t) => t.amount > 0)
        .reduce((s, t) => s + Number(t.amount), 0);

      const expense = dayData
        .filter((t) => t.amount < 0)
        .reduce((s, t) => s + Number(t.amount), 0);

      chart.push({ day, income, expense });
      calendar.push({ day, total: income + expense });
    }

    setChartData(chart);
    setCalendarData(calendar);
    setRecentChanges(filtered);

    if (selectedDay !== null) {
      openDay(selectedDay);
    }
  }

  function openDay(day) {
    const dayData = allTransactions.filter((t) => {
      const d = new Date(t.created_at);
      return (
        d.getDate() === day &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    });

    setDayTransactions(dayData);
    setSelectedDay(day);
  }

  return (
    <div className="overview-page">

      {/* 1️⃣ Maandberekening bovenaan */}
      <RecentChangesList changes={recentChanges} />

      {/* 2️⃣ Kalender in het midden */}
      <CalendarView
        dailyTotals={Object.fromEntries(calendarData.map(d => [d.day, d.total]))}
        onDayClick={openDay}
        onMonthChange={(month, year) => {
          setCurrentMonth(month);
          setCurrentYear(year);
        }}
      />

      {/* 3️⃣ Grafiek helemaal onderaan */}
      <MonthlySummaryChart data={chartData} />

      {/* 4️⃣ Dagdetails modal */}
      {selectedDay && (
        <DayDetailsModal
          day={selectedDay}
          transactions={dayTransactions}
          onClose={() => setSelectedDay(null)}
          onDelete={() => loadOverview(currentMonth, currentYear)}
        />
      )}

   </div>
  );
}
