export default class Popup {
  constructor(selectPopup) {
    this._popupClass = selectPopup;
    this._selectPopup = document.querySelector(`.${this._popupClass}`);
    this._closeButton = this._selectPopup.querySelector(`.${this._popupClass}__btn-close`);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._selectPopup.classList.add(`${this._popupClass}_opened`);
    document.addEventListener("keyup", this._handleEscClose);
    this.setEventListeners();
  }
  close() {
    this._selectPopup.classList.remove(`${this._popupClass}_opened`);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._selectPopup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains(this._popupClass)) {
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
