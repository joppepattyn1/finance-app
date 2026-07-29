import { useState } from "react";
import "../styles/calendar.css";

export default function CalendarView() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const months = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div className="calendar-wrapper">
      {/* HEADER */}
      <div className="calendar-header">
        <button className="cal-btn" onClick={prevMonth}>◀</button>
        <h2>{months[month]} {year}</h2>
        <button className="cal-btn" onClick={nextMonth}>▶</button>
      </div>

      {/* GRID */}
      <div className="calendar">
        {Array.from({ length: daysInMonth }, (_, i) => (
          <div key={i} className="calendar-day">
            <span className="calendar-day-number">{i + 1}</span>
            <span className="calendar-day-total zero">€0</span>
          </div>
        ))}
      </div>
    </div>
  );
}
