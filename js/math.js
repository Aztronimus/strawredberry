function setMath(e, s, o = 0) {
	let r;
	switch(o) {
		case 0:
		r = "\\(" + s + "\\)";
		break;
		case 1:
		r = "\\begin{equation}" + s + "\\end{equation}";
		break;
		case 2:
		r = "\\begin{align}" + s + "\\end{align}";
		break;
	}
	e.innerHTML = r;
}

class math_Element {
	set math(s) {
		this.s = s;
		this.elem.innerText = this.b + this.s + this.e;
		switch(this.type) {
			case 0:
			break;
		}
	}

	get math() { return this.s; }

	set type(i) {
		switch(i) {
			case 0:
			this.b = "\\(";
			this.e = "\\)";
			break;
			case 1:
			this.b = "\\begin{equation}";
			this.e = "\\end{equation}";
			break;
			case 2:
			this.b = "\\begin{align}";
			this.e = "\\end{align}";
			break;
			case 3:
			this.b = "\\begin{array}";
			this.e = "\\end{array}";
			break;
		}
	}

	constructor(id, type = 0) {
		this.type = type;
		this.elem = document.getElementById(id);
	}
}