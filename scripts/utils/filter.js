import { getPhotographer, displayMedias, getMediaFromPhotographer } from '../pages/photographer.js';

const filterMenu = document.querySelector(".filter__menu");
const filterSelect = document.querySelector(".filter__select");
const filterSelectTrigger = document.querySelector(".filter__select__menu");
const filterOptions = document.querySelectorAll(".filter__option");

filterSelect.addEventListener("change", sortMedias);

async function sortMedias(e) {
  const photographer = await getPhotographer();
  const medias = await getMediaFromPhotographer(photographer);
  let mediasSorted = medias;
  if (e.target.value === 'like') {
    mediasSorted = medias.sort((a, b) => b.likes - a.likes);
  } else if (e.target.value === 'date') {
    mediasSorted = medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (e.target.value === 'title') {
    mediasSorted = medias.sort((a, b) => a.title.localeCompare(b.title));
  }

  displayMedias(mediasSorted); 
}