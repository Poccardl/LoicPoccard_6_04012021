fetchData()

//TODO: add commentaire
function fetchData() {
    fetch("./data/FishEyeDataFR.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        //TODO: A modifier plus tard !
        PhotographersFactory(data["photographers"]);
        MediaFactory(data["media"]);
    });
}

//TODO: add commentaire
function PhotographersFactory(data) {
    console.log("DataPhotographers :", data);
    for (var element in data) {
        console.log("ID :", data[element].id);
        const data_photographers = {
            name: data[element].name,
            id: data[element].id,
            city: data[element].city,
            country: data[element].country,
            tags: data[element].tags,
            tagline: data[element].tagline,
            price: data[element].price,
            portrait: data[element].portrait,
        }
        CreatePhotographers(data_photographers);
    }
}

//TODO: add commentaire
function CreatePhotographers(data_photographers) {
    // sélectionne la section #photographer_section
    const photographersSection = document.getElementById("photographer_section")

    let photographers_card_html = '<div class="card">' +
    '<a href="..."><img src="data/Photographers ID Photos/' + data_photographers["portrait"] + '" alt="" class="photographers_pp"></a>' +
    '<h2>' + data_photographers["name"] + '</h2>' +
    '<div class="content">' +
    '<h4>' + data_photographers["city"] + ', ' + data_photographers["country"] + '</h4>' +
    '<p>' + data_photographers["tagline"] + '</p>' +
    '<p>' + data_photographers["price"] + '€/jour</p>' +
    '<nav role="navigation" aria-label="photographer categories">' +
    '<ul classe="navigation_tags">';
    // ajoute les tags pour la navigation
    var photographers_tags_html = ""
    for (var element in data_photographers["tags"]) {
        photographers_tags_html = photographers_tags_html +
        '<li><a href="...">' +
        data_photographers["tags"][element] +
        '</a></li>';
    }
    photographers_card_html = photographers_card_html +
    photographers_tags_html +
    '</ul>' +
    '</nav>' +
    '</div>' +
    '</div>';

    // ajoute les cartes des différents photographes dans le code HTML
    photographersSection.insertAdjacentHTML("afterbegin", photographers_card_html)
}

function MediaFactory(data) {
    console.log("DataMedia :", data);
}
