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

    let table = document.getElementById("table");

    table.innerHTML = `
        <tr>
            <th>Zdjęcie</th>
            <th>Tytuł</th>
            <th>Opis</th>
        </tr>
    `;

    for(const row of data.products){
        table.innerHTML += `
        <tr>
            <td><img width="100px" src="${row.images[0]}" alt="product image"></td>
            <td>${row.title}</td>
            <td>${row.description}</td>
        </tr>
    `;
    }
}

load();