const container = document.querySelector(".container");
const btnEditarProfile = container.querySelector(".edit-button_action_add");
const btnSave = container.querySelector(".popup__btn-save");
const popup = container.querySelector(".popup");
const popupAddCard = container.querySelector(".popup-add");
const btnClose = container.querySelector(".popup__btn-close");
const btnCloseWindowAddCard = container.querySelector(".popup-add__btn-close");
const btnAddCard = container.querySelector(".add-button");
const btnSavePopupAdd = container.querySelector(".popup-add__btn-save");
const contentBigPicture = container.querySelector(".big-picture");
const cardsTemp = container.querySelector("#card-template").content;
const cards = container.querySelector(".cards");
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
function openWindowEditProfile() {
  popup.classList.add("popup_opened");
  const profileText = document.querySelector(".profile__text");
  const profSub = document.querySelector(".profile__subtitle");
  const profText = profileText.textContent;
  const subTitle = profSub.textContent;
  container.querySelector(".popup__name").value = subTitle;
  container.querySelector(".popup__descripcion").value =profText;
}
const closeWindowEditProfile = () =>  popup.classList.remove("popup_opened");
function openWindowAddCard (){
  popupAddCard.classList.add("popup-add_opened");
  container.querySelector(".popup-add__name").value = "";
  container.querySelector(".popup-add__descripcion").value = "";
}
const closeWindowsAddCard = () =>  popupAddCard.classList.remove("popup-add_opened");
function saveWindowProfile() {
  const popupName = document.querySelector(".popup__name").value;
  const popuDescription = document.querySelector(".popup__descripcion").value;
  const profileSub = container.querySelector(".profile__subtitle");
  const textCont = container.querySelector(".profile__text");
  profileSub.textContent = popupName;
  textCont.textContent = popuDescription;
  closeWindowEditProfile();
}
function openWindowContentImage(evt){
  const link = evt.target.getAttribute("src");
  const alt = evt.target.getAttribute("alt");
  const city = alt.substring(9, alt.leng);
  contentBigPicture.querySelector(".big-picture__image-normal").setAttribute("src", link);
  contentBigPicture.querySelector(".big-picture__image-normal").setAttribute("alt", "imagen de "+city);
  contentBigPicture.querySelector(".big-picture__lugar").textContent =city;
  contentBigPicture.classList.add("big-picture_activate");
}
function addCardsStatic() {
  const fragment = document.createDocumentFragment();
  initialCards.forEach((element) => {
    cardsTemp.querySelector(".card__image").setAttribute("src", element.link);
    cardsTemp.querySelector(".card__image").setAttribute("alt", "Imagen de "+element.name);
    cardsTemp.querySelector(".card__subtitle").textContent = element.name;
    const cloneCardsTemp = cardsTemp.querySelector(".card").cloneNode(true);
    cloneCardsTemp.querySelector(".card__btn-love").addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__btn-love_activate");
      });
    cloneCardsTemp.querySelector(".card__btn-trash").addEventListener("click", function (evt) {
        const parentNodo = evt.target.parentNode;
        parentNodo.remove();
      });
    cloneCardsTemp.querySelector(".card__image").addEventListener("click", function (evt) {
      openWindowContentImage(evt);
      });
    contentBigPicture.querySelector(".big-picture__btn-close").addEventListener("click", function (evt) {
        contentBigPicture.classList.remove("big-picture_activate");
      });
    fragment.appendChild(cloneCardsTemp);

  });
  cards.appendChild(fragment);
}
function addCardsDinamic() {
  const popupName = document.querySelector(".popup-add__name").value;
  const popuDescription = document.querySelector(".popup-add__descripcion").value;
  cardsTemp.querySelector(".card__image").setAttribute("src", popuDescription);
  cardsTemp.querySelector(".card__image").setAttribute("alt", "Imagen de " + popupName);
  cardsTemp.querySelector(".card__subtitle").textContent = popupName;
  const cloneCardsTemp = cardsTemp.querySelector(".card").cloneNode(true);
  cloneCardsTemp.querySelector(".card__btn-love").addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__btn-love_activate");
    });
  cloneCardsTemp.querySelector(".card__btn-trash").addEventListener("click", function (evt) {
      const res = evt.target.parentNode;
      res.remove();
    });
  cloneCardsTemp.querySelector(".card__image").addEventListener("click", function (evt) {
   openWindowContentImage(evt);
    });
  contentBigPicture.querySelector(".big-picture__btn-close").addEventListener("click", function (evt) {
      contentBigPicture.classList.remove("big-picture_activate");
    });
  cards.prepend(cloneCardsTemp);
  initialCards.unshift({ name: popupName, link: popuDescription });
  closeWindowsAddCard();
}
popup.addEventListener("click", function (evt) {
  evt.preventDefault();
});
popup.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    saveWindowProfile();
  }
});
popupAddCard.addEventListener("click", function (evt) {
  evt.preventDefault();
});
btnSave.addEventListener("click", saveWindowProfile);
btnClose.addEventListener("click", closeWindowEditProfile);
btnCloseWindowAddCard.addEventListener("click", closeWindowsAddCard);
btnEditarProfile.addEventListener("click", openWindowEditProfile);
btnAddCard.addEventListener("click", openWindowAddCard);
btnSavePopupAdd.addEventListener("click", addCardsDinamic);
addCardsStatic();
