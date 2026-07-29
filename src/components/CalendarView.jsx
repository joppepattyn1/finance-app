import "../styles/calendar.css";

export default function CalendarView({ days, onSelectDay }) {
  return (
    <div className="calendar">
      {days.map((d) => (
        <button
          key={d.day}
          className="calendar-day"
          onClick={() => onSelectDay(d.day)}   // ⭐ correcte dag doorgeven
        >
          <span className="calendar-day-number">{d.day}</span>

          <span
            className={
              d.total > 0
                ? "calendar-day-total pos"
                : d.total < 0
                ? "calendar-day-total neg"
                : "calendar-day-total zero"
            }
          >
            € {d.total}
          </span>
        </button>
      ))}
    </div>
  );
}
