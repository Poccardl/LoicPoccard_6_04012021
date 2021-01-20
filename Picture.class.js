export default class Picture {
    constructor(media) {
        this.id = media.id;
        this.photographerId = media.photographerId;
        this.image = media.image;
        this.description = media.description;
        this.tags = media.tags;
        this.likes = media.likes;
        this.date = media.date;
        this.price = media.price;
    }
}