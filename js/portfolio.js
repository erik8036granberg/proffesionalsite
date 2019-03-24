"use strict";

let urlParams = new URLSearchParams(window.location.search);
let showItems = urlParams.get("l");
console.log("showItems er: " + showItems);

// TODO: get id for slide to cliked item if returning
// let id = urlParams.get("r");
// console.log("id er: " + id);

let click;
let items = [];
let keaItems = [];
window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    setTimeout(loader, 1500);
    getItems();
    getkeaItems();
    document.querySelector("body").addEventListener("click", mouseClick);

    if (showItems === null) {
        showItems = "work";
        console.log("showItems blevet er: " + showItems);
    }
    if (showItems === "work") {
        setWorkActive();
    }
    if (showItems === "kea") {
        setKeaActive();
    }
}

function loader() {
    document.querySelector("#loader_bg").style.display = "none";
}

// - - - - - - - - - - - - - work items - - - - - - - - - - - - -

function getItems() {
    console.log("getitems");
    fetch("https://profweb-4fea.restdb.io/rest/cases?metafields=true&idtolink=true", {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": "5c9396f3cac6621685acc146",
                "cache-control": "public"
            }
        })
        //   format as jason & send to sort
        .then(res => res.json())
        .then(data => {
            console.log(data);
            items = data;
            if (showItems === "work") {
                sortItems(items);
            }
        });
}

// - - - - - - - - - - - - - kea items - - - - - - - - - - - - -

function getkeaItems() {
    console.log("getkeaItems");
    fetch(
            "https://profweb-4fea.restdb.io/rest/caseskea?metafields=true&idtolink=true", {
                method: "get",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-apikey": "5c9396f3cac6621685acc146",
                    "cache-control": "public"
                }
            }
        )
        //   format as jason & send to sort
        .then(res => res.json())
        .then(data => {
            keaItems = data;
            if (showItems === "kea") {
                sortItems(keaItems);
            }
        });
}

// - - - - - - - - - - - - - mouse click handler - - - - - - - - - - - - -

function mouseClick(event) {
    click = event.target.dataset.click;

    if (click === "showItems") {
        console.log("showItems clicked");
        event.preventDefault();
        showItems = "work";
        setWorkActive();
        sortItems(items);
    }
    if (click === "showKeaItems") {
        console.log("showKeaItems clicked");
        event.preventDefault();
        showItems = "kea";
        setKeaActive();
        console.log(keaItems);
        sortItems(keaItems);
    }
}

// - - - - - - - - - - - - - button styles - - - - - - - - - - - - -

function setWorkActive() {
    document.querySelector("#showitems").classList.add("active");
    document.querySelector("#showitems").classList.remove("inactive");
    document.querySelector("#showkeaitems").classList.add("inactive");
    document.querySelector("#showkeaitems").classList.remove("active");
}

function setKeaActive() {
    document.querySelector("#showkeaitems").classList.add("active");
    document.querySelector("#showkeaitems").classList.remove("inactive");
    document.querySelector("#showitems").classList.add("inactive");
    document.querySelector("#showitems").classList.remove("active");
}

// - - - - - - - - - - - - - sort - - - - - - - - - - - - -

function sortItems(activeitems) {
    activeitems.sort(function (a, z) {
        if (a.featured < z.featured) {
            return -1;
        } else {
            return 1;
        }
    });
    document.querySelector("[data-container]").innerHTML = "";
    activeitems.forEach(displayItems);

    // TODO: slide to cliked item if returning without messy URL
    // this doesn't work
    // if (id !== null) {
    //     window.location.href = "#" + id;
    //     console.log("jump to id");
    // }
}

// - - - - - - - - - - - - - display cases - - - - - - - - - - - - -

function displayItems(item) {
    console.log("displayItems");
    const template = document.querySelector("[data-template]").content;
    const clone = template.cloneNode(true);
    clone.querySelector("[data-target]").dataset.target = item.target;
    clone.querySelector("[data-target]").id = item.target;
    clone.querySelector("[data-preview]").setAttribute("src", item.preview_0);
    clone.querySelector("[data-preview]").setAttribute("alt", item.customer + " - " + item.case);
    clone.querySelector("[data-customer]").textContent = item.customer;
    clone.querySelector("[data-case]").textContent = item.case;
    clone.querySelector("[data-target]").addEventListener("click", () => {
        window.location.href = "portfolio-case.html?p=" + item.target + "&l=" + showItems;
    });
    document.querySelector("[data-container]").appendChild(clone);
}