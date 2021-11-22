import "./Settings.scss"

class Settings {
  render() {
    const wrap = document.querySelector(".main-wrapper")
    wrap.innerHTML = ""
    let settingsHTML = `
    <div class="main-settings">
      <button class="settigs-back button-controller" data-page="Main"></button>
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
          <button class="button-prev btn-settings">&minus;</button>
          <div class="time-input-count">20</div>
          <button class="button-next btn-settings">+</button>
      </div>
      <div class="main-settings-button">
          <button class="button-default button button-controller" data-page="Main">Default</button>
          <button class="button-save button button-controller" data-page="Main">Save</button>
      </div>
      <div class="main-footer">
          <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>
          <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>
          <div class="footer-year">2021</div>
      </div>
    </div>`
    wrap.innerHTML = settingsHTML
  }
}

export default Settings

// export const settingsPage = new SettingsPage()

// listenSettingsButton() {
//   let settingsButton = document.querySelector(".settings")

//   let eventSettingsButton = () => {
//     this.wrap.classList.add("main-wrapper-out")

//     setTimeout(() => {
//       this.createSettigsHTML()
//       this.listenSettingsButtonBack()
//       this.wrap.classList.remove("main-wrapper-out")
//     }, 500)
//   }

//   settingsButton.addEventListener("click", eventSettingsButton)
// }

// listenSettingsButtonBack() {
//   let buttonBack = document.querySelector(".settigs-back")

//   buttonBack.addEventListener("click", () => {
//     this.wrap.classList.add("main-wrapper-out")

//     setTimeout(() => {
//       this.createMainHTML()
//       this.createButtonArtist()
//       this.createButtonPictures()
//       this.listenSettingsButton()
//       this.wrap.classList.remove("main-wrapper-out")
//     }, 500)
//   })
// }
