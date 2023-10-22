export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }
  getUserInfo() {
    const userInfo = {
      name: this.nameElement.textContent,
      about: this.jobElement.textContent,
    };
    return userInfo;
  }
  setUserInfo(newUserInfo) {
    this.nameElement.textContent = newUserInfo.name;
    this.jobElement.textContent = newUserInfo.about;
  }
}
