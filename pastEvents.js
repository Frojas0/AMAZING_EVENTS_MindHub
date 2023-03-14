const $caja = document.getElementById('content-cards');
const $cajaCheckBox = document.getElementById('content-checkbox');
const $cajaSearch = document.getElementById('content-search');

/*---------- Cards ----------*/
function cardGenerate(finalList) {
    return `
<div class="card card-background" style="width: 15rem;">
    <img style="height: 9rem;" src="${finalList.image}" class="card-img-top" alt="img of ${finalList.name}">
        <div class="d-flex flex-column justify-content-between card-body" style="height: 15rem">
            <h5 class="card-title">${finalList.name}</h5>
            <p class="card-text" >${finalList.description}</p>
            <div class="d-flex justify-content-around align-items-center">
                <p class="m-0">Price: $${finalList.price}</p>
                <a href="./details.html?id=${finalList._id}" class="btn btn-danger">More Info</a>
            </div>
        </div>
</div>
`;
}

function cardRender(listaEventos, elemento) {
    let template = '';
    if (listaEventos.length != 0) {
        for (let i of listaEventos) {
            template += cardGenerate(i);
        }
    } else {
        template += `<h1 style="color: white;">No item matches</h1>`
    }
    elemento.innerHTML = template;
}

function dateFilter(lista) {
    pastEvents = [];
    for (let llave of lista.events) {
        if (llave.date < lista.currentDate) {
            pastEvents.push(llave);
        }
    }
    cardRender(pastEvents, $caja);
    return pastEvents;
}

/*---------- Search Bar ----------*/
function searchBarGenerate(categoryList, i) {
    return `
    <input type="checkbox" value="${categoryList[i]}" class="btn-check" id="${categoryList[i]}">
    <label class="btn btn-danger" for="${categoryList[i]}">${categoryList[i]}</label>
    `;
}

function searchBarRender(newCategoryList, element) {
    let template = '';
    for (let k = 0; k < newCategoryList.length; k++) {
        template += searchBarGenerate(newCategoryList, k);
    }
    element.innerHTML += template;
}

/*---------- Event Listener ----------*/
//CheckBox
function checkComparator(eventsList) {
    let accList = [];
    const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(element => element.value);
    for (i = 0; i < eventsList.length; i++) {
        if (checked.includes(eventsList[i].category)) {
            accList.push(eventsList[i]);
        }
    }
    if (checked.length == 0) {
        return eventsList;
    } else {
        return accList;
    }
};

//SearchBar
let searchDocument = document.getElementById('search-bar');

function ifSearch(data) {
    let value = searchDocument.value;
    let searchList = [];
    for (let i = 0; i < data.length; i++) {
        if (((data[i].name).toLowerCase()).includes(value.toLowerCase())) {
            searchList.push(data[i]);
        }
    }
    return searchList;
}

/*---------- Cross Filter ----------*/
$cajaCheckBox.addEventListener('change', e => {
    const filtrados = filtroCruzado(pastEvents);
    cardRender(filtrados, $caja);
});

$cajaSearch.addEventListener('input', e => {
    const filtrados = filtroCruzado(pastEvents);
    cardRender(filtrados, $caja);
});

function filtroCruzado(eventos) {
    return checkComparator(ifSearch(eventos));
}

/*---------- With API ----------*/
//Fetch
const url = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(url)
    .then(answer => answer.json())
    .then(json => {
        newData = json;
        dateFilter(newData);
        let category02 = newData.events.map(element => element.category);
        const noRepCategory = Array.from(new Set(category02));
        searchBarRender(noRepCategory, $cajaCheckBox);
    })
    .catch(err => console.log(err));