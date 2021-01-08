//TODO: add commentaire
function FetchID() {
    // Récupère l'id du photographe à l'aide d'une expression régulière
    const regex_id = RegExp(/\d{0,3}$/)
    const photographer_id = regex_id.exec(document.URL)[0]
    return photographer_id
}

FetchData()

//TODO: add commentaire
function FetchData() {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        PhotographerInfosFactory(data["photographers"])
        MediasFactory(data["media"])
    })
}

function FetchEvents() {
    // DOM Elements
    // Events
}

//TODO: add commentaire
function PhotographerInfosFactory(data) {
    const photographer_id = FetchID()
    for (var element in data) {
        if (data[element]["id"] == photographer_id) {
            var data_photographer = {
                name: data[element]["name"],
                portrait: data[element]["portrait"],
                city: data[element]["city"],
                country: data[element]["country"],
                tags: data[element]["tags"],
                tagline: data[element]["tagline"],
            }
            AddPhotographerInfos(data_photographer)
        } else {
            continue
        }
    }
}

//TODO: add commentaire
function MediasFactory(data) {
    const photographer_id = FetchID()
    console.log("photographer_id AFTER FETCH", photographer_id)
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
        } else {
            continue
        }
        AddMedias(data_medias)
    }

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
    '</nav>'
    // ajoute les infos du photographe dans le code HTML
    photographerInfosSection.insertAdjacentHTML("afterbegin", photographer_infos_html)
}

//TODO: add commentaire
function AddMedias(data_medias) {
    const mediasSection = document.getElementById("medias_section")
    //console.log("DOM :", data_medias)
   let name = String
   if (data_medias["image"]) {
    name = data_medias["image"]
   } else {
    name = data_medias["video"]
   }
    let medias_card_html = '<div class="card">' +
    '<a href=""><img src="data/media_' + data_medias["photographerId"] + '/' + name + '" alt=""></a>' +
    '<div class="content">' +
    '<p>' + data_medias["description"] + '</p>' +
    '<p>' + data_medias["price"] + '€' + data_medias["likes"] + '<i class="fas fa-heart"></i></p>' +
    '</div>' +
    '</div>'
    //TODO: add commentaire
    mediasSection.insertAdjacentHTML("afterbegin", medias_card_html)
}