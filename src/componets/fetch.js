

const api = async (url) =>{
  const response =  await fetch(url)
  const datos = await response.json()
  const dataToday = datos.transaccionesHoy
  const dataWeek = datos.transaccionesSemana
  const dataMonth = datos.transaccionesSeptiembre
  return { dataToday, dataMonth, dataWeek }
}

export default api
