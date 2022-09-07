//Fetch API Clima
const API_KEY = "2aea666599259f0ad0917f7357a073b7"
const divClima = document.getElementById("divClima")

//funcion del fetch
function API() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Cordoba,Cordoba,Argentina&limit=1&appid=${API_KEY}`)
    .then((resolve) => resolve.json())
    .then((data) => {
        const {country, lat, lon, name, state} = data[0];

        //fetch de la api original
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then((resolve) => resolve.json())
        .then((clima) => {
            const {main} = clima 
            console.log(main)
            divClima.innerHTML = 
            `
            <p class= "copy1">El clima en ${name}, ${state}, ${country}: </p>
            <p class= "temperatura">Temperatura: ${main.temp}°</p>
            <p class= "humedad">Humedad: ${main.humidity}%</p>
            <p class= "presion">Pressure: ${main.pressure} Pa</p>

            <p class= "actualizacion"> Actualizado c/ 5 min. </p>
            `
            })
    })
}

//llamo a la API
API()
//Interval para llamar a la aAPI cada 5 min
setInterval(() =>{
    API()
}, 300000)



//Clase
class Reserva {
    constructor(nombre, apellido, celular, numMesa){
        this.nombre = nombre
        this.apellido = apellido
        this. celular = celular
        this.numMesa = numMesa
    }
}

//creo o consulto el localStorage con nullish
const reservasArray = JSON.parse(localStorage.getItem("reservasArray")) ?? []

//consulto por el form
const idForm = document.getElementById("idForm")
//consulto por el boton para mostrar localstorage y el div mesasOcupadas (agregar al DOM)
const mesasOcupadas = document.getElementById("mesasOcupadas")
const formButton = document.getElementById("formButton")

//consulto por las mesas para pintar
const mesa1 = document.getElementById("idMesa1")
const mesa2 = document.getElementById("idMesa2")
const mesa3 = document.getElementById("idMesa3")
const mesa4 = document.getElementById("idMesa4")
const mesa5 = document.getElementById("idMesa5")
const mesa6 = document.getElementById("idMesa6")
const mesa7 = document.getElementById("idMesa7")
const mesa8 = document.getElementById("idMesa8")
const mesa9 = document.getElementById("idMesa9")

//Funcion Switch para pintar las mesas no disponibles
const pintarMesa = (mesaPintada) => {
    switch(mesaPintada){
        case "1":
            mesa1.classList.add("noDisponible")
            break;
        case "2":
            mesa2.classList.add("noDisponible")
            break;
        case "3":
            mesa3.classList.add("noDisponible")
            break;
        case "4":
            mesa4.classList.add("noDisponible")
            break;
        case "5":
            mesa5.classList.add("noDisponible")
            break;
        case "6":
            mesa6.classList.add("noDisponible")
            break;
        case "7":
            mesa7.classList.add("noDisponible")
            break;
        case "8":
            mesa8.classList.add("noDisponible")
            break;
        case "9":
            mesa9.classList.add("noDisponible")
            break;    
        default:
            break;
        }
}

const pintarMesas = (reservasArray) => {
    reservasArray.forEach((reservada) => {
        pintarMesa(reservada.numMesa)
    })
}


//Funcion validar mesa disponible
const validarMesaDisponible = (numeroMesa) => {
    const mesa = document.getElementById('idMesa'+numeroMesa);
    if(mesa.classList.contains("noDisponible")){
        return false
    }
    return true
}

//pinto las mesas ya reservadas
pintarMesas(reservasArray)


//evento del form
idForm.addEventListener("submit", (e) => {
    e.preventDefault()

    //creo el evento a partir de los datos del form (formData)
    const formData = new FormData(e.target)
    //creo el objeto a partir del FormData
    const reservaUsuario = new Reserva (formData.get("nombre"), formData.get("apellido"), formData.get("celular"), formData.get("mesa"))

    
    //Validar disopnible
    const mesaEstaDisponible = validarMesaDisponible(reservaUsuario.numMesa)
    if(!mesaEstaDisponible){
        Swal.fire({
            icon: 'error',
            title: 'Mesa No Disponible',
            text: 'Elija Otra por favor',
        })
        return
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Mesa Reservada',
            text: 'Lo esperamos',
        })
    }

    //pusheo el objeto nuevo al array
    reservasArray.push(reservaUsuario)
    
    //actualizo el localStorage, pisandolo
    localStorage.setItem("reservasArray", JSON.stringify(reservasArray))
    //pintar Mesa reservada
    pintarMesa(reservaUsuario.numMesa)

    //reseteo el form
    idForm.reset() 
})



//Boton mostrar reservas
formButton.addEventListener("click", () => {
    mesasOcupadas.innerHTML = ""

    reservasArray.forEach((reservacion, indice)=> {
        mesasOcupadas.innerHTML += `
        <tr id="reserva${indice} ">
            <td class="tbody__td"> ${reservacion.nombre} </td>
            <td class="tbody__td">${reservacion.apellido} </td>
            <td class="tbody__td">${reservacion.celular} </td>
            <td class="tbody__td">${reservacion.numMesa} </td>
        </tr>
        `
    });
})








