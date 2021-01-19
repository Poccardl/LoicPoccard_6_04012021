function FetchTag() {
    // Récupère le tag des photographes à afficher à l'aide d'une expression régulière
    const regex_tag = RegExp(/\w{0,}$/)
    const photographer_tag = regex_tag.exec(document.URL)[0]
    console.log("photographer_tag :", photographer_tag)
    return photographer_tag
}
var type = FetchTag()

FetchEvents()
FetchPhotographersData(type)

//TODO: add commentaire
function FetchPhotographersData(tag) {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        if (tag == "html") {
            tag = "all"
        }
        console.log("photographers Data ->", data["photographers"])
        RemovePhotographers()
        PhotographersFactory(data["photographers"], tag)
        FetchEvents()
    })
}

//TODO: add commentaire
function FetchEvents() {
    // DOM Elements
    const portailNavigation = document.querySelectorAll(".portrait")
    const artNavigation = document.querySelectorAll(".art")
    const fashionNavigation = document.querySelectorAll(".fashion")
    const architectureNavigation = document.querySelectorAll(".architecture")
    const travelNavigation = document.querySelectorAll(".travel")
    const sportNavigation = document.querySelectorAll(".sport")
    const animalsNavigation = document.querySelectorAll(".animals")
    const eventsNavigation = document.querySelectorAll(".events")

    // Events
    portailNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_portrait));
    artNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_art));
    fashionNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_fashion));
    architectureNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_architecture));
    travelNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_travel));
    sportNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_sport));
    animalsNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_animals));
    eventsNavigation.forEach((link) => link.addEventListener("click", FilterPhotographers_events));
}

//TODO: add commentaire
function PhotographersFactory(data, tag) {
    for (var element in data) {
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
        AddPhotographersCards(data_photographers)
    }
}

//TODO: add commentaire
function AddPhotographersCards(data_photographers) {
    // sélectionne la section #photographer_section
    const photographersSection = document.getElementById("photographer_section") // TODO: à un autre endroit dans le code ??

    let photographers_card_html = '<div class="card">' +
    '<a class="photographers_link" href="photographers-page.html?id=' + data_photographers["id"] + '"><img src="data/Photographers ID Photos/' + data_photographers["portrait"] + '" alt="" class="photographers_pp"></a>' +
    '<h2>' + data_photographers["name"] + '</h2>' +
    '<div class="content">' +
    '<h4>' + data_photographers["city"] + ', ' + data_photographers["country"] + '</h4>' +
    '<p>' + data_photographers["tagline"] + '</p>' +
    '<p>' + data_photographers["price"] + '€/jour</p>' +
    '<nav class="index_nav" role="navigation" aria-label="photographer categories">' +
    '<ul>'
    // ajoute les tags pour la navigation
    var photographers_tags_html = ""
    for (var element in data_photographers["tags"]) {
        if (data_photographers["tags"][element] != "all") {
            photographers_tags_html = photographers_tags_html +
            '<li class="' + data_photographers["tags"][element] + '">#' +
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


function FilterPhotographers_portrait() {
    FetchPhotographersData("portrait")
}
function FilterPhotographers_art() {
    FetchPhotographersData("art")
}
function FilterPhotographers_fashion() {
    FetchPhotographersData("fashion")
}
function FilterPhotographers_architecture() {
    FetchPhotographersData("architecture")
}
function FilterPhotographers_travel() {
    FetchPhotographersData("travel")
}
function FilterPhotographers_sport() {
    FetchPhotographersData("sport")
}
function FilterPhotographers_animals() {
    FetchPhotographersData("animals")
}
function FilterPhotographers_events() {
    FetchPhotographersData("events")
}
