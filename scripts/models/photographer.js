export class Photographer {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }

    get name() {
        return this._name.toUpperCase();
    }
    set name(name) {
        this._name = name;
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get country() {
        return this._country;
    }
    set country(country) {
        this._country = country;
    }

    get tagline() {
        return this._tagline;
    }
    set tagline(tagline) {
        this._tagline = tagline;
    }

    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }

    get portrait() {
        return this._portrait;
    }
    set portrait(portrait) {
        this._portrait = portrait;
    }

}