import api from './fetch.js'

const obtenerMes = () => {
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let date = new Date();
  let mes_name = date.getMonth();
  document.getElementById("mes").innerHTML = meses[mes_name]
}

const seleccion = async ( mouth,Week, Today) => {
  const mouthcontainer = document.querySelector(".main__buttons-date")
  mouthcontainer.addEventListener("click", e => {
    if(e.target.localName == "p"){
      mouthcontainer.childNodes.forEach(e => {
        if(e.localName == "p"){
          e.classList.remove("active")
        }
      })
      pintarHtml(e.target.dataset.date,mouth,Week, Today )
      e.target.classList.add("active")
    }
  })
}
const calcular = (valor) => {
  let porcentaje = 0.06
  let comision =  Math.floor(valor * porcentaje)
  return comision
}
const cardType = (type) => {
  const card = {
    mastercard: '<i class="fab fa-cc-mastercard"></i>',
    visa: '<i class="fab fa-cc-visa"></i>`',
    american: '<i class="fab fa-cc-amex"></i>',
    diners: '<i class="fab fa-cc-diners-club"></i>'
    }
    return card[type];
}
  
const pintarHtml = async (target, mouth,Week,Today) => {
  const table = document.getElementById("table-container")
  table.innerHTML =""
  if(target =="mes"){
    mouth.forEach(mes => {
      table.innerHTML += `<div class="row__table-transactions-row ${mes.transaccion ? "": "succes"}">
      <!-- <p id="succes"><i class="fas fa-link"></i> Cobro exitoso</p> #} -->
      <p id="succes"><i class="fas fa-${mes.modo == "datafono" ? 'mobile-alt' : "link" }"></i> ${mes.transaccion ? "Cobro exitoso": "Cobro no realizado"}</p>
      <p id="date">${mes.fecha}</p>
      <p id="card">${cardType(mes.tipo)} ${mes.tarjeta}</p>
      <p id="id">${mes.id}</p>
      <div id="amount">
        <p>${mes.monto}</p>
        <p>Deduccion Bold</p>
        <p>-$${calcular(mes.monto)}</p>
      </div>
    </div>`
    })
  }
  if(target =="semana"){
    Week.forEach(semana => {
      table.innerHTML += `<div class="row__table-transactions-row ${semana.transaccion ? "": "succes"}">
      <!-- <p id="succes"><i class="fas fa-link"></i> Cobro exitoso</p> #} -->
      <p id="succes"><i class="fas fa-${semana.modo == "datafono" ? 'mobile-alt' : "link" }"></i> ${semana.transaccion ? "Cobro exitoso": "Cobro no realizado"}</p>
      <p id="date">${semana.fecha}</p>
      <p id="card">${cardType(semana.tipo)} ${semana.tarjeta}</p>
      <p id="id">${semana.id}</p>
      <div id="amount">
        <p>${semana.monto}</p>
        <p>Deduccion Bold</p>
        <p>-$${calcular(semana.monto)}</p>
      </div>
    </div>`
    })
    
  }
  if(target =="hoy"){
    Today.forEach(hoy => {
      table.innerHTML += `<div class="row__table-transactions-row ${hoy.transaccion ? "": "succes"}">
      <!-- <p id="succes"><i class="fas fa-link"></i> Cobro exitoso</p> #} -->
      <p id="succes"><i class="fas fa-${hoy.modo == "datafono" ? 'mobile-alt' : "link" }"></i> ${hoy.transaccion ? "Cobro exitoso": "Cobro no realizado"}</p>
      <p id="date">${hoy.fecha}</p>
      <p id="card">${cardType(hoy.tipo)} ${hoy.tarjeta}</p>
      <p id="id">${hoy.id}</p>
      <div id="amount">
        <p>${hoy.monto}</p>
        <p>Deduccion Bold</p>
        <p>-$${calcular(hoy.monto)}</p>
      </div>
    </div>`
    })
    
  }
}
const pintarDefault  = (Today) => {  
  const table = document.getElementById("table-container")
  const hoy = document.getElementById("hoy")
  hoy.classList.add("active")
  Today.forEach(hoy => {
    table.innerHTML += `<div class="row__table-transactions-row ${hoy.transaccion ? "": "succes"}">
    <!-- <p id="succes"><i class="fas fa-link"></i> Cobro exitoso</p> #} -->
    <p id="succes"><i class="fas fa-${hoy.modo == "datafono" ? 'mobile-alt' : "link" }"></i> ${hoy.transaccion ? "Cobro exitoso": "Cobro no realizado"}</p>
    <p id="date">${hoy.fecha}</p>
    <p id="card">${cardType(hoy.tipo)} ${hoy.tarjeta}</p>
    <p id="id">${hoy.id}</p>
    <div id="amount">
      <p>${hoy.monto}</p>
      <p>Deduccion Bold</p>
      <p>-$${calcular(hoy.monto)}</p>
    </div>
  </div>`
  })

}
const detectHtml = async () => {
  const datosapi = await api("../assets/fakeApi.json")
  const mouth = await datosapi.dataMonth
  const Week = await datosapi.dataWeek
  const Today = await datosapi.dataToday
  obtenerMes()
  await seleccion(mouth,Week, Today)
  pintarDefault(Today)
}

export default detectHtml