export default class FormValidator {
  constructor(datos, formSelector) {
    this._formSelector = formSelector;
    this._inputSelectorForm = datos.inputSelectorForm;
    this._submitButtonSelector = datos.submitButtonSelector;
    this._inactiveButtonClassForm = datos.inactiveButtonClassForm;
    this._inputErrorClassForm = datos.inputErrorClassForm;
    this._errorClassForm = datos.errorClassForm;
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClassForm);
    errorElement.textContent = errorMessage;
  }
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClassForm);
    errorElement.classList.remove(this._errorClassForm);
    errorElement.textContent = "";
  }
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClassForm);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClassForm);
      buttonElement.disabled = false;
    }
  }
  _setEventListeners() {
    const formElement = document.querySelector(this._formSelector);
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelectorForm)
    );
    const buttonElement = formElement.querySelector("button[type=submit]");
    if (`.${buttonElement.className}` === ".popup-add__btn-save") {
      this._toggleButtonState(inputList, buttonElement);
    }
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation() {
    this._element = document.querySelector(this._formSelector);
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}


