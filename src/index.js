import "./styles/main.scss"

import pintar from './componets/pintarHtml.js'
import abrir from "./componets/abrir"


const init = async () => {
  pintar()
  abrir()
  window.abrirPopUp =  () => {
    const popUp =  document.querySelector(".PopUp-mobile")
    popUp.style.display = "flex"
  }
}


init()