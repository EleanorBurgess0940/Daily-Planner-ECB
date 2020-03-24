window.onload = function () {
    let d;

    d = new Date();
    month = d.getMonth();
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    currentMonth = months[month];
    day = d.getDate();
    year = d.getFullYear();
    date = (currentMonth + " " + day + " , " + year);
    $("#currentDay").html(date);

    weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = d.getDay();
    currentWeekday = weekdays[day]
    $("#currentWeekday").html(currentWeekday)
}