import "./main-page.scss";
import { buttonComponent } from "../../components/Button/button.js";

export class MainInterface {
  constructor(button) {
    this.body = document.querySelector("body");
    this.button = button;
  }

  createMainHTML() {
    let html = `
      <div class="main-wrapper">
        <div class="settings">

        </div>
        <div class="main">
            <img class="logo-main" src="./assets/img/logo-main.png" alt="">
        </div>
        <div class="main-footer">
            <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a> 
            <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>
            <div class="footer-year">2021</div>
        </div>    
      </div>`;
    this.body.innerHTML = html;
  }

  createButtonArtist() {
    let main = document.querySelector(".main");
    const buttonArtist = this.button({
      onClick: () => console.log("hello"),
      title: "Artist quiz",
      className: "button-artist"
    });

    main.append(buttonArtist);
  }

  createButtonPictures() {
    let main = document.querySelector(".main");
    const buttonArtist = this.button({
      onClick: () => console.log("hello"),
      title: "Pictures quiz",
      className: "button-pictures"
    });

    main.append(buttonArtist);
  }
}

export const mainInterface = new MainInterface(buttonComponent);
mainInterface.createMainHTML();
mainInterface.createButtonArtist();
mainInterface.createButtonPictures();
