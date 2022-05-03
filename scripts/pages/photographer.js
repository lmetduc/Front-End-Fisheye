//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer() {
    const { photographers } = await fetch("data/photographers.json")
    .then(photographers => photographers.json())

    const params = (new URL(document.location)).searchParams;
    const id = params.get("id");
    const photographerData = photographers.find(photographer => photographer.id.toString() === id.toString());
    const photographer = photographerFactory(photographerData);

    return photographer;
}

async function init() {
    const photographer = await getPhotographer();
    // Récupère les datas des photographes
    const userCardDOM = photographer.getUserCardDOM();
    const photographHeader = document.querySelector('.photograph-header')
    photographHeader.appendChild(userCardDOM);

};

init();