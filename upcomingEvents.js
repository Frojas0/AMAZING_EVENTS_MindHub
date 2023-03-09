const $caja2 = document.getElementById('content-upcoming-cards');

// Genera el texto para ser enviado a el innerHTML del elemento
function generarTarjeta(listaFinal) {
    return `
    <div class="card" style="width: 15rem;">
    <img style="height: 9rem;" src="${listaFinal.image}" class="card-img-top" alt="img of ${listaFinal.name}">
        <div class="d-flex flex-column justify-content-between card-body" style="height: 13rem">
            <h5 class="card-title">${listaFinal.name}</h5>
            <p class="card-text" >${listaFinal.description}</p>
            <div class="d-flex justify-content-around align-items-center">
                <p class="m-0">Price: $${listaFinal.price}</p>
                <a href="./details.html" class="btn btn-primary">More Info</a>
            </div>
        </div>
</div>
`
}

// Toma los datos de la lista y los asigna al innerHTML de cada elemento
function llenarTarjetas(listaEventos, elemento) {
    let template = '';
    for (let i of listaEventos) {
        template += generarTarjeta(i);
    }
    elemento.innerHTML = template;
}

// Compara fechas y usa la funcion llenarTarjetas para imprimirlas.
function filtroFecha(lista) {
    upcomingEvents = [];
    for (let llave of lista.events) {
        if (llave.date > lista.currentDate) {
            upcomingEvents.push(llave);
        }
    }
    llenarTarjetas(upcomingEvents, $caja2);
}

filtroFecha(data);