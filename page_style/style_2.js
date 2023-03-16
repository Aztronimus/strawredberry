{
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
