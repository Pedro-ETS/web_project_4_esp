import "./styles/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import {
  btnEditarProfile,
  btnAddCard,
  cards,
  elementPopupName,
  elementPopupJob,
  inputSelectorsPopup,
  popupFormSelectorsToValidate,
  popupAddFormSelectorsToValidate,
  popupEditImgFormToValidate,
  profileImage,
  elementProfileContImg,
  contentProfile,
  btnEditImgProfile,
  elementNameProfile,
  elementJobProfile,
  renderLoading
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const apiGetCards = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_09/cards",
  headers: {
    authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
    "Content-Type": "application/json",
  },
});
const uownUser = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_09/users/me",
  headers: {
    authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
    "Content-Type": "application/json",
  },
});
uownUser.getUser()
  .then((userData) => {
    elementNameProfile.textContent = userData.name;
    elementJobProfile.textContent = userData.about;
    elementProfileContImg.style.backgroundImage = `url('${userData.avatar}')`;
    console.log(userData);
  })
  .catch((error) => {
    alert("Error al cargar la información del usuario:", error);
  });

function addCards(initialCards) {
  const insertCard = new Section(
    {
      data: initialCards,
      renderer: (item) => {
        const card = new Card (item,".card-template");
        const cardElement = card.generateCard();
        const idUser = cardElement.querySelector(".card__btn-trash").getAttribute("data-user-id");
        const likes = cardElement.querySelector(".card__like-number").textContent;
        if (idUser !== "dcf490f1110c4236836c8193") {
          cardElement.querySelector(".card__btn-trash").style.display = "none";
        }
        if (likes==0) {
          cardElement.querySelector(".card__like-number").style.display = "none";
        }
        insertCard.addItem(cardElement);
      },
    },
    cards
  );
  insertCard.renderItems();
}
function createCards() {
  apiGetCards.getInitialCards()
    .then((initialCards) => {
      addCards(initialCards);
      console.log(initialCards);
    })
    .catch((error) => {
      alert("Error al cargar la información de las tarjetas:", error);
    });
}
createCards();

const popupCard = new PopupWithForm("popup-add",(formData) => {
  const apiInsertCard = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web_es_09/cards",
    headers: {
      authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
      "Content-Type": "application/json",
    },
    datos: {
      link: formData.link,
      name: formData.name,
    },
  });
  apiInsertCard.setCard()
    .then((initialCards) => {
      createCards();
    })
    .catch((error) => {
      alert("Error al enviar la tarjeta no se pudo cargar:", error);
    })
    .finally(() => {
      renderLoading(false,".popup-add__btn-save");
      popupCard.close();
  });
});

const userInfo = new UserInfo(inputSelectorsPopup);

const popupProfile = new PopupWithForm("popup",(datos) => {
  const editUser = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web_es_09/users/me",
    headers: {
      authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
      "Content-Type": "application/json",
    },
    datos: {
      about: datos.about,
      name: datos.name,
    },
  });
  editUser.modifyUser()
    .then((datoUserEdit) => {
      userInfo.setUserInfo(datoUserEdit);
    })
    .catch((error) => {
      console.error("Lo siento no se pudo modificar la informacion:" + error);
    })
    .finally(() => {
      renderLoading(false,".popup__btn-save");
      popupProfile.close();
  });
});

const formProfile = new FormValidator(popupFormSelectorsToValidate, ".popup");
const formCard = new FormValidator(popupAddFormSelectorsToValidate,".popup-add");
const formEditImg = new FormValidator(popupEditImgFormToValidate,".popup-edit-img");


profileImage.onmouseover = function () {
  contentProfile.classList.add("profile__content-fond_opened");
};
profileImage.onmouseout = function () {
  contentProfile.classList.remove("profile__content-fond_opened");
};
const popupEditImg = new PopupWithForm("popup-edit-img", (formData) => {
  const editImgUser = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web_es_09/users/me/avatar",
    headers: {
      authorization: "33adefcc-a71e-4103-8764-faa4d26a6099",
      "Content-Type": "application/json",
    },
    datos: {
      avatar: formData.link,
    },
  });
  editImgUser.modifyImgUser()
    .then((modifyImgUser) => {
      elementProfileContImg.style.backgroundImage = `url('${modifyImgUser.avatar}')`;
      console.log(modifyImgUser);
    })
    .catch((error) => {
      console.error("Lo siento ocurrio un error:" + error);
    })
    .finally(() => {
      renderLoading(false,".popup-edit-img__btn-save");
      popupEditImg.close();
  });
});

btnEditarProfile.addEventListener("click", function () {
  const getUserData = userInfo.getUserInfo();
  elementPopupName.value = getUserData.name;
  elementPopupJob.value = getUserData.about;
  popupProfile.open();
  formProfile.enableValidation();
});

btnAddCard.addEventListener("click", function () {
  popupCard.open();
  formCard.enableValidation();
});

btnEditImgProfile.addEventListener("click", function () {
  popupEditImg.open();
  formEditImg.enableValidation();
});


