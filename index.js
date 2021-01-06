//__--__\\
FilterPhotographers("all")

// DOM Elements
const portraitNavigation = document.querySelector(".portrait");
//TODO: querySelectorALL maintenant //
const artNavigation = document.querySelector(".art");
const fashionNavigation = document.querySelector(".fashion");
const architectureNavigation = document.querySelector(".architecture");
const travelNavigation = document.querySelector(".travel");
const sportNavigation = document.querySelector(".sport");
const animalsNavigation = document.querySelector(".animals");
const eventsNavigation = document.querySelector(".events");


// Events
portraitNavigation.addEventListener("click", FilterPhotographers_portrait);
artNavigation.addEventListener("click", FilterPhotographers_art);
fashionNavigation.addEventListener("click", FilterPhotographers_fashion);
architectureNavigation.addEventListener("click", FilterPhotographers_architecture);
travelNavigation.addEventListener("click", FilterPhotographers_travel);
sportNavigation.addEventListener("click", FilterPhotographers_sport);
animalsNavigation.addEventListener("click", FilterPhotographers_animals);
eventsNavigation.addEventListener("click", FilterPhotographers_events);



//TODO: add commentaire
function fetchData(tag) {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        //TODO: A modifier plus tard !
        PhotographersFactory(data["photographers"], tag);
        MediaFactory(data["media"]);
    });
}

//function Factory() {}

//TODO: add commentaire
function RemovePhotographers() {
    try {
        const photographersSection = document.querySelectorAll(".card")
        for (var element in photographersSection) {
            photographersSection[element].remove()
            console.log("REMOVE OK")
        }
    } catch (error){
        console.log("REMOVE NOT OK")
    }
}

//TODO: add commentaire
function PhotographersFactory(data, tag) {
    for (var element in data) {
        console.log("TAGS", data[element].tags)
        if (data[element].tags.includes(tag)) {
            var data_photographers = {
                name: data[element].name,
                id: data[element].id,
                city: data[element].city,
                country: data[element].country,
                tags: data[element].tags,
                tagline: data[element].tagline,
                price: data[element].price,
                portrait: data[element].portrait,
            }
        }
        else {
            continue
        }
        CreatePhotographers(data_photographers);
    }
}

//TODO: add commentaire
function CreatePhotographers(data_photographers) {
    // sélectionne la section #photographer_section
    const photographersSection = document.getElementById("photographer_section")

    let photographers_card_html = '<div class="card">' +
    '<a href="..."><img src="data/Photographers ID Photos/' + data_photographers["portrait"] + '" alt="" class="photographers_pp"></a>' +
    '<h2>' + data_photographers["name"] + '</h2>' +
    '<div class="content">' +
    '<h4>' + data_photographers["city"] + ', ' + data_photographers["country"] + '</h4>' +
    '<p>' + data_photographers["tagline"] + '</p>' +
    '<p>' + data_photographers["price"] + '€/jour</p>' +
    '<nav role="navigation" aria-label="photographer categories">' +
    '<ul classe="navigation_tags">';
    // ajoute les tags pour la navigation
    var photographers_tags_html = ""
    for (var element in data_photographers["tags"]) {
        if (data_photographers["tags"][element] != "all") {
            photographers_tags_html = photographers_tags_html +
            '<li class="' + data_photographers["tags"][element] + '" >#' +
            data_photographers["tags"][element] +
            '</li>';
        }
    }
    photographers_card_html = photographers_card_html +
    photographers_tags_html +
    '</ul>' +
    '</nav>' +
    '</div>' +
    '</div>';

    // ajoute les cartes des différents photographes dans le code HTML
    photographersSection.insertAdjacentHTML("afterbegin", photographers_card_html)
}

function FilterPhotographers_portrait() {
    var tag = "portrait"
    FilterPhotographers(tag)
}
function FilterPhotographers_art() {
    var tag = "art"
    FilterPhotographers(tag)
}
function FilterPhotographers_fashion() {
    var tag = "fashion"
    FilterPhotographers(tag)
}
function FilterPhotographers_architecture() {
    var tag = "architecture"
    FilterPhotographers(tag)
}
function FilterPhotographers_travel() {
    var tag = "travel"
    FilterPhotographers(tag)
}
function FilterPhotographers_sport() {
    var tag = "sport"
    FilterPhotographers(tag)
}
function FilterPhotographers_animals() {
    var tag = "animals"
    FilterPhotographers(tag)
}
function FilterPhotographers_events() {
    var tag = "events"
    FilterPhotographers(tag)
}
// MAIN FUNCTION
function FilterPhotographers(tag) {
    console.log("tag::", tag)
    RemovePhotographers()
    fetchData(tag)
}

function MediaFactory(data) {
    console.log("DataMedia :", data);
}
