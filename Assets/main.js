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
  days = d.getDate();
  year = d.getFullYear();
  date = currentMonth + " " + days + " , " + year;
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
  currentHour = hour;

  var yesterday = days - 1;
  var yesterdayDate = currentMonth + " " + yesterday + " , " + year;
  var yesterdayDayWeek = day - 1;
  if (yesterdayDayWeek < 0) {
    yesterdayDayWeek = yesterdayDayWeek + 7;
  }
  var yesterdayDayOfWeek = weekdays[yesterdayDayWeek];
  $("#yesterdayBtn").click(function() {
    $("#currentDay").html(yesterdayDate);
    $("#currentWeekday").html(yesterdayDayOfWeek);
    $("#yesterdayBtn").hide();
    $("#tomorrowBtn").hide();
  });

  var tomorrow = days + 1;
  var tomorrowDate = currentMonth + " " + tomorrow + " , " + year;
  var tomorrowDayWeek = day + 1;
  if ((tomorrowDayWeek = 7)) {
    tomorrowDayWeek = tomorrowDayWeek - 7;
  }
  console.log(tomorrowDayWeek);
  var tomorrowDayOfWeek = weekdays[tomorrowDayWeek];
  console.log(tomorrowDayOfWeek);

  $("#tomorrowBtn").click(function() {
    $("#currentDay").html(tomorrowDate);
    $("#currentWeekday").html(tomorrowDayOfWeek);
    $("#tomorrowBtn").hide();
    $("#yesterdayBtn").hide();
  });
};
var workDayHour = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var militaryHour = [9, 10, 11, 12, 13, 14, 15, 16, 17];

for (i = 0; i < workDayHour.length; i++) {
  var newRow = $("<row>");
  $(".container").append(newRow);
  var timeCol = $("<div>");
  var inputCol = $("<div>");
  var saveCol = $("<div>");
  var clearCol = $("<div>");
  newRow.append(timeCol, inputCol, saveCol, clearCol);
  timeCol.attr("class", "col col-2 float-left hour");
  timeCol.html("<h1>" + workDayHour[i] + "</h1>");
  timeCol.innerhtml;
  inputCol.attr("class", "col-8 float-left col");
  inputCol.html("<textarea rows='4'></textarea>");
  saveCol.attr("class", "col col-1 save float-right");
  saveCol.attr("class", "btn button saveBtn");
  saveCol.html("Save");
  clearCol.attr("class", "col col-1 clear float-right");
  clearCol.attr("class", "btn button saveBtn");
  clearCol.html("Clear");
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
  var timeOfDay = parseInt(moment().format("H"));
  if (getId < timeOfDay) {
    $(this).addClass("past");
  } else if (getId > timeOfDay) {
    $(this).addClass("future");
  } else {
    $(this).addClass("present");
  }
});
