let b = false;
const properties = [
	"--color-dark",
	"--color-light",
	"--color-a1",
	"--color-a2",
	"--color-a3",
	"--color-a4",
	"--color-a5",
	"--color-a6",
	"--color-a7",
	"--color-b1",
	"--color-b2",
	"--color-b3",
	"--color-b4",
	"--color-b5",
	"--color-b6",
	"--color-b7"
];

const blackTheme = [
	"black",
	"white",
	"#111",
	"#333",
	"#555",
	"#777",
	"#999",
	"#bbb",
	"#ddd",
	"#170f17",
	"#371f37",
	"#573f57",
	"#775f77",
	"#977f97",
	"#b79fb7",
	"#d7bfd7"
];

const whiteTheme = [
	"white",
	"black",
	"#ddd",
	"#bbb",
	"#999",
	"#777",
	"#555",
	"#333",
	"#111",
	"#dff",
	"#8cc",
	"#7aa",
	"#588",
	"#466",
	"#133",
	"#122"
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