import "./Pictures.scss"
import QuestionPictures from "../QuestionPictres/QuestionPictures"
import ScorePictures from "../Score/Score"
import QuestionArtist from "../QuestionArtist/QuestionArtist"

export const itemTitleArray = [
  // массив тайтлов для карточек, при увеличении количества карточек нужно пополнить массив тайтлов
  "Portrait",
  "Landscape",
  "Still Life",
  "Graphic",
  "Antique",
  "Avant-Garde",
  "Renaissance",
  "Surrealism",
  "Kitsch",
  "Minimalism",
  "Avangard",
  "Industrial",
  "Portrait",
  "Landscape",
  "Still Life",
  "Graphic",
  "Antique",
  "Avant-Garde",
  "Renaissance",
  "Surrealism",
  "Kitsch",
  "Minimalism",
  "Avangard",
  "Industrial"
]

// Класс страницы с категориями
class Pictures {
  constructor() {
    this.state //  передаём конструктор
    this.resultAnswer //  результаты ответов
    this.trueAnswer //  правильные результаты ответов
  }

  // рендерим страницу с категориями
  render(state) {
    let event = async () => {
      // метод для рендера страницы с категориями Pictures
      const wrap = document.querySelector(".main-wrapper")
      wrap.innerHTML = ""
      let picturesHTML = `
      <div class="categories-pictures-wrapper">
        <div class="main-categories-pictures">
          <div class="categories-pictures-title">Categories</div>
          <div class="pictures-grid"></div>
          <div class="categories-pictures-sidebar">
              <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>
              <button class="sidebar-categories sidebar-button" data-page="Pictures">Categories</button>
          </div>
        </div>
      </div>`
      wrap.innerHTML = picturesHTML

      this.state = state
      this.resultAnswer = state.state.resultAnswer
      this.trueAnswer = state.state.trueAnswer
      //  передаём количество категорий, вопросов, с какого элемента
      //  начинаем итерацию и значение переменной для перебора массива
      await this.createCategoryCard(12, 10, 0, 0)
      this.setEventListeners(new QuestionPictures(), this.state) // Вызываем лиснеры
      this.setEventScore(this.state)
    }
    return event()
  }

  // создаём нужное количество категорий
  createCategoryCard(num, numQuestion, startNum, count) {
    let wrap = document.querySelector(".pictures-grid")
    let titleArrayCount = count // переменная для перебора массива внутри цикла ниже

    let event = async () => {
      let res = await fetch(
        "https://raw.githubusercontent.com/Lissaghu/image-data/master/images.json"
      )
      let data = await res.json()

      for (let elem of data) {
        // получаем нужные нам элементы из JSON файла и создаём вёрстку карточек
        if (
          elem.imageNum % numQuestion == 0 &&
          elem.imageNum < num * numQuestion + startNum - 1 &&
          elem.imageNum >= startNum
        ) {
          let container = document.createElement("div") // общий контейнер для каждой карточки
          container.classList.add("pictures-grid-item")
          wrap.append(container)

          let wrapTitle = document.createElement("div") // обёртка для тайтла и вывода в дальнейшем колчиство верных ответов
          wrapTitle.classList.add("pictures-grid-item-wrap-title")
          container.append(wrapTitle)

          let itemTitle = document.createElement("div") // сам тайтл
          itemTitle.classList.add("pictures-grid-item-title")
          itemTitle.textContent = itemTitleArray[titleArrayCount]
          wrapTitle.append(itemTitle)

          let picturesCount = document.createElement("div") // счётчик верных ответов
          picturesCount.classList.add("pictures-count")
          //  присваиваем значение из локала
          let local = localStorage.getItem(`${titleArrayCount}`)
          picturesCount.textContent = local == null ? "" : local + "/10"
          wrapTitle.append(picturesCount)

          let picturesWrap = document.createElement("div") // обёртка для картинки
          picturesWrap.classList.add("pictures-img-wrap")
          container.append(picturesWrap)

          let img = document.createElement("img") // сама картинка
          img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${elem.imageNum}.webp`
          if (local != null) {
            img.classList.add("pictures-img-color")
          }
          img.classList.add("pictures-img")
          img.setAttribute("data-category", titleArrayCount)
          picturesWrap.append(img)

          let scoreButton = document.createElement("button")
          scoreButton.textContent = "Score"
          scoreButton.classList.add("pictures-score-button")
          if (local != null) {
            scoreButton.classList.add("pictures-score-button-open")
          }
          scoreButton.setAttribute("data-score", titleArrayCount)
          picturesWrap.append(scoreButton)

          titleArrayCount++ // увеличиваем индекс массива с тайтлами на единицу
        }
      }
    }
    return event()
  }

  // вешаем клик на каждую категорию
  setEventListeners(setKindQuestion, state) {
    document.querySelectorAll("img").forEach((item) => {
      item.addEventListener("click", () => {
        this.questionRender(event, setKindQuestion, state)
      })
    })
  }

  // рендерим страницу с вопросами
  questionRender(e, setKindQuestion, state) {
    if (e.target.dataset.category) {
      state.state.category = +e.target.dataset.category
      state.state.currentPage = setKindQuestion
      this.getResultAnswer(state)
      this.getTrueAnswer(state)
    }

    let container = document.querySelector(".main-wrapper")
    container.classList.add("main-wrapper-out")
    setTimeout(() => {
      container.classList.remove("main-wrapper-out")
      state.state.currentPage.render(state)
    }, 500)
  }

  //  данный метод создаёт объект с ответами на категории
  getResultAnswer(state) {
    state.state.resultAnswer[`${state.state.category}`] = []
  }

  //  данный метод создаёт объект с правильными ответами на категории
  getTrueAnswer(state) {
    state.state.trueAnswer[`${state.state.category}`] = []
  }

  setEventScore(state) {
    document.querySelectorAll(".pictures-score-button").forEach((item) => {
      item.addEventListener("click", () => this.scoreRender(event, state))
    })
  }

  scoreRender(e, state) {
    if (e.target.dataset.score) {
      state.state.score = +e.target.dataset.score
      state.state.currentPage = new ScorePictures()
    }
    let container = document.querySelector(".main-wrapper")
    container.classList.add("main-wrapper-out")
    setTimeout(() => {
      container.classList.remove("main-wrapper-out")
      state.state.currentPage.render(state)
    }, 500)
  }
}

export default Pictures
