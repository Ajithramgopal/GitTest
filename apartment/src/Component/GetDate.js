export default function GetDate() {
  const getLocalDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // adjust to local timezone
    return now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  };
  return { getLocalDateTime };
}
