let $cajaDetails = document.getElementById('content-details-card');

/*---------- Params ----------*/
const params = new URLSearchParams(location.search)
const id = params.get("id")
let card = data.events.find(element => element._id === id)
console.log(id);

function cardGenerate(obj) {
    return `
    <div class="row g-0">
        <div class="col-md-4" style="width: 50rem;">
            <img src="${obj.image}" class="img-fluid" style="padding: 1rem;" alt="image of ${obj.name}">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${obj.name}</h5>
                <p class="card-text">${obj.description}</p>
                <p class="card-text">Date: ${obj.date}</p>
                <p class="card-text">Category: ${obj.category}</p>
                <p class="card-text">Place: ${obj.place}</p>
                <p class="card-text">capacity: ${obj.capacity}</p>
                <p class="card-text">assistance: ${obj.assistance}</p>
                <p class="card-text">price: $${obj.price}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text"><small class="text-muted">are you going to miss it?</small></p>
                    <button type="button" class="btn btn-danger">Buy</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderCard(obj, element) {
    let template = ""
    template += cardGenerate(obj)
    element.innerHTML = template
}
renderCard(card, $cajaDetails)