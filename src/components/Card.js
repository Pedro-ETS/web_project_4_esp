import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Api from "./Api.js";
import { renderLoading } from "../utils/constants.js";
export default class Card {
  constructor(element, cardSelector) {
    this._name = element.name;
    this._link = element.link;
    this._idImg = element._id;
    this._idUser = element.owner._id;
    this._nameUser = element.owner.name;
    this._likes = element.likes;
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
    this._element.querySelector(".card__btn-trash").setAttribute("data-user-name", this._nameUser);
    this._element.querySelector(".card__image").setAttribute("id-card-img", this._idImg);
    this._element.querySelector(".card__image").setAttribute("src", this._link);
    this._element.querySelector(".card__image").setAttribute("alt", "Imagen de " + this._name);
    this._element.querySelector(".card__subtitle").textContent = this._name;
    this._element.querySelector(".card__like-number").textContent = this._likes.length;
    const res = this._likes.find((user) => user.name === document.querySelector(".profile__subtitle").textContent);
    res == undefined ? console.log() : this._element.querySelector(".card__btn-love").classList.add("card__btn-love_activate");
    return this._element;
  }
  _likeCardApiRequest() {
    const idImgLike = this._element.querySelector(".card__image").getAttribute("id-card-img");
    const likeCardApi = new Api({
      baseUrl:
        "https://around.nomoreparties.co/v1/web_es_09/cards/likes/" + idImgLike,
      headers: {
        authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
        "Content-Type": "application/json",
      },
    });
    likeCardApi.likeCard()
      .then((res) => {
        if (res.likes.length !== 0) {
          this._element.querySelector(".card__like-number").style.display = "block";
        }
        this._element.querySelector(".card__like-number").textContent = res.likes.length;
      })
      .catch((error) => {
        alert("Error al dar me gusta:", error);
      });
  }
  _removeLikeApiRequest() {
    const idImgLike = this._element.querySelector(".card__image").getAttribute("id-card-img");
    const deletelikeApi = new Api({
      baseUrl:
        "https://around.nomoreparties.co/v1/web_es_09/cards/likes/" + idImgLike,
      headers: {
        authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
        "Content-Type": "application/json",
      },
    });
    deletelikeApi.deleteCard()
      .then((res) => {
        if (res.likes.length === 0) {
          this._element.querySelector(".card__like-number").style.display = "none";
        }
        this._element.querySelector(".card__like-number").textContent = res.likes.length;
      })
      .catch((error) => {
        alert("Error no se pudo quitar like:", error);
      });
  }
  _toggleLike(evt) {
    evt.target.classList.toggle("card__btn-love_activate");
    let liked;
    evt.target.classList.contains("card__btn-love_activate") ? (liked = true) : (liked = false);
    liked ? this._likeCardApiRequest() : this._removeLikeApiRequest();
  }
  _deleteCardApiRequest(elementCard) {
    const deletCardApi = new Api({
      baseUrl:
        "https://around.nomoreparties.co/v1/web_es_09/cards/" +
        elementCard.getAttribute("id-card-img"),
      headers: {
        authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
        "Content-Type": "application/json",
      },
    });
    return deletCardApi.deleteCard();
  }
  _trashCard(evt) {
    const popupConfirmDeletion = new PopupWithForm("popup-confirm-deletion",
      (formData) => {
        const elementCard = evt.target.nextElementSibling;
        this._deleteCardApiRequest(elementCard)
          .then((res) => {
            let parentNodo = evt.target.parentNode;
            parentNodo.remove();
          })
          .catch((error) => {
            alert("Error no se pudo eliminar la tarjeta", error);
          })
          .finally(() => {
            renderLoading(false, ".popup-confirm-deletion__btn-delete");
            popupConfirmDeletion.close();
          });
      }
    );
    popupConfirmDeletion.open();
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
        this._toggleLike(evt);
      } else if (evt.target.classList.contains("card__btn-trash")) {
        this._trashCard(evt);
      } else if (evt.target.classList.contains("card__image")) {
        this.handleCardClick(evt);
      }
    });
  }
}
