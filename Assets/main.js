window.onload = function() {
  let d;

  d = new Date();
  month = d.getMonth();
  months = [
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
    "December"
  ];
  currentMonth = months[month];
  day = d.getDate();
  year = d.getFullYear();
  date = currentMonth + " " + day + " , " + year;
  $("#currentDay").html(date);

  weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  day = d.getDay();
  currentWeekday = weekdays[day];
  $("#currentWeekday").html(currentWeekday);
};

var hour = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var workDayHour = [9, 10, 11, 12, 1, 2, 3, 4, 5];

setHour();

function setHour() {
  for (i = 0; i < workDayHour.length; i++) {
    $(".container").append(
      $("<div>", { class: "row tr" }).text(workDayHour[i])
    );
  }
}
