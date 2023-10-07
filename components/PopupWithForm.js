import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectPopup, submitCallback) {
    super(selectPopup);
    this._submitCallback = submitCallback;
    this._form = document.querySelector(`.${this._popupClass}`);
  }

  _getInputValues() {
    // Obtiene los elementos de todos los campos
    this._inputList = this._form.querySelectorAll(".popup__input");

    console.log(this._inputList);
    // Crea un objeto vacío
    this._formValues = {};

    // Agrega los valores de los campos a este objeto
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  sendObject(){
    const object = this._getInputValues();
    this._submitCallback(object);
  }

   submitHandler = (event) => { //cree esta funcion
    event.preventDefault();
    this.sendObject();
     this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit",this.submitHandler); //mando a llamar la funcion
  }

  close() {
    this._form.removeEventListener("submit",this.submitHandler);// elimino el evento
    super.close();
    if(this._form.classList.contains("popup-add")){
      this._form.reset();
    }
  }
}
