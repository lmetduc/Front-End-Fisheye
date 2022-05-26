import { displayMedias } from "../pages/photographer.js";

export class MediaCard {
  constructor(media, medias, photographer) {
    this.media = media;
    this.medias = medias;
    this.photographer = photographer;
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
    heartIcon.classList.add("fa-heart");
    if (this.media.liked) {
      heartIcon.classList.add("fa-solid");
    } else {
      heartIcon.classList.add("fa-regular");
    }

    const likesCount = document.createElement("span");
    likesCount.classList.add("number-likes");
    likesCount.innerHTML = this.media.likes;

    likes.appendChild(likesCount);
    likes.appendChild(heartIcon);

    p.appendChild(title);
    p.appendChild(likes);

    mediaCard.appendChild(p);

    heartIcon.addEventListener("click", this.likeMedia(this.media, this.photographer, this.medias));

    return mediaCard;
  }

  likeMedia(media, photographer, medias) {
    return () => {
      if (media.liked === true) {
        media.likes -= 1;
      } else {
        media.likes += 1;
      }
      media.liked = !media.liked;
    
      displayMedias(photographer, medias);
    }
  }
}
