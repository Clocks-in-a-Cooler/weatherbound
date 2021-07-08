// main file where everything starts

function set_default_weather_theme() {
    weather  = "clear";
    var hour = (new Date()).getHours();
    is_day   = hour > 6 && hour < 19;
    
    temperature = "warm";

    continue_after_retrieving_weather();
}

var player_response = prompt("To load this game, we're going to need your weather and your current location. Type \"yes\" to consent to this. Your data will not be stored or shared anywhere. If you do not want to use your local weather, a default theme will be loaded.") || "";

if (player_response.toLowerCase().trim() == "yes") {
    get_weather();
} else if (player_response.toLowerCase().trim() == "meatier") {
    // "I have seen meteor showers, but I haven't seen a meatier shower than this!"
    // -- some movie that i watched that i can't remember
    weather     = "meteors";
    is_day      = false;
    temperature = "warm";
    continue_after_retrieving_weather();
} else {
    set_default_weather_theme();
}

function continue_after_retrieving_weather() {
    console.log(`current weather theme is ${ weather }, it is ${ is_day ? "day" : "night" }, and it is ${ temperature }.`);
    document.title = get_game_name();

    // set the colour theme
    // colour_theme = themes[weather][temperature][is_day ? "day" : "night"];
    // document.body.style.backgroundColor = colour_theme.body_colour;

    animate();
}

// just gonna assume 60 fps... it's usually slightly lower than that but whatever
function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
}