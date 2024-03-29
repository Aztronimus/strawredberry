// ------------------ Functions ----------------------------------
let getAngle = (() => {
	let z = 0;
	const r = Math.PI / 2;
	return function([x, y]) {
		// [x, y] is a vector
		z = Math.atan(y / x);
		if(x > 0) {
			return z;
		} else if(x < 0) {
			if(y > 0) {
				return z + Math.PI;
			}
			else if(y < 0) {
				return z - Math.PI;
			}
			else {
				return Math.PI;
			}
		} else {
			if(y > 0) {
				return r;
			}
			else if(y < 0) {
				return -r
			}
			else {
				return NaN; 
			}
		}
	}
})();

// draw outlined text
function drawOText(t, x, y, ctx) {
	// t is a string, x and y are the coordinates
	// ctx is the canvas context
	ctx.strokeText(t, x, y);
	ctx.fillText(t, x, y);
}

function getDistance(a, b) {
	// a & b are points
	return Math.sqrt((a[1] - b[1])**2 + (a[0] - b[0])**2);
}

function getUnitVector([a, b], c = 1) {
	// [a, b] is the vector
	// the unit vector is multiplied by c
	let n = Math.sqrt(a**2 + b**2);
	return [c * a / n, c * b / n];
}

function addVectors(u, v) {
	let r = [];
	for(let i in u) {
		r.push(u[i] + v[i]);
	}
	return r;
}

function subVectors(u, v) {
	let r = [];
	for(let i in u) {
		r.push(u[i] - v[i]);
	}
	return r;
}

function scalarProductVector(c, v) {
	// c is a constant, v is a vector
	let r = [];
	for(let x of v) {
		r.push(c * x);
	}
	return r;
}

function drawPolyline(p, ctx) {
	// p is a collection of points of the form [x, y]
	ctx.beginPath();
	p = [...p];
	ctx.moveTo(...p.shift());
	for(let i of p)
		ctx.lineTo(...i);
	ctx.stroke();
	ctx.closePath();
}

function drawPolycurveBezier(p, ctx) {
	// p is a collection of points of the form [x, y]
	ctx.beginPath();
	if((p.length - 1) % 3 != 0) {
		throw `Wrong number of points: ${p.length}`;
	}
	const _i = (p.length - 1) / 3;
	ctx.moveTo(...p[0]);
	for(let i = 0; i != _i; i++) {
		let j = 3 * i + 1;
		ctx.bezierCurveTo(...p[j], ...p[j + 1], ...p[j + 2]);
	}
	ctx.stroke();
	ctx.closePath();
}

function plineToPcurveBezier(p) {
	// p is a collection of points of the form [x, y]
	let c = getDistance(p[0], p[1]) / 3;
	let r = [p[0]];
	let w, u, v = getUnitVector(subVectors(p[1], p[0]));

	r.push(addVectors(scalarProductVector(c, v), p[0]));

	let i = 0, _i = p.length - 1;
	while(++i != _i) {
		u = v;
		v = getUnitVector(subVectors(p[i + 1], p[i]));
		w = getUnitVector(addVectors(v, u));
		r.push(addVectors(p[i], scalarProductVector(-c, w)));
		r.push(p[i]);
		c = getDistance(p[i], p[i + 1]) / 3;
		r.push(addVectors(p[i], scalarProductVector(c, w)));
	}

	r.push(addVectors(scalarProductVector(-c, v), p[_i]));
	r.push(p[_i])
	return r;
}

let drawArrow = (() => {
	let r = 15;
	let a = r * 1.5;
	let b = r * Math.sqrt(3) / 2;
	return function(p, ctx) {
		// p is a collection of points of the form [x, y]
		let v = [p[0][0] - p[1][0], p[0][1] - p[1][1]];
		let u = getUnitVector(v);
		ctx.beginPath();
		ctx.moveTo(...p[0]);
		ctx.lineTo(p[1][0] + r * u[0], p[1][1] + r * u[1]);
		ctx.stroke();
		ctx.closePath();
		ctx.translate(...p[1]);
		ctx.rotate(getAngle(v));
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(a, b);
		ctx.lineTo(a, -b);
		ctx.fill();
		ctx.closePath();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
})();

function drawCircle(p, ctx) {
	// p is the point where the center of the circle is located
	ctx.beginPath();
	ctx.arc(...p, 30, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
}

function drawPoint(p, ctx) {
	ctx.beginPath();
	ctx.arc(...p, 5, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function drawPoints(p, ctx) 
{
	// p is a collection of points of the form [x, y]
	for(let x of p) {
		ctx.beginPath();
		ctx.arc(...x, 5, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
}
// -------------------- Classes ----------------------------------

class GraphInfo {
	viewportSize;
	corner;
	factor;
	toViewportCoord([x, y]) {
		return [
			(x - this.corner[0]) * this.factor[0],
			(y - this.corner[1]) * this.factor[1]
		];
	}
	mapToViewportCoord(p) {
		return p.map(this.toViewportCoord.bind(this));
	}
	set graphArea(a) {
		// a - is a colection of two points [x, y] which defines the area
		this.corner = a[0];
		this.factor = [
			this.viewportSize[0] / (a[1][0] - a[0][0]),
			this.viewportSize[1] / (a[1][1] - a[0][1])
		];
	}
	constructor(canvas) {
		// console.log(canvas.width);
		this.viewportSize = [canvas.width, canvas.height];
		this.graphArea = [[-10, 10], [10, -10]];
	}
}

function pointsFromParametric(n, t, f, g = false) {
	// n is the number of points
	// t is an array with [t0, t1], t0 is from which parameter
	// 	start to make the points and t1 is to which parameter
	// 	stop making points
	// f is the parametric function from which generate the points
	// g is an object created from the class GraphInfo
	const s = (t[1] - t[0]) / (n - 1);
	let p = [];
	let i = -1;
	if(g) {
		while(++i != n) {
			p.push(g.toViewportCoord(f(t[0] + i * s)));
		}
	} else {
		while(++i != n) {
			p.push(f(t[0] + i * s));
		}
	}
	return p;
}