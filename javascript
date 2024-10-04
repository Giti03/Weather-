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


        console.log(data.weather);


        // Change the weather icon based on the weather condition
        if (data.weather[0].main === "Clouds") {
            weathericon.src = "clouds.jpg";
        } else if (data.weather[0].main === "clear") {
            console.log(data.weather[0].main);  // Log to see exact value

           weathericon.src = "clear_sky.jpg";
        } else if (data.weather[0].main === "Rain") {
            weathericon.src = "rain.jpg"; // Corrected filename
        } else if (data.weather[0].main === "Drizzle") {
            console.log(data.weather[0].main);  // Log to see exact value

            //weathericon.src = "drizzle.jpg"; // Corrected filename
        } else if (data.weather[0].main === "Mist") {
            console.log(data.weather[0].main); 
            weathericon.src = "mist.avif";
        }  else if (data.weather[0].main === "Haze") {
                console.log(data.weather[0].main); 
                weathericon.src = "haze.png";
        } else {
            weathericon.src = "default_weather.png"; // Fallback image
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

