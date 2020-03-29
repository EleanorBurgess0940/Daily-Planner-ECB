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
  if (tomorrow > 31) {
    tomorrow = tomorrow - 31;
    currentMonth = months[month + 1];
  }
  var tomorrowDate = currentMonth + " " + tomorrow + " , " + year;
  var tomorrowDayWeek = day + 1;
  if (tomorrowDayWeek > 6) {
    tomorrowDayWeek = tomorrowDayWeek - 7;
  }
  var tomorrowDayOfWeek = weekdays[tomorrowDayWeek];

  $("#tomorrowBtn").click(function() {
    $("#currentDay").html(tomorrowDate);
    $("#currentWeekday").html(tomorrowDayOfWeek);
    $("#tomorrowBtn").hide();
    $("#yesterdayBtn").hide();
  });
};
var historyHourArr = [, , , , , , , ,];
var workDayHour = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var militaryHour = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var wordHour = [
  "nine",
  "ten",
  "eleven",
  "twelve",
  "one",
  "two",
  "three",
  "four",
  "five"
];
function createSchedule() {
  for (i = 0; i < workDayHour.length; i++) {
    var newRow = $("<row>");
    $(".container").append(newRow);
    var timeCol = $("<div>");
    var inputCol = $("<div>");
    var saveCol = $("<div>");
    newRow.append(timeCol, inputCol, saveCol);
    timeCol.attr("class", "col col-2 float-left hour time-block");
    timeCol.html("<h1>" + militaryHour[i] + "</h1>");
    timeCol.innerhtml;
    inputCol.attr("class", "col-9 float-left col input textarea");
    inputCol.html("<textarea rows='4'></textarea>");
    saveCol.attr("class", "col col-1 save float-right");
    saveCol.attr("class", "btn button saveBtn");
    saveCol.attr("id", militaryHour[i]);
    saveCol.html("Save");
    newRow.attr("class", "row event");
    newRow.attr("id", militaryHour[i]);
    if (workDayHour[i] < 9) {
      timeCol.text(workDayHour[i] + "PM");
    } else if (workDayHour === 12) {
      timeCol.text(workDayHour[i] + "PM");
    } else {
      timeCol.text(workDayHour[i] + "AM");
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
  }

  $(".saveBtn").click(function(event) {
    event.preventDefault();

    var historyHour = $(this).attr("id");
    historyHour = historyHour - 9;
    var historyEvent = $(this)
      .siblings(".input")
      .children("textarea")
      .val();

    historyHourArr[historyHour] = historyEvent;
    localStorage.setItem("schedule", JSON.stringify(historyHourArr));
  });

  function getSchedule() {
    var storedSchedule = localStorage.getItem("schedule");
    console.log(storedSchedule);
    if (storedSchedule) {
      historyHourArr = JSON.parse(storedSchedule);
      console.log(historyHourArr);
    }
    displaySchedule();
  }

  function displaySchedule() {
    var TextAreaArr = $("textarea");
    for (var i = 0; i < historyHourArr.length; i++) {
      var newText = historyHourArr[i];
      $(TextAreaArr[i]).val(newText);
    }
  }
  getSchedule();
}

createSchedule();
