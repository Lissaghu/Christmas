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
    this.changeVolume()
  }

  //  звуковая индикация правильного ответа
  soundTrueAnswer() {
    let trueAnswer = new Audio("../../assets/audio/trueAnswer.mp3")
    trueAnswer.play()
    trueAnswer.volume = +localStorage.getItem("volume-trueAnswer") / 100

    let rangeVolume = document.querySelector(".volume-range")

    rangeVolume.addEventListener("change", function () {
      if (this.value == this.min) {
        trueAnswer.volume = 0
      } else if (this.value == this.max) {
        trueAnswer.volume = 1
      }
    })
  }

  //  звуковая индикация не правильного ответа
  soundFalseAnswer() {
    let falseAnswer = new Audio("../../assets/audio/falseAnswer.mp3")
    falseAnswer.play()
    falseAnswer.volume = +localStorage.getItem("volume-trueAnswer") / 100

    let rangeVolume = document.querySelector(".volume-range")

    rangeVolume.addEventListener("change", function () {
      if (this.value == this.min) {
        falseAnswer.volume = 0
      } else if (this.value == this.max) {
        falseAnswer.volume = 1
      }
    })
  }

  //  звуковая индикация окончания раунда
  soundEndQuiz() {
    let endQuiz = new Audio("../../assets/audio/endQuiz.mp3")
    endQuiz.play()
    endQuiz.volume = +localStorage.getItem("volume-trueAnswer") / 100

    let rangeVolume = document.querySelector(".volume-range")

    rangeVolume.addEventListener("change", function () {
      if (this.value == this.min) {
        endQuiz.volume = 0
      } else if (this.value == this.max) {
        endQuiz.volume = 1
      }
    })
  }

  //  изменения громкости звука
  changeVolume() {
    let rangeVolume = document.querySelector(".volume-range")

    //  сохраняем изменения инпута громкости в локал
    let saveButton = document.querySelector(".button-save")
    saveButton.addEventListener("click", () => {
      localStorage.setItem("volume-trueAnswer", rangeVolume.value)
    })

    //  присваиваем значение инпуту из локала
    rangeVolume.value = +localStorage.getItem("volume-trueAnswer")

    //  кнопки включения и выключения звука
    let buttonVolumeMax = document.querySelector(".button-volume")
    buttonVolumeMax.addEventListener("click", () => {
      rangeVolume.value = 1
    })

    let buttonVolumeMuted = document.querySelector(".button-mute")
    buttonVolumeMuted.addEventListener("click", () => {
      rangeVolume.value = 0
    })

    //  сброс настроек на дефолтное значение
    let defaultButton = document.querySelector(".button-default")
    defaultButton.addEventListener("click", () => {
      localStorage.setItem("volume-trueAnswer", 0)
    })
  }
}

export default Settings
