const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".contact_button");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close-btn");
const confirmationMsg = document.querySelector(".confirmation__title");
const confirmationBtn = document.querySelector(".button-confirm.close-btn");
const form = document.querySelector("form");

modalBtn.forEach((btn) => btn.addEventListener("click", displayModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

formData.forEach((formElement) => {
    const input = formElement.querySelector("input");
  
    if (input.className === "test") {
      input.addEventListener("keyup", function () {
        validateInput(input.id, input.value)
      }); 
    }
})

function validateInput(input, value) {
    let isValid = true;
    let errorMsg = "";
  
    if (input.className === "first_name" || input.className === "last_name") {
      ({ isValid, errorMsg } = validateLength(value));
    } else if (input.className === "email") {
      ({ isValid, errorMsg } = validateEmail(value));
    }
  
    setError(inputId, errorMsg, isValid);
    return isValid;
  }


  function validateLength(value, minLength = 2) {

    if (value.trim().length < minLength) {
      return { isValid: false, errorMsg: "Veuillez compléter votre champ avec plus de deux caractères" };
    }
    return { isValid: true, errorMsg: "" };
  }
  
  function validateEmail(value) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (value.trim().length === 0) {
      return { isValid: false, errorMsg: "Ce champ est requis" };
    } else if (!value.match(emailPattern)) {
      return { isValid: false, errorMsg: "Veuillez renseigner un email valide" };
    }
    return { isValid: true, errorMsg: "" };
  }


  function setError(inputId, errorMsg, toRemove) {
    const formError = document.querySelector(".alert-error");
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
      const input = formElement.querySelector("input");
      if (input.className === "test") {
        if (!valid) {
          isValid = false;
        }
      } else {
        const valid = validateInput(input.id, input.value);
        if (!valid) {
          isValid = false;
        }
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
    confirmationBtn.style.display = "block";
    form.style.display = "none";
  }
  


function displayModal() {
  console.log("display")
    const modal = document.getElementById("contact_modal");
	  modal.style.display = "block";
    modalbg.style.display = "block";

}

function closeModal() {
  console.log("closeModal")
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    form.style.display = "block";
    modalbg.style.display = "none";
}