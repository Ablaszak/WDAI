let data = [];

async function load(){
    try{
        const rawData = await fetch("https://dummyjson.com/products");
        if(!rawData.ok)
            throw new Error("bing bong");

        data = await rawData.json();

    } catch(e){console.error(e.message);}

    show();
}

function show(){

    let filter_phrase = String(document.getElementById("filter").value).toLowerCase();
    if(filter_phrase === "Filtruj")
        filter_phrase = "";


    let table = document.getElementById("table");

    table.innerHTML = `
        <tr>
            <th>Zdjęcie</th>
            <th>Tytuł</th>
            <th>Opis</th>
        </tr>
    `;
    let tab = data.products.slice();
    sort(tab);

    for(const row of tab){
        if((row.title).toLowerCase().includes(filter_phrase))
        {
                table.innerHTML += `
            <tr>
                <td><img width="100px" src="${row.images[0]}" alt="product image"></td>
                <td>${row.title}</td>
                <td>${row.description}</td>
            </tr>
        `;
        }
    }
}

function sort(tab){
    let sortby = document.getElementById("sort").value;
    switch(sortby){
        case("asc"):
            tab.sort();
            break;
        case("desc"):
            tab.sort().reverse();
            break;
    }
}


let sortinput = document.getElementById("sort");
sortinput.addEventListener('input', show)
let filterinput = document.getElementById("filter");
filterinput.addEventListener('input', show)

load();