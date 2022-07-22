const lightbox = document.querySelector(".lightbox");

const lightboxFocusableEls = lightbox.querySelectorAll(
  'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
);
const lightboxFirstFocusableEl = lightboxFocusableEls[0];
const lightboxLastFocusableEl =
  lightboxFocusableEls[lightboxFocusableEls.length - 1];

export class Lightbox {
  constructor(media, medias) {
    this.currentMedia = media;
    this.medias = medias;

    this.lightbox_images = document.querySelector(".lightbox_images");
    this.lightboxPrevious = document.querySelector(".lightbox_left");
    this.lightboxNext = document.querySelector(".lightbox_right");
    this.lightboxClose = document.querySelector(".close");

    this.lightboxClose.addEventListener("click", this.close.bind(this));
    this.lightboxPrevious.addEventListener(
      "click",
      this.previousSlide.bind(this)
    );
    this.lightboxNext.addEventListener("click", this.nextSlide.bind(this));

    this.displayMedia();
  }

  nextSlide(e) {
    e.preventDefault;
    const currentIndex = this.medias.indexOf(this.currentMedia);
    // Si ce n'est pas le dernier élément de la liste medias
    if (currentIndex !== this.medias.length - 1) {
      this.currentMedia = this.medias[currentIndex + 1];
    } else {
      this.currentMedia = this.medias[0];
    }
    this.displayMedia();
  }

  previousSlide(e) {
    e.preventDefault;
    const currentIndex = this.medias.indexOf(this.currentMedia);
    if (currentIndex !== 0) {
      this.currentMedia = this.medias[currentIndex - 1];
    } else {
      this.currentMedia = this.medias[this.medias.length - 1];
    }
    this.displayMedia();
  }

  displayMedia() {
    let tag;
    if (this.currentMedia.image) {
      tag = document.createElement("img");
      tag.src = `assets/photographers/${this.currentMedia.photographerId}/${this.currentMedia.image}`;
      tag.alt = this.currentMedia.title;
    } else {
      tag = document.createElement("video");
      tag.src = `assets/photographers/${this.currentMedia.photographerId}/${this.currentMedia.video}`;
      tag.controls = true;
    }
    tag.classList.add("lightbox_img");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("lightbox-img-container");

    imgContainer.appendChild(tag);

    const lightboxMediaTitle = document.createElement("h2");
    lightbox.classList.add("lightbox__media__title");
    lightboxMediaTitle.innerHTML = this.currentMedia.title;

    imgContainer.appendChild(lightboxMediaTitle);

    this.lightbox_images.innerHTML = "";
    this.lightbox_images.appendChild(imgContainer);
  }

  open(e) {
    this.oldFocussedEl = e.target;
    lightbox.style.display = "block";
    Array.from(document.querySelector("main").children)
      .filter((c) => c !== lightbox)
      .forEach((c) => (c.ariaHidden = true));
    document.addEventListener("keyup", this.handleKeys.bind(this));
    lightbox.addEventListener("keydown", this.handleFocusLightBox.bind(this));
    lightboxFirstFocusableEl.focus();
  }

  close() {
    lightbox.style.display = "none";
    Array.from(document.querySelector("main").children)
      .filter((c) => c !== lightbox)
      .forEach((c) => (c.ariaHidden = false));
    document.removeEventListener("keyup", this.handleKeys.bind(this));
    lightbox.removeEventListener(
      "keydown",
      this.handleFocusLightBox.bind(this)
    );
    this.oldFocussedEl.focus();
  }

  handleKeys(e) {
    if (e.key === "ArrowLeft") {
      this.previousSlide(e);
    } else if (e.key === "ArrowRight") {
      this.nextSlide(e);
    } else if (e.key === "Escape") {
      this.close();
    }
  }

  handleFocusLightBox(e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        /* shift + tab */ if (
          document.activeElement === lightboxFirstFocusableEl
        ) {
          lightboxLastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lightboxLastFocusableEl) {
          lightboxFirstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  }
}
