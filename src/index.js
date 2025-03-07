import "./styles.css";

const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = "ZP6DTL8KGEGSPQW5GRSSZL5QW";
const location = document.getElementById("location");
const output = document.getElementById("output");

async function fetchWeatherData(location) {
    const response = await fetch(`${url}${location}?key=${apiKey}`, {mode: "cors"});
    if (response.status === 200) {
        const json = await response.json();
        return json;
    }
    throw new Error(response.status);
}

function fahrenheitToCelsius(temperature) {

}

function celsiusToFahrenheit(temperature) {

}

window.addEventListener("load", async () => {
    const locationName = location.value;
    const result = await fetchWeatherData(locationName);
    console.log(result)
    const { address, currentConditions, days, description, latitude, longitude, resolvedAddress, timezone} = result;
    const { conditions, datetime, feelslike, humidity, pressure, sunrise, sunset, temp, uvindex, windgust, windspeed } = currentConditions;
    console.log(address, conditions, datetime, feelslike, humidity, pressure)
    output.innerHTML = "";
    output.innerHTML = `
    <div id="location-name">Location Name: ${resolvedAddress}</div>
    <div id="temperature">Temperature: ${temp}°(Fahrenheit)</div>
    <div id="condition">Condition: ${conditions}</div>
    <div id="humidity">Humidity: ${humidity}%</div>
    <div id="feelslike">Feels like :${feelslike}</div>
    <div id="pressure">Pressure: ${pressure}hpa</div>
    `
})