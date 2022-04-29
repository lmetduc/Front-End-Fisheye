//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const data = fetch("data/photographers.json")
    .then(photographers => photographers.json())
    return data;
}

async function init() {

    // Récupère les datas des photographes
    const params = (new URL(document.location)).searchParams;
    const id = params.get("id");
    const { photographers } = await getPhotographers();
    const photographer = photographers.find(photographer => photographer.id.toString() === id.toString());
    console.log(photographer);
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    const photographHeader = document.querySelector('.photograph-header')
    photographHeader.appendChild(userCardDOM);

};

init();