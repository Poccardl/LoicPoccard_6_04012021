// IMPORT //
import FactoryMedia from "./FactoryMedia.class.js"

FirstFetchEvents()
FetchData("popularité", "all")

//TODO: add commentaire
function FetchData(sort_option, data_option) {
    /* Récupère les données des différents photographes dans le fichier "FisheEyeDataFR.json" et créer un objet pour chaque médias en utilisant le Factory Pattern avec MediasFactory(class).
    La fonction attend deux arguments non optionnel -> sort_option(String) et data_option(String) */
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        if (data_option == "all") {
            PhotographerInfosFactory(data["photographers"])
            let media_obj_list = new FactoryMedia(data["media"])
            MediasFactory(media_obj_list, sort_option)
        }
        else if (data_option == "media") {
            let media_obj_list = new FactoryMedia(data["media"])
            MediasFactory(media_obj_list, sort_option)
        }
    })
}

function FirstFetchEvents() {
    /* Permet de récupérer les différents noeuds existant dans le DOM du fichier "index.html".
    Mais aussi d'ajouter des Events */

    // DOM Elements
    const sortMedias = document.getElementById("sort_medias")
    const formData = document.querySelectorAll(".formData input");

    // Events
    sortMedias.addEventListener("click", function () {
        FetchData(sortMedias.value, "media")
    })
    formData.forEach((input) => input.addEventListener("change", function() {
        console.log("formData", input.id, ':', input.value)
    }))
    FetchEvents()
}

function FetchEvents() {
    /* Permet de récupérer les différents noeuds existant ainsi que ceux ajouter dynamiquement dans le DOM du fichier "index.html".
    Mais aussi d'ajouter des Events */

    // DOM Elements
    const contactModal = document.getElementById("contact")
    const closeContactModal = document.querySelector(".close")
    const sortMedias = document.getElementById("sort_medias")
    const openlightboxModal = document.querySelectorAll(".open_lightbox_modal")
    const closelightboxModal = document.querySelector(".close_lightbox_modal")

    // Events
    contactModal.addEventListener("click", OpenContactModal)
    sortMedias.addEventListener("change", function () {
        FetchData(sortMedias.value, "media")
    })
    openlightboxModal.forEach((link) => link.addEventListener("click", function () {
        let media_order = 0
        for (let element in openlightboxModal) {
            if (openlightboxModal[element] == link) {
                media_order = parseInt(element, 10)
            }
        }
        RemoveLightboxModal()
        AddLightboxModal(link)
        if (media_order == 0) {
            LeftSwitch(openlightboxModal.length -1)
            RightSwitch(media_order +1)
        }
        else if (media_order == openlightboxModal.length -1) {
            LeftSwitch(media_order -1)
            RightSwitch(0)
        } else {
            LeftSwitch(media_order -1)
            RightSwitch(media_order +1)
        }
    }));
    try {
        closeContactModal.addEventListener("click", CloseContactModal)
        closelightboxModal.addEventListener("click", function () {
            CloseLightboxModal()
        })
    } catch {
        //
    }
}

function FetchID() {
    /* Récupère l'id du photographe à l'aide d'une expression régulière */
    const regex_id = RegExp(/\d{0,3}$/)
    const photographer_id = regex_id.exec(document.URL)[0]
    return photographer_id
}

function FetchLikes() {
    /* Récupère le nombre de like pour chaque médias */

    //DOM Elements
    const addLikes = document.querySelectorAll(".fa-heart")

    // Events
    addLikes.forEach((link) => link.addEventListener("click", function() {
        let likes_order = 0
        for (let element in addLikes) {
            if (addLikes[element] == link) {
                likes_order = parseInt(element, 10)
            }
        }
        AddLikes(likes_order)
    }))
}

function RemoveMedias() {
    /* Supprime les cartes des médias */
    try {
        const mediasSection = document.querySelectorAll(".card")
        for (let element in mediasSection) {
            mediasSection[element].remove()
        }
    } catch {
        //
    }
}

function RemoveLikes() {
    /* Supprime les likes de la section photographer_infos_recap */
    try {
        const likesInfos = document.getElementById("likes")
        likesInfos.remove()
    } catch {
        //
    }
}

function RemoveLightboxModal() {
    /* Supprime le contenue de la lightbox_modal */
    try {
        const lightboxModalContent = document.querySelectorAll(".content_modal")
        for (let element in lightboxModalContent) {
            lightboxModalContent[element].remove()
        }
    } catch {
        //
    }
}

function PhotographerInfosFactory(data) {
    /* Récupère les informations du photographe
    La fonction attend un argument non optionnel -> data{} */
    const photographer_id = FetchID()
    const type = "price"
    let data_photographer = []
    for (let element in data) {
        if (data[element]["id"] == photographer_id) {
            data_photographer = {
                name: data[element]["name"],
                city: data[element]["city"],
                country: data[element]["country"],
                tags: data[element]["tags"],
                tagline: data[element]["tagline"],
                price: data[element]["price"],
                portrait: data[element]["portrait"],
            }
            AddPhotographerInfos(data_photographer)
        } else {
            continue
        }
    }
    AddPhotographerNameOnContactModal(data_photographer["name"])
    AddPhotographerInfosRecap(type, data_photographer["price"])
}

function MediasFactory(data, sort_option) {
    /* Récupérer les médias du photographe
    La fonction attend deux arguments non optionnel -> data{} sort_option(String) */
    const photographer_id = FetchID()
    const type = "likes"
    let likes = 0
    let medias_list = []
    for (let element in data) {
        if (data[element]["photographerId"] == photographer_id) {
            medias_list.push(data[element])
            likes += data[element]["likes"]
            }
        else {
            continue
        }
    }
    AddPhotographerInfosRecap(type, likes)
    sortMedias(medias_list, sort_option)
}

function sortMedias(medias_list, sort_option) {
    /* Définit l'ordre d'affichage des médias en fonction de critère prédéfini précédemment
    La fonction attend deux arguments non optionnel -> medias_list{} sort_option(String) */
    if (sort_option == "popularité") {
        medias_list.sort(function(a, b) {
            return a.likes-b.likes
        })
    }
    if (sort_option == "date") {
        medias_list.sort(function(a, b) {
            let dateA = new Date(a.date)
            let dateB = new Date(b.date)
            return dateA-dateB
        })
    }
    if (sort_option == "titre") {
        medias_list.sort(function(a, b) {
            let nameA = a.description.toLowerCase()
            let nameB = b.description.toLowerCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            else {
                return 0
            }
        })
    }
    AddMedias(medias_list)
}

function AddPhotographerInfos(data_photographer){
    /* Ajoute les informations du photographe
    La fonction attend un argument non optionnel -> data_photographer{} */
    const photographerInfosSection = document.getElementById("photographer_infos_section")
    let photographer_infos_html = `<div class="photographer_infos">
    <div>
    <h1>${data_photographer["name"]}</h1>
    <p>${data_photographer["city"]}, ${data_photographer["country"]}</p>
    <p>${data_photographer["tagline"]}</p>
    </div>
    <div>
    <img src="/data/Photographers_ID_Photos/${data_photographer["portrait"]}" alt="">
    </div>
    </div>
    <nav class="photographer_nav" role="navigation" aria-label="photographer categories">
    <ul>`
    let photographer_tags_html = ""
    for (let element in data_photographer["tags"]) {
        if (data_photographer["tags"][element] != "all") {
            photographer_tags_html += `<li class="${data_photographer["tags"][element]}">
            <a href="index.html?tag=${data_photographer["tags"][element]}">#${data_photographer["tags"][element]}</a>
            </li>`
        }
    }
    photographer_infos_html += `${photographer_tags_html}</ul></nav>`
    photographerInfosSection.insertAdjacentHTML("afterbegin", photographer_infos_html)
}

function AddMedias(data_medias) {
    /* Ajoute les médias du photographes
    La fonction attend un argument non optionnel -> data_medias{} */
    RemoveMedias()
    const mediasSection = document.getElementById("medias_container")
    let name = ""
    let media_tag_html = ""
    let medias_card_html = ""
    for (let element in data_medias) {
        if (data_medias[element].constructor.name == "Picture") {
            name = data_medias[element]["image"]
            media_tag_html = `<img class="image" src="data/media_${data_medias[element]["photographerId"]}/${name}" alt="${data_medias[element]["description"]}">`
        }
        else if (data_medias[element].constructor.name == "Video") {
            name = data_medias[element]["video"]
            const regex_name = RegExp(/(\w*).mp4/)
            const video_name = regex_name.exec(name)[1]
            media_tag_html = `<img class="video" src="data/media_${data_medias[element]["photographerId"]}/${video_name}.png" alt="${data_medias[element]["description"]}">`
        }
        medias_card_html = `<div class="card">
        <a class="open_lightbox_modal">${media_tag_html}</a>
        <div class="content">
        <p>${data_medias[element]["description"]}</p>
        <p>
        <span>${data_medias[element]["price"]}€</span>
        <span class="like">${data_medias[element]["likes"]}<i class="fas fa-heart"></i></span>
        </p>
        </div>
        </div>`
        mediasSection.insertAdjacentHTML("beforeend", medias_card_html)
    }
    FetchEvents()
    FetchLikes()
}

function AddPhotographerInfosRecap(type, number) {
    /* Ajoutes les informations dans la partie récap de la page
    La fonction attend deux arguments non optionnel ->  type(String) et number(Numbner) */
    const infosRecap = document.querySelector(".photographer_infos_recap")
    let html = ""
    if (type == "likes") {
        RemoveLikes()
        html = `<p id="likes">${number}<i class="fas fa-heart"></i></p>`
    }
    else if (type == "price") {
        html = `<p>${number} € / jour</p>`
    }
    infosRecap.insertAdjacentHTML("afterbegin", html)
}

function AddLikes(likes_order) {
    /* Ajoute un like au média et au total de like
    La fonction attend un argument non optionnel ->  likes_order(Number) */

    const likesNumber = document.querySelectorAll(".like")
    let media_like = likesNumber[likes_order].innerText
    media_like = Number(media_like) + 1
    likesNumber[likes_order].innerText = media_like
    likesNumber[likes_order].insertAdjacentHTML("beforeend", '<i class="fas fa-heart" aria-hidden="true"></i>')

    const totalLikes = document.getElementById("likes")
    let total_likes = Number(totalLikes.innerText) +1
    totalLikes.innerText = total_likes
    totalLikes.insertAdjacentHTML("beforeend", '<i class="fas fa-heart" aria-hidden="true"></i>')
}

function AddLightboxModal(data) {
    const lightboxModal = document.querySelector(".lightbox_modal")
    /* Ajoute le contenue de la lightbox modal
    La fonction attend un argument non optionnel -> data */
    let type = ReturnMediaType(data.innerHTML)
    let media_html = data.innerHTML
    if (type == "video") {
        let link = ReturnMediaLink(data.innerHTML)
        media_html = `<video controls width="250"><source src="${link}.mp4" type="video/mp4"></video>`
    }
    let media_title = ReturnAlt(data.innerHTML)
    let modal_html = `<div class="content_modal" aria-label="image closeup view">
    <div class="element">
    <a class="left_switch"><i class="fas fa-chevron-left"></i></a>
    ${media_html}
    <a class="right_switch"><i class="fas fa-chevron-right"></i></a>
    </div>
    <p class="element_title">${media_title}</p>
    <button class="close_lightbox_modal"><i class="fas fa-times"></i></button>
    </div>`
    lightboxModal.insertAdjacentHTML("beforeend", modal_html)
    OpenLightboxModal()
}

function AddPhotographerNameOnContactModal(photographer_name) {
    /* Ajoute le nom du photographe dans la modal de contact
    La fonction attend un argument non optionnel -> photographer_name(String) */
    const contactModalTitle = document.querySelector(".contact_modal_title")
    contactModalTitle.insertAdjacentHTML("beforeend", `<br>${photographer_name}`)
}

function OpenContactModal() {
    /* Ouvre la modal de contact */
    const openContactModal = document.querySelector(".contact_modal")
    openContactModal.style.display = "flex"
    FetchEvents()
}

function OpenLightboxModal() {
    /* Ouvre la lightbox modal */
    const lightboxModal = document.querySelector(".lightbox_modal")
    lightboxModal.style.display = "block";
    FetchEvents()
}

function LeftSwitch(media_order) {
    /* Affiche le média précedent
    La fonction attend un argument non optionnel -> media_order(Number) */
    const openlightboxModal = document.querySelectorAll(".open_lightbox_modal")
    const leftSwitch  = document.querySelector(".left_switch")
    leftSwitch.addEventListener("click", function() {
        RemoveLightboxModal()
        AddLightboxModal(openlightboxModal[media_order])
        if (media_order == 0) {
            LeftSwitch(openlightboxModal.length -1)
            RightSwitch(media_order +1)
        }
        else if (media_order == openlightboxModal.length -1) {
            LeftSwitch(media_order -1)
            RightSwitch(0)
        } else {
            LeftSwitch(media_order -1)
            RightSwitch(media_order +1)
        }
    })
}

function RightSwitch(media_order) {
    /* Affiche le média suivant
    La fonction attend un argument non optionnel -> media_order(Number) */
    const openlightboxModal = document.querySelectorAll(".open_lightbox_modal")
    const rightSwitch = document.querySelector(".right_switch")
    rightSwitch.addEventListener("click", function() {
        RemoveLightboxModal()
        AddLightboxModal(openlightboxModal[media_order])
        if (media_order == 0) {
            LeftSwitch(openlightboxModal.length -1)
            RightSwitch(media_order +1)
        }
        else if (media_order == openlightboxModal.length -1) {
            LeftSwitch(media_order -1)
            RightSwitch(0)
        } else {
            LeftSwitch(media_order -1)
            RightSwitch(media_order +1)
        }
    })
}

function CloseContactModal() {
    /* Ferme la modale de contact */
    const openContactModal = document.querySelector(".contact_modal")
    openContactModal.style.display = "none"
}

function CloseLightboxModal() {
    /* Ferme la lightbox modal */
    const lightboxModal = document.querySelector(".lightbox_modal")
    lightboxModal.style.display = "none";
}

function ReturnAlt(data) {
    /* Retourne l'attribut alt
    La fonction attend un argument non optionnel -> data(String) */
    const regex_alt = RegExp(/alt="([\sa-zA-Z0-9]{0,})"/)
    const alt = regex_alt.exec(data)[1]
    return alt
}

function ReturnMediaType(data) {
    /* Retourne le type d'un média
    La fonction attend un argument non optionnel -> data(String) */
    const regex_class = RegExp(/class="([_-\sa-zA-Z0-9]*)"/)
    const type = regex_class.exec(data)[1]
    return type
}

function ReturnMediaLink(data) {
    /* Retourne le link d'un média
    La fonction attend un argument non optionnel -> data(String) */
    const regex_link = RegExp(/src="([/_-\sa-zA-Z0-9]*).png"/)
    const link = regex_link.exec(data)[1]
    return link
}