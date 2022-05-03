import { Photographer } from "../models/photographer.js";

export class PhotographerFactory {
    constructor(data, type) {
        if (type === 'json') {
            return new Photographer(data);
        } else {
            console.log ('la factory photogrpaher ne connait pas le type' + type);
        }
    }
}