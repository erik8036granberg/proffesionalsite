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

    filteredItems.forEach(displayItems);
}


// - - - - - - - - - - - - - display items - - - - - - - - - - - - -

function displayItems(filteredItems) {

    console.log("displayItems");
    let dest = document.querySelector("[data-container]");
    // dest.querySelector("[data-display]").setAttribute("src", filteredCase.preview_0);
    // dest
    //     .querySelector("[data-display]")
    //     .setAttribute("alt", filteredCase.customer + " - " + filteredCase.case);
    dest.querySelector("[data-customer]").textContent = filteredItems.customer;
    dest.querySelector("[data-description]").innerHTML = filteredItems.description;
}