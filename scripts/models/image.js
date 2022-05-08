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

    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }

    get likes() {
        return this._likes;
    }
    set likes(likes) {
        this._likes = likes;
    }

    get photographerId() {
        return this._photographerId;
    }
    set photographerId(photographerId) {
        this._photographerId = photographerId;
    }

    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

}