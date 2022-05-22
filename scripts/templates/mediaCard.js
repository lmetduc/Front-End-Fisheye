import { openLightbox } from "../utils/lightbox.js";

export class MediaCard {
  constructor(media) {
    this.media = media;
  }

  displayMediaCard() {
    const mediaCard = document.createElement("article");
    mediaCard.classList.add("media");

    //verifie si image ou video au moment de l'affichage
    let media;
    if (this.media.image) {
      media = document.createElement("img");
      media.src = `assets/photographers/${this.media.photographerId}/${this.media.image}`;
    } else {
      media = document.createElement("video");
      media.src = `assets/photographers/${this.media.photographerId}/${this.media.video}`;
    }

    media.classList.add("media-img");
    mediaCard.appendChild(media);

    const p = document.createElement("p");
    p.classList.add("photo-title");
    const title = document.createElement("span");
    title.innerHTML = this.media.title;

    const likes = document.createElement("span");
    likes.classList.add("likes");
    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-solid", "fa-heart");
    const likesCount = document.createElement("span");
    likesCount.classList.add("number-likes");
    likesCount.innerHTML = this.media.likes;

    likes.appendChild(likesCount);
    likes.appendChild(heartIcon);

    p.appendChild(title);
    p.appendChild(likes);

    mediaCard.appendChild(p);

    return mediaCard;
  }
}
