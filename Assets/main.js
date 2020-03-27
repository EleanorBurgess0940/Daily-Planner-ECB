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

  hour = d.getHours();
  console.log(hour);
  currentHour = hour;
  console.log(currentHour);
};

var workDayHour = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var militaryHour = [9, 10, 11, 12, 13, 14, 15, 16, 17];

for (i = 0; i < workDayHour.length; i++) {
  var newRow = $("<row>");
  $(".container").append(newRow);
  var timeCol = $("<div>");
  var inputCol = $("<div>");
  newRow.append(timeCol, inputCol);
  timeCol.attr("class", "col-2 float-left hour");
  timeCol.html("<h1>" + workDayHour[i] + "</h1>");
  timeCol.innerhtml;
  inputCol.attr("class", "col-10 float-left");
  inputCol.html("<textarea rows='4'></textarea>");
  newRow.attr("class", "row hour");
  newRow.attr("id", militaryHour[i]);
  if (workDayHour[i] < 9) {
    timeCol.text(workDayHour[i] + "PM");
  } else if (workDayHour === 12) {
    timeCol.text(workDayHour[i] + "PM");
  } else {
    timeCol.text(workDayHour[i] + "AM");
  }
}

$("row").each(function() {
  var getId = parseInt($(this).attr("id"));
  console.log("id- " + getId);
  var timeOfDay = parseInt(moment().format("H"));
  if (getId < timeOfDay) {
    console.log("Past");
    $(this).addClass("past");
  } else if (getId > timeOfDay) {
    console.log("Future");
    $(this).addClass("future");
  } else {
    console.log("Present");
    $(this).addClass("present");
  }
});
