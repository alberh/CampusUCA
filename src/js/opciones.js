
let guardarOpciones = () => {
	let opcion = document.getElementById("rdoAsigMostrarNombre");
	if (opcion.checked) {
		localStorage.setItem("Asignaturas", "nombres");
	} else {
		localStorage.setItem("Asignaturas", "siglas");
	}

	opcion = document.getElementById("cbMostrarGrado");
	if (opcion.checked) {
		localStorage.setItem("Grado", "true");
	} else {
		localStorage.setItem("Grado", "false");
	}

	let enlaces = document.querySelectorAll("div#listaAsignaturas input");
	let idEnlaces = 0;
	for (let i = 0; i < enlaces.length; i++) {
		if (enlaces[i].checked)
			idEnlaces += 1 << enlaces[i].id;
	}
	localStorage.setItem("Enlaces", idEnlaces);

	let estado = document.getElementById("estado");
	estado.innerHTML = "Cambios guardados";
	setTimeout(function () {
		estado.innerHTML = "";
	}, 1250);
};

let restaurarOpciones = () => {
	let opcionAsignaturas = localStorage.getItem("Asignaturas");
	let mostrarGrado = localStorage.getItem("Grado");
	let idEnlaces = localStorage.getItem("Enlaces");

	if (!opcionAsignaturas) {
		localStorage.setItem("Asignaturas", "nombres");
		opcionAsignaturas = "nombres";
	}
	if (!mostrarGrado) {
		localStorage.setItem("Grado", "false");
		mostrarGrado = "false";
	}
	if (!idEnlaces) {
		localStorage.setItem("Enlaces", 1471);
		idEnlaces = 1471;
	}

	if (opcionAsignaturas == "nombres") {
		document.getElementById("rdoAsigMostrarNombre").checked = true;
	} else {
		document.getElementById("rdoAsigMostrarSiglas").checked = true;
	}

	if (mostrarGrado == "true") {
		document.getElementById("cbMostrarGrado").checked = true;
	}/* else {
		document.getElementById("cbMostrarGrado").checked = false;
	}*/

	let enlaces = document.querySelectorAll("div#listaAsignaturas input");
	for (let i = 0; i < enlaces.length; i++) {
		if (1 << enlaces[i].id & idEnlaces)
			enlaces[i].checked = true;
	}
};

document.querySelector('#guardar').addEventListener('click', guardarOpciones);
window.addEventListener('load', restaurarOpciones);
