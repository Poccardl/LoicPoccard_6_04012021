fetchEvents()
let type = fetchTag()
fetchPhotographersData(type)

// Écoute les pressions du clavier
document.addEventListener("keyup", function(e) {
    if (e.key == "Enter") {
        e.target.click()
    }
})

function fetchEvents() {
    /* Récupère les différents noeuds dans le DOM du fichier "index.html"
    Mais aussi d'ajouter des Events */

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
    window.addEventListener("scroll", scrollLink)
    portailNavigation.forEach((link) => link.addEventListener("click", filterPhotographersPortrait))
    artNavigation.forEach((link) => link.addEventListener("click", filterPhotographersArt))
    fashionNavigation.forEach((link) => link.addEventListener("click", filterPhotographersFashion))
    architectureNavigation.forEach((link) => link.addEventListener("click", filterPhotographersArchitecture))
    travelNavigation.forEach((link) => link.addEventListener("click", filterPhotographersTravel))
    sportNavigation.forEach((link) => link.addEventListener("click", filterPhotographersSport))
    animalsNavigation.forEach((link) => link.addEventListener("click", filterPhotographersAnimals))
    eventsNavigation.forEach((link) => link.addEventListener("click", filterPhotographersEvents))
}

function fetchTag() {
    /* Récupère le tag des photographes à afficher à l'aide d'une expression régulière */
    const regex_tag = RegExp(/\w{0,}$/)
    const photographer_tag = regex_tag.exec(document.URL)[0]
    return photographer_tag
}

/* Définit le tag sélectionné */
function filterPhotographersPortrait() {
    fetchPhotographersData("portrait")
}
function filterPhotographersArt() {
    fetchPhotographersData("art")
}
function filterPhotographersFashion() {
    fetchPhotographersData("fashion")
}
function filterPhotographersArchitecture() {
    fetchPhotographersData("architecture")
}
function filterPhotographersTravel() {
    fetchPhotographersData("travel")
}
function filterPhotographersSport() {
    fetchPhotographersData("sport")
}
function filterPhotographersAnimals() {
    fetchPhotographersData("animals")
}
function filterPhotographersEvents() {
    fetchPhotographersData("events")
}

function fetchPhotographersData(type) {
    /* Récupère les données des différents photographes dans le fichier "FisheEyeDataFR.json".
    La fonction attend un argument non optionnel -> type(String) */
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        if (type == "html") {
            type = "all"
        }
        removePhotographers()
        photographersFactory(data["photographers"], type)
        fetchEvents()
    })
}

function photographersFactory(data, type) {
    /* Récupère les informations du photographe
    La fonction attend deux arguments non optionnel -> data{} et type(String) */
    let data_photographers = {}
    for (let element in data) {
        // permet de filtrer les photographes à afficher en fonction de leurs tags
        if (data[element].tags.includes(type)) {
            data_photographers = {
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
        addPhotographersCards(data_photographers)
    }
}

function addPhotographersCards(data_photographers) {
    /* Ajoute les cartes html des différents photographes à la page index.html
    La fonction attend un argument non optionnel -> data_photographers{} */
    const photographersSection = document.getElementById("photographer_section")
    let photographers_card_html = `<div class="card">
    <a class="photographers_link" href="photographers-page.html?id=${data_photographers["id"]}"><img src="data/Photographers_ID_Photos/${data_photographers["portrait"]}" alt="Photo de ${data_photographers["name"]}" class="photographers_pp" tabindex="0">
    <h2>${data_photographers["name"]}</h2></a>
    <div class="content">
    <p class="location">${data_photographers["city"]}, ${data_photographers["country"]}</p>
    <p>${data_photographers["tagline"]}</p>
    <p class="price">${data_photographers["price"]}€/jour</p>
    <nav class="index_nav" role="navigation" aria-label="photographer categories">
    <ul>`
    // ajoute les tags pour la navigation
    let photographers_tags_html = ""
    for (let element in data_photographers["tags"]) {
        if (data_photographers["tags"][element] != "all") {
            photographers_tags_html += `<li class="${data_photographers["tags"][element]}" tabindex="0">#${data_photographers["tags"][element]}</li>`
        }
    }
    photographers_card_html += `${photographers_tags_html}</ul></nav></div></div>`
    photographersSection.insertAdjacentHTML("afterbegin", photographers_card_html)
}

function removePhotographers() {
    /* Supprime les cartes des photographes du code html */
    try {
        const photographersSection = document.querySelectorAll(".card")
        for (let element in photographersSection) {
            photographersSection[element].remove()
        }
    } catch {
        console.log("code error: remove photographersSection")
    }
}

function scrollLink() {
    /* Affiche le button "Passer au contenu" lors d'un scroll vers le bas de la page index.html */
    const dynamicDisplay = document.querySelector(".dynamic_display")
    if (window.scrollY > 20) {
        dynamicDisplay.style.display = "block"
    } else {
        dynamicDisplay.style.display = "none"
    }
}