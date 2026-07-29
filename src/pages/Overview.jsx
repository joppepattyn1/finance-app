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

  useEffect(() => {
    loadOverview();
  }, []);

  async function loadOverview() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    // ⭐ FIX: created_at als lokale timestamp ophalen
    const { data } = await supabase
      .from("transactions")
      .select("*, created_at::timestamp")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setAllTransactions(data);

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

    const filtered = data.filter((t) => new Date(t.created_at) >= firstDay);

    const chart = [];
    const calendar = [];

    for (let day = 1; day <= 31; day++) {
      const dayData = filtered.filter((t) => {
        const localDate = new Date(t.created_at);
        return localDate.getDate() === day;
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
    setRecentChanges(filtered.slice(0, 5));

    // ⭐ Modal live updaten na delete
    if (selectedDay !== null) {
      openDay(selectedDay);
    }
  }

  function openDay(day) {
    const dayData = allTransactions.filter((t) => {
      const localDate = new Date(t.created_at);
      return localDate.getDate() === day;
    });

    setDayTransactions(dayData);
    setSelectedDay(day);
  }

  return (
    <div className="overview-page">
      <MonthlySummaryChart data={chartData} />
      <CalendarView days={calendarData} onSelectDay={openDay} />
      <RecentChangesList changes={recentChanges} />

      {selectedDay && (
        <DayDetailsModal
          day={selectedDay}
          transactions={dayTransactions}
          onClose={() => setSelectedDay(null)}
          onDelete={() => loadOverview()}
        />
      )}
    </div>
  );
}
