(function(){
    const city = 'Manila';
    const api = `https://api.weatherapi.com/v1/current.json?key=2ba4bf3e851e44bfb9e142422250802&q=${city}&aqi=no`;
    const weather_app_elem = document.getElementById("weather-app");
    let construct_html = ``;

    fetch(api, {
        method: "GET",
    })
    .then(data => data.json())
    .then(response => {
            console.log(response); // To check the values of api
            const city_name = response.location.name;
            const country = response.location.country;
            const weather_description = response.current.condition.text;
            const weather_icon = response.current.condition.icon;
            const local_time = response.location.localtime;
            const date = new Date(local_time.replace(" ", "T")); // Ensure proper parsing
            const formattedDate = date.toLocaleString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: true 
            });

            const weather_status = {
                "Temp" : response.current.temp_c,
                "Wind Speed" : response.current.wind_mph,
                "Humidity" : response.current.humidity
            }
            
            construct_html += `<div class="country">`;
                construct_html += `<div class="header">`;
                    construct_html += `<img src="https:${weather_icon}" class="weather-icon"> `;
                    construct_html += `<h2 class="name">${city_name}, ${country}</h2>`;
                    construct_html += `<p class="description"><b>${formattedDate}</b> | ${weather_description}</p>`;
                construct_html += `</div>`;
                construct_html += `<p>`;
                    Object.entries(weather_status).forEach(([status, value]) => {
                        construct_html += `${status}: <strong>${value}</strong> `;
                    });
                construct_html += `</p>`;
            construct_html += `</div>`;

            weather_app_elem.innerHTML = construct_html;
        }
    );
})();