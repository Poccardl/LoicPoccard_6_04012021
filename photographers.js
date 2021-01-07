//__--__\\
FetchData()

//TODO: add commentaire
function FetchData() {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        console.log("media Data ->", data["media"])
    })
}

//TODO: Afficher les valeurs qui correspondent au photographe