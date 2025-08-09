import React from "react";

export default function TimelineHeader({ dateScale, pxPerDay, monthHeaderHeight }) {
  const months = React.useMemo(() => {
    if (!dateScale.length) return [];
    const groups = [];
    let currentLabel = null;
    let span = 0;
    dateScale.forEach((d) => {
      const label = d.toLocaleString("default", { month: "short", year: "numeric" });
      if (label !== currentLabel) {
        if (currentLabel) groups.push({ label: currentLabel, span });
        currentLabel = label;
        span = 1;
      } else span++;
    });
    if (currentLabel) groups.push({ label: currentLabel, span });
    return groups;
  }, [dateScale]);

  return (
    <div
      style={{
        display: "flex",
        position: "sticky",
        top: 0,
        zIndex: 4,
        background: "#fff",
        alignItems: "stretch",
        boxSizing: "border-box",
        borderBottom: "1px solid #f0f2f5",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: monthHeaderHeight,
          alignItems: "center",
          display: "flex",
          gap: 0,
        }}
      >
        {months.map((m, i) => (
          <div
            key={i}
            style={{
              minWidth: m.span * pxPerDay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid #f0f2f5",
              fontWeight: 600,
              color: "#0f172a",
              fontSize: 13,
              background: "#fbfdff",
              height: monthHeaderHeight,
              boxSizing: "border-box",
            }}
          >
            {m.label}
          </div>
        ))}
      </div>

      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
        }}
      >
        {dateScale.map((d, idx) => (
          <div
            key={idx}
            style={{
              borderRight: "1px solid #f5f7fa",
              fontSize: 12,
              textAlign: "center",
              paddingTop: 2,
              minWidth: pxPerDay,
              color: "#0f172a",
            }}
          >
            <div style={{ fontSize: 11 }}>{d.getDate()}</div>
            {pxPerDay >= 40 && (
              <div style={{ display: "flex", marginTop: 6 }}>
                {[0, 6, 12, 18].map((h, j) => (
                  <div
                    key={j}
                    style={{
                      width: pxPerDay / 4,
                      fontSize: 10,
                      textAlign: "center",
                      borderRight: j < 3 ? "1px dashed #f3f5f8" : undefined,
                    }}
                  >
                    {h}h
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
