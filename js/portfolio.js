"use strict";

let items = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    getcases()
}

// - - - - - - - - - - - - - restdb stuff - - - - - - - - - - - - -

function getcases() {
    console.log("getcases");
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
            items = data;
            sortItems(items);
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
    activeitems.forEach(displayCases);
}

// - - - - - - - - - - - - - display items - - - - - - - - - - - - -

function displayCases(cases) {
    console.log("displayCases");
    const template = document.querySelector("[data-template]").content;
    const clone = template.cloneNode(true);
    clone.querySelector("[data-id]").dataset.id = cases._id;
    clone.querySelector("[data-preview]").setAttribute("src", cases.preview_0);
    clone.querySelector("[data-preview]").setAttribute("alt", cases.customer + " - " + cases.case);
    clone.querySelector("[data-customer]").textContent = cases.customer;
    clone.querySelector("[data-case]").textContent = cases.case;
    document.querySelector("[data-container]").appendChild(clone);
}