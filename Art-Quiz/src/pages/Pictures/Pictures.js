import "./Pictures.scss"
import QuestionPictures from "../QuestionPictres/QuestionPictures"

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
  "Industrial"
]

// Класс страницы с категориями
class Pictures {
  constructor() {
    this.state
  }

  // рендерим страницу с категориями
  render(state) {
    let event = async () => {
      // метод для рендера страницы с категориями Pictures
      const wrap = document.querySelector(".main-wrapper")
      wrap.innerHTML = ""
      let currentPage = `
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
      wrap.innerHTML = currentPage

      this.state = state
      await this.createCategoryCard(12, 10, 0) //  передаём количество категорий, вопросов и с какого элемента начинаем итерацию
      this.setEventListeners() // Вызываем лиснеры
    }
    return event()
  }

  // создаём нужное количество категорий
  createCategoryCard(num, numQuestion, startNum) {
    let wrap = document.querySelector(".pictures-grid")
    let titleArrayCount = 0 // переменная для перебора массива внутри цикла ниже

    let event = async () => {
      let res = await fetch("../../components/Images/images.json")
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
          wrapTitle.append(picturesCount)

          let picturesWrap = document.createElement("div") // обёртка для картинки
          picturesWrap.classList.add("pictures-img-wrap")
          container.append(picturesWrap)

          let img = document.createElement("img") // сама картинка
          img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/img/${elem.imageNum}.webp`
          img.classList.add("pictures-img")
          img.setAttribute("data-category", titleArrayCount)
          picturesWrap.append(img)
          titleArrayCount++ // увеличиваем индекс массива с тайтлами на единицу
        }
      }
    }
    return event()
  }

  // вешаем клик на каждую категорию
  setEventListeners() {
    document.querySelectorAll("img").forEach((item) => {
      item.addEventListener("click", () => this.questionRender(event))
    })
  }

  // рендерим страницу с вопросами
  questionRender(e) {
    if (e.target.dataset.category) {
      this.state.category = +e.target.dataset.category
      this.state.currentPage = new QuestionPictures()
    }
    this.state.currentPage.render(this.state)
  }
}

export default Pictures
