var canvas = document.querySelector("canvas");
canvas.width = 600; canvas.height = 400;
var cxt = canvas.getContext("2d");

document.getElementById("play").addEventListener("click", function() {
    document.getElementById("wrapper").removeChild(document.getElementById("game_screen"));
    console.log("starting game...");
    start();
});

function start() {
    player.register_event_listeners();
    snowbound.next_level();
    requestAnimationFrame(animate);
}

//animation and timing stuff ----------------------------------------------------------------------
var last_time = null, lapse = 0;
function animate(time) {
    if (last_time == null) {
        lapse = 0;
    } else {
        lapse = time - last_time;
    }
    last_time = time;

    draw();

    player.update(lapse);

    requestAnimationFrame(animate);
}

//game state stuff --------------------------------------------------------------------------------
var snowbound = {
    current_level: null,
    level_number: -1,
    next_level: function() {
        this.level_number++;
        this.current_level = new Level(GAME_LEVELS[this.level_number]);

        player.place(this.current_level.starting_position);
    },
};

// viewport and drawing stuff ---------------------------------------------------------------------
function get_sprite(path) {
    var img = document.createElement("img");
    img.src = path;
    return img;
}

var wall       = get_sprite("snow.png");
var ice        = get_sprite("ice.png");
var background = get_sprite("background.png");

var background_colour = "steelblue";


function draw() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    viewport.update();
    cxt.drawImage(background, 0, 0);
    var in_view = snowbound.current_level.get_in_view(viewport.top_left, viewport.bottom_right);

    for (var y = 0; y < in_view.length; y++) {
        for (var x = 0; x < in_view[y].length; x++) {
            switch (in_view[y][x]) {
                case "blank":
                    continue;
                case "wall":
                    cxt.drawImage(wall, (x - viewport.offset.x) * viewport.scale, (y - viewport.offset.y) * viewport.scale);
                    continue;
                case "ice":
                    cxt.drawImage(ice, (x - viewport.offset.x) * viewport.scale, (y - viewport.offset.y) * viewport.scale);
                    continue;
            }
        }
    }

    //draw the player
    cxt.fillStyle = "indianred";
    cxt.fillRect((player.pos.x - viewport.top_left.x) * viewport.scale,
                 (player.pos.y - viewport.top_left.y) * viewport.scale,
                 player.size.x * viewport.scale,
                 player.size.y * viewport.scale
        );
}

var viewport = {
    scale: 20,
    offset: new Vector(0, 0),
    width: canvas.width / 20,
    height: canvas.height / 20,
    top_left: null, bottom_right: null,
    update: function() {
        //i'm getting lazy!
        this.top_left = player.pos.plus(new Vector(-this.width / 2, -this.height / 2));
        this.top_left.x = Math.max(0, Math.min(snowbound.current_level.width - this.width, this.top_left.x));
        this.top_left.y = Math.max(0, Math.min(snowbound.current_level.height - this.height, this.top_left.y));
        this.bottom_right = this.top_left.plus(new Vector(this.width, this.height));
        this.offset = new Vector(this.top_left.x - Math.floor(this.top_left.x),
                                 this.top_left.y - Math.floor(this.top_left.y));
    },
};

//player and keys ---------------------------------------------------------------------------------
var player = {
    speed: 0.2,
    pos: null,
    keys: {
        up: false,
        down: false,
        left: false,
        right: false,
        space: false,
    },
    size: new Vector(1, 2),

    update: function(lapse) {
        if (this.pos == null) {
            return;
        }

        var new_x = this.pos.x + ((this.keys.left ? -1 : 0) + (this.keys.right ? 1 : 0)) * this.speed;
        var new_y = this.pos.y + ((this.keys.up ? -1 : 0) + (this.keys.down ? 1 : 0)) * this.speed;

        //i'll add collision detection later
        var new_pos_x = new Vector(new_x, this.pos.y);
        var new_pos_y = new Vector(this.pos.x, new_y);

        if (!snowbound.current_level.is_overlapping(new_pos_x, this.size)) {
            this.pos.x = new_x;
        }

        if (!snowbound.current_level.is_overlapping(new_pos_y, this.size)) {
            this.pos.y = new_y;
        }
    },

    place: function(pos) {
        this.pos = pos.plus(new Vector(0, -1.5));
    },

    register_event_listeners: function() {
        addEventListener("keydown", (evt) => {
            switch (evt.keyCode) {
                case 37:
                    player.keys.left = true;
                    break;
                case 38:
                    player.keys.up = true;
                    break;
                case 39:
                    player.keys.right = true;
                    break;
                case 40:
                    player.keys.down = true;
                    break;
            }
        });

        addEventListener("keyup", (evt) => {
            switch (evt.keyCode) {
                case 37:
                    player.keys.left = false;
                    break;
                case 38:
                    player.keys.up = false;
                    break;
                case 39:
                    player.keys.right = false;
                    break;
                case 40:
                    player.keys.down = false;
                    break;
            }
        });
    },
};

// vector helper type -----------------------------------------------------------------------------
function Vector(x, y) {
    this.x = x; this.y = y;
}

Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.times = function(factor) {
    return new Vector(this.x * factor, this.y * factor);
};

// level data stuff -------------------------------------------------------------------------------
var mapping = {
    "x": "wall",
    ":": "ice",
    " ": "blank",
    "@": "player",
};

function Level(plan, name) {
    this.height = plan.length;
    this.width = plan[0].length;

    this.tiles = [];

    for (var c = 0; c < this.height; c++) { // hahahahahahaha
        var gridline = [];
        for (var b = 0; b < this.width; b++) {
            var tile = mapping[plan[c].charAt(b)];
            if (tile == "player") {
                gridline.push("blank");
                this.starting_position = new Vector(b, c);
            } else {
                gridline.push(tile);
            }
        }

        this.tiles.push(gridline);
    }
}

Level.prototype.get_tile = function(coords) {
    return this.tiles[coords.y][coords.x];
};

Level.prototype.get_in_view = function(start, end) {
    var in_view = [];
    var start_x = Math.floor(start.x), start_y = Math.floor(start.y);
    var end_x = Math.ceil(end.x), end_y = Math.ceil(end.y);

    while (start_y <= end_y) {
        var gridline = [];
        if (this.tiles[start_y] == undefined) {
            gridline = new Array(this.width).fill("wall");
        } else {
            for (var x = start_x; x <= end_x; x++) {
                gridline.push(this.tiles[start_y][x]);
            }
        }

        in_view.push(gridline);
        start_y++;
    }

    return in_view;
};

Level.prototype.is_overlapping = function(start, size) {
    var start_x = Math.floor(start.x), start_y = Math.floor(start.y);
    var end_x = Math.floor(start_x + size.x), end_y = Math.floor(start_y + size.y);

    while (start_y <= end_y) {
        if (this.tiles[start_y] == undefined) {
            start_y++;
            continue;
        }

        for (var x = start_x; x <= end_x; x++) {
            if (this.tiles[start_y][x] != "blank") {
                return true;
            }
        }

        start_y++;
    }

    return false;
};
