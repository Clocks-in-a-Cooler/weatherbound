var key_mapping = {
    "up": "ArrowUp",
    "down": "ArrowDown",
    "left": "ArrowLeft",
    "right": "ArrowRight",
    "primary": "KeyZ",
    "secondary": "KeyX"
};

const KEY_PRESSED = 1;
const KEY_HANDLED = 2;

var keys = {};

addEventListener("keydown", event => {
    keys[event.code] |= KEY_PRESSED;
});

addEventListener("keyup", event => {
    keys[event.code] = 0;
});

/**
 * @param {String} key 
 */
function rising_edge(key) {
    if (!(keys[key] & KEY_HANDLED) && (keys[key] & KEY_PRESSED)) {
        keys[key] |= KEY_HANDLED;
        return true;
    }
    return false;
}