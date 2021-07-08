
function get_game_name() {
    switch (weather) {
        case "clear":
            return is_day ? "sunbound" : "moonbound";
        case "cloudy":
            return "cloudbound";
        case "rain":
            return "rainbound";
        case "snow":
            return "snowbound"; // rooooll credits!
        case "thunderstorm":
            return "stormbound";
        case "fog":
            return "fogbound";
        case "meteors":
            return "meteorbound";
    }
}

const weather_string_mapping = {
    "sunny": "clear",
    "clear": "clear",
    "partly cloudy": "cloudy",
    "cloudy": "cloudy",
    "overcast": "cloudy",
    "mist": "foggy",
    "patchy rain possible": "rain",
    "patchy snow possible": "snow",
    "patchy sleet possible": "snow",
    "patchy freezing drizzle possible": "snow",
    "thundery outbreaks possible": "thunderstorm",
    "blowing snow": "snow",
    "blizzard": "snow",
    "fog": "fog",
    "freezing fog": "fog",
    "patchy light drizzle": "snow",
    "light drizzle": "snow",
    "freezing drizzle": "rain",
    "heavy freezing drizzle": "snow",
    "patchy light rain": "rain",
    "light rain": "rain",
    "moderate rain at times": "rain",
    "moderate rain": "rain",
    "heavy rain at times": "rain",
    "heavy rain": "thunderstorm", // you deserve it
    "light freezing rain": "rain",
    "moderate or heavy freezing rain": "rain",
    "light sleet": "rain",
    "moderate or heavy sleet": "rain",
    "patchy light snow": "snow",
    "patchy moderate snow": "snow",
    "light snow": "snow",
    "moderate snow": "snow",
    "patchy heavy snow": "snow",
    "heavy snow": "snow",
    "ice pellets": "rain",
    "light rain shower": "rain",
    "moderate or heavy rain shower": "rain",
    "torrential rain shower": "thunderstorm",
    "light sleet showers": "rain",
    "moderate or heavy sleet showers": "rain",
    "light snow showers": "snow",
    "moderate or heavy snow showers": "snow",
    "light showers of ice pellets": "rain",
    "moderate or heavy showers of ice pellets": "rain",
    "patchy light rain with thunder": "thunderstorm",
    "moderate or heavy rain with thunder": "thunderstorm",
    "patchy light snow with thunder": "snow",
    "moderate or heavy snow with thunder": "snow",
};

const temperature_mapping = {
    // "none" -> decided by temperature
    "sunny": "none",
    "clear": "none",
    "partly cloudy": "none",
    "cloudy": "none",
    "overcast": "none",
    "mist": "none",
    "patchy rain possible": "warm",
    "patchy snow possible": "cold",
    "patchy sleet possible": "cold",
    "patchy freezing drizzle possible": "cold",
    "thundery outbreaks possible": "warm",
    "blowing snow": "cold",
    "blizzard": "cold",
    "fog": "warm",
    "freezing fog": "cold",
    "patchy light drizzle": "cold",
    "light drizzle": "cold",
    "freezing drizzle": "cold",
    "heavy freezing drizzle": "cold",
    "patchy light rain": "warm",
    "light rain": "warm",
    "moderate rain at times": "warm",
    "moderate rain": "warm",
    "heavy rain at times": "warm",
    "heavy rain": "warm", // you deserve it
    "light freezing rain": "cold",
    "moderate or heavy freezing rain": "cold",
    "light sleet": "cold",
    "moderate or heavy sleet": "cold",
    "patchy light snow": "cold",
    "patchy moderate snow": "cold",
    "light snow": "cold",
    "moderate snow": "cold",
    "patchy heavy snow": "cold",
    "heavy snow": "cold",
    "ice pellets": "cold",
    "light rain shower": "warmwarm",
    "moderate or heavy rain shower": "warm",
    "torrential rain shower": "warm",
    "light sleet showers": "cold",
    "moderate or heavy sleet showers": "cold",
    "light snow showers": "cold",
    "moderate or heavy snow showers": "cold",
    "light showers of ice pellets": "cold",
    "moderate or heavy showers of ice pellets": "cold",
    "patchy light rain with thunder": "warm",
    "moderate or heavy rain with thunder": "warm",
    "patchy light snow with thunder": "cold",
    "moderate or heavy snow with thunder": "cold",
};
