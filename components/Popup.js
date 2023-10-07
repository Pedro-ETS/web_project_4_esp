export default class Popup{

  constructor(selectPopup){
    this._popupClass= selectPopup;
 this._selectPopup = document.querySelector(`.${this._popupClass}`); //seleccionamos el elemento del formulario
 this._closeButton = this._selectPopup.querySelector(`.${this._popupClass}__btn-close`); //Seleccionamos el elemento del boton de formulario
 this._handleEscClose = this._handleEscClose.bind(this);
}


open(){
this._selectPopup.classList.add(`${this._popupClass}_opened`); // abre el formulario
document.addEventListener("keyup", this._handleEscClose); 
this.setEventListeners();
}

  close(){
    this._selectPopup.classList.remove(`${this._popupClass}_opened`);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners(){
    this._closeButton.addEventListener('click', () => {//cierre con el boton x
      this.close();
    });

    this._selectPopup .addEventListener("click", (evt) => { //cierre con clic en las superposiciones
    if(evt.target.classList.contains(this._popupClass)){
      this.close();
    }
  });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

}