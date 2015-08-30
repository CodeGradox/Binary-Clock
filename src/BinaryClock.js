var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var MM, HH, SS;
var dec = 45, radius = 20, pi2 = Math.PI * 2;
var color = ["rgba(200, 0, 0, 0.5)", "rgba(0, 200, 0, 0.5)", "rgba(0, 0, 200, 0.5)"];

function updateClock() {
    var date = new Date(); // Get localtime
    HH = date.getHours();
    MM = date.getMinutes();
    SS = date.getSeconds();

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Reset canvas.

    setTime(HH, 0, color[0]);
    setTime(MM, 2, color[1]);
    setTime(SS, 4, color[2]);
}

function setTime(t, x, c) {
    var a = Math.floor(t / 10); // eks: 28 -> 2
    var b = t % 10;             //      28 -> 8

    for (y = 0; y < 4; y++) {              // draws the LSB first at the bottom.
        draw((((a >> 3-y)) & 1), x, y);    // Largest number   eks: 2
        draw((((b >> 3-y)) & 1), x+1, y);  // Smallest number       8
    }

    function draw(val, x, y) {
    	if (val !== 0) {  // Draw a circle.
            ctx.beginPath();
        	ctx.fillStyle = c;
        	ctx.arc(x*dec+20, y*dec+20, radius, 0, pi2);
        	ctx.closePath();
        	ctx.fill();
        }
    }
}

document.onload = function() {
    window.setInterval(updateClock, 200);
};
