//    G L O B A L    V A R I A B L E S
var search_Box = document.getElementById("search-box");
var search_BTN = document.getElementById("search-BTN");
var city = [];

// Default UI
var myReq = new XMLHttpRequest();

myReq.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=70d6a84e90b946debfc95259220906&q=cairo&days=3`);
myReq.send();
myReq.addEventListener("readystatechange", function () {
    if(myReq.readyState == 4 && myReq.status == 200){
// Adding the recieved Data to my Empty Array
    city.unshift(JSON.parse(myReq.response))
// calling the UI Content Function
    updateUI();
    }
});

// Getting the input from the user and sending it through the API
search_Box.addEventListener("input", function () {
// The API by default doesn't work until you input 3 letters
    if (search_Box.value.length >= 3) {
        myReq.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=70d6a84e90b946debfc95259220906&q=${search_Box.value}&days=3`);
        myReq.send();
    }

});
// Recieving the Data sent through the API
myReq.addEventListener("readystatechange", function () {

    if (myReq.readyState == 4 && myReq.status == 200) {
        city.unshift(JSON.parse(myReq.response))
// calling the UI Content Function to Update the UI
        updateUI();
        
    };
    
});

// Changing the UI Content
function updateUI(){
// Making an array from the date property to use the Array methonds on it
var getDateForm = Array.from(city[0].forecast.forecastday[0].date);
 for(i=0; i <getDateForm.length; i++){
     // removes the "-" in the date
     if(getDateForm[i] == "-"){
         getDateForm.splice(i,1);
     }
 };
// turning the date string to number to use it in dayofTheWeek function
var year = Number(getDateForm.join("").substr(0,4));
var month = Number(getDateForm.join("").substr(4,2));
var day = Number(getDateForm.join("").substr(6,2));
// getting the number of the day
var dayNumber = city[0].forecast.forecastday[0].date.substr(8,2)
// Today Card;
var today = document.getElementById("today");
today.innerHTML = `<div class="card-top d-flex justify-content-between px-3">
<p>${dayOfTheWeek(year,month,day)}</p>
<p>${dayNumber} ${getmonth()}</p>
</div>
<div class="card-body">
<h5 class="card-title">${city[0].location.name}</h5>
<p class="temperature">${city[0].current.temp_c}°C <img src="https:${city[0].forecast.forecastday[0].day.condition.icon}"></p>
<p class="weather-condition">${city[0].current.condition.text}</p>
<ul class="list-unstyled d-flex">
<li class="me-2"><i class="fa-solid fa-umbrella"></i><span class="humidity"> ${city[0].current.humidity}%</span></li>
<li class="me-2"><i class="fa-solid fa-wind"></i><span class="wind-speed"> ${city[0].current.wind_kph}km/h</span></li>
<li class="me-2"><i class="fa-solid fa-location-crosshairs"></i><span class="wind-direction">${city[0].current.wind_dir}</span></li>
</ul>
</div>`;

// Tomorrow Card
var tmrw = document.getElementById("tomorrow");
tmrw.innerHTML = `<div class="card-top text-center px-3">
<p>${dayOfTheWeek(year,month,day + 1)}</p>
</div>
<div class="card-body text-center mt-5">
<img src="https:${city[0].forecast.forecastday[1].day.condition.icon}">
<p class="max-degree">${city[0].forecast.forecastday[1].day.maxtemp_c} C</p>
<p class="min-degree">${city[0].forecast.forecastday[1].day.mintemp_c} C</p>
<p class="weather-condition">${city[0].forecast.forecastday[1].day.condition.text}</p>
</div>`;

// Day after Tomorrow Card
var thirdDay = document.getElementById("thirdDay");
thirdDay.innerHTML = `<div class="card-top text-center px-3">
<p>${dayOfTheWeek(year,month,day + 2)}</p>
</div>
<div class="card-body text-center mt-5">
<img src="https:${city[0].forecast.forecastday[2].day.condition.icon}">
<p class="max-degree">${city[0].forecast.forecastday[2].day.maxtemp_c} C</p>
<p class="min-degree">${city[0].forecast.forecastday[2].day.mintemp_c} C</p>
<p class="weather-condition">${city[0].forecast.forecastday[2].day.condition.text}</p>
</div>`;

// Function to get the name of the month
function getmonth(){
var months = ["January" , "Februry" , "March" , "April" , "May" , "June" , "July" , "August", "September" , "October" , "November" , "December"]
var currentMonth ="";
for(i=0; i < months.length; i++){
if (city[0].forecast.forecastday[0].date.substr(5,2) == 0 + i || city[0].forecast.forecastday[0].date.substr(5,2) == i){
    
    currentMonth = months[i-1]
}
};
return currentMonth
}
};
// Function to get the name of the day
function dayOfTheWeek(year, month, day) {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}/${month}/${day}`).getDay()];
  };

  





