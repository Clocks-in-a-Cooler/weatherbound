var canvas   = document.querySelector("canvas");
var context  = canvas.getContext("2d");
canvas.width = 600; canvas.height = 600;
context.imageSmoothingEnabled     = false;

const DRAW_SCALE = 60;

var top_left        = new Vector(0, 0);
const VIEWPORT_SIZE = new Vector(canvas.width / DRAW_SCALE, canvas.height / DRAW_SCALE);

var viewport_entity = new Entity(top_left, VIEWPORT_SIZE);

/**
 * @param {String} name
 */
function create_sprite(name) {
    var img = document.createElement("img");
    img.src = "assets/" + name;
    return img;
}

var player_sprite = create_sprite("child_clear_day.png");
var block_sprite  = create_sprite("clear_day_tile_1.png");

function draw() {
    if (current_level == null) {
        return;
    }
    
    // update the viewport first, then draw
    // follow the player
    var difference           = current_level.player.center.subtract(viewport_entity.center);
    viewport_entity.position = viewport_entity.position.add(difference.multiply(0.1));

    top_left = viewport_entity.position;

    context.clearRect(0, 0, 600, 600);

    // draw the level background... if there is one
    
    // for now
    context.fillStyle = "powderblue";
    context.fillRect(0, 0, 600, 600);

    // find everything inside the level and draw them!
    current_level.entities.filter(entity => {
        return check_collision(top_left, VIEWPORT_SIZE, entity.position, entity.size);
    }).forEach(entity => {
        var draw_position = entity.position.subtract(top_left).multiply(DRAW_SCALE);
        var draw_size     = entity.size.multiply(DRAW_SCALE);
        
        switch (entity.constructor) {
            case Player:
                context.save();
                context.translate(draw_position.x + (entity.facing == "left" ? draw_size.x : 0), draw_position.y);
                context.scale(entity.facing == "left" ? -1 : 1, 1);
                context.drawImage(player_sprite, 0, 0, 90, 135);
                context.restore();
                break;
            case Block:
                var sprite_position = entity.position.x % 5;
                context.drawImage(block_sprite, sprite_position * 20, 0, 20, 37, draw_position.x, draw_position.y - 51, 60, 111);
                break;
            default:
                context.fillStyle = entity.colour;
                context.strokeRect(draw_position.x, draw_position.y, draw_size.x, draw_size.y);
        }

        if (debug) {
            context.strokeStyle = entity.colour;
            context.lineWidth   = 3;
            context.strokeRect(draw_position.x, draw_position.y, draw_size.x, draw_size.y);
        }
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