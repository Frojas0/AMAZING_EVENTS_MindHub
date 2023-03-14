/*-------------------- table1 --------------------*/
const $table1tr = document.getElementById('table1-tr');

//Llenador de tablas
function fillTable(obj) {
    return `
        <td>${obj.name}</td>
    `
}
//Pintador de tablas
function tableRender(list, element) {
    let template = '';
    for (let event of list) {
        template += fillTable(event);
    }
    element.innerHTML += template;
}
//Evento con mayor porcentaje de asistencia
function highAttendance(list) {
    let comparator = 0;
    let highAttendanceEvent = [];
    for (let event of list) {
        if (((event.assistance * 100) / event.capacity) > comparator) {
            comparator = (event.assistance * 100) / event.capacity;
            highAttendanceEvent.push(event);
        }
    }
    return highAttendanceEvent.slice(-1);
}
//Evento con menor porcentaje de asistencia
function lowAttendance(list) {
    let comparator = 100;
    let lowAttendanceEvent = [];
    for (let event of list) {
        if (((event.assistance * 100) / event.capacity) < comparator) {
            comparator = (event.assistance * 100) / event.capacity;
            lowAttendanceEvent.push(event);
        }
    }
    return lowAttendanceEvent.slice(-1);
}
//Evento con mayor capacidad
function largeCapacity(list) {
    let comparator = 0;
    let highCapacityEvent = [];
    for (let event of list) {
        if (event.capacity > comparator) {
            comparator = event.capacity;
            highCapacityEvent.push(event);
        }
    }
    return highCapacityEvent.slice(-1);
}
/*-------------------- table2 --------------------*/
const $table2 = document.getElementById('table2');

//Llenador de tablas
function fillTable2tr(category, revenue, attendance) {
    return `
    <tr>
        <td>${category}</td>
        <td>$${revenue}</td>
        <td>${attendance}%</td>
    </tr>
    `
}
//Pintador de tablas
function table2Render(list, element) {
    let template = '';
    let category = noRepCategories(list);
    let revenue = upcomingRevenues(list);
    let attendance = upcomingAttendance(list);
    for (let i = 0; i < category.length; i++) {
        template += fillTable2tr(category[i], revenue[category[i]], (attendance[category[i]]).toFixed(2));
    }
    element.innerHTML += template;
}

//Filtro de eventos Futuros
function upcomingDateFilter(lista) {
    let upcomingEvents = [];
    for (let llave of lista.events) {
        if (llave.date > lista.currentDate) {
            upcomingEvents.push(llave);
        }
    }
    return upcomingEvents;
}

//Ganancias por categoria
function upcomingRevenues(list) {
    let accObj = {};
    const categories = noRepCategories(list);
    for (let category of categories) {
        accObj[category] = 0;
        for (let event of list) {
            if (event.category.includes(category)) {
                accObj[category] += (event.price * event.estimate);
            }
        }
    }
    return accObj;
}
//Porcentaje de asistencias
function upcomingAttendance(list) {
    let accObj = {};
    const categories = noRepCategories(list);
    for (let category of categories) {
        accObj[category] = 0;
        let acc = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].category.includes(category)) {
                accObj[category] += ((list[i].estimate * 100) / list[i].capacity);
                acc++;
            }
        }
        accObj[category] = accObj[category] / acc;
    }
    return accObj;
}

/*-------------------- table3 --------------------*/
const $table3 = document.getElementById('table3');

//Llenador de tablas
function fillTable3tr(category, revenue, attendance) {
    return `
    <tr>
        <td>${category}</td>
        <td>$${revenue}</td>
        <td>${attendance}%</td>
    </tr>
    `
}
//Pintador de tablas
function table3Render(list, element) {
    let template = '';
    let category = noRepCategories(list);
    let revenue = pastRevenues(list);
    let attendance = pastAttendance(list);
    for (let i = 0; i < category.length; i++) {
        template += fillTable3tr(category[i], revenue[category[i]], (attendance[category[i]]).toFixed(2));
    }
    element.innerHTML += template;
}

//Filtro de eventos Pasados
function pastDateFilter(lista) {
    let pastEvents = [];
    for (let i of lista.events) {
        if (i.date < lista.currentDate) {
            pastEvents.push(i);
        }
    }
    return pastEvents;
}
//Ganancias por categoria
function pastRevenues(list) {
    let accObj = {};
    const categories = noRepCategories(list);
    for (let category of categories) {
        accObj[category] = 0;
        for (let event of list) {
            if (event.category.includes(category)) {
                accObj[category] += (event.price * event.assistance);
            }
        }
    }
    return accObj;
}
//Porcentaje de asistencias
function pastAttendance(list) {
    let accObj = {};
    const categories = noRepCategories(list);
    for (let category of categories) {
        accObj[category] = 0;
        let acc = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].category.includes(category)) {
                accObj[category] += ((list[i].assistance * 100) / list[i].capacity);
                acc++;
            }
        }
        accObj[category] = accObj[category] / acc;
    }
    return accObj;
}

/*---------- Call With API ----------*/
//Fetch
const url = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(url)
    .then(answer => answer.json())
    .then(json => {
        newData = json;
        tableRender(highAttendance(newData.events), $table1tr)
        tableRender(lowAttendance(newData.events), $table1tr)
        tableRender(largeCapacity(newData.events), $table1tr)

        table2Render(upcomingDateFilter(newData), $table2)
        table3Render(pastDateFilter(newData), $table3)
    })
    .catch(err => console.log(err));

//Categorias sin repetir
function noRepCategories(list) {
    let category02 = list.map(element => element.category);
    const noRepCategory = Array.from(new Set(category02));
    return noRepCategory;
}