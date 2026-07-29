import { useState } from "react";
import "../styles/calendar.css";

export default function CalendarView({ dailyTotals = {}, onDayClick, onMonthChange }) {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const months = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prevMonth() {
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;

    setMonth(newMonth);
    setYear(newYear);

    onMonthChange?.(newMonth, newYear);
  }

  function nextMonth() {
    const newMonth = month === 11 ? 0 : month + 1;
    const newYear = month === 11 ? year + 1 : year;

    setMonth(newMonth);
    setYear(newYear);

    onMonthChange?.(newMonth, newYear);
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button className="cal-btn" onClick={prevMonth}>◀</button>
        <h2>{months[month]} {year}</h2>
        <button className="cal-btn" onClick={nextMonth}>▶</button>
      </div>

      <div className="calendar">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const amount = dailyTotals[day] ?? 0;

          const amountClass =
            amount > 0 ? "pos" :
            amount < 0 ? "neg" :
            "zero";

          return (
            <div
              key={day}
              className="calendar-day"
              onClick={() => onDayClick?.(day)}
            >
              <span className="calendar-day-number">{day}</span>
              <span className={`calendar-day-total ${amountClass}`}>
                €{amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
