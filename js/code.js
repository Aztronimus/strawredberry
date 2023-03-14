{
	const codes = document.getElementsByClassName("line-number");
	console.log(codes);
	for(let code of codes) {
		const text = code.innerText;
		const matches = text.matchAll(/\n/g);
		let indices = [-1];
		let lines = [];
		for(let match of matches) {
			indices.push(match.index);
		}
		indices.push(text.length);
		const frag = document.createDocumentFragment();
		for(let i = 0; i < indices.length - 1; i++) {
			const p = document.createElement("span");
			const t = document.createElement("span");
			const s = document.createTextNode(text.slice(indices[i] + 1, indices[i + 1]) + "\n");
			t.appendChild(s);
			p.appendChild(t);
			frag.appendChild(p);
		}
		code.replaceChildren(frag);
	}
}