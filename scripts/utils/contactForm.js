import { getPhotographer } from "../pages/photographer.js";

const modal = document.getElementById("contact_modal");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelector(".contact_button");
const formData = document.querySelectorAll(".formData");
const contactTitle = document.querySelector(".contact");
const modalCloseBtn = document.querySelector(".close-btn");
const confirmationMsg = document.querySelector(".confirmation__title");
const form = document.querySelector("form");

const modalFocusableEls = modal.querySelectorAll(
  'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
);
const modalFirstFocusableEl = modalFocusableEls[0];
const modalLastFocusableEl = modalFocusableEls[modalFocusableEls.length - 1];

modalBtn.addEventListener("click", displayModal);
modalCloseBtn.addEventListener("click", closeModal);

formData.forEach((formElement) => {
  const input = formElement.querySelector(".input");

  input.addEventListener("keyup", function () {
    validateInput(input.id, input.value);
  });
});

function validateInput(inputId, value) {
  let isValid = true;
  let errorMsg = "";

  if (inputId === "prenom" || inputId === "nom") {
    ({ isValid, errorMsg } = validateLength(value));
  } else if (inputId === "mail") {
    ({ isValid, errorMsg } = validateEmail(value));
  } else if (inputId === "msg") {
    ({ isValid, errorMsg } = validateLength(value, 1));
  }

  setError(inputId, errorMsg, isValid);
  return isValid;
}

function validateLength(value, minLength = 2) {
  if (value.trim().length < minLength) {
    return {
      isValid: false,
      errorMsg: "Veuillez compléter votre champ avec plus de deux caractères",
    };
  }
  return { isValid: true, errorMsg: "" };
}

function validateEmail(value) {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (value.trim().length === 0) {
    return { isValid: false, errorMsg: "Ce champ est requis" };
  } else if (!value.match(emailPattern)) {
    return { isValid: false, errorMsg: "Veuillez renseigner un email valide" };
  }
  return { isValid: true, errorMsg: "" };
}

function setError(inputId, errorMsg, toRemove) {
  const formError = document.querySelector(`#${inputId}_error`);
  const input = document.querySelector(`#${inputId}`);

  if (toRemove) {
    input.classList.remove("invalid");
    formError.innerHTML = "";
    formError.style.display = "none";
  } else {
    input.classList.add("invalid");
    formError.innerHTML = errorMsg;
    formError.style.display = "block";
  }
}

function validateForm(e) {
  e.preventDefault();

  let isValid = true;

  formData.forEach((formElement) => {
    const input = formElement.querySelector(".input");

    const valid = validateInput(input.id, input.value);
    if (!valid) {
      isValid = false;
    }
  });

  if (isValid) {
    displayConfirmation();
    form.reset();
  }
}

form.addEventListener("submit", validateForm);

function displayConfirmation() {
  confirmationMsg.style.display = "block";
  form.style.display = "none";
  modalCloseBtn.focus();
}

function displayModal() {
  modal.style.display = "block";
  modalbg.style.display = "block";

  Array.from(document.querySelector("main").children)
    .filter((c) => c !== modal)
    .forEach((c) => (c.ariaHidden = true));
  document.addEventListener("keyup", handleEscapeKey);
  modal.addEventListener("keydown", handleFocusModal);
  modalFirstFocusableEl.focus();
}

function closeModal() {
  confirmationMsg.style.display = "none";
  modal.style.display = "none";
  form.style.display = "block";
  modalbg.style.display = "none";

  Array.from(document.querySelector("main").children)
    .filter((c) => c !== modal)
    .forEach((c) => (c.ariaHidden = false));
  document.removeEventListener("keyup", handleEscapeKey);
  modal.removeEventListener("keydown", handleFocusModal);
  modalBtn.focus();
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

function handleFocusModal(e) {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === modalFirstFocusableEl) {
        modalLastFocusableEl.focus();
        e.preventDefault();
      }
    } /* tab */ else {
      if (document.activeElement === modalLastFocusableEl) {
        modalFirstFocusableEl.focus();
        e.preventDefault();
      }
    }
  }
}

// Rempli le message de confirmation avec le nom du photographe
async function init() {
  const photographer = await getPhotographer();
  contactTitle.innerHTML = `Contactez-moi ${photographer.name}`;
  confirmationMsg.innerHTML = `Merci d'avoir contacté ${photographer.name} !`;
}

init();
