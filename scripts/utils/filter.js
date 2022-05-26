import {
  getPhotographer,
  displayMedias,
  getMediaFromPhotographer,
} from "../pages/photographer.js";

const filterSelect = document.querySelector(".filter__select");
const filterSelectOption = document.querySelector(".filter__select__option");
const like = document.querySelector(".likes");
const date = document.querySelector(".date");
const title = document.querySelector(".title");

filterSelect.addEventListener("click", displayOptions);
like.addEventListener("click", function () {
  sortMedias("like");
  closeOptions();
  updateValue("Popularité");
});
date.addEventListener("click", function () {
  sortMedias("date");
  closeOptions();
  updateValue("Date");
});
title.addEventListener("click", function () {
  sortMedias("title");
  closeOptions();
  updateValue("Titre");
});

function displayOptions() {
  filterSelectOption.style.display = "block";
  filterSelect.style.display = "none";
}

function closeOptions() {
  filterSelectOption.style.display = "none";
  filterSelect.style.display = "block";
}

function updateValue(value) {
  filterSelect.innerHTML = value;
}

async function sortMedias(sortType) {
  const photographer = await getPhotographer();
  const medias = await getMediaFromPhotographer(photographer);
  let mediasSorted = medias;
  if (sortType === "like") {
    mediasSorted = medias.sort((a, b) => b.likes - a.likes);
  } else if (sortType === "date") {
    mediasSorted = medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === "title") {
    mediasSorted = medias.sort((a, b) => a.title.localeCompare(b.title));
  }

  displayMedias(photographer, mediasSorted);
}
