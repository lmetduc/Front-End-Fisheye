export class MediaCard {
    constructor(media) {
        this.media = media;
    }

    displayMediaCard () {
        const mediaCard = document.createElement('article');

        let media;
        if (this.media.image) {
            media = document.createElement('img');
            media.src = `assets/photographers/${this.media.photographerId}/${this.media.image}`;
        } else {
            media = document.createElement('video');
            media.src = `assets/photographers/${this.media.photographerId}/${this.media.video}`;
        }

        mediaCard.appendChild(media);

        const p = document.createElement('p');
        const title = document.createElement('span');
        title.innerHTML = this.media.title;
        
        const likes = document.createElement('span');
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-regular', 'fa-heart');
        const likesCount = document.createElement('span');
        likesCount.innerHTML = this.media.likes;

        likes.appendChild(likesCount);
        likes.appendChild(heartIcon);

        p.appendChild(title);
        p.appendChild(likes);

        mediaCard.appendChild(p)

        return mediaCard;
    }
}
