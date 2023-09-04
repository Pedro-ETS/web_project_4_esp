const assignErrorField = (typeForm,inputElement,errorElement,errorMessage,datos) => {
  if (typeForm) {
    inputElement.classList.add(datos.inputErrorClassFormDos);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(datos.errorClassFormDos);
  } else {
    inputElement.classList.add(datos.inputErrorClassFormUno);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(datos.errorClassFormUno);
  }
};
const removeErrorField = (typeFor, inputElement, errorElement,datos) => {
  if (typeFor) {
    inputElement.classList.remove(datos.inputErrorClassFormDos);
    errorElement.classList.remove(datos.errorClassFormDos);
    errorElement.textContent = "";
  } else {
    inputElement.classList.remove(datos.inputErrorClassFormUno);
    errorElement.classList.remove(datos.errorClassFormUno);
    errorElement.textContent = "";
  }
};
const showInputError = (formElement, inputElement, errorMessage,datos) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const typeForm = formElement.className.includes("popup-add");
  assignErrorField(typeForm, inputElement, errorElement, errorMessage,datos);
};
const hideInputError = (formElement, inputElement,datos) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const typeForm = formElement.className.includes("popup-add");
  removeErrorField(typeForm, inputElement, errorElement,datos);
};
const checkInputValidity = (formElement, inputElement,datos) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,datos);
  } else {
    hideInputError(formElement, inputElement,datos);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement,datos) => {
  let getForm = buttonElement.getAttribute("id");
  if (hasInvalidInput(inputList)) {
    if (getForm.includes("popup-add")) {
      buttonElement.classList.add(datos.inactiveButtonClassFormDos);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.add(datos.inactiveButtonClassFormUno);
      buttonElement.disabled = true;
    }
  } else {
    if (getForm.includes("popup-add")) {
      buttonElement.classList.remove(datos.inactiveButtonClassFormDos);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.remove(datos.inactiveButtonClassFormUno);
      buttonElement.disabled = false;
    }
  }
};
const setEventListeners = (formElement,datos) => {
  const inputListUno = Array.from(formElement.querySelectorAll(datos.inputSelectorFormUno));
  const inputListDos = Array.from(formElement.querySelectorAll(datos.inputSelectorFormDos));
  const inputsForms = inputListUno.concat(inputListDos);
  const buttonElement = formElement.querySelector("button[type=submit]");
  if ( `.${buttonElement.className}`=== datos.submitButtonSelectorFormDos) {
    toggleButtonState(inputsForms, buttonElement,datos);
  }
  inputsForms.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement,datos);
      toggleButtonState(inputsForms, buttonElement,datos);
    });
  });
};
const enableValidation = (datos) => {
  const formList = Array.from(container.getElementsByTagName(datos.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (formElement === popup) {
        saveWindowProfile();
      } else if (formElement === popupAddCard) {
        addCardsDinamic();
      }
    });
    setEventListeners(formElement, datos);
  });
};
const datos = {
  formSelector: "form",
  inputSelectorFormUno: ".popup__input",
  inputSelectorFormDos: ".popup-add__input",
  submitButtonSelectorFormUno: ".popup__btn-save",
  submitButtonSelectorFormDos: ".popup-add__btn-save",
  inactiveButtonClassFormUno: "popup__btn-save_disabled",
  inactiveButtonClassFormDos: "popup-add__btn-save_disabled",
  inputErrorClassFormUno: "popup__input_type_error",
  inputErrorDosClassFormDos: "popup-add__input_type_error",
  errorClassFormUno: "popup__error_visible",
  errorClassFormDos: "popup-add__error_visible",
};
enableValidation(datos);
