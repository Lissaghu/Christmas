import "./QuestionPictures.scss"
import Author from "./Author"
import Settings from "../Settings/Settings"

const arrayJson = async () => {
  let res = await fetch(
    "https://raw.githubusercontent.com/Lissaghu/image-data/master/images.json"
  )
  let data = await res.json()
  return data
}

export let imageData //  массив из json
arrayJson().then((data) => {
  imageData = data // достаём данные из json и присваим их переменной
})

class QuestionPictures {
  constructor() {
    this.author = new Author()
    this.settings = new Settings()
    this.state
    this.result
    this.trueResult
  }

  // рендерим страницу с вопросом
  render(state, Pictures) {
    let event = async () => {
      let wrap = document.querySelector(".main-wrapper")

      wrap.innerHTML = ""
      let questioinsHTML = `
        <div class="question-picture-wrapper">
            <div class="question-picture">
                <div class="question-close-modal">
                    <button class="button-close-modal-menu btn-question-close"></button>
                    <div class="question-close-modal-text btn-question-close">Do you really want to quit the game?</div>
                    <button class="button question-close-modal-menu btn-question-close button-controller" data-page="Main">Menu</button>
                    <button class="button  question-close-modal-category btn-question-close button-controller">Categories</button>
                </div>
                <div class="question-picture-header">
                    <button class="question-close"></button>
                    <div class="question-picture-header-time"></div>
                </div>
                <div class="question-picture-question">Who is the author of this picture?</div>
                <div class="question-picture-wrap"></div>
                <div class="question-picture-progress-dot">
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
                <div class="question-author-button-wrap">
                    <button class="button question-author-button"></button>
                    <button class="button question-author-button"></button>
                    <button class="button question-author-button"></button>
                    <button class="button question-author-button"></button>
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
            </div>
        </div>`
      wrap.innerHTML = questioinsHTML

      this.state = state // присваиваем объект Controller
      // присваиваем объект с результатами
      this.result =
        this.state.state.resultAnswer[`${this.state.state.category}`]
      // присваиваем объект с положительными результатами
      this.trueResult =
        this.state.state.trueAnswer[`${this.state.state.category}`]
      state.setEventListeners() // метод Controller-a для добавления лиснера к кнопкам
      await this.author.createAuthor(9, state)
      await this.createImage(9)
      this.modalCloseQuiz("Pictures")
      this.targetAuthor()
    }
    return event()
  }

  createImage(num) {
    let event = async () => {
      let oneItemArray = 0 // выводим картинки из массива начиная с первого элемента

      let imgContainer = document.querySelector(".question-picture-wrap")

      let start = this.state.category * 10 // определяем начало интервала категории в json файле

      //  получаем массив с нужными нам объектами
      let currentData = imageData.slice(start).map((item) => {
        return item.imageNum
      })

      //  создаём изображения и присваиваем им соответствующий src
      let img = document.createElement("img")
      img.classList.add("question-picture-img")
      img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${currentData[oneItemArray]}full.webp`
      imgContainer.append(img)

      let overflow = document.querySelector(".overflow")

      // при клике на кнопку Next выводится следующее изображение
      document
        .querySelector(".button-modal-next")
        .addEventListener("click", () => {
          overflow.classList.remove("overflow-active")

          imgContainer.innerHTML = ""
          let img = document.createElement("img")
          img.classList.add("question-picture-img")
          img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${
            +currentData[oneItemArray] + 1
          }full.webp`
          imgContainer.append(img)

          if (oneItemArray == num) {
            this.state.setEventListeners()
            this.modalEndQuiz(
              this.state.state.category,
              this.result,
              this.trueResult,
              "Pictures"
            )
            this.settings.soundEndQuiz()
          } else {
            oneItemArray++
          }
        })
    }
    return event()
  }

  targetAuthor() {
    //  Данный метод отслеживает клик на определённую кнопку с автором
    let oneItemArray = 0 //  перебираем массив начиная с первого элемента
    let buttonAuthorClick = document.querySelectorAll(".question-author-button")

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

    //  вешаем лиснер на все кнопки с авторами
    buttonAuthorClick.forEach((item) => {
      item.addEventListener("click", (e) => {
        overflow.classList.add("overflow-active")

        //  если мы кликаем на кнопку, текст которой равен правильному ответу из массива, то меняем цвет
        if (e.target.innerText == currentAuthor[oneItemArray]) {
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

  modalCloseQuiz(kindOfCategory) {
    // в зависимости от атрибута будем попадать на категорию художников или картин
    let buttonCategory = document.querySelector(
      ".question-close-modal-category"
    )
    buttonCategory.setAttribute("data-page", kindOfCategory)

    let buttonClose = document.querySelector(".question-close")
    let overflow = document.querySelector(".overflow")

    let modalClose = document.querySelector(".question-close-modal")
    buttonClose.addEventListener("click", () => {
      overflow.classList.add("overflow-active")
      modalClose.classList.add("question-close-modal-open")
    })

    let closeModalMenu = document.querySelectorAll(".btn-question-close")
    closeModalMenu.forEach((item) => {
      item.addEventListener("click", () => {
        overflow.classList.remove("overflow-active")
        modalClose.classList.remove("question-close-modal-open")
      })
    })
  }

  modalEndQuiz(category, result, trueResult, page) {
    let buttonEndNext = document.querySelector(".modal-button-end-next")
    buttonEndNext.setAttribute("data-page", page)

    let modalEnd = document.querySelector(".quiz-modal-end")
    modalEnd.classList.add("quiz-modal-end-open")

    let overflow = document.querySelector(".overflow")
    overflow.classList.add("overflow-active")

    let buttonMenu = document.querySelectorAll(".quiz-end-main")
    buttonMenu.forEach((item) => {
      item.addEventListener("click", () => {
        modalEnd.classList.remove("quiz-modal-end-open")
        overflow.classList.remove("overflow-active")
      })
    })

    let buttonCategories = document.querySelector(".modal-button-end-next")
    buttonCategories.addEventListener("click", () => {
      modalEnd.classList.remove("quiz-modal-end-open")
      overflow.classList.remove("overflow-active")
    })

    localStorage.setItem(`${category}-result`, JSON.stringify(result))

    //  выводим полученный результат в конце раунда
    let endResult = document.querySelector(".end-result")
    for (let elem of result) {
      if (elem == true) {
        trueResult.push(elem)
      }
    }
    //  сохраняем в локал сторидж полученный результат по категории в которую сыграли
    localStorage.setItem(`${category}`, trueResult.length)

    //  выводим результат в конце игры
    endResult.textContent = `${trueResult.length}/10`
  }
}

export default QuestionPictures
