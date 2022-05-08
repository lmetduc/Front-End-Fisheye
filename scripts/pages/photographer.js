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

    const medias = await fetch("data/photographers.json")
    .then(photographers => photographers.json())
    .then(photographers => photographers.media);

    let mediaForPhotographer = [];

    medias.forEach(item => {
        if (item.photographerId.toString() === photographer.id.toString()) {
            mediaForPhotographer.push(item);
        }
    });
    
    // verifier que la propriete video existe puis image
    mediaForPhotographer.forEach(item => {
        const type = getMediaType(item);
        const media = new MediaFactory(item, type);
        mediaList.push(media);
    })

    return mediaList;
}

function getMediaType(media) {
    if (media.video !== undefined) {
        return "video";
    } else if (media.image !== undefined) {
        return "image";
    }
    return undefined
}

async function init() {
    const photographer = await getPhotographer();
    const medias = await getMediaFromPhotographer(photographer);
    console.log(medias);
// Remplissage du header avec les donnees photographes
    const photographerCard = new PhotographerCard(photographer)
    const userCardDOM = photographerCard.getUserCardDOM();
    const photographHeader = document.querySelector('.photograph-header')
    photographHeader.appendChild(userCardDOM);
// Remplissage du header avec les donnees media
// Recuperer ou le mettre dans le dom
// Parcourir les medias avec forEach et à chaque media on va ajouter la ou le dom se situe
};

init();