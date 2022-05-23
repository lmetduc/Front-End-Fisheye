import { PhotographerCard } from "../templates/photographerCard.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import { MediaFactory } from "../factories/mediaFatory.js";
import { MediaCard } from "../templates/mediaCard.js";
import { displayLightbox, openLightbox } from "../utils/lightbox.js";

//Mettre le code JavaScript lié à la page photographer.html
export async function getPhotographer() {
  const { photographers } = await fetch("data/photographers.json").then(
    (photographers) => photographers.json()
  );

  const params = new URL(document.location).searchParams;
  const id = params.get("id");
  const photographerData = photographers.find(
    (photographer) => photographer.id.toString() === id.toString()
  );
  const photographer = new PhotographerFactory(photographerData, "json");

  return photographer;
}
// Recuperer le fichier data/photographers.json
export async function getMediaFromPhotographer(photographer) {
  let mediaList = [];

  // Recupere la liste de tous les media dans le fichier json
  const medias = await fetch("data/photographers.json")
    .then((photographers) => photographers.json())
    .then((photographers) => photographers.media);

  let mediaForPhotographer = [];
  // Recuperer les medias liées au photographe grace à l'id du photographe
  medias.forEach((item) => {
    if (item.photographerId.toString() === photographer.id.toString()) {
      mediaForPhotographer.push(item);
    }
  });

  mediaForPhotographer.forEach((item) => {
    // recupere le type du media (video ou image)
    const type = getMediaType(item);
    const media = new MediaFactory(item, type);
    mediaList.push(media);
  });

  return mediaList;
}
// Savoir si media est une video ou une image au moment de l'appel à la factory
function getMediaType(media) {
  if (media.video !== undefined) {
    return "video";
  } else if (media.image !== undefined) {
    return "image";
  }
  return undefined;
}

export function displayMedias(medias) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = '';
  medias.forEach((m) => {
    // Recuperer ou le mettre dans le dom
    const mediaCard = new MediaCard(m);
    // Parcourir les medias avec forEach et à chaque media on va ajouter la ou le dom se situe
    const mediaCardDOM = mediaCard.displayMediaCard();
    mediaCardDOM.addEventListener("click", () => {
      displayLightbox(m, medias);
      openLightbox();
    });
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  const photographer = await getPhotographer();
  // Remplissage du header avec les donnees photographes
  const photographerCard = new PhotographerCard(photographer);

  const photographerInfo = photographerCard.getPhotographerInfo();
  const photographerProfilePicture = photographerCard.getPhotographerProfilePicture();
  
  const photographHeader = document.querySelector(".photograph-header");
  photographHeader.insertBefore(photographerInfo, photographHeader.children[0]);
  photographHeader.appendChild(photographerProfilePicture);

  // Remplissage du body avec les donnees media
  let medias = await getMediaFromPhotographer(photographer);
  medias = medias.sort((a, b) => b.likes - a.likes);
  displayMedias(medias);
}

init();
