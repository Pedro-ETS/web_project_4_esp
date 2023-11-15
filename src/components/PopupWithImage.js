  import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selectPopup, evt) {
    super(selectPopup);
    this._card = evt;
    this._elementName = document.querySelector(`.${this._popupClass}__lugar`);
    this._elementImg = document.querySelector(`.${this._popupClass}__image-normal`
    );
  }
  open() {
    super.open();
    const link = this._card.target.getAttribute("src");
    const alt = this._card.target.getAttribute("alt");
    const city = alt.substring(9, alt.leng);
    this._elementImg.setAttribute("src", link);
    this._elementImg.setAttribute("alt", "imagen de " + city);
    this._elementName.textContent = city;
  }
}
