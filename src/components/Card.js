import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import {initialCards} from "../utils/constants.js";
export default class Card {
  constructor(element, cardSelector) {
    this._name = element.name;
    this._link = element.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = this.handleCardClick;
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
    const popupConfirmDeletion = new PopupWithForm("popup-confirm-deletion", (formData) => {});
    popupConfirmDeletion.open();
  //   let parentNodo = evt.target.parentNode;
  //   parentNodo.remove();
  //   const name=this._name;
  //   const indexCard=initialCards.indexOf(name);
  //  initialCards.splice(indexCard, 1);
  }
  _displayContainerImage(evt) {
    openWindowContentImage(evt);
    document.addEventListener("keyup", closeWindowdEsc);
  }

  handleCardClick(evt) {
    const res = new PopupWithImage("big-picture", evt);
    res.open();
  }
  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("card__btn-love")) {
        this._likeImage(evt);
      } else if (evt.target.classList.contains("card__btn-trash")) {
        this._trashCard(evt);
      } else if (evt.target.classList.contains("card__image")) {
        this.handleCardClick(evt);
      }
    });
  }
}
