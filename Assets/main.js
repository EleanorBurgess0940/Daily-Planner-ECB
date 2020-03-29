//this on load of the window will grab the date.
window.onload = function() {
  let d;

  d = new Date();

  //this will load the month but it comes in as a number
  month = d.getMonth();
  //list of the months in an array
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
  //this takes the number of the month above and returns a month from the array
  currentMonth = months[month];

  //Grabs the days and years and writes the date in a format.
  days = d.getDate();
  year = d.getFullYear();
  date = currentMonth + " " + days + " , " + year;

  //changes the text in html for the above current date
  $("#currentDay").html(date);

  //like the months above the weekdays come in a number. so an array is necessary to return day of the week
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

  //changes the text in html for the above current day
  $("#currentWeekday").html(currentWeekday);

  //grabs the current hour
  hour = d.getHours();
  currentHour = hour;

  //adds functionality to the yesterday button.
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

  //adds functionality to the tomorrow button
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

//global variables
var historyHourArr = [, , , , , , , ,];
var workDayHour = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var militaryHour = [9, 10, 11, 12, 13, 14, 15, 16, 17];

//function for creating the table in which the schedule sits
function createSchedule() {
  //for loop that runs through the workdayhours and creates a row
  for (i = 0; i < workDayHour.length; i++) {
    var newRow = $("<row>");
    $(".container").append(newRow);

    //three different columns
    var timeCol = $("<div>");
    var inputCol = $("<div>");
    var saveCol = $("<div>");

    //Every row will be set up like this
    newRow.append(timeCol, inputCol, saveCol);

    //first col settings(time col)
    timeCol.attr("class", "col col-2 float-left time-block");
    timeCol.html("<h1>" + militaryHour[i] + "</h1>");

    //second col settings(input col)
    inputCol.attr("class", "col-9 float-left col input textarea");
    inputCol.html("<textarea rows='4'></textarea>");

    //button settings at the end of each row
    saveCol.attr("class", "col col-1 save float-right");
    saveCol.attr("class", "btn button saveBtn");
    saveCol.attr("id", militaryHour[i]);
    saveCol.html("Save");

    //new row settings
    newRow.attr("class", "row event");
    newRow.attr("id", militaryHour[i]);

    //decides the am/pm of the hour
    if (workDayHour[i] < 9) {
      timeCol.text(workDayHour[i] + "PM");
    } else if (workDayHour[i] === 12) {
      timeCol.text(workDayHour[i] + "PM");
    } else {
      timeCol.text(workDayHour[i] + "AM");
    }

    //decides the tense of the row(past, future, present)
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

  //adds functionality to the save button.also saves the input area as a string.
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

  // grabs the schedule out of local storage
  function getSchedule() {
    var storedSchedule = localStorage.getItem("schedule");
    console.log(storedSchedule);
    if (storedSchedule) {
      historyHourArr = JSON.parse(storedSchedule);
      console.log(historyHourArr);
    }
    displaySchedule();
  }

  //displays the schedule out of local storage
  function displaySchedule() {
    var TextAreaArr = $("textarea");
    for (var i = 0; i < historyHourArr.length; i++) {
      var newText = historyHourArr[i];
      $(TextAreaArr[i]).val(newText);
    }
  }
  //runs this function
  getSchedule();
}

//runs this function
createSchedule();
