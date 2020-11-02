export default function formatDueDate(dueDate) {
  let formattedResponse = null;
  if (!dueDate || dueDate === "") {
    return formattedResponse;
  }
  const today = new Date();
  const todayMidnightTime = today.setHours(0, 0, 0, 0);
  const tomorrowMidnightTime = today.setHours(24, 0, 0, 0);

  const dueDateMidnightTime = Date.parse(dueDate);

  if (todayMidnightTime === dueDateMidnightTime) {
    formattedResponse = "Due Today";
  } else if (tomorrowMidnightTime === dueDateMidnightTime) {
    formattedResponse = "Due Tomorrow";
  } else {
    formattedResponse = `Due ${dueDate.split("T")[0]}`;
  }

  return formattedResponse;
}
