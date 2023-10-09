import "./styles/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  btnEditarProfile,
  btnAddCard,
  cards,
  elementPopupName,
  elementPopupJob,
  inputSelectorsPopup,
  popupFormSelectorsToValidate,
  popupAddFormSelectorsToValidate,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const insertCard = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card-template");
      const cardElement = card.generateCard();
      insertCard.addItem(cardElement);
    },
  },
  cards
);
insertCard.renderItems();
const openPopupCard = new PopupWithForm("popup-add", (formData) => {
  initialCards.push(formData);
  const insertCard = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        const card = new Card(item, ".card-template");
        const cardElement = card.generateCard();
        insertCard.addItem(cardElement);
      },
    },
    cards
  );
  insertCard.renderItems();
});
const userInfo = new UserInfo(inputSelectorsPopup);
const openPopupProfile = new PopupWithForm("popup", (formData) => {
  userInfo.setUserInfo(formData);
});
const formProfile= new FormValidator(popupFormSelectorsToValidate, ".popup");
btnEditarProfile.addEventListener("click", function () {
  const getUserData = userInfo.getUserInfo();
  elementPopupName.value = getUserData.name;
  elementPopupJob.value = getUserData.job;
  openPopupProfile.open();
  formProfile.enableValidation();
});
const formCard = new FormValidator(popupAddFormSelectorsToValidate, ".popup-add");
btnAddCard.addEventListener("click", function () {
  openPopupCard.open();
  formCard.enableValidation();
});
