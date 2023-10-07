import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import {
  initialCards,
  container,
  btnEditarProfile,
  popup,
  popupAddCard,
  btnClose,
  btnCloseWindowAddCard,
  btnAddCard,
  contentBigPicture,
  cards,
  elements,
  formPopupAdd,
  elementPopupName,
  elementPopupJob,
  inputSelectorsPopup,
  popupFormSelectorsToValidate
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//Instancio y visualizo las 6 primeras tarjetas
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
insertCard.renderItems(); //metodo para renderizar las tarjetas

//instancio y agrego un tarjeta mediante el formulario agregar tarjeta
const openPopupCard = new PopupWithForm("popup-add", (formData) => {
  console.log(formData);

  initialCards.push(formData);

  console.log(initialCards);

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


const userInfo = new UserInfo(inputSelectorsPopup); //instanciamos


const openPopupProfile = new PopupWithForm("popup", (formData) => {
userInfo.setUserInfo(formData);
});


btnEditarProfile.addEventListener("click", function () {// abre form profile

const getUserData=userInfo.getUserInfo();

elementPopupName.value=getUserData.name;
elementPopupJob.value=getUserData.job;

  openPopupProfile.open();

  const form = new FormValidator(popupFormSelectorsToValidate, ".popup");

  form.enableValidation();
});

btnAddCard.addEventListener("click", function () {
  openPopupCard.open();

  const datos = {
    inputSelectorForm: ".popup-add__input",
    submitButtonSelectorForm: ".popup-add__btn-save",
    inactiveButtonClassForm: "popup-add__btn-save_disabled",
    inputErrorClassForm: "popup-add__input_type_error",
    errorClassForm: "popup-add__error_visible",
  };
  const form = new FormValidator(datos, ".popup-add");
  form.enableValidation();
});

export {
  container,
  elements,
  cards,
  contentBigPicture,
  btnClose,
  btnCloseWindowAddCard,
  btnEditarProfile,
  btnAddCard,
  popupAddCard,
  popup,
  formPopupAdd,
};
