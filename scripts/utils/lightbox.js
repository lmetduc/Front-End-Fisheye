const lightbox = document.querySelector(".lightbox");

export function displayLightbox(media, medias) {
  let currentMedia = media;
 
  const lightbox_images = document.querySelector(".lightbox_images");
  const lightboxPrevious = document.querySelector(".lightbox_left");
  const lightboxNext = document.querySelector(".lightbox_right");
  const lightboxClose = document.querySelector(".close");

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrevious.addEventListener("click", previousSlide);
  lightboxNext.addEventListener("click", nextSlide);

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function nextSlide(e) {
    e.preventDefault;
    const currentIndex = medias.indexOf(currentMedia);
    // Si ce n'est pas le dernier élément de la liste medias
    if (currentIndex !== medias.length - 1) {
      currentMedia = medias[currentIndex + 1];
    } else {
      currentMedia = medias[0];
    }
    displayMedia(currentMedia);
  }
  
  function previousSlide(e) {
    e.preventDefault;
    const currentIndex = medias.indexOf(currentMedia);
    if (currentIndex !== 0) {
      currentMedia = medias[currentIndex - 1];
    } else {
      currentMedia = medias[medias.length - 1];
    }
    displayMedia(currentMedia);
  }

  function displayMedia(media) {
    let tag;
    if (media.image) {
      tag = document.createElement("img");
      tag.src = `assets/photographers/${media.photographerId}/${media.image}`;
    } else {
      tag = document.createElement("video");
      tag.src = `assets/photographers/${media.photographerId}/${media.video}`;
      tag.controls = true;
    }
    tag.classList.add("lightbox_img");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("lightbox-img-container");
    
    imgContainer.appendChild(tag);

    const lightboxMediaTitle = document.createElement("h2");
    lightbox.classList.add("lightbox__media__title");
    lightboxMediaTitle.innerHTML = media.title;

    imgContainer.appendChild(lightboxMediaTitle);
    
    lightbox_images.innerHTML = '';
    lightbox_images.appendChild(imgContainer);
  }

  displayMedia(media);
}

export function openLightbox() {
  lightbox.style.display = "block";
}
