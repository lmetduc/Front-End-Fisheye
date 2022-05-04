export class Image {
    constructor(data) {
        this.date = data.date;
        this.id = data.id;
        this.image = data.image;
        this.likes = data.likes;
        this.photographerId = data.photographerId;
        this.price = data.price;
        this.title = data.title;
    }

    getDate() {
        return this.date;
    }

    getId() {
        return this.id;
    }

    getImage() {
        return this.image;
    }

    getLikes() {
        return this.likes;
    }

    getPhotographerId() {
        return this.photographerId;
    }

    getPrice() {
        return this.price;
    }

    getTitle() {
        return this.title;
    }

}