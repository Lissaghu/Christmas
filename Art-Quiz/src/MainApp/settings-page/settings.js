import { MainInterface } from "../core";
import { buttonComponent } from "../../components/Button/button";
import "./settings.scss";

export class SettingsInterface extends MainInterface {
  constructor(button, wrap) {
    super(button, wrap);
    this.wrap = wrap;
    this.button = button;
  }

  createSettigsHTML() {
    let settingsHTML = `
    <div class="main-settings">
      <div class="settigs-back"></div>
      <div class="settings-name">Settings</div>
      <div class="volume-name">Volume</div>        
      <div class="settings-volume-range">
          <input class="volume-range" id="volume" type="range" 
      max="100" value="34" min="0" step="2">
          <div class="button-mute"></div>
          <div class="button-volume"></div>
      </div>
      <div class="time-game-name">Time game</div>
      <div class="time-game-input">
          <input type="checkbox">

      </div>
      <div class="time-answer">Time to answer</div>
      <div class="time-input">
          <button class="button-prev btn-settings" type="button">&minus;</button>
          <div class="time-input-count">20</div>
          <button class="button-next btn-settings" type="button">+</button>
      </div>
      <div class="main-settings-button">
          
      </div>
      <div class="main-footer">
          <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>
          <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>
          <div class="footer-year">2021</div>
      </div>            
    </div>`;
    this.wrap.innerHTML = settingsHTML;
  }

  update() {
    let settingsButton = document.querySelector(".main-settings-button");
    return settingsButton;
  }

  listenSettingsButton() {
    // let settingsButton = document.querySelector(".settings");
    let settingsButton = this.update();
    console.log(settingsButton);

    let eventSettingsButton = () => {
      this.wrap.classList.add("main-wrapper-out");

      setTimeout(() => {
        this.createSettigsHTML();
        this.createButtonDefault();
        this.createButtonSave();
        this.listenSettingsButtonBack();
        this.wrap.classList.remove("main-wrapper-out");
      }, 500);
    };

    this.update().addEventListener("click", eventSettingsButton);
  }

  createButtonDefault() {
    let main = document.querySelector(".main-settings-button");
    const buttonArtist = this.button({
      onClick: () => console.log("hello"),
      title: "Default",
      className: "button-default"
    });

    main.append(buttonArtist);
  }

  createButtonSave() {
    let main = document.querySelector(".main-settings-button");
    const buttonArtist = this.button({
      onClick: () => console.log("hello"),
      title: "Save",
      className: "button-save"
    });

    main.append(buttonArtist);
  }

  listenSettingsButtonBack() {
    let buttonBack = document.querySelector(".settigs-back");

    buttonBack.addEventListener("click", () => {
      this.wrap.classList.add("main-wrapper-out");

      setTimeout(() => {
        this.update();
        this.createMainHTML();
        this.createButtonArtist();
        this.createButtonPictures();
        this.wrap.classList.remove("main-wrapper-out");
      }, 500);
    });
  }
}

const wrap = document.querySelector(".main-wrapper");

const settingsInterface = new SettingsInterface(buttonComponent, wrap);
settingsInterface.listenSettingsButton();

// <button class="button-default button">Default</button>
// <button class="button-save button">Save</button>
