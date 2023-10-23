import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Api from "./Api.js";
export default class Card {
  constructor(element, cardSelector) {
    this._name = element.name;
    this._link = element.link;
    this._idImg = element._id;
    this._idUser = element.owner._id;
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
    this._element
      .querySelector(".card__btn-trash")
      .setAttribute("data-user-id", this._idUser);
    this._element
      .querySelector(".card__image")
      .setAttribute("id-card-img", this._idImg);
    this._element.querySelector(".card__image").setAttribute("src", this._link);
    this._element
      .querySelector(".card__image")
      .setAttribute("alt", "Imagen de " + this._name);
    this._element.querySelector(".card__subtitle").textContent = this._name;
    return this._element;
  }
  _likeImage(evt) {
    evt.target.classList.toggle("card__btn-love_activate");
  }
  _trashCard(evt) {
    const popupConfirmDeletion = new PopupWithForm("popup-confirm-deletion",(formData) => {});
    popupConfirmDeletion.open();
    document.querySelector(".popup-confirm-deletion__btn-delete").addEventListener("click", function () {
        const elementCard = evt.target.nextElementSibling;
        const idImg = elementCard.getAttribute("id-card-img");
        const deletCardApi = new Api({
          baseUrl:
            "https://around.nomoreparties.co/v1/web_es_09/cards/" + idImg,
          headers: {
            authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
            "Content-Type": "application/json",
          },
        });
        deletCardApi.deleteCard()
          .then((res) => {
            let parentNodo = evt.target.parentNode;
            parentNodo.remove();
            console.log(res);
          })
          .catch((error) => {
            console.error("Error al cargar la información:", error);
          });
      });
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
