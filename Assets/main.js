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

for (i = 0; i < workDayHour.length; i++) {
  var newRow = $("<row>");
  $(".container").append(newRow);
  var timeCol = $("<div>");
  newRow.append(timeCol);
  timeCol.attr("class", "col-2");
  timeCol.html("<h1>" + workDayHour[i] + "</h1>");
  timeCol.innerhtml;
  if (workDayHour[i] < 9) {
    timeCol.text(workDayHour[i] + "PM");
  } else if (workDayHour === 12) {
    timeCol.text(workDayHour[i] + "PM");
  } else {
    timeCol.text(workDayHour[i] + "AM");
  }
}
