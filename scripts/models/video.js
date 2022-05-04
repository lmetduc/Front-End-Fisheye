export class Video {
    constructor(data) {
        this.date = data.date;
        this.id = data.id;
        this.likes = data.likes;
        this.photographerId = data.photographerId;
        this.price = data.price;
        this.title = data.title;
        this.video = data.video;
    }
    
    getDate() {
        return this.date;
    }

    getId() {
        return this.id;
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

    getVideo() {
        return this.video;
    }

}