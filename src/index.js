import "./styles.css";

const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = "ZP6DTL8KGEGSPQW5GRSSZL5QW";
const cityName = document.getElementById("city-name");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output");

async function fetchWeatherData(location) {
    const response = await fetch(`${url}${location}?key=${apiKey}`, {mode: "cors"});
    if (response.status === 200) {
        const json = await response.json();
        return json;
    }
    throw new Error(response.status);
}

function extractNecessaryData(data) {
    return { address: data.address, temperature: fahrenheitToCelsius(data.currentConditions.temp), feelsLike: fahrenheitToCelsius(data.currentConditions.feelslike), humidity: data.currentConditions.humidity, windSpeed: data.currentConditions.windspeed , resolvedAddress: data.resolvedAddress };
}

function fahrenheitToCelsius(temp) {
    const celsius = (temp - 32) / 1.8;
    return celsius.toFixed(2);
}

searchBtn.addEventListener("click", async () => {
    const inputValue = cityName.value;
    const data = await fetchWeatherData(inputValue);
    const extractedData = extractNecessaryData(data);
    output.style.visibility = "visible";
    output.innerHTML = "";
    output.innerHTML = `
    <div class="resolvedAddress">${extractedData.resolvedAddress}</div>
    <div class="temperature">${extractedData.temperature} °C</div>
    <div class="feels-like">Feels like: ${extractedData.feelsLike} °C</div>
    <div class="humidity">Humidity: ${extractedData.humidity} %</div>
    <div class="wind-speed">Wind Speed: ${extractedData.windSpeed} km/h</div>`
})
