import TimelineItem from "../TimelineItem/index";

export default function Lane({
  lane,
  laneHeight,
  itemHeight,
  pxPerDay,
  minDate,
  dragging,
  editingId,
  setEditingId,
  onDragStart,
  onSaveEdit,
}) {
  const daysBetween = (start, end) =>
    Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));

  const computePosition = (item) => {
    const left = daysBetween(minDate, item.start) * pxPerDay;
    const width = (daysBetween(item.start, item.end) + 1) * pxPerDay;
    return { left, width };
  };

  return (
    <div
      style={{
        position: "relative",
        height: laneHeight,
        borderBottom: "1px solid #fbfcfe",
        paddingTop: 6,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 100 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: idx * pxPerDay,
              top: 0,
              bottom: 0,
              width: Math.max(1, pxPerDay),
              borderLeft: "1px solid rgba(15, 23, 42, 0.04)",
              boxSizing: "border-box",
            }}
          />
        ))}
      </div>

      {lane.map((item) => {
        const { left, width } = computePosition(item);
        return (
          <TimelineItem
            key={item.id}
            item={item}
            left={left}
            width={width}
            height={itemHeight}
            dragging={dragging}
            editingId={editingId}
            setEditingId={setEditingId}
            onMouseDown={(e) => onDragStart(e, item)}
            onResizeStart={(e) => onDragStart(e, item, "resize-start")}
            onResizeEnd={(e) => onDragStart(e, item, "resize-end")}
            onSaveEdit={onSaveEdit}
          />
        );
      })}
    </div>
  );
}
