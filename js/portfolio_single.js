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
    setTimeout(loader, 1500);
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
                    "cache-control": "public"
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
    let path;
    let number;

    const displayImages = Object.keys(filteredItem).filter(function (displayImage) {
        return displayImage.indexOf("display_") === 0;
    });
    console.log("antal billeder er:" + displayImages.length);

    dest.querySelector("[data-display]").setAttribute("src", filteredItem.display_0);
    dest
        .querySelector("[data-display]")
        .setAttribute("alt", filteredItem.customer + " - " + filteredItem.case);


    // TODO: DRY this?

    if (filteredItem.display_1 !== undefined) {
        path = filteredItem.display_1;
        number = 1;
        createImage();
    }

    if (filteredItem.display_2 !== undefined) {
        path = filteredItem.display_1;
        number = 2;
        createImage();
    }

    if (filteredItem.display_3 !== undefined) {
        path = filteredItem.display_3;
        number = 3;
        createImage();
    }

    if (filteredItem.display_4 !== undefined) {
        path = filteredItem.display_4;
        number = 4;
        createImage();
    }

    if (filteredItem.display_5 !== undefined) {
        path = filteredItem.display_5;
        number = 5;
        createImage();
    }

    if (filteredItem.display_6 !== undefined) {
        path = filteredItem.display_6;
        number = 6;
        createImage();
    }

    if (filteredItem.display_7 !== undefined) {
        path = filteredItem.display_7;
        number = 7;
        createImage();
    }

    if (filteredItem.display_8 !== undefined) {
        path = filteredItem.display_8;
        number = 8;
        createImage();
    }

    if (filteredItem.display_9 !== undefined) {
        path = filteredItem.display_9;
        number = 9;
        createImage();
    }

    if (filteredItem.display_10 !== undefined) {
        path = filteredItem.display_10;
        number = 10;
        createImage();
    }

    function createImage() {
        const htmlString = "<img class='d-block w-100' src=" + path + ">";
        const image = document.createElement("DIV");
        image.classList.add("carousel-item");
        image.innerHTML = htmlString.trim();
        document.querySelector(".carousel-inner").appendChild(image);

        const indicator = document.createElement("LI");
        indicator.setAttribute("data-target", "#carouselExampleIndicators");
        indicator.setAttribute("data-slide-to", number);
        document.querySelector(".carousel-indicators").appendChild(indicator);
    }

    dest.querySelector("[data-customer]").textContent = filteredItem.customer;
    dest.querySelector("[data-description]").innerHTML = filteredItem.description;
}