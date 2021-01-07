
//TODO: add commentaire
function FetchMediaData(photographer_id) {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        console.log("media Data ->", data["media"])
        MediasFactory(data["media"], photographer_id)
    })
}

// Récupère l'id du photographe à afficher sur la page
function GetPhotographersID(photographer_id) {
    FetchMediaData(photographer_id)
}

//TODO: add commentaire
function MediasFactory(data, photographer_id) {
    console.log("data", data, "en fonction de :", photographer_id)
    // Récupère les médias liés à l'id du photographe (photographer_id)
    for (var element in data) {
        //console.log(data[element])
        //console.log(data[element]["photographerId"])
        if (data[element]["photographerId"] == photographer_id) {
            console.log(photographer_id, "::", data[element])
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
        console.log("data-medias :\n", data_medias)
        //call de la function qui ajoute les cards htlm
        AddMedias(data_medias)
    }

}

//TODO: add commentaire
function AddMedias(data_medias) {
    console.log("DOM :", data_medias)
}