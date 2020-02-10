var canvas = document.querySelector("canvas");
canvas.width = 600; canvas.height = 400;

document.getElementById("play").addEventListener("click", function() {
    document.getElementById("wrapper").removeChild(document.getElementById("game_screen"));
    console.log("starting game...");
});