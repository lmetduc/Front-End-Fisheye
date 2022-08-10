export class MediaCard {
  constructor(media, medias) {
    this.media = media;
    this.medias = medias;
  }

  displayMediaCard() {
    const mediaCard = document.createElement("article");

    //verifie si image ou video au moment de l'affichage
    let media;
    if (this.media.image) {
      media = document.createElement("img");
      media.src = `assets/photographers/${this.media.photographerId}/${this.media.image}`;
      media.alt = `Image ${this.media.title}`;
    } else {
      media = document.createElement("video");
      media.src = `assets/photographers/${this.media.photographerId}/${this.media.video}`;
    }
    media.classList.add("media-img");
    
    const a = document.createElement("a");
    a.classList.add("media-img-link");
    a.href = "";
    a.ariaLabel = "Ouvrir caroussel";
    
    a.appendChild(media);
    mediaCard.appendChild(a);

    const p = document.createElement("p");
    p.classList.add("photo-title");
    const title = document.createElement("span");
    title.innerHTML = this.media.title;

    const likes = document.createElement("button");
    likes.classList.add("likes");
    likes.ariaLabel = `${this.media.likes} mentions j'aime`;

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-heart", `media-heart-${this.media.id}`);
    if (this.media.liked) {
      heartIcon.classList.add("fa-solid");
    } else {
      heartIcon.classList.add("fa-regular");
    }
    heartIcon.ariaHidden = true;

    const likesCount = document.createElement("span");
    likesCount.classList.add("number-likes", `media-likes-${this.media.id}`);
    likesCount.innerHTML = this.media.likes;
    likesCount.ariaHidden = true;

    likes.appendChild(likesCount);
    likes.appendChild(heartIcon);

    p.appendChild(title);
    p.appendChild(likes);

    mediaCard.appendChild(p);

    likes.addEventListener(
      "click",
      this.likeMedia(this.media, this.medias)
    );

    return mediaCard;
  }

  likeMedia(media, medias) {
    return function () {
      if (media.liked === true) {
        media.likes -= 1;
      } else {
        media.likes += 1;
      }
      media.liked = !media.liked;

      const currentMediaLike = document.querySelector(
        `.media-likes-${media.id}`
      );
      currentMediaLike.innerHTML = media.likes;
      const currentMediaHeart = document.querySelector(
        `.media-heart-${media.id}`
      );
      if (media.liked) {
        currentMediaHeart.classList.remove("fa-regular");
        currentMediaHeart.classList.add("fa-solid");
      } else {
        currentMediaHeart.classList.remove("fa-solid");
        currentMediaHeart.classList.add("fa-regular");
      }

      let totalLikes = 0;
      medias.forEach((m) => {
        totalLikes += m.likes;
      });
      const totalLikeCount = document.querySelector(".total-likes");
      totalLikeCount.innerHTML = totalLikes;
      totalLikeCount.ariaLabel = `${totalLikes} mentions j'aime`;
    };
  }
}
