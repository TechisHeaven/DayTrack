export function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Get the month name, day, and year
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Add ordinal suffix to the day
  const ordinalSuffix = (n: number) => {
    if (n === 1 || n === 21 || n === 31) return `${n}st`;
    if (n === 2 || n === 22) return `${n}nd`;
    if (n === 3 || n === 23) return `${n}rd`;
    return `${n}th`;
  };

  return `${month} ${ordinalSuffix(day)}, ${year}`;
}
