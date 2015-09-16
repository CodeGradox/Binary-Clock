/*jshint esnext: true */
const canvas = document.getElementById("clock"); // get canvas
const ctx = canvas.getContext("2d");
const dec = 45, radius = 20, pi2 = Math.PI * 2;	 // dec = diameter + 5px
const color = ["rgba(200, 0, 0, 0.5)", "rgba(0, 200, 0, 0.5)", "rgba(0, 0, 200, 0.5)"]; // red, green, blue

/* Draws a binary representation of the current time on the canvas. */
function updateClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 		// Reset canvas.

    const date = new Date(); 								// Get localtime

    [date.getHours(), date.getMinutes(), date.getSeconds()]	// Get HH:MM:SS
        .map(obj => [Math.floor(obj / 10), obj % 10])		// Split HH into [H,H] etc
    	.reduce((a, b) => a.concat(b))						// Flatten the array [[H,H],... -> [H, H, M...
        .forEach((obj, index) => draw(obj, index, color[Math.floor(index/2)])); // Draw the number on canvas
}

/* Draw a circle on the canvas */
function draw(val, col, color) {
    for (var row = 0; row < 4; ++row) { 					// For each of the 4 bits...
    	if ((val >> 3-row & 1) === 0) continue;				// (The bit is zero, nothing to draw)
    	ctx.beginPath();									// Draw a circle
    	ctx.fillStyle = color;
    	ctx.arc(col*dec+20, row*dec+20, radius, 0, pi2);
    	ctx.closePath();
    	ctx.fill();
    }
}

window.setInterval(updateClock, 200);
