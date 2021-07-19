import api from './fetch.js'

const obtenerFecha = () => {
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let date = new Date();
  let mes_name = date.getMonth();
  let año = date.getFullYear()
  return {
    mes: meses[mes_name],
    año: año
  }
  
}
const prinTotal = (data, opcion) => {
  const fecha = obtenerFecha()
  let total = "total" +  opcion
  document.querySelector(".main__sales__box-title").innerHTML = `<p>Total de ventas de <span> ${fecha.mes} </span></p>   <i class="fas fa-info-circle"></i> ` 
  document.getElementById("mes").innerHTML = fecha.mes
  document.getElementById("total-ventas").innerHTML = `${data[total]}`
  document.getElementById("fecha-total").innerHTML = `${fecha.mes}, ${fecha.año}`
}
const seleccion = async ( mouth,Week, Today, data) => {
  const mouthcontainer = document.querySelector(".main__buttons-date")
  mouthcontainer.addEventListener("click", e => {
    if(e.target.localName == "p"){
      mouthcontainer.childNodes.forEach(e => {
        if(e.localName == "p"){
          e.classList.remove("active")
        }
      })
      pintarHtml(e.target.dataset.date,mouth,Week, Today, data )
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
  
const pintarHtml = async (target, mouth,Week,Today, data) => {
  const table = document.getElementById("table-container")
  table.innerHTML =""
  if(target =="mes"){
    prinTotal(data ,target)
    filtro(mouth)
  }
  if(target =="semana"){
    prinTotal(data, target)
    filtro(Week)
  }
  if(target =="hoy"){
    prinTotal(data,target)
    filtro(Today)
  }
}
const html = (date) => {
  const table = document.getElementById("table-container")
  table.innerHTML += `<div class="row__table-transactions-row ${date.transaccion ? "": "succes"}">
  <p id="succes"><i class="fas fa-${date.modo == "datafono" ? 'mobile-alt' : "link" }"></i> ${date.transaccion ? "Cobro exitoso": "Cobro no realizado"} </p><i onclick="abrirPopUp('${date.id}')"class="fas fa-plus mobile-view"></i>
  <p id="date" class="mobile">${date.fecha}</p>
  <p id="card" class="mobile">${cardType(date.tipo)} ${date.tarjeta}</p>
  <p id="id" class="mobile">${date.id}</p>
  ${date.transaccion ? `<div id="amount">
  <p>${date.monto}</p>
  <p>Deduccion Bold</p>
  <p>-$${calcular(date.monto)}</p>
</div>`: `<div id="amount">
<p>${date.monto}</p>
</div>` }
  
</div>`
}
const pintarDefault  = (Today, datos) => {  
  const table = document.getElementById("table-container")
  const hoy = document.getElementById("hoy")
  hoy.classList.add("active")
  filtro(Today)
  prinTotal(datos, "hoy")
}
const filtrar = (mouth) => {
  const table = document.getElementById("table-container")
  table.innerHTML =""
  const datafono = document.getElementById("datafono").checked
  const link = document.getElementById("link").checked
  const todos = document.getElementById("todos").checked
  if(datafono){
    mouth.forEach(e => {
      if(e.modo == "datafono"){
        html(e)
      }
    })
  }
  if(link){
    mouth.forEach(e => {
      if(e.modo == "link"){
        html(e)
      }
    })
  }
  if(todos){
    mouth.forEach(e => {
        html(e)
    })
  }
}
const filtro = (mouth) => {
  const tableCheck = document.getElementById("filtrar")
  filtrar(mouth)
  tableCheck.addEventListener("click", e => {
    filtrar(mouth)
  })
}
const detectHtml = async () => {
  const datosapi = await api("../assets/fakeApi.json")
  const mouth = await datosapi.dataMonth
  const Week = await datosapi.dataWeek
  const Today = await datosapi.dataToday
  await seleccion(mouth,Week, Today, datosapi.datos)
  pintarDefault(Today, datosapi.datos)
}

export default detectHtml