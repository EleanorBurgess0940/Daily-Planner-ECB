//this on load of the window will grab the date.
window.onload = function() {
  var currentTime = function() {
    var date = moment().format("MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").html(date);
  };
  setInterval(currentTime, 1000);

  let d;

  d = new Date();

  // the weekdays come in a number. so an array is necessary to return day of the week
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
  var yesterday = moment()
    .subtract(1, "day")
    .format("LLL");
  console.log(yesterday);
  $("#yesterdayBtn").click(function() {
    $("#currentDay").hide();
    $("#currentWeekday").hide();
    $("#yesterdayBtn").hide();
    $("#tomorrowBtn").hide();
    $("#yesterday").show();
    $("#yesterday").html(yesterday);
  });

  //adds functionality to the tomorrow button
  var tomorrow = moment()
    .add(1, "day")
    .format("LLL");
  console.log(tomorrow);
  $("#tomorrowBtn").click(function() {
    $("#currentDay").hide();
    $("#currentWeekday").hide();
    $("#yesterdayBtn").hide();
    $("#tomorrowBtn").hide();
    $("#tomorrow").show();
    $("#tomorrow").html(tomorrow);
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
