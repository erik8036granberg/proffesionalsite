"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init cv");
    // setTimeout(loader, 1500);
    getPage();
}

// function loader() {
//     document.querySelector("#loader_bg").style.display = "none";
// }

// - - - - - - - - - - - - - restdb stuff - - - - - - - - - - - - -

function getPage() {
    console.log("getItems");
    fetch(
            "https://profweb-4fea.restdb.io/rest/pagecv", {
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
            data.forEach(displayPage);
        });
}
// - - - - - - - - - - - - - display page - - - - - - - - - - - - -

function displayPage(data) {

    console.log("displayPage");
    let dest = document.querySelector("[data-container]");

    dest.querySelector("[data-resume]").innerHTML = data.resume;
    dest.querySelector("[data-personinfo]").innerHTML = data.personinfo;
    dest.querySelector("[data-experience]").innerHTML = data.experience;
}