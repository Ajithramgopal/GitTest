export default function formatDateTimeLocal(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  // toISOString → "2025-09-29T08:45:00.000Z"
  // slice(0,16) → "2025-09-29T08:45"
  return date.toISOString().slice(0, 16);
}
