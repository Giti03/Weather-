const citySelect = document.querySelector("#citySelect"); // Select the dropdown
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon"); 
const disp = document.querySelector(".disp");

const apikey = "807e14264ab4e8f5a9544ba53a8f9d4c";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkweather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Change the weather icon based on the weather condition
        if (data.weather[0].main === "Clouds") {
            weathericon.src = "./images/clouds.jpg";
        } else if (data.weather[0].main === "Clear") {
            weathericon.src = "./images/clear_sky.png";
        } else if (data.weather[0].main === "Rain") {
            weathericon.src = "./images/rain.jpg"; // Corrected filename
        } else if (data.weather[0].main === "Drizzle") {
            weathericon.src = "./images/drizzle.jpg"; // Corrected filename
        } else {
            weathericon.src = "./images/default_weather.png"; // Fallback image
        }

        disp.style.display = "block";
    } catch (error) {
        alert(error.message);
    }
}

// Event listener for the search button
searchbtn.addEventListener("click", () => {
    const selectedCity = citySelect.value; // Get selected city from dropdown
    if (selectedCity) {
        checkweather(selectedCity);
    } else {
        alert("Please select a city"); // Alert if no city is selected
    }
});
