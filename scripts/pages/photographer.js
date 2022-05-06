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

    media.forEach(m => {
        if (m.photographerId.toString() === photographer.id.toString()) {
            mediaForPhotographer.push(m);
        }
    });
    
    // verifier que la propriete video existe puis image
    mediaForPhotographer.forEach(m => {
        let type;
        if (m.video !== undefined) {
            type = "video";
        } else if (m.image !== undefined) {
            type = "image";
        }
        const media = new MediaFactory(m, type);
        mediaList.push(media);
    })

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