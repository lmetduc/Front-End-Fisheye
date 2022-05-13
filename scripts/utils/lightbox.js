function displayLightbox(media, mediaFactory, currentPhotographer) {
    let currentMedia = media;
    const lightboxModal = document.querySelector(".lightbox");
    const slideContainer = document.querySelector(".container__slide");
    const btnClose = document.querySelector(".close");
    const next = document.querySelector(".right");
    const previous = document.querySelector(".left");
    const titleMedia = document.querySelector(".lightbox__media__title");
    const mediaImg = document.createElement("img");
    const mediaVideo = document.createElement("video");

    next.addEventListener("click", nextSlide);
    previous.addEventListener("click", previousSlide);
    btnClose.addEventListener("click", closeLightbox);


    function nextSlide(e) {
        e.preventDefault;

        displayContent();
    }

    function previousSlide(e) {
        e.preventDefault;

    }

    function closeLightbox() {

    }

    displayContent(currentMedia);
    
    function displayContent() {
    };
    
}

function openLightBox() {

}