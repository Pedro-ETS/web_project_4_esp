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
export const profileImage=container.querySelector(".profile__content");
export const contentProfile=container.querySelector(".profile__content-fond");
export const btnEditImgProfile=container.querySelector(".profile__btn-edit");
export const popupEditImg=container.querySelector(".popup-edit-img");
export const elementNameProfile=container.querySelector(".profile__subtitle");
export const elementJobProfile=container.querySelector(".profile__text");
export const elementProfileContImg=container.querySelector(".profile__content");
export const card=container.querySelector(".card");
export function renderLoading(isLoading,elementClass){
  const elementBtn=document.querySelector(elementClass);
  if(elementClass===".popup-confirm-deletion__btn-delete"){
    isLoading ? elementBtn.textContent = "Eliminando tarjeta..." : elementBtn.textContent = "si";
  }else{
    isLoading ? elementBtn.textContent = "Guardando..." :elementBtn.textContent = "Guardar";
  }
}
export const popupFormSelectorsToValidate = {
  inputSelectorForm: ".popup__input",
  submitButtonSelectorForm: ".popup__btn-save",
  inactiveButtonClassForm: "popup__btn-save_disabled",
  inputErrorClassForm: "popup__input_type_error",
  errorClassForm: "popup__input-error_active",
};
export const popupAddFormSelectorsToValidate = {
  inputSelectorForm: ".popup-add__input",
  submitButtonSelectorForm: ".popup-add__btn-save",
  inactiveButtonClassForm: "popup-add__btn-save_disabled",
  inputErrorClassForm: "popup-add__input_type_error",
  errorClassForm: "popup-add__input-error_active",
};
export const popupEditImgFormToValidate = {
  inputSelectorForm: ".popup-edit-img__input",
  submitButtonSelectorForm: ".popup-edit-img__btn-save",
  inactiveButtonClassForm: "popup-edit-img__btn-save_disabled",
  inputErrorClassForm: "popup-edit-img__input_type_error",
  errorClassForm: "popup-edit-img__input-error",
};

