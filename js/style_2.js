let b = false;
const properties = [
	"--color-l0",
	"--color-l1",
	"--color-l2",
	"--color-l3",
	"--color-l4",
	"--color-l5",
	"--color-r5",
	"--color-r4",
	"--color-r3",
	"--color-r2",
	"--color-r1",
	"--color-r0",
	"--color-s0",
	"--color-s1",
	"--color-s2",
	"--color-s3",
	"--color-s4",
	"--color-s5",
	"--color-s6",
	"--color-s7",
	"--color-s8",
	"--contrast-a1",
	"--contrast-a2"
];

const blackTheme = [
	"#ff007f",
	"#ff00ff",
	"#7f00ff",
	"#0000ff",
	"#007fff",
	"#00ffff",
	"#00ff7f",
	"#00ff00",
	"#7fff00",
	"#ffff00",
	"#ff7f00",
	"#ff0000",
	"white",
	"#ccc",
	"#aaa",
	"#999",
	"#7f7f7f",
	"#666",
	"#555",
	"#333",
	"black",
	"#eee",
	"#111"
];

const whiteTheme = [
	"#ff007f",
	"#ff00ff",
	"#7f00ff",
	"#0000ff",
	"#007fff",
	"#00ffff",
	"#00ff7f",
	"#00ff00",
	"#7fff00",
	"#ffff00",
	"#ff7f00",
	"#ff0000",
	"black",
	"#333",
	"#555",
	"#666",
	"#7f7f7f",
	"#999",
	"#aaa",
	"#ccc",
	"white",
	"#111",
	"#eee"
];

function setTheme(theme) {
	for(let i in properties) {
		document.documentElement.style.setProperty(properties[i], theme[i]);
	}
}

function switchTheme() {
	if(b) setTheme(blackTheme);
	else setTheme(whiteTheme);
	b = !b;
}

document.querySelector("h1").addEventListener("click", switchTheme);