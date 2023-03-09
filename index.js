const $caja = document.getElementById('content-cards');

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
`;
}

function llenarTarjetas(listaEventos, elemento) {
    let template = '';
    for (let i of listaEventos.events) {
        template += generarTarjeta(i);
    }
    elemento.innerHTML = template;
}
console.log()

llenarTarjetas(data, $caja);