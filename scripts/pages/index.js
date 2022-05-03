import { PhotographerCard } from "../templates/photographerCard.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";

async function getPhotographers() {
    const { photographers } = await fetch("data/photographers.json")
        .then(data => data.json());

    let photographerList = [];
    photographers.forEach(photographer => {
        const photographerModel = new PhotographerFactory(photographer, 'json');
        photographerList.push(photographerModel);
    })
    return photographerList;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerCard = new PhotographerCard(photographer)
        const userCardDOM = photographerCard.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();

    