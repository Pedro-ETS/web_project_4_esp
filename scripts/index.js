import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import {openWindowEditProfile,openWindowAddCard,closeWindowEditProfile,closeWindowsAddCard,saveWindowProfile} from "../scripts/utils.js";

const container = document.querySelector(".container");
const btnEditarProfile = container.querySelector(".edit-button_action_add");
const popup = container.querySelector(".popup");
const popupAddCard = container.querySelector(".popup-add");
const btnClose = container.querySelector(".popup__btn-close");
const btnCloseWindowAddCard = container.querySelector(".popup-add__btn-close");
const btnAddCard = container.querySelector(".add-button");
const contentBigPicture = container.querySelector(".big-picture");
const cards = container.querySelector(".cards");
const elements = container.querySelector(".elements");
const formPopupAdd = document.forms.popupadd;
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
function addCardsStatic() {
  const fragment = document.createDocumentFragment();
  initialCards.forEach((element) => {
    const card = new Card(element, ".card-template");
    const cardElement = card.generateCard();
    fragment.appendChild(cardElement);
  });
  cards.appendChild(fragment);
}
addCardsStatic();

function addCardsDinamic() {
  const popupName = document.querySelector("#popup-add-name").value;
  const popuDescription = document.querySelector("#popup-add-descripcion").value;
  const element = {
    name: popupName,
    link: popuDescription,
  };
  const card = new Card(element, ".card-template");
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
  initialCards.unshift({ name: popupName, link: popuDescription });
}
popupAddCard.addEventListener("submit", function () {
addCardsDinamic();
closeWindowsAddCard();
});
popup.addEventListener("submit", saveWindowProfile);

btnClose.addEventListener("click", closeWindowEditProfile);
btnCloseWindowAddCard.addEventListener("click", closeWindowsAddCard);

btnEditarProfile.addEventListener("click", function () {
  openWindowEditProfile();
  const datos = {
    inputSelectorForm: ".popup__input",
    submitButtonSelectorForm: ".popup__btn-save",
    inactiveButtonClassForm: "popup__btn-save_disabled",
    inputErrorClassForm: "popup__input_type_error",
    errorClassForm: "popup__error_visible",
  };
  const form = new FormValidator(datos, ".popup");
  form.enableValidation();
});
btnAddCard.addEventListener("click", function () {
  const datos = {
    inputSelectorForm: ".popup-add__input",
    submitButtonSelectorForm: ".popup-add__btn-save",
    inactiveButtonClassForm: "popup-add__btn-save_disabled",
    inputErrorClassForm: "popup-add__input_type_error",
    errorClassForm: "popup-add__error_visible",
  };
  const form = new FormValidator(datos, ".popup-add");
  form.enableValidation();
  openWindowAddCard();
});
export {
  container,
  elements,
  addCardsDinamic,
  cards,
  contentBigPicture,
  btnClose,
  btnCloseWindowAddCard,
  btnEditarProfile,
  btnAddCard,
  popupAddCard,
  popup,
  formPopupAdd
};
