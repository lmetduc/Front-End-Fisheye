export class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
  }
  /*
   * Creation d'un nouvel element du DOM dans le html
   */
  getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer-card");

    const img = document.createElement("img");
    img.classList.add("profile");
    img.alt = `Photo de profil de ${this.photographer.name}`;

    const picture = `assets/photographers/Photographers ID Photos/${this.photographer.portrait}`;
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = this.photographer.name;

    const photographerLink = document.createElement("a");
    const photographerImgLink = document.createElement("a");
    photographerLink.href = "photographer.html?id=" + this.photographer.id;
    photographerImgLink.href = "photographer.html?id=" + this.photographer.id;

    article.appendChild(photographerImgLink);
    photographerImgLink.appendChild(img);

    const photographerInfo = document.createElement("div");
    photographerInfo.appendChild(photographerLink);
    photographerLink.appendChild(h2);

    const p = document.createElement("p");
    const locationSpan = document.createElement("span");
    locationSpan.textContent =
      this.photographer.city + ", " + this.photographer.country;
    locationSpan.classList.add("location");
    p.appendChild(locationSpan);

    const taglineSpan = document.createElement("span");
    taglineSpan.classList.add("tagline");
    taglineSpan.role = "note";
    taglineSpan.ariaLabel = "Phrase du photographe";
    taglineSpan.textContent = this.photographer.tagline;
    p.appendChild(taglineSpan);

    const priceSpan = document.createElement("span");
    priceSpan.classList.add("price");
    priceSpan.ariaLabel = "euros par jour";
    priceSpan.role = "note";
    priceSpan.innerHTML = `<span>${this.photographer.price}</span><span aria-hidden="true">€/jour</span>`;
    p.appendChild(priceSpan);

    photographerInfo.appendChild(p);

    article.appendChild(photographerInfo);

    return article;
  }

  getPhotographerInfo() {
    const photographerProfileInfo = document.createElement("div");
    photographerProfileInfo.classList.add("photographer-profile-info");

    const h1 = document.createElement("h1");
    h1.innerHTML = this.photographer.name;

    const p = document.createElement("p");
    const locationSpan = document.createElement("span");
    locationSpan.textContent =
      this.photographer.city + ", " + this.photographer.country;
    locationSpan.classList.add("location");
    p.appendChild(locationSpan);

    const taglineSpan = document.createElement("span");
    taglineSpan.classList.add("tagline");
    taglineSpan.textContent = this.photographer.tagline;
    p.appendChild(taglineSpan);

    photographerProfileInfo.appendChild(h1);
    photographerProfileInfo.appendChild(p);

    return photographerProfileInfo;
  }

  getPhotographerProfilePicture() {
    const img = document.createElement("img");
    img.classList.add("profile");
    img.alt = `Photo de profil de ${this.photographer.name}`;
    const picture = `assets/photographers/Photographers ID Photos/${this.photographer.portrait}`;
    img.setAttribute("src", picture);

    return img;
  }
}
