var canvas   = document.querySelector("canvas");
var context  = canvas.getContext("2d");
canvas.width = 600; canvas.height = 600;

const DRAW_SCALE = 20;

var top_left        = new Vector(0, 0);
const VIEWPORT_SIZE = new Vector(canvas.width / DRAW_SCALE, canvas.height / DRAW_SCALE);

function draw() {
    if (current_level == null) {
        return;
    }
    
    // update the viewport first, then draw
    // the player needs to be within the middle third of the screen, both vertically and horizontally
    var difference = current_level.player.position.subtract(top_left);

    if (difference.x < VIEWPORT_SIZE.x / 3) {
        top_left.x += difference.x - VIEWPORT_SIZE.x / 3;
    }
    if (difference.x > VIEWPORT_SIZE.x * 2 / 3) {
        top_left.x += difference.x - VIEWPORT_SIZE.x * 2 / 3;
    }
    if (difference.y < VIEWPORT_SIZE.y / 3) {
        top_left.y += difference.y - VIEWPORT_SIZE.y / 3;
    }
    if (difference.y > VIEWPORT_SIZE.y * 2 / 3) {
        top_left.y += difference.y - VIEWPORT_SIZE.y * 2 / 3;
    }

    context.clearRect(0, 0, 600, 600);

    // find everything inside the level and draw them!
    current_level.entities.filter(entity => {
        return check_collision(top_left, VIEWPORT_SIZE, entity.position, entity.size);
    }).forEach(entity => {
        var draw_position = entity.position.subtract(top_left).multiply(DRAW_SCALE);
        var draw_size     = entity.size.multiply(DRAW_SCALE);

        context.strokeStyle = entity.colour;
        context.strokeRect(draw_position.x, draw_position.y, draw_size.x, draw_size.y);
    });

    // // yanderedev style code, due to weather-specific graphics details
    // context.fillStyle = colour_theme.sky_colour;
    // context.fillRect(0, 0, 600, 600);

    // if (weather != "clear") {
    //     // draw clouds in the background
    // }

    // // draw foreground stuff

    // // if there's supposed to be percipitation, draw percipitation
    // if (weather == "rain" || weather == "thunderstorm") {
    //     var density;
    //     if (weather == "rain") {

    //     } else {

    //     }
    // }
}