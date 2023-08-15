const container = document.querySelector(".container"); //seleccionamos el contenedor
const btnEditarprofile = container.querySelector(".edit-button_action_add"); //seleccionamos el boton editar
const btnsave = container.querySelector(".popup__btn-save"); //seleccioanmos el boton guardar
const popup = container.querySelector(".popup");
const popupaddcard = container.querySelector(".popup-add");
const btnclose = container.querySelector(".popup__btn-close");
const btnclosewindowaddcard = container.querySelector(".popup-add__btn-close");
const btnaddcar = container.querySelector(".add-button");
const btnsavepopupadd = container.querySelector(".popup-add__btn-save");
const btnlove = container.querySelector(".card__btn-love");
const contentbigpicture = container.querySelector(".big-picture");
const cardstemp = container.querySelector("#card-template").content; //apuntamos al templete
const cards = container.querySelector(".cards"); //seleccionamos donde aremos la inserccion
const card = document.querySelector(".card"); //seleccionamos la card
const elements = document.querySelector(".elements");
//array de tarjetas iniciales
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
function openwindoweditprofile() {  //abre el frame editar profile
  popup.classList.add("popup_opened");
  const profiletext = document.querySelector(".profile__text"); //seleccionamos el texto
  const profsub = document.querySelector(".profile__subtitle"); //seleccionamos subtitulo
  const proftext = profiletext.textContent; //obtenemos contenido
  const subtitle = profsub.textContent;
  const popupname = (document.querySelector(".popup__name").value = subtitle); //asignamos valores a los input
  const textdescrip = (document.querySelector(".popup__descripcion").value =proftext);
}
function closeewindoweditprofile() {//cierra frame editar profile
  popup.classList.remove("popup_opened");
}
function openwindowaddcard() {//abre el frame agregar card
  popupaddcard.classList.add("popup-add_opened");
}
function closewindowsaddcard() {//cierra el frame agregar card
  popupaddcard.classList.remove("popup-add_opened");
}
function savewindowprofile() {
  const popupname = document.querySelector(".popup__name").value;
  const popudescription = document.querySelector(".popup__descripcion").value;
  const profilesub = container.querySelector(".profile__subtitle"); //almacenamos la propiedad del elemento
  const textcont = container.querySelector(".profile__text"); //almacenamos la propiedad del elemento
  profilesub.textContent = popupname;
  textcont.textContent = popudescription; //a ese elemento le asignamos un texto
  closeewindoweditprofile();
}

function addcardsstatic() {//funcion que agrega tarjetas iniciales
  const fragment = document.createDocumentFragment(); //creamos un campo en memoria para los objetos
  initialCards.forEach((element) => {
    cardstemp.querySelector(".card__image").setAttribute("src", element.link); //extraemos el link e imagen e insertamos en la card
    cardstemp.querySelector(".card__image").setAttribute("alt", "Imagen de" + element.name); //extraemos el nombre de image y asignamos al alt
    cardstemp.querySelector(".card__subtitle").textContent = element.name; //introducimos el nombre a la card
    const clonecardstemp = cardstemp.querySelector(".card").cloneNode(true); //clonamos la card
    clonecardstemp.querySelector(".card__btn-love").addEventListener("click", function (evt) {//activar/desactivar like
      evt.target.classList.toggle("card__btn-love_activate");
    });
    clonecardstemp.querySelector(".card__btn-trash").addEventListener("click", function (evt) { //elimina card
        const parentNodo = evt.target.parentNode;
        parentNodo.remove();

    });
    clonecardstemp.querySelector(".card__image").addEventListener("click", function (evt) {//muestra imagen en grandre
      const link = evt.target.getAttribute("src");
      const alt = evt.target.getAttribute("alt");
      const city = alt.substring(9, alt.leng);
      contentbigpicture.querySelector(".big-picture__image-normal").setAttribute("src", link);
      contentbigpicture.querySelector(".big-picture__lugar").textContent = city;
      contentbigpicture.classList.add("big-picture_activate");
    });
    contentbigpicture.querySelector(".big-picture__btn-close").addEventListener("click", function (evt) {//cierra imagen en grande
    contentbigpicture.classList.remove("big-picture_activate");
    });

    fragment.appendChild(clonecardstemp);
  });
  cards.appendChild(fragment);
}


function addcardsdinamic() {
  const popupname = document.querySelector(".popup-add__name").value;
  const popudescription = document.querySelector(".popup-add__descripcion").value;
  cardstemp.querySelector(".card__image").setAttribute("src", popudescription);
  cardstemp.querySelector(".card__image").setAttribute("alt", "Imagen de" + popupname);
  cardstemp.querySelector(".card__subtitle").textContent = popupname;
  const clonecardstemp = cardstemp.querySelector(".card").cloneNode(true);
  clonecardstemp.querySelector(".card__btn-love").addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__btn-love_activate");
  });
  clonecardstemp.querySelector(".card__btn-trash").addEventListener("click", function (evt) {
    const res = evt.target.parentNode;
    res.remove();
  });
  clonecardstemp.querySelector(".card__image").addEventListener("click", function (evt) {
    const link = evt.target.getAttribute("src");
    const alt = evt.target.getAttribute("alt");
    const city = alt.substring(9, alt.leng);
    contentbigpicture.querySelector(".big-picture__image-normal").setAttribute("src", link);
    contentbigpicture.querySelector(".big-picture__lugar").textContent = city;
    contentbigpicture.classList.toggle("big-picture_activate");
  });
  contentbigpicture.querySelector(".big-picture__btn-close").addEventListener("click", function (evt) {
    contentbigpicture.classList.remove("big-picture_activate");
    });

  cards.prepend(clonecardstemp);
  initialCards.unshift({ name: popupname, link: popudescription });
  closewindowsaddcard();
  console.log(initialCards);
}

popup.addEventListener("click", function (evt) {
  evt.preventDefault();
});
popup.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    savewindowprofile();
  }
});
popupaddcard.addEventListener("click", function (evt) {
  evt.preventDefault();
});

btnsave.addEventListener("click", savewindowprofile);
btnclose.addEventListener("click", closeewindoweditprofile);
btnclosewindowaddcard.addEventListener("click", closewindowsaddcard);
btnEditarprofile.addEventListener("click", openwindoweditprofile);
btnaddcar.addEventListener("click", openwindowaddcard);
btnsavepopupadd.addEventListener("click", addcardsdinamic);
addcardsstatic();
