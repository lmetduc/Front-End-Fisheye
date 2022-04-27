function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        
        const p = document.createElement ('p');
        const locationSpan = document.createElement ('span');
        locationSpan.textContent = city + ", " + country;
        locationSpan.classList.add('location');
        p.appendChild(locationSpan);


        const taglineSpan = document.createElement ('span');
        taglineSpan.classList.add('tagline');
        taglineSpan.textContent = tagline;
        p.appendChild(taglineSpan);

        const priceSpan = document.createElement ('span');
        priceSpan.classList.add('price');
        priceSpan.textContent = price + "€/jour";
        p.appendChild(priceSpan);

        article.appendChild(p); 

        return (article);
    }
    return { name, picture, getUserCardDOM }
}