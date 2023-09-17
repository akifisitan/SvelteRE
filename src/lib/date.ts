export function formatDate(dateString: string, format: string) {
  const [year, month, day] = dateString.split("-");
  switch (format) {
    case "dd/MM/yyyy":
      return `${day}/${month}/${year}`;
    case "MM/dd/yyyy":
      return `${month}/${day}/${year}`;
    default: // yyyy-MM-dd
      return dateString;
  }
}
