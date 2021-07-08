// for testing purposes, choosing colours based on the weather, temperature, and time

/*
    required colours:
    - website background colour
    - sky colour
    - cloud colour (if there are clouds)
    - ground colour (sprites not here yet)
    - sun/moon colour (if visible)
    - player colour (sprites not here yet)
    - percipitation colour (if there is percipitation)
    - fog colour (for foggy weather)
    - meteor colours (for meteors weather)
*/
const themes = {
    "clear": {
        "warm": {
            "day": {
                "body_colour": "rgb(255, 255, 255)",
                "sky_colour": "rgb(95, 205, 228)",
                "sun_colour": "rgb(251, 242, 54)",
                "ground_colour": "rgb(153, 229, 80)",
                "player_colour": "rgb(217, 87, 99)",
            },
            "night": {
                "body_colour": "rgb(0, 0, 139)", // x11: darkblue
                "sky_colour": "rgb(72, 61, 139)", // x11: darkslateblue
                "moon_colour": "rgb(245, 245, 245)", // x11: whitesmoke
                "ground_colour": "rgb(47, 79, 79)", // x11: darkslategray
                "player_colour": "rgb(119, 136, 153)", // x11: lightslategray
            },
        },
        "cold": {

        },
    },
    "cloudy": {

    },
    "rain": {

    },
    "snow": {

    },
    "thunderstorm": {

    },
    "fog": {

    },
    "meteors": {

    }
};