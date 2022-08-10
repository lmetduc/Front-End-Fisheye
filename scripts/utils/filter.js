import {
  getPhotographer,
  displayMedias,
  getMediaFromPhotographer,
} from "../pages/photographer.js";

const filterMenu = document.querySelector(".filter__menu");
const filterSelect = document.querySelector(".filter__select");
const filterSelectLabel = document.querySelector(".filter__select span");
const filterSelectOption = document.querySelector(".filter__select__option");

let currentSort = "like";
let currentSortName = "Popularité";
const sortOptions = [
  { value: "like", name: "Popularité" },
  { value: "date", name: "Date" },
  { value: "title", name: "Titre" },
];

filterSelect.addEventListener("click", displayOptions);

function displayOptions() {
  filterSelectOption.style.display = "block";
  filterSelectOption.innerHTML = "";
  buildSelectBox();
  filterSelect.style.display = "none";
  filterMenu.ariaExpanded = true;
}

function closeOptions() {
  filterSelectOption.style.display = "none";
  filterSelect.style.display = "flex";
  filterMenu.ariaExpanded = false;
}

function updateValue(value) {
  filterSelectLabel.innerHTML = value;
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

  displayMedias(mediasSorted);
}

function buildSelectBox() {
  // recupère la liste de toutes les options possibles sauf celle actuellement selectionnée
  let orderedSortOptions = [];
  sortOptions.forEach((s) => {
    if (s.value !== currentSort) {
      orderedSortOptions.push(s);
    }
  });

  // construit l'élément pour le tri actuellement sélectionné
  const currentSortSpan = document.createElement("button");
  currentSortSpan.classList.add(
    "select__option",
    "selected__option",
    currentSort
  );
  const currentSortLabel = document.createElement("span");
  currentSortLabel.innerHTML = currentSortName;
  const arrowIcon = document.createElement("i");
  arrowIcon.classList.add("filter__arrow", "fas", "fa-angle-up");

  currentSortSpan.appendChild(currentSortLabel);
  currentSortSpan.appendChild(arrowIcon);
  currentSortSpan.addEventListener("click", closeOptions);
  currentSortSpan.focus();
  filterSelectOption.appendChild(currentSortSpan);

  // ajoute les autres tri possibles
  orderedSortOptions.forEach((o) => {
    const sortSpan = document.createElement("button");
    sortSpan.classList.add("select__option", o.value);
    sortSpan.innerHTML = o.name;
    sortSpan.ariaSelected = false;
    sortSpan.role = "option";
    sortSpan.addEventListener("click", function () {
      filterSelected(o.value, o.name);
    });
    filterSelectOption.appendChild(sortSpan);
  });
}

function filterSelected(sort, sortName) {
  sortMedias(sort);
  closeOptions();
  updateValue(sortName);
  currentSort = sort;
  currentSortName = sortName;
}
