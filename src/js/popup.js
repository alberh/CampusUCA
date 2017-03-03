
let mostrarEnlaces = () => {
	let idEnlaces = localStorage.getItem("Enlaces");
	let enlaces = document.querySelectorAll("div#menu a");

	if (!idEnlaces) {
		idEnlaces = 2039;
	}

	for (let i = 0; i < enlaces.length; i++) {
		if (enlaces[i].id != -1 && (1 << enlaces[i].id & idEnlaces)) {
			enlaces[i].style.display = "list-item";
		}
	}
};

window.addEventListener('load', mostrarEnlaces);
