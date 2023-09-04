const container = document.querySelector(".container");
const btnEditarProfile = container.querySelector(".edit-button_action_add");
const popup = container.querySelector(".popup");
const popupAddCard = container.querySelector(".popup-add");
const btnClose = container.querySelector(".popup__btn-close");
const btnCloseWindowAddCard = container.querySelector(".popup-add__btn-close");
const btnAddCard = container.querySelector(".add-button");
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
  const profSub = document.querySelector(".profile__subtitle").textContent;
  const profileText = document.querySelector(".profile__text").textContent;
  container.querySelector("#popup-name").value = profSub;
  container.querySelector("#popup-descripcion").value = profileText;
  closeWindowSuperposicions();
  document.addEventListener("keyup", closeWindowdEsc);
}
const closeWindowEditProfile = () => popup.classList.remove("popup_opened");
function openWindowAddCard() {
  popupAddCard.classList.add("popup-add_opened");
  closeWindowSuperposicions();
  document.addEventListener("keyup", closeWindowdEsc);
}
const closeWindowsAddCard = () => {
  popupAddCard.classList.remove("popup-add_opened");
  formAddCard = document.forms.popupadd;
  formAddCard.reset();
};
function saveWindowProfile() {
  const popupName = document.querySelector("#popup-name").value;
  const popuDescription = document.querySelector("#popup-descripcion").value;
  container.querySelector(".profile__subtitle").textContent = popupName;
  container.querySelector(".profile__text").textContent = popuDescription;
  closeWindowEditProfile();
}
function openWindowContentImage(evt) {
  const link = evt.target.getAttribute("src");
  const alt = evt.target.getAttribute("alt");
  const city = alt.substring(9, alt.leng);
  contentBigPicture.querySelector(".big-picture__image-normal").setAttribute("src", link);
  contentBigPicture.querySelector(".big-picture__image-normal").setAttribute("alt", "imagen de " + city);
  contentBigPicture.querySelector(".big-picture__lugar").textContent = city;
  contentBigPicture.classList.add("big-picture_activate");
  closeWindowSuperposicions();
  document.addEventListener("keyup", closeWindowdEsc);
}
function addCardsStatic() {
  const fragment = document.createDocumentFragment();
  initialCards.forEach((element) => {
    cardsTemp.querySelector(".card__image").setAttribute("src", element.link);
    cardsTemp.querySelector(".card__image").setAttribute("alt", "Imagen de " + element.name);
    cardsTemp.querySelector(".card__subtitle").textContent = element.name;
    const cloneCardsTemp = cardsTemp.querySelector(".card").cloneNode(true);
    fragment.appendChild(cloneCardsTemp);
  });
  cards.appendChild(fragment);
}
function addCardsDinamic() {
  const popupName = document.querySelector("#popup-add-name").value;
  const popuDescription = document.querySelector("#popup-add-descripcion").value;
  cardsTemp.querySelector(".card__image").setAttribute("src", popuDescription);
  cardsTemp.querySelector(".card__image").setAttribute("alt", "Imagen de " + popupName);
  cardsTemp.querySelector(".card__subtitle").textContent = popupName;
  const cloneCardsTemp = cardsTemp.querySelector(".card").cloneNode(true);
  cards.prepend(cloneCardsTemp);
  initialCards.unshift({ name: popupName, link: popuDescription });
  closeWindowsAddCard();
}
cards.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__btn-love")) {
    evt.target.classList.toggle("card__btn-love_activate");
  } else if (evt.target.classList.contains("card__btn-trash")) {
    const parentNodo = evt.target.parentNode;
    parentNodo.remove();
  } else if (evt.target.classList.contains("card__image")) {
    openWindowContentImage(evt);
  } else if (evt.target.classList.contains("big-picture__btn-close")) {
    contentBigPicture.classList.remove("big-picture_activate");
  }
});
contentBigPicture.querySelector(".big-picture__btn-close").addEventListener("click", function (evt) {
    contentBigPicture.classList.remove("big-picture_activate");
  });
btnClose.addEventListener("click", closeWindowEditProfile);
btnCloseWindowAddCard.addEventListener("click", closeWindowsAddCard);
btnEditarProfile.addEventListener("click", openWindowEditProfile);
btnAddCard.addEventListener("click", openWindowAddCard);
addCardsStatic();
const closeWindowSuperposicions = () => {
  container.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("big-picture")) {
      evt.target.classList.remove("big-picture_activate");
    } else if (evt.target.classList.contains("popup")) {
      evt.target.classList.remove("popup_opened");
    } else if (evt.target.classList.contains("popup-add")) {
      evt.target.classList.remove("popup-add_opened");
    }
  });
};
function closeWindowdEsc(evt) {
  if (evt.key === "Escape") {
    popup.classList.remove("popup_opened");
    popupAddCard.classList.remove("popup-add_opened");
    contentBigPicture.classList.remove("big-picture_activate");
  }
  document.removeEventListener("keyup", closeWindowdEsc);
}

