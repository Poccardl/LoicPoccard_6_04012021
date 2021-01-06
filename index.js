//__--__\\
Factory("all", "photographers")

// DOM Elements
const portraitNavigation = document.querySelector(".portrait")
const artNavigation = document.querySelector(".art")
const fashionNavigation = document.querySelector(".fashion")
const architectureNavigation = document.querySelector(".architecture")
const travelNavigation = document.querySelector(".travel")
const sportNavigation = document.querySelector(".sport")
const animalsNavigation = document.querySelector(".animals")
const eventsNavigation = document.querySelector(".events")


// Events
portraitNavigation.addEventListener("click", FilterPhotographers_portrait)
artNavigation.addEventListener("click", FilterPhotographers_art)
fashionNavigation.addEventListener("click", FilterPhotographers_fashion)
architectureNavigation.addEventListener("click", FilterPhotographers_architecture)
travelNavigation.addEventListener("click", FilterPhotographers_travel)
sportNavigation.addEventListener("click", FilterPhotographers_sport)
animalsNavigation.addEventListener("click", FilterPhotographers_animals)
eventsNavigation.addEventListener("click", FilterPhotographers_events)


//TODO: add commentaire
function Factory(tag, type) {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        console.log(data)
        console.log(type)
        if (type == "photographers") {
            RemovePhotographers()
            PhotographersFactory(data["photographers"], tag)
        }
        else if (type == "media") {
            MediaFactory(data["media"])
        }
    })
}

//TODO: add commentaire
function RemovePhotographers() {
    try {
        const photographersSection = document.querySelectorAll(".card")
        for (var element in photographersSection) {
            photographersSection[element].remove()
        }
    } catch (error){
        console.error("RemovePhotographers : failed")
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
        CreatePhotographers(data_photographers)
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
    '<ul>'
    // ajoute les tags pour la navigation
    var photographers_tags_html = ""
    for (var element in data_photographers["tags"]) {
        if (data_photographers["tags"][element] != "all") {
            photographers_tags_html = photographers_tags_html +
            '<li class="' + data_photographers["tags"][element] + '" >#' +
            data_photographers["tags"][element] +
            '</li>'
        }
    }
    photographers_card_html = photographers_card_html +
    photographers_tags_html +
    '</ul>' +
    '</nav>' +
    '</div>' +
    '</div>'

    // ajoute les cartes des différents photographes dans le code HTML
    photographersSection.insertAdjacentHTML("afterbegin", photographers_card_html)
}

function FilterPhotographers_portrait() {
    Factory("portrait", "photographers")
}
function FilterPhotographers_art() {
    Factory("art", "photographers")
}
function FilterPhotographers_fashion() {
    Factory("fashion", "photographers")
}
function FilterPhotographers_architecture() {
    Factory("architecture", "photographers")
}
function FilterPhotographers_travel() {
    Factory("travel", "photographers")
}
function FilterPhotographers_sport() {
    Factory("sport", "photographers")
}
function FilterPhotographers_animals() {
    Factory("animals", "photographers")
}
function FilterPhotographers_events() {
    Factory("events", "photographers")
}

function MediaFactory(data) {
    console.log("DataMedia :", data)
}
