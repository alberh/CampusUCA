
class Renombrador {

	constructor() {
		// ToDo: hacer estáticas
		this.regexNombreGrado = / - GRADO EN .*$/i;
		this.mostrarGrado = false;
		this.filtro = ["DE", "DEL", "Y", "EN", "A", "LA", "CON", "AL", "EL", "LOS", "LAS"];
		this.asignaturasNavBar = document.querySelectorAll("div.breadcrumb > ul > li > a");
		this.asignaturasMenu = document.querySelectorAll("li.contains_branch > p.tree_item > a");
	}

	enFiltro(str) {
		for (let i in this.filtro)
			if (str.toUpperCase() == this.filtro[i]) {
				return true;
			}

		return false;
	}

	obtenerSiglas(arrTexto) {
		let siglas = "";
		let cierraParentesis = false, abreParentesis = false, punto = false;

		for (let palabra in arrTexto) {
			// Comprobamos paréntesis
			if (arrTexto[palabra][0] == "(") {
				siglas += " (";
				arrTexto[palabra] = arrTexto[palabra].substring(1, arrTexto[palabra].length);
				abreParentesis = true;
			}

			if (!this.enFiltro(arrTexto[palabra])) {
				if (isNaN(arrTexto[palabra][0])) {
					if (arrTexto[palabra][arrTexto[palabra].length - 1] == ")") {
						cierraParentesis = true;
					} else if (arrTexto[palabra][arrTexto[palabra].length - 1] == ".") {
						punto = true;
					}

					if (arrTexto[palabra] == "I" || arrTexto[palabra] == "II" || arrTexto[palabra] == "III" || arrTexto[palabra] == "IV" || arrTexto[palabra] == "V") {
						siglas += " " + arrTexto[palabra];
					} else if (arrTexto[palabra] == "-") {
						siglas += " " + arrTexto[palabra] + " ";
					} else {
						siglas += arrTexto[palabra][0];
					}
				} else {
					if (!abreParentesis) {
						siglas += " ";
					}

					siglas += arrTexto[palabra];
				}
				abreParentesis = false;
			}

			if (cierraParentesis) {
				siglas += ")";
				cierraParentesis = false;
			}

			if (punto) {
				siglas += " ";
				punto = false;
			}
		}

		return siglas;
	}

	noMayus(texto) {
		let aux = "";
		let arrTexto = texto.split(" ");

		for (let i in arrTexto) {
			let ok = true;

			if (arrTexto[i][0] == "(") {
				aux += "(";
				arrTexto[i] = arrTexto[i].substring(1, arrTexto[i].length);
			}

			if (!this.enFiltro(arrTexto[i])) {
				// ToDo: comprobar números romanos a función
				if (arrTexto[i] == "I" || arrTexto[i] == "II" || arrTexto[i] == "III" || arrTexto[i] == "IV" || arrTexto[i] == "V") {
					aux += arrTexto[i] + " ";
				} else {
					aux += arrTexto[i].substring(0, 1).toUpperCase() + arrTexto[i].substring(1, arrTexto[i].length).toLowerCase() + " ";
				}
			} else {
				aux += arrTexto[i].toLowerCase() + " ";
			}
		}

		return aux;
	}

	muestraNombres() {
		this.asignaturasNavBar[3].innerHTML = this.noMayus(this.asignaturasNavBar[3].title);

		for (let i in this.asignaturasMenu) {
			if (this.asignaturasMenu[i].title) {
				if (this.mostrarGrado == true) {
					this.asignaturasMenu[i].innerHTML = this.noMayus(this.asignaturasMenu[i].title);
				} else {
					this.asignaturasMenu[i].innerHTML = this.noMayus(this.asignaturasMenu[i].title.replace(this.regexNombreGrado, ""));
				}
			}
		}
	}

	muestraSiglas() {
		arrTexto = this.asignaturasNavBar[3].title.split(" ");

		if (arrTexto.length > 1) {
			this.asignaturasNavBar[3].innerHTML = this.obtenerSiglas(arrTexto);
		} else {
			this.asignaturasNavBar[3].innerHTML = arrTexto[0].substring(0, 3);
		}

		for (let i in this.asignaturasMenu) {
			nombreAsignatura = this.asignaturasMenu[i].title;

			if (nombreAsignatura) {
				arrTexto = this.asignaturasMenu[i].title.replace(this.regexNombreGrado, "").split(" ");

				if (arrTexto.length > 1) {
					this.asignaturasMenu[i].innerHTML = this.obtenerSiglas(arrTexto);
				} else {
					this.asignaturasMenu[i].innerHTML = arrTexto[0].substring(0, 3);
				}

				if (this.mostrarGrado) {
					nombreGrado = this.regexNombreGrado.exec(this.asignaturasMenu[i].title);

					if (nombreGrado) {
						nombreGrado = String(nombreGrado);
						arrNombreGrado = nombreGrado.substring(3, nombreGrado.length).split(" ");
						this.asignaturasMenu[i].innerHTML += " - " + this.obtenerSiglas(arrNombreGrado);
					}
				}

			}
		}
	}
}

let start = () => {
	renombrador = new Renombrador();

	chrome.extension.sendMessage(
		{msg: "dameOpciones"},
		function (respuesta) {
			if (respuesta.grado == "true") {
				renombrador.mostrarGrado = true;
			}

			if (respuesta.asignaturas == "siglas") {
				renombrador.muestraSiglas();
			} else {
				renombrador.muestraNombres();
			}
		}
	);
};

let renombrarDesplegable = () => {
	if (!menuRenombrado && intentos > 0) {
		intentos--;
		if (menuDesplegable.parentNode.children.length == 2) {
			start();
			menuRenombrado = true;
		}
	} else {
		clearInterval(intervalRef);
	}
};

let renombrador = null;
let menuRenombrado = false;
let intervalRef = null;
let intentos = 50;

const NODOS_MC = document.querySelectorAll('a[href="https://av03-14-15.uca.es/moodle/my/"]');
const menuDesplegable = NODOS_MC[2].parentNode;

menuDesplegable && menuDesplegable.addEventListener('click', () => {
	intervalRef = setInterval(renombrarDesplegable, 500);
});

start();
