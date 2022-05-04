import { PhotographerCard } from "../templates/photographerCard.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import { MediaFactory } from "../factories/mediaFatory.js";

//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer() {
    const { photographers } = await fetch("data/photographers.json")
    .then(photographers => photographers.json());

    const params = (new URL(document.location)).searchParams;
    const id = params.get("id");
    const photographerData = photographers.find(photographer => photographer.id.toString() === id.toString());
    const photographer = new PhotographerFactory(photographerData, 'json');

    return photographer;
}

async function getMediaFromPhotographer(photographer) {
    let mediaList = [];

    const { media } = await fetch("data/photographers.json")
    .then(photographers => photographers.json());

    let mediaForPhotographer = [];

    for(let i = 0; i < media.length; i++) {
        if (media[i].photographerId.toString() === photographer.id.toString()) {
            mediaForPhotographer.push(media[i]);
        }
    }

    for(let i = 0; i < mediaForPhotographer.length; i++) {
        let type;
        if (mediaForPhotographer[i].video !== undefined) {
            type = "video";
        } else if (mediaForPhotographer[i].image !== undefined) {
            type = "image";
        }
        const media = new MediaFactory(mediaForPhotographer[i], type);
        mediaList.push(media);
    }

    return mediaList;
}

async function init() {
    const photographer = await getPhotographer();
    const media = await getMediaFromPhotographer(photographer);
    console.log(media);

    const photographerCard = new PhotographerCard(photographer)
    const userCardDOM = photographerCard.getUserCardDOM();
    const photographHeader = document.querySelector('.photograph-header')
    photographHeader.appendChild(userCardDOM);

};

init();