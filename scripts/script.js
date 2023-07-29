const container = document.querySelector('.container');//seleccionamos el contenedor
const btnEditar = container.querySelector('.edit-button_action_add');//seleccionamos el boton editar
const btnsave = container.querySelector('.popup__btn-save');//seleccioanmos el boton guardar
const popup=container.querySelector('.popup');
const btnclose=container.querySelector('.btn-close');

function openwindow() {
  const popup = container.querySelector(".popup");//
  popup.classList.add('popup_opened');//removemos la clace
  const profiletext=document.querySelector('.profile__text');//seleccionamos el texto
  const profsub=document.querySelector('.profile__subtitle');//seleccionamos subtitulo
  const proftext=profiletext.textContent//obtenemos contenido
  const subtitle=profsub.textContent
  const popupname=document.querySelector(".popup__name").value=subtitle;//asignamos valores a los input
  const textdescrip=document.querySelector(".popup__descripcion").value=proftext;
}
function close(){
  const popup = container.querySelector(".popup");//
  popup.classList.remove("popup_opened");//removemos la clace
}
function save(){
//textcont.innerHTML='este es algo nuevo';
const popupname=document.querySelector(".popup__name").value;
const popudescription=document.querySelector(".popup__descripcion").value;
const profilesub=container.querySelector('.profile__subtitle');//almacenamos la propiedad del elemento
const textcont=container.querySelector('.profile__text');//almacenamos la propiedad del elemento
profilesub.textContent=popupname;
textcont.textContent= popudescription;//a ese elemento le asignamos un texto
close();
}

function Handleprofileformediting(evt){
  evt.preventDefault();//deitiene el evento por defecto
}
btnsave.addEventListener('click', save);
btnclose.addEventListener('click', close);
popup.addEventListener('submit', Handleprofileformediting);
popup.addEventListener("keydown", (e)=>{
  if(e.keyCode===13){
   save();
  }
})
btnEditar.addEventListener('click', openwindow);

