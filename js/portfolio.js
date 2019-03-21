"use strict";

let itmes = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    setTimeout(loader, 3000);
    getItems();
}

function loader() {
    document.querySelector("#loader_bg").style.display = "none";
}

// - - - - - - - - - - - - - restdb stuff - - - - - - - - - - - - -

function getItems() {
    console.log("getitems");
    fetch("https://profweb-4fea.restdb.io/rest/cases?metafields=true&idtolink=true", {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": "5c9396f3cac6621685acc146",
                "cache-control": "no-cache"
            }
        })
        //   format as jason & send to sort
        .then(res => res.json())
        .then(data => {
            console.log(data);
            itmes = data;
            sortItems(itmes);
        });
}

// - - - - - - - - - - - - - sort - - - - - - - - - - - - -

function sortItems(activeitems) {
    console.log("sortItems");
    activeitems.sort(function (a, z) {
        if (a._created < z._created) {
            return 1;
        } else {
            return -1;
        }
    });
    document.querySelector("[data-container]").innerHTML = "";
    activeitems.forEach(displayItems);
}

// - - - - - - - - - - - - - display cases - - - - - - - - - - - - -

function displayItems(item) {
    console.log("displayItems");
    console.log(item._id);
    const template = document.querySelector("[data-template]").content;
    const clone = template.cloneNode(true);
    clone.querySelector("[data-id]").dataset.id = item._id;
    clone.querySelector("[data-preview]").setAttribute("src", item.preview_0);
    clone.querySelector("[data-preview]").setAttribute("alt", item.customer + " - " + item.case);
    clone.querySelector("[data-customer]").textContent = item.customer;
    clone.querySelector("[data-case]").textContent = item.case;
    clone.querySelector("[data-id]").addEventListener("click", () => {
        window.location.href = "portfolio_single.html?p=" + item._id;
    });

    document.querySelector("[data-container]").appendChild(clone);
}