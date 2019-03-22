"use strict";

//	hent og gem URL variabeler
let urlParams = new URLSearchParams(window.location.search);

//	hent produkt-id
let id = urlParams.get("p");
console.log("id er: " + id);

if (id === null) {
    window.location.href = "portfolio.html";
}

let items = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init portfolio_sigle");
    setTimeout(loader, 2000);
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
        .then(res => res.json())
        .then(data => {
            console.log(data);
            items = data;
            displayFilter(items);
        });
}

function displayFilter(items) {
    console.log("displayFilter");
    let filteredItems = items.filter(function (activeItem) {
        return activeItem._id === id;
    });
    console.log("filteredItems er");
    console.log(filteredItems);
    filteredItems.forEach(displayItem);
}

// - - - - - - - - - - - - - display items - - - - - - - - - - - - -

function displayItem(filteredItem) {

    console.log("displayItem");
    let dest = document.querySelector("[data-container]");

    const displayImages = Object.keys(filteredItem).filter(function (displayImage) {
        return displayImage.indexOf("display_") === 0;
    });
    console.log("antal billeder er:" + displayImages.length);

    // TODO: DRY this shit

    if (filteredItem.display_0 !== undefined) {
        let path = filteredItem.display_0;
        createImage(path);
    }

    if (filteredItem.display_1 !== undefined) {
        let path = filteredItem.display_1;
        createImage(path);
    }

    if (filteredItem.display_2 !== undefined) {
        let path = filteredItem.display_1;
        createImage(path);
    }

    if (filteredItem.display_3 !== undefined) {
        let path = filteredItem.display_3;
        createImage(path);
    }

    if (filteredItem.display_4 !== undefined) {
        let path = filteredItem.display_4;
        createImage(path);
    }

    if (filteredItem.display_5 !== undefined) {
        let path = filteredItem.display_5;
        createImage(path);
    }

    if (filteredItem.display_6 !== undefined) {
        let path = filteredItem.display_6;
        createImage(path);
    }

    if (filteredItem.display_7 !== undefined) {
        let path = filteredItem.display_7;
        createImage(path);
    }

    if (filteredItem.display_8 !== undefined) {
        let path = filteredItem.display_8;
        createImage(path);
    }

    if (filteredItem.display_9 !== undefined) {
        let path = filteredItem.display_9;
        createImage(path);
    }

    if (filteredItem.display_10 !== undefined) {
        let path = filteredItem.display_10;
        createImage(path);
    }

    function createImage(path) {
        const htmlString = "<img src=" + path + ">";
        const image = document.createElement("LI");
        image.innerHTML = htmlString.trim();
        document.querySelector(".slides").appendChild(image);
    }

    dest.querySelector("[data-customer]").textContent = filteredItem.customer;
    dest.querySelector("[data-description]").innerHTML = filteredItem.description;
}