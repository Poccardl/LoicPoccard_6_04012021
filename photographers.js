//TODO: add commentaire
function FetchID() {
    // Récupère l'id du photographe à l'aide d'une expression régulière
    const regex_id = RegExp(/\d{0,3}$/)
    const photographer_id = regex_id.exec(document.URL)[0]
    return photographer_id
}
FetchMediaData()

//TODO: add commentaire
function FetchMediaData() {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        //console.log("media Data ->", data["media"])
        MediasFactory(data["media"])
    })
}

function FetchEvents() {
    // DOM Elements
    // Events
}

//TODO: add commentaire
function MediasFactory(data) {
    //TODO: call FetchID
    const photographer_id = FetchID()
    console.log("photographer_id AFTER FETCH", photographer_id)
    for (var element in data) {
        if (data[element]["photographerId"] == photographer_id) {
            var data_medias = {
                id: data[element]["id"],
                photographerId: data[element]["photographerId"],
                image: data[element]["image"],
                video: data[element]["video"],
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
function AddMedias(data_medias) {
    //console.log("DOM :", data_medias)
}