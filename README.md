# Weatherbound

> a game that changes based on the weather outside, by TheAyeStride and Clocks-in-a-cooler

note: one of the Javascript files, `weather.js`, is not included in this repository, as it contains my API keys. its contents are as follows:

```javascript
function get_weather() {
    var latitude, longitude;
    var weather_request = null;

    navigator.geolocation.getCurrentPosition(location => {
        latitude  = location.coords.latitude;
        longitude = location.coords.longitude;
        send_weather_request();
    }, (error) => {
        set_default_weather_theme();
    });

    function send_weather_request() {
        weather_request = new XMLHttpRequest();
        weather_request.open("GET", "https://api.weatherapi.com/v1/current.json?key=" + `your WeatherAPI.com API key here` + "&q=" + latitude + "," + longitude + "");
        weather_request.send(null);

        weather_request.addEventListener("load", () => {
            var response = JSON.parse(weather_request.response).current;
            weather      = weather_string_mapping[response.condition.text.toLowerCase()];
            is_day       = response.is_day;
            temperature  = temperature_mapping[weather];
            if (temperature == "none") {
                temperature = response.temp_c < 5 ? "cold" : "warm";
            }
            continue_after_retrieving_weather();
        });

        weather_request.addEventListener("error", () => {
            console.log("error getting weather.");
            set_default_weather_theme();
        });
    }
}
```

you're going to need a WeatherAPI.com API key to load the weather. If you do not have this, the game will load the default theme (sunny, warm, daytime).

## Licensing

* art (c) 2021 TheAyeStride
* code is under the public domain