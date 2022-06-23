// Search Input Variable
let search_Box = document.getElementById("search-box");


// Default UI
let api = "https://api.weatherapi.com/v1/forecast.json?key=70d6a84e90b946debfc95259220906&q=cairo&days=3"

async function fetchapi(url) {
    let response = await fetch(url)
    return await response.json();
}

async function renderData() {

    let defaultCity = await fetchapi(api)
    updateUI(defaultCity);
    search_Box.addEventListener("input", async function () {
        if (search_Box.value.length >= 3) {
            let userSearchedCity = await fetchapi(`https://api.weatherapi.com/v1/forecast.json?key=70d6a84e90b946debfc95259220906&q=${search_Box.value}&days=3`)
            updateUI(userSearchedCity)
        }
    });

    function updateUI(data) {


        // Making an array from the date property to use the Array methonds on it
        let getDateForm = Array.from(data.forecast.forecastday[0].date);
        for (let i = 0; i < getDateForm.length; i++) {
            // removes the "-" in the date
            if (getDateForm[i] == "-") {
                getDateForm.splice(i, 1);
            }
        };
        // turning the date string to number to use it in dayofTheWeek function
        let year = Number(getDateForm.join("").substr(0, 4));
        let month = Number(getDateForm.join("").substr(4, 2));
        let day = Number(getDateForm.join("").substr(6, 2));
        // getting the number of the day
        let dayNumber = data.forecast.forecastday[0].date.substr(8, 2)
        // Today Card;
        let today = document.getElementById("today");
        today.innerHTML = `<div class="card-top d-flex justify-content-between px-3">
    <p>${dayOfTheWeek(year, month, day)}</p>
    <p>${dayNumber} ${getmonth()}</p>
    </div>
    <div class="card-body">
    <h5 class="card-title">${data.location.name}</h5>
    <p class="temperature">${data.current.temp_c}°C <img src="https:${data.forecast.forecastday[0].day.condition.icon}"></p>
    <p class="weather-condition">${data.current.condition.text}</p>
    <ul class="list-unstyled d-flex">
    <li class="me-2"><i class="fa-solid fa-umbrella"></i><span class="humidity"> ${data.current.humidity}%</span></li>
    <li class="me-2"><i class="fa-solid fa-wind"></i><span class="wind-speed"> ${data.current.wind_kph}km/h</span></li>
    <li class="me-2"><i class="fa-solid fa-location-crosshairs"></i><span class="wind-direction">${data.current.wind_dir}</span></li>
    </ul>
    </div>`;

        // Tomorrow Card
        let tmrw = document.getElementById("tomorrow");
        tmrw.innerHTML = `<div class="card-top text-center px-3">
    <p>${dayOfTheWeek(year, month, day + 1)}</p>
    </div>
    <div class="card-body text-center mt-5">
    <img src="https:${data.forecast.forecastday[1].day.condition.icon}">
    <p class="max-degree">${data.forecast.forecastday[1].day.maxtemp_c} C</p>
    <p class="min-degree">${data.forecast.forecastday[1].day.mintemp_c} C</p>
    <p class="weather-condition">${data.forecast.forecastday[1].day.condition.text}</p>
    </div>`;

        // Day after Tomorrow Card
        let thirdDay = document.getElementById("thirdDay");
        thirdDay.innerHTML = `<div class="card-top text-center px-3">
    <p>${dayOfTheWeek(year, month, day + 2)}</p>
    </div>
    <div class="card-body text-center mt-5">
    <img src="https:${data.forecast.forecastday[2].day.condition.icon}">
    <p class="max-degree">${data.forecast.forecastday[2].day.maxtemp_c} C</p>
    <p class="min-degree">${data.forecast.forecastday[2].day.mintemp_c} C</p>
    <p class="weather-condition">${data.forecast.forecastday[2].day.condition.text}</p>
    </div>`;

        // Function to get the name of the month
        function getmonth() {
            let months = ["January", "Februry", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let currentMonth = "";
            for (i = 0; i < months.length; i++) {
                if (data.forecast.forecastday[0].date.substr(5, 2) == 0 + i || data.forecast.forecastday[0].date.substr(5, 2) == i) {

                    currentMonth = months[i - 1]
                }
            };
            return currentMonth
        }
    };

}
renderData();

// Function to get the name of the day
function dayOfTheWeek(year, month, day) {
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}/${month}/${day}`).getDay()];
};







