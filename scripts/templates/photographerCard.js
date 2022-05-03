export class PhotographerCard {
    constructor(photographer) {
        this.photographer = photographer;
    }

    getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.classList.add('profile');
        
        const picture = `assets/photographers/Photographers ID Photos/${this.photographer.portrait}`;
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = this.photographer.name;

        const photographerLink = document.createElement ('a');
        photographerLink.href = "photographer.html?id="+this.photographer.id;
        article.appendChild(photographerLink);
        photographerLink.appendChild(img);
        photographerLink.appendChild(h2);
        
        
        const p = document.createElement ('p');
        const locationSpan = document.createElement ('span');
        locationSpan.textContent = this.photographer.city + ", " + this.photographer.country;
        locationSpan.classList.add('location');
        p.appendChild(locationSpan);


        const taglineSpan = document.createElement ('span');
        taglineSpan.classList.add('tagline');
        taglineSpan.textContent = this.photographer.tagline;
        p.appendChild(taglineSpan);

        const priceSpan = document.createElement ('span');
        priceSpan.classList.add('price');
        priceSpan.textContent = this.photographer.price + "€/jour";
        p.appendChild(priceSpan);

        article.appendChild(p); 

        return (article);
    }
}