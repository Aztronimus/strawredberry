// p_space.js

class Power {
	base;
	exponent;

	static copy(p) {
		const base_cons = p.base.constructor;
		const exp_cons = p.exponent.constructor;
		const b = base_cons == Number ? p.base : base_cons.copy(p.base);
		const e = exp_cons == Number ? p.exponent : exp_cons.copy(p.exponent);
		return new Power(b, e);
	}

	static equal(a, b) {
		if(a.constructor == Power && b.constructor == Power) {
			return a.base == b.base && Polynome.equal(a.exponent, b.exponent);
		}
		return false;
	}

	constructor(b, e) {
		this.base = b;
		this.exponent = e;
	}
}

class Literal {
	length = 0;

	static copy(l) {
		return l.factors.map(Power.copy);
	}

	static equal(a, b) {
		if(a.constructor == Literal && b.constructor == Literal) {
			if(a.length == b.length) {
				let exit;
				for(let x of a.factors) {
					exit = true;
					for(let y of b.factors) {
						if(Power.equal(x, y)) {
							exit = false;
							break;
						}
					}
					if(exit) { return false; }
				}
				return true;
			}
		}
		return false;
	}

	constructor() {
		this.length = arguments.length;
		this.factors = Array.from(arguments);
	}
}

class Monome {
	constant = 0;

	static copy(m) {
		return new Monome(m.constant, Literal.copy(m.literal));
	}

	static _sum(a, b) {
		if(a.constructor == Monome && b.constructor == Monome) {
			if(Literal.equal(a.literal, b.literal)) {
				return new Monome(a.constant + b.constant, Literal.copy(a.literal));
			}
			return false;
		}
		throw Error(`Addend (${a.constructor == Monome ? b : a}) is not a Monome`);
	}

	static equal(a, b) {
		if(a.constructor == Monome && b.constructor == Monome) {
			return a.constant == b.constant && Literal.equal(a, b);
		}
		return false;
	}

	constructor(c, l) {
		this.constant = c;
		this.literal = l;
	}
}

class Polynome {
	length = 0;

	static _sum(prev, cur) {
		if(prev.constructor == Polynome && cur.constructor == Polynome) {
			let monomes = [];
			let keys = Array.from(cur.monomes.keys());
			let push;
			let sum;
			for(let m of prev.monomes) {
				push = true;
				for(let i in keys) {
					sum = Monome._sum(m, cur.monomes[keys[i]]);
					if(sum) {
						push = false;
						keys.splice(i, 1);
						if(sum.constant) { monomes.push(sum); }
						break;
					}
				}
				if(push) { monomes.push(Monome.copy(m)); }
			}
			if(monomes.length) { return new Polynome(...monomes); }
		}
		throw Error(`Addend (${prev.constructor == Polynome ? cur : prev}) is not a Polynome`);
	}

	static add() {
		return Array.from(arguments).reduce(Polynome._sum);
	}

	static equal(a, b) {
		if(a.constructor == Polynome && b.constructor == Polynome) {
			if(a.length == b.length) {
				let exit;
				for(let x of a.monomes) {
					exit = true;
					for(let y of b.monomes) {
						if(Monome.equal(x, y)) {
							exit = false;
							break;
						}
					}
					if(exit) { return false; }
				}
				return true;
			}
		}
		return false;
	}

	constructor() {
		// arguments are monomes
		if(arguments.length) {
			this.length = arguments.length;
			this.monomes = Array.from(arguments);
		} else {
			throw Error("No monomes introduced");
		}
	}
}

// let m1 = new Monome();
// let m2 = new Monome();

// let p = new Polynome(m1, m2);

// console.dir(Polynome.add(p, p));

/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance
	https://www.keithcirkel.co.uk/proposal-operator-overloading/
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
*/