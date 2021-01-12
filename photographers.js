//TODO: add commentaire
function FetchID() {
    // Récupère l'id du photographe à l'aide d'une expression régulière
    const regex_id = RegExp(/\d{0,3}$/)
    const photographer_id = regex_id.exec(document.URL)[0]
    return photographer_id
}

//TODO: rework code structure
FetchEvents("first_load")
FetchData("popularité", "all")

//TODO: add commentaire
function FetchData(sort_option, data_option) {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        if (data_option == "all") {
            PhotographerInfosFactory(data["photographers"])
            MediasFactory(data["media"], sort_option)
        }
        else if (data_option == "media") {
            MediasFactory(data["media"], sort_option)
        }
    })
}

function FetchEvents(first_load) {
    if (first_load) {
        // DOM Elements
        const sortMedias = document.getElementById("sort_medias")
        // Events
        sortMedias.addEventListener("click", function () {
        console.log("sortMedias.value ::", sortMedias.value)
        //TODO: add commentaire
        RemoveMedias()
        RemoveLikes()
        FetchData(sortMedias.value, "media")
    })
    } else {
        // DOM Elements
        const sortMedias = document.getElementById("sort_medias")
        const lightboxModal = document.querySelector(".lightbox_modal")
        const openlightboxModal = document.querySelectorAll(".open_lightbox_modal")
        const closelightboxModal = document.querySelector(".close_lightbox_modal")

        // Events
        sortMedias.addEventListener("click", function () {
            console.log("sortMedias.value ::", sortMedias.value)
            //TODO: add commentaire
            RemoveMedias()
            RemoveLikes()
            FetchData(sortMedias.value, "media")
        })
        openlightboxModal.forEach((link) => link.addEventListener("click", OpenLightboxModal));
        closelightboxModal.addEventListener("click", function () {
            CloseLightboxModal(lightboxModal)
        })
    }
}

function RemoveMedias() {
    try {
        const mediasSection = document.querySelectorAll(".card")
        console.log("mediasSection", mediasSection)
        for (var element in mediasSection) {
            console.log("element", mediasSection[element])
            mediasSection[element].remove()
        }
    } catch {
        //
    }
}

function RemoveLikes() {
    try {
        const likesInfos = document.getElementById("likes")
        likesInfos.remove()
    } catch {
        //
    }
}


//TODO: add commentaire
function PhotographerInfosFactory(data) {
    const photographer_id = FetchID()
    const type = "price"
    for (var element in data) {
        if (data[element]["id"] == photographer_id) {
            var data_photographer = {
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
    //TODO: add commentaire
    AddPhotographerInfosRecap(type, data_photographer["price"])
}

//TODO: add commentaire
function MediasFactory(data, sort_option) {
    console.log("sort_option ::", sort_option)
    const photographer_id = FetchID()
    console.log("photographer_id AFTER FETCH", photographer_id)
    const type = "likes"
    let likes = 0
    let medias_list = []
    for (var element in data) {
        if (data[element]["photographerId"] == photographer_id) {
            var data_medias = {
                id: data[element]["id"],
                photographerId: data[element]["photographerId"],
                image: data[element]["image"],
                video: data[element]["video"],
                description: data[element]["description"],
                tag: data[element]["tag"],
                likes: data[element]["likes"],
                date: data[element]["date"],
                price: data[element]["price"],
            }
            likes += data[element]["likes"]
        } else {
            continue
        }
        medias_list.push(data_medias)
        //AddMedias(data_medias)
    }
    //TODO: add commentaire
    AddPhotographerInfosRecap(type, likes)
    //AddMedias(ma_liste, sort_option)
    //console.log("before", medias_list)
    sortMedias(medias_list, sort_option)
}

//TODO: add commentaire
function sortMedias(medias_list, sort_option) {
    if (sort_option == "popularité") {
        console.log(sort_option)
        medias_list.sort(function(a, b) {
            return a.likes-b.likes
        })
    }
    if (sort_option == "date") {
        console.log(sort_option)
        medias_list.sort(function(a, b) {
            var dateA = new Date(a.date)
            var dateB = new Date(b.date)
            return dateA-dateB
        })
    }
    if (sort_option == "titre") {
        console.log(sort_option)
        medias_list.sort(function(a, b) {
            var nameA = a.description.toLowerCase()
            var nameB = b.description.toLowerCase()
            console.log(nameA, nameB)
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
    //console.log("after sort", medias_list)
    AddMedias(medias_list)
}

//TODO: add commentaire
function AddPhotographerInfos(data_photographer){
   console.log("data_photographer[image]", data_photographer["image"])
    const photographerInfosSection = document.getElementById("photographer_infos_section")
    let photographer_infos_html = '<div class="photographer_infos">' +
    '<div>' +
    '<h1>' + data_photographer["name"] + ' </h1>' +
    '<p>' + data_photographer["city"] + ',' + data_photographer["country"] + '</p>' +
    '<p>' + data_photographer["tagline"] + '</p>' +
    '</div>' +
    '<div>' +
    '<img src="/data/Photographers ID Photos/' + data_photographer["portrait"] + '" alt="">' +
    '</div>' +
    '</div>' +
    '<nav role="navigation" aria-label="photographer categories">' +
    '<ul>'
    var photographer_tags_html = ""
    for (var element in data_photographer["tags"]) {
        photographer_tags_html = photographer_tags_html +
        '<li class="' + data_photographer["tags"][element] + '">#' +
        data_photographer["tags"][element] +
        '</li>'
    }
    photographer_infos_html =  photographer_infos_html +
    photographer_tags_html +
    '</ul>' +
    '</nav>' +
    ''
    // ajoute les infos du photographe dans le code HTML
    photographerInfosSection.insertAdjacentHTML("afterbegin", photographer_infos_html)
}

//TODO: add commentaire
function AddMedias(data_medias) {
    const mediasSection = document.getElementById("medias_container")
    console.log("DOM :", data_medias)

    for (var element in data_medias) {
        let name = String
    if (data_medias[element]["image"]) {
        name = data_medias[element]["image"]
    } else {
        name = data_medias[element]["video"]
    }
        let medias_card_html = '<div class="card">' +
        '<a class="open_lightbox_modal"><img src="data/media_' + data_medias[element]["photographerId"] + '/' + name + '" alt=""></a>' +
        '<div class="content">' +
        '<p>' + data_medias[element]["description"] + '</p>' +
        '<p>' + data_medias[element]["price"] + '€' + data_medias[element]["likes"] + '<i class="fas fa-heart"></i></p>' +
        '</div>' +
        '</div>'
        //TODO: add commentaire
        mediasSection.insertAdjacentHTML("beforeend", medias_card_html)
    }
    //TEST
    FetchEvents()
}

//TODO: add commentaire
function OpenLightboxModal() {
    const lightboxModal = document.querySelector(".lightbox_modal")
    lightboxModal.style.display = "block";
    console.log("JE PASSE BIEN ICI")
    //NEED : chemin de l'image
    // prev img -> next img
    // titre de l'image

    /*
    <div class="content">
        <div class="element">
            <a class="left_switch" href=""><i class="fas fa-chevron-left"></i></a>
            <img src="data/media_82/Art_Triangle_Man.jpg" alt="">
            <a class="right_switch" href=""><i class="fas fa-chevron-right"></i></a>
        </div>
        <p class="element_title">Titre</p>
        <button class="close_modal"><i class="fas fa-times"></i></button>
    </div>
     */
}

//TODO: add commentaire
function CloseLightboxModal(lightboxModal) {
    lightboxModal.style.display = "none";
}


//TODO: add commentaire
function AddPhotographerInfosRecap(type, data) {
    const infosRecap = document.querySelector(".photographer_infos_recap")
    let html = ""
   if (type == "likes") {
    html = '<p id="likes">' + data + '<i class="fas fa-heart"></i></p>'
   }
   else if (type == "price") {
    html = '<p>' + data + '€ / jour</p>'
   }
   infosRecap.insertAdjacentHTML("afterbegin", html)
}