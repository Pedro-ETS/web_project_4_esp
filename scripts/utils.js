import {container,contentBigPicture,popupAddCard,popup,formPopupAdd} from "../scripts/index.js";

document.querySelector(".big-picture__btn-close").addEventListener("click", function () {
    contentBigPicture.classList.remove("big-picture_activate");
  });
function openWindowAddCard() {
  popupAddCard.classList.add("popup-add_opened");
  closeWindowSuperposicions();
  document.addEventListener("keyup", closeWindowdEsc);
}
function openWindowEditProfile() {
  popup.classList.add("popup_opened");
  const profSub = document.querySelector(".profile__subtitle").textContent;
  const profileText = document.querySelector(".profile__text").textContent;
  container.querySelector("#popup-name").value = profSub;
  container.querySelector("#popup-descripcion").value = profileText;
  closeWindowSuperposicions();
  document.addEventListener("keyup", closeWindowdEsc);
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
function saveWindowProfile() {
  const popupName = document.querySelector("#popup-name").value;
  const popuDescription = document.querySelector("#popup-descripcion").value;
  container.querySelector(".profile__subtitle").textContent = popupName;
  container.querySelector(".profile__text").textContent = popuDescription;
  closeWindowEditProfile();
}
const closeWindowEditProfile = () => popup.classList.remove("popup_opened");

const closeWindowsAddCard = () => {
  popupAddCard.classList.remove("popup-add_opened");
  formPopupAdd.reset();
};
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
export {
  closeWindowsAddCard,
  openWindowContentImage,
  closeWindowSuperposicions,
  closeWindowdEsc,
  openWindowEditProfile,
  openWindowAddCard,
  closeWindowEditProfile,
  saveWindowProfile,
};