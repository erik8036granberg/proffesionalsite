"use strict";

//	hent og gem URL variabeler
let urlParams = new URLSearchParams(window.location.search);

//	hent produkt-id
let id = urlParams.get("p");
console.log("id er: " + id)

let items = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init portfolio_sigle");
    setTimeout(loader, 3000);
    getItems();
}


function loader() {
    document.querySelector("#loader_bg").style.display = "none";
}

// - - - - - - - - - - - - - restdb stuff - - - - - - - - - - - - -

function getItems() {
    console.log("getItems");
    fetch(
            "https://profweb-4fea.restdb.io/rest/cases?metafields=true&idtolink=true", {
                method: "get",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-apikey": "5c9396f3cac6621685acc146",
                    "cache-control": "no-cache"
                }
            }
        )
        //   format as jason & send to sort
        .then(res => res.json())
        .then(data => {
            console.log(data);
            items = data;
            findItem(items);
        });
}


function findItem(items) {
    console.log("findItem");
    let filteredItems = items.filter(function (activeItem) {
        return activeItem._id === id;
    });
    console.log("filteredItems er");
    console.log(filteredItems);

    let displayImages =

        filteredItems.forEach(displayItem);
}


// - - - - - - - - - - - - - display items - - - - - - - - - - - - -

function displayItem(filteredItems) {

    console.log("displayItem");
    let dest = document.querySelector("[data-container]");




    dest.querySelector("[data-display]").setAttribute("src", filteredItems.display_0);
    dest
        .querySelector("[data-display]")
        .setAttribute("alt", filteredItems.customer + " - " + filteredItems.case);


    if (filteredItems.display_1 !== undefined) {
        const htmlString = "<img src=" + filteredItems.display_1 + ">";
        const display1 = document.createElement("LI");
        display1.innerHTML = htmlString.trim();
        document.querySelector(".slides").appendChild(display1);
    }

    dest.querySelector("[data-customer]").textContent = filteredItems.customer;
    dest.querySelector("[data-description]").innerHTML = filteredItems.description;



}