async function fetchCityData(cityname) {
    const apiKey = "bed96ec347873564805aca3676aeddfe"; // Your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
    
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        alert("Error fetching data: " + error.message);
    }
}

const input_field = document.querySelector("#city_names");
const submit_button = document.querySelector("#button");

const cn = document.querySelector("#cn");
const cl = document.querySelector("#cl");
const ct = document.querySelector("#ct");
const fl = document.querySelector("#fl");
const weatherIcon = document.getElementById("weather-icon");

// Add event listener to the submit button
submit_button.addEventListener("click", async () => {
    if (input_field.value.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    let data = await fetchCityData(input_field.value);
    if (data) {
        cn.innerText = data.name;
        cl.innerText = data.sys.country;
        ct.innerText = data.main.temp + "°C";
        fl.innerText = data.main.feels_like + "°C";

        // Update weather icon
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = "block"; // Show the icon

        // Reset and trigger the animation
        const card = document.querySelector(".card");
        card.classList.remove("animate");
        void card.offsetWidth; // Trigger reflow
        card.classList.add("animate");

        console.log(data);
    }
});
