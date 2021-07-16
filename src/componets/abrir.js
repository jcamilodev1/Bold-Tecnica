const abrir = () => {
  const filtrarBox = document.getElementById("filtrar")
  const filtrar = document.querySelector(".filtrar")
  const filtrarcerrar = document.getElementById("cerrar-filtro")
  const popUp =  document.querySelector(".PopUp-mobile")
  const cerrarPopUp =  document.querySelector("#cerrar-pupUp")


  let component = document.querySelector('ul');
  let header =  document.querySelector(".header__link")
  component.addEventListener('click',()=>{
      component.classList.toggle('active');  
      header.classList.toggle('active-box');  
  })
  cerrarPopUp.addEventListener("click",  e => {
    popUp.style.display = "none"
  })

  filtrar.addEventListener("click",  e => {
    filtrarBox.style.display = "grid"
  })
  filtrarcerrar.addEventListener("click",  e => {
    filtrarBox.style.display = "none"
  })
}
export default abrir