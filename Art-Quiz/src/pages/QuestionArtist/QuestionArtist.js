import "./QuestionArtist.scss"
import { imageData } from "../QuestionPictres/QuestionPictures"
import Settings from "../Settings/Settings"
import PicturesArtist from "./PicturesArtist"
import QuestionPictures from "../QuestionPictres/QuestionPictures"

class QuestionArtist {
  constructor() {
    this.pictures = new PicturesArtist()
    this.settings = new Settings()
    this.questions = new QuestionPictures()
    this.state
    this.result
    this.trueResult
  }

  render(state) {
    let event = async () => {
      let wrap = document.querySelector(".main-wrapper")

      wrap.innerHTML = ""
      let questionsHTML = `
        <div class="question-artist-wrapper">
            <div class="question-close-modal">
                <button class="button-close-modal-menu btn-question-close"></button>
                <div class="question-close-modal-text btn-question-close">Do you really want to quit the game?</div>
                <button class="button question-close-modal-menu btn-question-close button-controller" data-page="Main">Menu</button>
                <button class="button  question-close-modal-category btn-question-close button-controller">Categories</button>
            </div>
            <div class="question-artist-header">
                <button class="question-close"></button>
                <div class="question-artist-header-time"></div>
            </div>
            <div class="question-artist-question"></div>
            <div class="question-artist-wrap">
                <div class="question-artist-img"></div>
                <div class="question-artist-img"></div>
                <div class="question-artist-img"></div>
                <div class="question-artist-img"></div>
            </div>
            <div class="question-artist-progress-dot">
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
                <span class="picture-progress-dot"></span>
            </div>
            <div class="main-footer">
                <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>
                <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>
                <div class="footer-year">2021</div>
            </div>
            <div class="button-next-wrap">
                <div class="current-image"></div>
                <div class="current-name"></div>
                <div class="current-author"></div>
                <div class="current-year"></div>
                <button class="button button-modal-next">Next</button>
            </div>
            <div class="quiz-modal-end">
                <button class="quiz-modal-end-close button-controller quiz-end-main" data-page="Main"></button>
                <div class="end-text">Congratulations!</div>
                <div class="end-result"></div>
                <button class="button modal-button-end-exit button-controller quiz-end-main" data-page="Main">Exit</button>
                <button class="button modal-button-end-next button-controller">Next Quiz</button>
            </div>
            <div class="overflow"></div>
        </div>`
      wrap.innerHTML = questionsHTML

      this.state = state //  присваиваем объект контроллер
      // присваиваем объект с результатами
      this.result =
        this.state.state.resultAnswer[`${this.state.state.category}`]
      // присваиваем объект с положительными результатами
      this.trueResult =
        this.state.state.trueAnswer[`${this.state.state.category}`]

      this.state.setEventListeners() // метод Controller-a для добавления лиснера к кнопкам
      await this.pictures.createImage(9, state)
      await this.createAuthor(9)
      this.questions.modalCloseQuiz("Artists")
      this.targetImage()
    }
    return event()
  }

  createAuthor(num) {
    let event = async () => {
      let oneItemArray = 0 // выводим картинки из массива начиная с первого элемента

      let questionContainer = document.querySelector(
        ".question-artist-question"
      )

      let start = this.state.state.category * 10 // определяем начало интервала категории в json файле

      //  получаем массив с нужными нам объектами
      let currentData = imageData.slice(start).map((item) => {
        return item.author
      })

      questionContainer.textContent = `Which is ${currentData[oneItemArray]} picture?`

      let overflow = document.querySelector(".overflow")

      document
        .querySelector(".button-modal-next")
        .addEventListener("click", () => {
          overflow.classList.remove("overflow-active")

          questionContainer.textContent = `Which is ${
            currentData[oneItemArray + 1]
          } picture?`

          if (oneItemArray == num) {
            this.state.setEventListeners()
            this.questions.modalEndQuiz(
              this.state.state.category,
              this.result,
              this.trueResult,
              "Artists"
            )
            this.settings.soundEndQuiz()
          } else {
            oneItemArray++
          }
        })
    }
    return event()
  }

  //  Данный метод отслеживает клик на определённую картинку при ответе
  targetImage() {
    let oneItemArray = 0 //  перебираем массив начиная с первого элемента

    let imgClick = document.querySelectorAll(".question-artist-img")

    let start = this.state.state.category * 10

    // получаем нужные массивы из json
    let currentAuthor = imageData.slice(start).map((item) => item.author)
    let currentImage = imageData.slice(start).map((item) => item.imageNum)
    let currentYear = imageData.slice(start).map((item) => item.year)
    let currentName = imageData.slice(start).map((item) => item.name)

    //  получаем элементы для создания карточки после ответа с кнопкой Next
    let currentImageElement = document.querySelector(".current-image")
    let currentNameElement = document.querySelector(".current-name")
    let currentAuthorElement = document.querySelector(".current-author")
    let currentYearElement = document.querySelector(".current-year")

    let buttonNextWrap = document.querySelector(".button-next-wrap")

    //  создаём элемент правильного ответа, который высвечивается в модальном окне после ответа
    let trueAnswer = document.createElement("div")
    trueAnswer.classList.add("answer-true")

    //  получаем заливку фона при всплытии модального окна
    let overflow = document.querySelector(".overflow")

    //  получаем все точки прогресса
    let dots = document.querySelectorAll(".picture-progress-dot")

    imgClick.forEach((item) => {
      item.addEventListener("click", (e) => {
        overflow.classList.add("overflow-active")

        //  если мы кликаем на картинку, текст которой равен правильному ответу из массива, то меняем цвет
        if (+e.target.dataset.id == oneItemArray) {
          //  звук правильного ответа
          this.settings.soundTrueAnswer()
          //  объект с массивами результата ответов
          this.result.push(true)

          //  в модальном окне ответа зелёный значок с галочкой
          trueAnswer.classList.remove("answer-false")

          // присваиваем зелёный цвет точке прогресса
          dots[oneItemArray].classList.add("picture-progress-dot-true")
        } else {
          //  звук не правильного ответа
          this.settings.soundFalseAnswer()
          //  объект с массивами результата ответов
          this.result.push(false)

          // присваиваем красный цвет точке прогресса
          dots[oneItemArray].classList.add("picture-progress-dot-false")

          //  в модальном окне ответа зелёный значок с галочкой
          trueAnswer.classList.add("answer-false")
        }
        console.log(this.result)
        //  обнуляем элементы для создания карточки
        currentImageElement.innerHTML = ""
        currentNameElement.innerHTML = ""
        currentAuthorElement.innerHTML = ""
        currentYearElement.innerHTML = ""

        let img = document.createElement("img")
        img.classList.add("question-picture-img-modal")
        img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${currentImage[oneItemArray]}full.webp`

        //  создаём элементы для создания карточки
        currentImageElement.append(trueAnswer)
        currentImageElement.append(img)
        currentNameElement.append(currentName[oneItemArray])
        currentAuthorElement.append(currentAuthor[oneItemArray])
        currentYearElement.append(currentYear[oneItemArray])

        buttonNextWrap.classList.add("button-next-wrap-open")
        oneItemArray++
      })
    })
  }
}

export default QuestionArtist
