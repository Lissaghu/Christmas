import "./Score.scss"
import { imageData } from "../QuestionPictres/QuestionPictures"
import QuestionPictures from "../QuestionPictres/QuestionPictures"
import QuestionArtist from "../QuestionArtist/QuestionArtist"

class ScorePictures {
  constructor() {
    this.score
  }

  render(state) {
    let wrap = document.querySelector(".main-wrapper")

    let scoreHTML = `
      <div class="score-wrapper">
          <div class="score-title button-controller" data-page="Pictures">Categories</div>
          <div class="score-grid"></div>
          <div class="categories-pictures-sidebar">
              <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>
              <button class="sidebar-categories sidebar-button button-controller" data-page="Pictures">Categories</button>
          </div>
      </div>`
    wrap.innerHTML = scoreHTML

    //  передаём параметр из класса Controller
    this.score = state.state.score

    state.setEventListeners() //  вешаем лиснеры для перехода по страницым
    this.renderResult(10) //  num - количество изображений в категории
  }

  renderResult(num) {
    let resultContainer = document.querySelector(".score-grid")

    let start = this.score * num // определяем начало интервала категории в json файле

    //  получаем массив с нужными нам объектами
    let currentData = imageData.slice(start, start + 10).map((item) => {
      return item.imageNum
    })

    for (let elem of currentData) {
      //  создаём изображения и присваиваем им соответствующий src
      let img = document.createElement("img")
      img.classList.add("question-picture-img")

      img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${elem}.webp`
      resultContainer.append(img)
    }

    let trueScore = JSON.parse(localStorage.getItem(`${this.score}-result`))
    let imgArray = document.querySelectorAll(".question-picture-img")

    for (let i = 0; i < trueScore.length; i++) {
      imgArray.forEach((item, index) => {
        if (trueScore[i] == false && i == index) {
          item.classList.add("score-img")
        }
      })
    }
  }
}

export default ScorePictures
