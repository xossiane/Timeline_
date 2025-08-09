import { formatDateRange } from "../../utils/dateUtils.js";

export default function TimelineItem({
  item,
  left,
  width,
  height,
  dragging,
  editingId,
  setEditingId,
  onMouseDown,
  onResizeStart,
  onResizeEnd,
  onSaveEdit,
}) {
  const isEditing = editingId === item.id;

  const maxLength = 20;
  const displayName =
    item.name.length > maxLength
      ? [...item.name].slice(0, maxLength).join("") + "..."
      : item.name;

  return (
    <div
      onMouseDown={onMouseDown}
      onDoubleClick={() => setEditingId(item.id)}
      title={`${item.name} • ${formatDateRange(item.start, item.end)}`}
      style={{
        position: "absolute",
        left,
        width: Math.max(18, width),
        height,
        background:
          dragging && dragging.id === item.id
            ? "linear-gradient(90deg,#60a5fa,#3b82f6)"
            : "#1e90ff",
        color: "#fff",
        borderRadius: 8,
        boxShadow: "0 6px 12px rgba(2,6,23,0.12)",
        display: "flex",
        alignItems: "center",
        padding: "6px 8px",
        boxSizing: "border-box",
        cursor: dragging ? "grabbing" : "grab",
        transition: "box-shadow 120ms, transform 90ms",
        overflow: "hidden",
        border: "2px solid rgba(255,255,255,0.06)",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 8,
          height: "100%",
          marginRight: 6,
          cursor: "ew-resize",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.9,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(e);
        }}
      >
        <div style={{ width: 2, height: 14, background: "rgba(255,255,255,0.4)", borderRadius: 2 }} />
      </div>

      <div style={{ flex: 1, minWidth: 8 }}>
        {isEditing ? (
          <input
            autoFocus
            defaultValue={item.name}
            onBlur={(e) => onSaveEdit(item.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSaveEdit(item.id, e.target.value);
              if (e.key === "Escape") setEditingId(null);
            }}
            style={{
              width: "100%",
              fontSize: 13,
              padding: "4px 6px",
              borderRadius: 6,
              border: "1px solid rgba(2,6,23,0.08)",
            }}
          />
        ) : (
          <>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {displayName}
            </div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.85,
                marginTop: 2,
                userSelect: "none",
              }}
            >
              {formatDateRange(item.start, item.end)}
            </div>
          </>
        )}
      </div>

      <div
        style={{
          width: 8,
          height: "100%",
          marginLeft: 6,
          cursor: "ew-resize",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeEnd(e);
        }}
      >
        <div style={{ width: 2, height: 14, background: "rgba(255,255,255,0.4)", borderRadius: 2 }} />
      </div>
    </div>
  );
}
