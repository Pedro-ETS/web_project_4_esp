const assignErrorField = (typeForm,inputElement,errorElement,errorMessage) => {
  if (typeForm) {
    inputElement.classList.add("popup-add__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup-add__input-error_active");
  } else {
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }
};
const removeErrorField = (typeFor, inputElement, errorElement) => {
  if (typeFor) {
    inputElement.classList.remove("popup-add__input_type_error");
    errorElement.classList.remove("popup-add__input-error_active");
    errorElement.textContent = "";
  } else {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
  }
};
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const typeForm = formElement.className.includes("popup-add");
  assignErrorField(typeForm, inputElement, errorElement, errorMessage);
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const typeForm = formElement.className.includes("popup-add");
  removeErrorField(typeForm, inputElement, errorElement);
};
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  let getForm = buttonElement.getAttribute("id");
  if (hasInvalidInput(inputList)) {
    if (getForm.includes("popup-add")) {
      buttonElement.classList.add("popup-add__btn-save_type_error");
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.add("popup__btn-save_type_inactive");
      buttonElement.disabled = true;
    }
  } else {
    if (getForm.includes("popup-add")) {
      buttonElement.classList.remove("popup-add__btn-save_type_error");
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.remove("popup__btn-save_type_inactive");
      buttonElement.disabled = false;
    }
  }
};
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const inputListt = Array.from(
    formElement.querySelectorAll(".popup-add__input")
  );
  const inputsForms = inputList.concat(inputListt);
  const buttonElement = formElement.querySelector("button[type=submit]");
  if (buttonElement.className === "popup-add__btn-save") {
    toggleButtonState(inputsForms, buttonElement, formElement);
  }
  inputsForms.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputsForms, buttonElement);
    });
  });
};
const enableValidation = () => {
  const formList = Array.from(container.getElementsByTagName("form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (formElement === popup) {
        saveWindowProfile();
      } else if (formElement === popupAddCard) {
        addCardsDinamic();
      }
    });
    setEventListeners(formElement);
  });
};
enableValidation();
