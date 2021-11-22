import "./QuestionPictures.scss"
import Author from "./Author"

const arrayJson = async () => {
  let res = await fetch("../../components/Images/images.json")
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
    this.state
  }

  // рендерим страницу с вопросом
  render(state) {
    let event = async () => {
      let wrap = document.querySelector(".main-wrapper")

      wrap.innerHTML = ""
      let questioinsHTML = `
        <div class="question-picture-wrapper">
            <div class="question-picture">
                <div class="question-picture-header">
                    <button class="question-close"></button>
                    <div class="question-picture-header-time"></div>
                </div>
                <div class="question-picture-question">Who is the author of this picture?</div>
                <div class="question-picture-wrap"></div>
                <div class="question-author-button-wrap">
                    <button class="button question-author-button"></button>
                    <button class="button question-author-button"></button>
                    <button class="button question-author-button"></button>
                    <button class="button question-author-button"></button>
                </div>
                <div class="button-next-wrap">
                    <div class="current-image"></div>
                    <div class="current-name"></div>
                    <div class="current-author"></div>
                    <div class="current-year"></div>
                    <button class="button button-modal-next">Next</button>
                </div>
                <div class="overflow"></div>
                <div class="main-footer">
                    <a href="https://rs.school/js/" target="blank"><img class="footer-logo" src="./assets/svg/rs_school_js.svg" alt=""></a>
                    <div class="footer-name">App developer: <a class="footer-name-link" href="https://github.com/Lissaghu" target="blank">Anton Dogadin</a></div>
                    <div class="footer-year">2021</div>
                </div>
            </div>
        </div>`
      wrap.innerHTML = questioinsHTML

      this.state = state // присваиваем объект Controller
      console.log(state.setEventListener)
      //   state.setEventListener() // метод Controller-a для добавления лиснера к кнопкам
      await this.author.createAuthor(9, event, this.state)
      await this.createImage(9, event)
      this.target(event)
    }
    return event()
  }

  createImage(num) {
    let event = async () => {
      let oneItemArray = 0 // выводим картинки из массива начиная с первого элемента

      let container = document.querySelector(".main-wrapper")
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

      // при клике на кнопку Next выводится следующее изображения
      document
        .querySelector(".button-modal-next")
        .addEventListener("click", () => {
          imgContainer.innerHTML = ""
          let img = document.createElement("img")
          img.classList.add("question-picture-img")
          img.src = `https://raw.githubusercontent.com/Lissaghu/image-data/master/full/${
            +currentData[oneItemArray] + 1
          }full.webp`
          imgContainer.append(img)

          if (oneItemArray == num) {
            container.innerHTML = this.renderEndQuiz()
            this.state.setEventListener()
          } else {
            oneItemArray++
          }
        })
    }
    return event()
  }

  target(e) {
    //  Данный метод отслеживает клик на определённую кнопку с автором
    let oneItemArray = 0 //  перебираем массив начиная с первого элемента
    let buttonAuthorClick = document.querySelectorAll(".question-author-button")

    let start = this.state.category * 10

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

    let trueAnswer = document.createElement("div")
    trueAnswer.classList.add("answer-true")

    //  вешаем лиснер на все кнопки с авторами
    buttonAuthorClick.forEach((item) => {
      item.addEventListener("click", (e) => {
        //  если мы кликаем на кнопку, текст которой равен правильному ответу из массива, то меняем цвет
        if (e.target.innerText == currentAuthor[oneItemArray]) {
          item.classList.add("question-author-button-green")
          trueAnswer.classList.remove("answer-false")
        } else {
          trueAnswer.classList.add("answer-false")
          item.classList.add("question-author-button-red")
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
}

export default QuestionPictures
