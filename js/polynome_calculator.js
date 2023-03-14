"use strict";
// literal deffinition:
// [v, e]

// monomial deffinition:
// [c, [v_0, e_0], [v_1, e_1], [v_2, e_2], ...]
// [c, l_0, l_1, l_2, ...]
// "c" is the coefficient of the monomial
// "v_n" and "e_n" are the "n" variable "v" with its respective exponent "e"

// polynomial deffinition
// [m_0, m_1, m_2, ...]
// a polynomial is an array of monomials

// add, multiply and factorize currently are the only operations available for polynomials

function pc_compareArrays(a, b) {
	// a and b are arrays
	// returns true if they have the same contents
	const t = typeof a;
	if(t == typeof b) {
		switch(t) {
			case "number":
			return a == b;
			break;
			case "object":
			if(a.length == b.length) {
				for(let i in a) {
					if(!pc_compareArrays(a[i], b[i])) {
						return false;
					}
				}
				return true;
			}
			return false;
			break;
		}
	}
	return false;
}

function pc_compareLiterals(a, b) {
	// a and b are literals
	if(a[0] == b[0]) {
		const t = typeof a[1];
		if(t == typeof b[1]) {
			switch(t) {
				case "number":
				return a[1] == b[1];
				break;
				case "object":
				return pc_comparePolynomials(a[1], b[1]);
				break;
			}
		}
	}
	return false;
}

function pc_compareLiteralPart(a, b) {
	// a and b are monomials
	const _i = a.length;
	if(_i == b.length) {
		for(let i = 1; i < _i; ++i) {
			if(!pc_compareLiterals(a[i], b[i])) {
				return false;
			}
		}
		return true;
	}
	return false;
}

function pc_compareMonomials(a, b) {
	// a and b are monomials
	const _i = a.length;
	if(_i == b.length) {
		if(a[0] == b[0]) {
			for(let i = 1; i < _i; ++i) {
				if(!pc_compareLiterals(a[i], b[i])) {
					return false;
				}
			}
			return true;
		}
	}
	return false;
}

function pc_comparePolynomials(a, b) {
	// a and b are polynomials
	const k = [...b.keys()];
	let t;
	let s;
	for(let m of a) {
		s = true;
		for(let i in k) {
			if(pc_compareMonomials(m, b[k[i]])) {
				s = false;
				k.splice(i, 1);
				break;
			}
		}
		if(s) { return false; }
	}
	if(k.length) { return false; }
	return true;
}

function pc_sortMonomial(m) {
	return [m[0], ...m.slice(1).sort((a, b) => a[0] - b[0])];
}

function pc_add2Monomials(a, b) {
	// a and b are monomials
	// monomials must be in its reduced form, counter-example: 3x^0 (3x)(2yx)
	// monomials must be ordered, example: [1, [0, 1], [1, 2], [2, 4]] x y^2 z^4, counter-example: [1, [1, 2], [0, 1], [2, 4]] y^2 x z^4
	if(pc_compareLiteralPart(a, b)) {
		return [b[0] + a[0], ...a.slice(1)];
	}
	return false;
}

function pc_add2Polynomials(a, b) {
	// a and b are polynomials
	// polynomials must be in its reduced form, counter-example: 3a + 1x + 2a
	const r = [];
	const k = [...b.keys()];
	let s;
	let t;
	for(let m of a) {
		s = true;
		// try adding the monomial "m" to the monomials in "b"
		for(let i in k) {
			t = pc_add2Monomials(m, b[k[i]]);
			if(t) {
				// if the coefficient of the monomial is not zero...
				if(t[0]) { r.push(t); }
				k.splice(i, 1);
				s = false;
				break;
			}
		}
		// if adding failed, then save the monomial in the resultant polynomial "r"
		if(s) { r.push(m); }
	}
	// add all the elements of b that could not be added
	for(let i of k) { r.push(b[i]); }
	if(r.length) { return r; }
	return 0;
}

function pc_addPolynomials(arr) {
	// arr is an array of polynomials of the form [p_0, p_1, p_2, ...]
	return arr.reduce(pc_add2Polynomials);
}

function pc_multiply2Literals(a, b) {
	// a and b are literals
	if(a[0] == b[0]) {
		const ta = typeof a[1];
		const tb = typeof b[1];
		if(ta == tb) {
			if(ta == "number") { return [a[0], a[1] + b[1]]; }
			return [a[0], pc_add2Polynomials(a[1], b[1])];
		}
		if(ta == "number") { return [a[0], pc_add2Polynomials([[a[1]]], b[1])]; }
		else if(tb == "number") { return [a[0], pc_add2Polynomials(a[1], [[b[1]]])]; }

	}
	return false;
}

function pc_multiply2Monomials(a, b) {
	// a and b are monomials
	// monomials must have a coefficient different from 0
	const r = [a[0] * b[0]];
	const k = [...b.keys()];
	k.shift();
	const _i = a.length;
	let s;
	let t;
	for(let i = 1; i < _i; ++i) {
		s = true;
		for(let j in k) {
			t = pc_multiply2Literals(a[i], b[k[j]]);
			if(t) {
				if(t[1]) { r.push(t); };
				s = false;
				k.splice(j, 1);
				break;
			}
		}
		// if multiplying failed, then add the literal to the monomial
		if(s) { r.push(a[i]); }
	}
	// add all the elements of b that could not be added
	for(let i of k) { r.push(b[i]); }
	return pc_sortMonomial(r);
}

function pc_multiplyMonomialPolynomial(m, p) {
	// m is a monomial
	// p is a polynomial
	const r = [];
	for(let n of p) { r.push(pc_multiply2Monomials(m, n)); }
	return r;
}

function pc_multiply2Polynomials(a, b) {
	// a and b are polynomials
	const arr = [];
	for(let m of a) { arr.push(pc_multiplyMonomialPolynomial(m, b)); }
	return pc_addPolynomials(arr);
}

function pc_multiplyPolynomials(arr) {
	// arr is an array of polynomials of the form [p_0, p_1, p_2, ...]
	return arr.reduce(pc_multiply2Polynomials);
}

function pc_polynomeToLaTeX(p, a) {
	// "p" is a polynome
	// "a" is an array of strings containing the LaTeX representations of the variables of the polynome
	let s = "";
	let _i;
	let t;
	for(let m of p) {
		if (m[0] > 0) { s += `+ `; }
		if (m[0] < 0) { s += `- `; }
		if(Math.abs(m[0]) != 1 || m.length == 1) { s += `${Math.abs(m[0])} `; }
		_i = m.length;
		for(let i = 1; i < _i; ++i) {
			t = m[i][1];
			switch(typeof t) {
				case "number":
				if(t == 1) { s += `${a[m[i][0]]} `; }
				else { s += `${a[m[i][0]]}^{${t}} `; }
				break;
				case "object":
				if(t.length > 1) {
					s += `${a[m[i][0]]}^{\\left(${pc_polynomeToLaTeX(t, a)}\\right)} `;
				} else {
					s += `${a[m[i][0]]}^{${pc_polynomeToLaTeX(t, a)}} `;
				}
				break;
			}
		}
	}
	if(p[0][0] < 0) { return s; }
	return s.slice(2);
}