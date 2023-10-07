import {container,contentBigPicture,popupAddCard,popup,formPopupAdd} from "../scripts/index.js";

document.querySelector(".big-picture__btn-close").addEventListener("click", function () {
    contentBigPicture.classList.remove("big-picture_opened");
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
  contentBigPicture.classList.add("big-picture_opened");
  closeWindowSuperposicions();
  document.addEventListener("keyup", closeWindowdEsc);
}





export {
  openWindowContentImage,
  openWindowEditProfile,
  openWindowAddCard,

};