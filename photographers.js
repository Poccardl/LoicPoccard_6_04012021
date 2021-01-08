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
        AddMediasCards(data_medias)
    }

}

//TODO: add commentaire
function AddPhotographerSection(){
    /*
    <div class="photographer_infos">
        <div>
            <h1>Lodddîc POHD</h1>
            <p>Rouen, France</p>
            <p>Voir le beau dans la vie</p>
        </div>
        <div>
            <img src="/data/Photographers ID Photos/EllieRoseWilkens.jpg" alt="">
        </div>
    </div>
    <nav role="navigation" aria-label="photographer categories">
        <ul>
            <li class="travel">#Travel</li>
            <li class="sport">#Sport</li>
            <li class="animals">#Animals</li>
        </ul>
    </nav>
    */
}

//TODO: add commentaire
function AddMediasCards(data_medias) {
    console.log("DOM :", data_medias)
    /*
    <div class="card">
        <a href=""><img src="data/Mimi/Event_PintoWedding.jpg" alt=""></a>
        <div class="content">
            <p>Solitude</p>
            <p>70€  12<i class="fas fa-heart"></i></p>
        </div>
    </div>
    */
    let medias_card_html = '' +
    ''
    console.log(medias_card_html)
}