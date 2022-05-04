import { Photographer } from "../models/photographer.js";

export class PhotographerFactory {
    constructor(data, type) {
        if (type === 'json') {
            return new Photographer(data);
        } else {
            console.log('la factory photographer ne connait pas le type' + type);
        }
    }
}