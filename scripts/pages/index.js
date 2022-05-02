    
    async function getPhotographers() {
        const { photographers } = await fetch("data/photographers.json")
            .then(data => data.json());
    
        let photographerList = [];
        photographers.forEach(photographer => {
            const photographerModel = photographerFactory(photographer);
            photographerList.push(photographerModel);
        })
        return photographerList;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const userCardDOM = photographer.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();

    