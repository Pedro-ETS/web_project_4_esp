import Popup from "./Popup.js";
import {renderLoading} from "../utils/constants.js";
export default class PopupWithForm extends Popup {
  constructor(selectPopup, submitCallback) {
    super(selectPopup);
    this._submitCallback = submitCallback;
    this._form = document.querySelector(`.${this._popupClass}`);
  }
  _getInputValues() {
    // Obtiene los elementos de todos los campos
    this._inputList = this._form.querySelectorAll(`.${this._popupClass}__input`);
    // Crea un objeto vacío
    this._formValues = {};

    // Agrega los valores de los campos a este objeto
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
  sendObject() {
    const object = this._getInputValues();
    this._submitCallback(object);
  }
  submitHandler = (event) => {
    event.preventDefault();
    if(this._popupClass==="popup-confirm-deletion"){
      renderLoading(true,`.${this._popupClass}__btn-delete`);
    }else{
      renderLoading(true,`.${this._popupClass}__btn-save`);
    }
    this.sendObject();
  };
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.submitHandler);
  }
  close() {
    this._form.removeEventListener("submit", this.submitHandler);
    super.close();
    if (this._form.classList.contains("popup-add")) {
      this._form.reset();
    }
  }
}
