"use strict";

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("from");
console.log("id er: " + id);

let click;
let items = [];
let keaItems = [];
let showItems = true;


window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    setTimeout(loader, 1500);
    getItems();
    getkeaItems();
    document.querySelector("body").addEventListener("click", mouseClick);
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
            items = data;
            sortItems(items);
        });
}


function getkeaItems() {
    console.log("getkeaItems");
    fetch(
            "https://profweb-4fea.restdb.io/rest/caseskea?metafields=true&idtolink=true", {
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
            keaItems = data;
            // sortItems(keaItems);
        });
}

// - - - - - - - - - - - - - mouse click handler - - - - - - - - - - - - -

function mouseClick(event) {
    click = event.target.dataset.click;

    if (click === "showItems") {
        console.log("showItems clicked");
        event.preventDefault();
        showItems = true;
        document.querySelector("#showitems").classList.add("active");
        document.querySelector("#showitems").classList.remove("inactive");
        document.querySelector("#showkeaitems").classList.add("inactive");
        document.querySelector("#showkeaitems").classList.remove("active");
        sortItems(items);
    }
    if (click === "showKeaItems") {
        console.log("showKeaItems clicked");
        event.preventDefault();
        showItems = false;
        document.querySelector("#showkeaitems").classList.add("active");
        document.querySelector("#showkeaitems").classList.remove("inactive");
        document.querySelector("#showitems").classList.add("inactive");
        document.querySelector("#showitems").classList.remove("active");
        console.log(showItems);
        sortItems(keaItems);
    }
}

// - - - - - - - - - - - - - sort - - - - - - - - - - - - -

function sortItems(activeitems) {
    console.log("sortItems");
    console.log(showItems);
    // by creation
    // activeitems.sort(function (a, z) {
    //     if (a._created < z._created) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // });

    // by featured nr.
    activeitems.sort(function (a, z) {
        if (a.featured < z.featured) {
            return -1;
        } else {
            return 1;
        }
    });
    document.querySelector("[data-container]").innerHTML = "";
    activeitems.forEach(displayItems);
    if (id !== null) {
        window.location.href = "#" + id;
        console.log("jump to id");
    }
}


// - - - - - - - - - - - - - display cases - - - - - - - - - - - - -

function displayItems(item) {
    console.log("displayItems");
    console.log(item._id);
    console.log(showItems);
    const template = document.querySelector("[data-template]").content;
    const clone = template.cloneNode(true);
    clone.querySelector("[data-target]").dataset.target = item.target;
    clone.querySelector("[data-target]").id = item.target;
    clone.querySelector("[data-preview]").setAttribute("src", item.preview_0);
    clone.querySelector("[data-preview]").setAttribute("alt", item.customer + " - " + item.case);
    clone.querySelector("[data-customer]").textContent = item.customer;
    clone.querySelector("[data-case]").textContent = item.case;
    clone.querySelector("[data-target]").addEventListener("click", () => {
        window.location.href = "portfolio-case.html?p=" + item.target;
    });

    document.querySelector("[data-container]").appendChild(clone);
}