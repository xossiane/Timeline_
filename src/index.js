import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

import timelineItems from "./timelineItems.js";
import assignLanes from "./assignLanes.js";

import { toDate } from "./utils/dateUtils.js";

import TimelineHeader from "./components/TimelineHeader/index.jsx";
import Lane from "./components/Lane/index.jsx";

function App() {
  const [items, setItems] = useState(timelineItems);
  const [dragging, setDragging] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const containerRef = useRef(null);

  const minDate = useMemo(() => {
    return toDate(
      items.reduce((min, i) => (i.start < min ? i.start : min), items[0]?.start)
    );
  }, [items]);

  const maxDate = useMemo(() => {
    return toDate(
      items.reduce((max, i) => (i.end > max ? i.end : max), items[0]?.end)
    );
  }, [items]);

  const [pxPerDay, setPxPerDay] = useState(50);

  const dateScale = useMemo(() => {
    const scale = [];
    let current = new Date(minDate);
    while (current <= maxDate) {
      scale.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return scale;
  }, [minDate, maxDate]);

  const lanes = useMemo(() => assignLanes(items), [items]);

  const pxToDays = (px) => Math.round(px / pxPerDay);

  useEffect(() => {
    if (!dragging) return;

    function onMouseMove(e) {
      e.preventDefault();
      const deltaX = e.clientX - dragging.startX;
      const deltaDays = pxToDays(deltaX);

      setItems((oldItems) => {
        return oldItems.map((it) => {
          if (it.id !== dragging.id) return it;

          const orig = dragging.originalItem;
          let newStart = toDate(orig.start);
          let newEnd = toDate(orig.end);

          if (dragging.type === "move") {
            newStart = new Date(orig.start);
            newStart.setDate(newStart.getDate() + deltaDays);
            newEnd = new Date(orig.end);
            newEnd.setDate(newEnd.getDate() + deltaDays);
          } else if (dragging.type === "resize-start") {
            newStart = new Date(orig.start);
            newStart.setDate(newStart.getDate() + deltaDays);
            if (newStart > newEnd) newStart = new Date(newEnd);
          } else if (dragging.type === "resize-end") {
            newEnd = new Date(orig.end);
            newEnd.setDate(newEnd.getDate() + deltaDays);
            if (newEnd < newStart) newEnd = new Date(newStart);
          }

          return {
            ...it,
            start: newStart.toISOString().slice(0, 10),
            end: newEnd.toISOString().slice(0, 10),
          };
        });
      });
    }

    function onMouseUp() {
      setDragging(null);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, pxPerDay]);

  const onZoomChange = (e) => {
    setPxPerDay(Number(e.target.value));
  };

  const onSaveEdit = (id, newName) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, name: newName } : it))
    );
    setEditingId(null);
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        userSelect: dragging ? "none" : "auto",
      }}
    >
      <h2 style={{ margin: "0 0 8px 0" }}>
        Interactive Timeline with Drag & Zoom
      </h2>
      <p style={{ marginTop: 0, color: "#475569" }}>
        {items.length} items — drag to move, drag edges to resize, double-click
        to edit
      </p>

      <div
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <label style={{ fontWeight: 600, userSelect: "none" }}>Zoom: </label>
        <input
          type="range"
          min={20}
          max={100}
          step={5}
          value={pxPerDay}
          onChange={onZoomChange}
          style={{ flex: 1 }}
        />
        <span>{pxPerDay}px/day</span>
      </div>

      <div
        ref={containerRef}
        style={{
          border: "1px solid #e6e9ef",
          borderRadius: 8,
          overflow: "auto",
          position: "relative",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
          height: 400,
          padding: 8,
          userSelect: "none",
        }}
      >
        <TimelineHeader
          dateScale={dateScale}
          pxPerDay={pxPerDay}
          monthHeaderHeight={28}
        />

        {lanes.map((lane, idx) => (
          <Lane
            key={idx}
            lane={lane}
            laneHeight={44}
            itemHeight={40}
            pxPerDay={pxPerDay}
            minDate={minDate}
            dragging={dragging}
            editingId={editingId}
            setEditingId={setEditingId}
            onDragStart={(e, item, type) => {
              e.preventDefault();
              const rect = e.currentTarget.getBoundingClientRect();
              const offsetX = e.clientX - rect.left;
              const edgeThreshold = Math.min(12, rect.width * 0.2);

              let dragType = "move";
              if (type) dragType = type;
              else if (offsetX <= edgeThreshold) dragType = "resize-start";
              else if (offsetX >= rect.width - edgeThreshold)
                dragType = "resize-end";

              setDragging({
                id: item.id,
                startX: e.clientX,
                originalItem: { ...item },
                type: dragType,
              });
            }}
            onSaveEdit={onSaveEdit}
          />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
