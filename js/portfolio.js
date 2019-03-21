"use strict";

let items = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
}

// - - - - - - - - - - - - - restdb stuff - - - - - - - - - - - - -

function getItems() {
    console.log("getItems");
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
            // items = data;
            // sortItems(items);
        });
}