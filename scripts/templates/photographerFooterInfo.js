export class PhotographerFooterInfo {
    constructor(photographer, medias) {
      this.photographer = photographer;
      this.medias = medias;
    }
  
    displayPhotographerFooterInfo() {
        const container = document.createElement("div");
        container.classList.add("photographer-info-container");

        const likesCount = document.createElement("div");
        
        const likesCountSpan = document.createElement("span");
        likesCountSpan.classList.add("total-likes");

        let likes = 0;
        this.medias.forEach(m => {
            likes += m.likes;
        })

        likesCountSpan.innerHTML = likes;

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-solid", "fa-heart");

        likesCount.appendChild(likesCountSpan);
        likesCount.appendChild(heartIcon);

        const priceSpan = document.createElement("span");
        priceSpan.classList.add("info-price");
        priceSpan.textContent = this.photographer.price + "€/jour";

        container.appendChild(likesCount);
        container.appendChild(priceSpan);

        return container;
    }
}