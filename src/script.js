/*jshint esnext: true */
const canvas = document.getElementById("clock"); // get canvas
const ctx = canvas.getContext("2d");
const dec = 45, radius = 20, pi2 = Math.PI * 2; // dec = diameter + 5px
const color = ["rgba(200, 0, 0, 0.5)", "rgba(0, 200, 0, 0.5)", "rgba(0, 0, 200, 0.5)"]; // red, green, blue

/* Draws a binary representation of the current time on the canvas. */
function updateClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Reset canvas.

    const date = new Date(); // Get localtime
    var tmp = 0;

    var time = [date.getHours(), date.getMinutes(), date.getSeconds()]; // HH:MM:SS
    time = time.map(obj => [Math.floor(obj / 10), obj % 10]);           // MM -> [M, M] etc (28 -> [2, 8])
    time.forEach(obj => {
    	for (y = 0; y < 4; y++) { // Draw the 4*2 dots (HH then MM then SS). Draws the LSB first from the bottom.
        	draw((((obj[0] >> 3-y)) & 1), 2*tmp, y, color[tmp]);		// Largest number   eks: 2
        	draw((((obj[1] >> 3-y)) & 1), 2*tmp+1, y, color[tmp]);		// Smallest number       8
    	}
        tmp++;
    });
}

/* Draw a circle on the canvas */
function draw(val, x, y, color) {
	if (val !== 0) {
        ctx.beginPath();
       	ctx.fillStyle = color;
       	ctx.arc(x*dec+20, y*dec+20, radius, 0, pi2);
       	ctx.closePath();
     	ctx.fill();
    }
}

window.setInterval(updateClock, 200);
