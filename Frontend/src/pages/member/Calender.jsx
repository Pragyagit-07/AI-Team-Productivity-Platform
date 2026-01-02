import React, { useMemo, useState, useEffect } from "react";
import API from "../../api/axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import TaskDetailSidePanel from "../member/Tasks/TaskDetailSidePanel";

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

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
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
      borderRadius: "4px",
      fontSize: "12px",
    };

    if (event.priority === "high") {
      style.backgroundColor = "#FED7D7";
    } else if (event.priority === "medium") {
      style.backgroundColor = "#FEFCBF";
    }

    return { style };
  };

  return (
    <div className="relative">
      {/* CALENDAR — stays fully visible */}
      {/* <div className="p-4 bg-white rounded-md shadow">
       */}
       <div className="p-3 sm:p-4 bg-white rounded-md shadow overflow-x-auto">

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          // style={{ height: "80vh" }}

          date={currentDate}
          view={currentView}
          onNavigate={setCurrentDate}
          onView={setCurrentView}
          views={["month", "week", "day", "agenda"]}
          eventPropGetter={eventStyleGetter}
          selectable
          onSelectEvent={(event) => {
            setSelectedTaskId(event.task.id);
          }}
        />
      </div>

      {/* RIGHT SIDE PANEL */}
      {selectedTaskId && (
        <TaskDetailSidePanel
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          onTaskUpdated={() => {}}
        />
      )}
    </div>
  );
}
