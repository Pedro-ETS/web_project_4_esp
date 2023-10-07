export default class Section {

  constructor({ data, renderer },containerSelector) {
    this._renderedItems = data; // arreglo de objetos a recorer
    this._renderer = renderer; //callback
    this._container = document.querySelector(containerSelector); //container donde se agregara al Dom
  }


  addItem(element) { //metodo que agrega al dom
    this._container.prepend(element);
  }


  renderItems() { //metodo que renderisa todos los elemento
    this._container.innerHTML = '';
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}