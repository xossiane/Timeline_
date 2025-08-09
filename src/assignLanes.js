/**
 * Assigns timeline items to the minimum number of lanes.
 * Adds optional padding to avoid overlapping short items.
 *
 * @param {Array} items - Array of items with { start, end, name }.
 * @param {number} minGapDays - Minimum days between items to fit in same lane.
 * @returns {Array<Array>} - Lanes array, each lane is an array of items.
 */
function assignLanes(items, minGapDays = 1) {
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );
  const lanes = [];

  function canFit(lane, item) {
    const lastItem = lane[lane.length - 1];
    const lastEnd = new Date(lastItem.end);
    const itemStart = new Date(item.start);

    // Ensure padding
    const gap = (itemStart - lastEnd) / (1000 * 60 * 60 * 24);
    return gap >= minGapDays;
  }

  function assignItemToLane(item) {
    for (const lane of lanes) {
      if (canFit(lane, item)) {
        lane.push(item);
        return;
      }
    }
    lanes.push([item]); 
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }

  return lanes;
}

export default assignLanes;
