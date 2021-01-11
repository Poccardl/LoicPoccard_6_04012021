//TODO: add commentaire
function FetchID() {
    // Récupère l'id du photographe à l'aide d'une expression régulière
    const regex_id = RegExp(/\d{0,3}$/)
    const photographer_id = regex_id.exec(document.URL)[0]
    return photographer_id
}

//TODO: rework code structure
FetchEvents()
FetchData("popularité")

//TODO: add commentaire
function FetchData(sort_option) {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        PhotographerInfosFactory(data["photographers"])
        MediasFactory(data["media"], sort_option)
    })
}

function FetchEvents() {
    // DOM Elements
    const sortMedias = document.getElementById("sort_medias")
    // Events
    sortMedias.addEventListener("click", function () {
        console.log("sortMedias.value ::", sortMedias.value)
        //TODO: call resetMedia()
        FetchData(sortMedias.value)
    })
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
    if (sort_option == "description") {
        console.log(sort_option)
        medias_list.sort(function(a, b) {
            var nameA = a.description.toLowerCase()
            var nameB = b.description.toLowerCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
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
    const mediasSection = document.getElementById("medias_section")
    console.log("DOM :", data_medias)
    for (var element in data_medias) {
        let name = String
    if (data_medias[element]["image"]) {
        name = data_medias[element]["image"]
    } else {
        name = data_medias[element]["video"]
    }
        let medias_card_html = '<div class="card">' +
        '<a href=""><img src="data/media_' + data_medias[element]["photographerId"] + '/' + name + '" alt=""></a>' +
        '<div class="content">' +
        '<p>' + data_medias[element]["description"] + '</p>' +
        '<p>' + data_medias[element]["price"] + '€' + data_medias[element]["likes"] + '<i class="fas fa-heart"></i></p>' +
        '</div>' +
        '</div>'
        //TODO: add commentaire
        mediasSection.insertAdjacentHTML("beforeend", medias_card_html)
    }
}

//TODO: add commentaire
function AddPhotographerInfosRecap(type, data) {
    const infosRecap = document.querySelector(".photographer_infos_recap")
    let html = ""
   if (type == "likes") {
    html = '<p>' + data + '<i class="fas fa-heart"></i></p>'
   }
   else if (type == "price") {
    html = '<p>' + data + '€ / jour</p>'
   }
   infosRecap.insertAdjacentHTML("afterbegin", html)
}
