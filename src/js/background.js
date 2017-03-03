
chrome.extension.onMessage.addListener(
	function (peticion, sender, respuesta) {
		// console.log(sender.tab ? "Petición desde content script:" + sender.tab.url : "Petición desde la extensión");
		if (peticion.msg == "dameOpciones") {
			respuesta({
				asignaturas: localStorage.getItem("Asignaturas"),
				grado: localStorage.getItem("Grado")
			});
		}
	}
);
