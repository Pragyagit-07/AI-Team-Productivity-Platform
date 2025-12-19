


import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarTab() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const token = localStorage.getItem("token");

  // ✅ FETCH TASKS HERE
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(res.data.tasks || res.data);
      } catch (err) {
        console.error("Failed to load calendar tasks", err);
      }
    };

    fetchTasks();
  }, []);

  const events = useMemo(() => {
    return (tasks || [])
      .filter((t) => t.dueDate)
      .map((t) => ({
        id: t.id,
        title: t.title || "Untitled Task",
        start: new Date(t.dueDate),
        end: new Date(t.dueDate),
        allDay: true,
        task: t,
        priority: t.priority,
      }));
  }, [tasks]);

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: "#C6F6D5",
      color: "#1F2937",
      border: "1px solid #C6F6D5",
      borderRadius: "0.25rem",
      padding: "2px 4px",
      fontSize: "0.75rem",
      fontWeight: 500,
    };

    if (event.priority === "high") {
      style = {
        ...style,
        backgroundColor: "#FED7D7",
        color: "#C53030",
        border: "1px solid #FEB2B2",
      };
    } else if (event.priority === "medium") {
      style = {
        ...style,
        backgroundColor: "#FEFCBF",
        color: "#B7791F",
        border: "1px solid #FDE68A",
      };
    }

    return { style };
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        date={currentDate}
        view={currentView}
        onNavigate={setCurrentDate}
        onView={setCurrentView}
        views={["month", "week", "day", "agenda"]}
        eventPropGetter={eventStyleGetter}
        selectable
        onSelectEvent={(event) => console.log("Task clicked:", event.task)}
      />
    </div>
  );
}

