import { Photographer } from "../models/photographer.js";
// Photographer factory permet de creer un photographe si le type est json
export class PhotographerFactory {
    constructor(data, type) {
        if (type === 'json') {
            return new Photographer(data);
        } else {
            console.log('la factory photographer ne connait pas le type' + type);
        }
    }
}