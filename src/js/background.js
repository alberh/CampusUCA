/*
 * Escrito por Alberto Garc�a Gonz�lez.
 * Contacto: alberto.garciagonza@alum.uca.es
 * 
 * Copyright 2012, 2013 Alberto Garc�a Gonz�lez.
 * 
 * Este fichero es parte de Campus UCA.
 * 
 * Campus UCA es software libre: puede redistribuirlo y/o modificarlo
 * bajo los t�rminos de la GNU General Public License tal como han sido 
 * publicados por la Free Software Foundation, bien de la versi�n 3 de
 * la licencia o de cualquier versi�n posterior (a su elecci�n).
 * 
 * Campus UCA se distribuye con la esperanza de que sea �til,
 * pero SIN NINGUNA GARANT�A, incluso sin la garant�a impl�cita de
 * COMERCIALIZACI�N o IDONEIDAD PARA UN PROP�SITO PARTICULAR. Consulte la
 * GNU General Public License para m�s detalles.
 * 
 * Deber�a haber recibido una copia de la GNU General Public License
 * junto con Campus UCA. Si no es as�, consulte <http://www.gnu.org/licenses/>.
 * 
 */

// Se pone la background page a la escucha de peticiones.
chrome.extension.onMessage.addListener(
     function(peticion, sender, respuesta) {
          // Se actualiza el log
          console.log(sender.tab ? "Petici�n desde content script:" + sender.tab.url : "Petici�n desde la extensi�n");
          // Si el motivo del mensaje es solicitar los datos de las opciones del usuario, se devuelve un array asociativo con los mismos.
          if(peticion.msg == "dameOpciones") {
               respuesta( {
                    asignaturas: localStorage["CU.Opciones.Asignaturas"],
                    grado: localStorage["CU.Opciones.Grado"]
               } );
          }
     }
);
