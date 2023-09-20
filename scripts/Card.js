import {openWindowContentImage,closeWindowSuperposicions,closeWindowdEsc} from "../scripts/utils.js";
export default class Card {
  constructor(element, cardSelector) {
    this._name = element.name;
    this._link = element.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").setAttribute("src", this._link);
    this._element.querySelector(".card__image").setAttribute("alt", "Imagen de " + this._name);
    this._element.querySelector(".card__subtitle").textContent = this._name;
    return this._element;
  }
  _likeImage(evt) {
    evt.target.classList.toggle("card__btn-love_activate");
  }
  _trashCard(evt) {
    let parentNodo = evt.target.parentNode;
    parentNodo.remove();
  }
  _displayContainerImage(evt) {
    openWindowContentImage(evt);
    closeWindowSuperposicions();
    document.addEventListener("keyup", closeWindowdEsc);
  }
  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("card__btn-love")) {
        this._likeImage(evt);
      } else if (evt.target.classList.contains("card__btn-trash")) {
        this._trashCard(evt);
      } else if (evt.target.classList.contains("card__image")) {
        this._displayContainerImage(evt);
      }
    });
  }
}