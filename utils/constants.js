export const initialCards = [
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
export const container = document.querySelector(".container");
export const btnEditarProfile = container.querySelector(".edit-button_action_add");
export const popup = container.querySelector(".popup");
export const popupAddCard = container.querySelector(".popup-add");
export const btnClose = container.querySelector(".popup__btn-close");
export const btnCloseWindowAddCard = container.querySelector(".popup-add__btn-close");
export const btnAddCard = container.querySelector(".add-button");
export const contentBigPicture = container.querySelector(".big-picture");
export const cards = ".cards";
export const elements = container.querySelector(".elements");
export const formPopupAdd = document.forms.popupadd;
export const elementPopupName = document.querySelector("#popup-name");
export const elementPopupJob = document.querySelector("#popup-descripcion");
export const inputSelectorsPopup={nameSelector:".profile__subtitle",jobSelector:".profile__text"}
export const popupFormSelectorsToValidate = {
  inputSelectorForm: ".popup__input",
  submitButtonSelectorForm: ".popup__btn-save",
  inactiveButtonClassForm: "popup__btn-save_disabled",
  inputErrorClassForm: "popup__input_type_error",
  errorClassForm: "popup__error_visible",
};