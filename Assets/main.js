window.onload = function () {
    let d;

    d = new Date();
    month = d.getMonth();
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    currentMonth = months[month];
    day = d.getDate();
    year = d.getFullYear();
    date = (currentMonth + " " + day + " , " + year)
    $("#currentDay").html(date);


    console.log(d.toString());
    console.log(currentMonth);
    console.log(day);
    console.log(year);
    console.log(date)
}
