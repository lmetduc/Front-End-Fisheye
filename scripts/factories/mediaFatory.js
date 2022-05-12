import { Image } from "../models/image.js";
import { Video } from "../models/video.js";

// cree un image ou une video en fonction du type
export class MediaFactory {
    constructor(data, type) {
        if (type === 'image') {
            return new Image(data);
        } else if (type === 'video') {
            return new Video(data)
        } else {
            console.log('la factory media ne connait pas le type' + type);
        }
    }
}