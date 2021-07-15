import api from './fetch.js'

const obtenerMes = () => {
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let date = new Date();
  let mes_name = date.getMonth();
  document.getElementById("mes").innerHTML = meses[mes_name]
}

const seleccion = () => {
  const mouthcontainer = document.querySelector(".main__buttons-date")
  let seleccionado 
  mouthcontainer.addEventListener("click", e => {
    if(e.target.localName == "p"){
      mouthcontainer.childNodes.forEach(e => {
        if(e.localName == "p"){
          e.classList.remove("active")
        }
      })
      e.target.classList.add("active")
    }
  })
}
const pintarHtml = async () => {
  const datosapi = await api("../assets/fakeApi.json")
  const mouth = datosapi.dataMonth
  const Week = datosapi.dataWeek
  const Today = datosapi.dataToday
  obtenerMes()
  seleccion()
}

export default pintarHtml