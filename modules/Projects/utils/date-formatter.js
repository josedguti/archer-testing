// Formats date to "June 22, 2021"
export function formateDate_Month_long_DD_YYY(date) {
  let pubDate = new Date(date);
  return pubDate.toLocaleString("default", { month: "long" }) + " " + pubDate.getDate() + ", " + pubDate.getFullYear();
}

export function formateDate_Month_short_DD_YYY(date) {
  let pubDate = new Date(date);
  return pubDate.toLocaleString("default", { month: "short" }) + " " + pubDate.getDate() + ", " + pubDate.getFullYear();
}
