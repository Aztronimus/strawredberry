// This file must be inserted at the end of the body tag for it to work properly
{
	const scripts = document.querySelectorAll("script");
	const css_file_path = "/style_2.css";
	const scr_path = new URL(scripts[scripts.length - 1].src).pathname.split("/").slice(1, -1);
	const doc_path = document.location.pathname.split("/").slice(1, -1);
	const l = Math.min(scr_path.length, doc_path.length);
	let c = 0;
	for(let i = 0; i < l; ++i) {
		if(scr_path[i] == doc_path[i]) { ++c; }
	}
	const rel_pathname = "../".repeat(doc_path.length - c) + scr_path.slice(c).join("/") + css_file_path;
	const link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", rel_pathname);
	document.head.appendChild(link);
	const refs = document.getElementById("navbar").querySelectorAll(".button");
	const pages = document.body.querySelectorAll(".page");
	if(refs.length != pages.length) {
		throw Error(`Number of references ${refs.length} is not equal to number of pages ${pages.length}`);
	}
	const st_select = (function() {
		let selectedIndex = 0;
		return function(idx) {
			refs[selectedIndex].classList.remove("selected");
			pages[selectedIndex].classList.remove("selected");
			this.classList.add("selected");
			pages[idx].classList.add("selected");
			selectedIndex = idx;
		};
	})();

	refs.forEach((elem, idx) => {
		elem.setAttribute("data-id", idx);
		// console.dir(refs.indexOf());
		elem.addEventListener("click", st_select.bind(elem, idx));
	});
}
