export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {// este metodo obtiene datos del html desde el princpio
    const userInfo = {
      name: this.nameElement.textContent, //extraemmos el contenido de profileInput nombre
      job: this.jobElement.textContent, //extraemmos el contenido de profileInput trabajo
    };
    return userInfo;
  }

  setUserInfo(newUserInfo) {//mete datos al html
    this.nameElement.textContent = newUserInfo.name;
    this.jobElement.textContent = newUserInfo.job;
  }
}
