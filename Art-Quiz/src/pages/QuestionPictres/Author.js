import { imageData } from "./QuestionPictures"

class Author {
  constructor() {
    this.state
  }

  createAuthor(num, state) {
    let event = async () => {
      //  присваиваем объект Controller
      this.state = state

      let oneItemArray = 0 //  выводим авторов из массива начиная с первого элемента
      let buttonAuthor = document.querySelectorAll(".question-author-button")

      let start = this.state.state.category * 10 // определяем начало интервала категории в json файле

      //  получаем массив с нужными нам объектами
      let currentAuthor = imageData.slice(start).map((item) => {
        return item.author
      })

      //  получаем массив только авторов
      let allAuthors = imageData.map((item) => item.author)

      //  функция рандома
      let random = (max) => Math.floor(Math.random() * max)

      //  генерируем 4 рандомных автора в 4 кнопки
      buttonAuthor.forEach((item) => {
        item.textContent = allAuthors[random(240)]
      })
      //  генерирем в рандомную кнопку верный ответ
      buttonAuthor[random(4)].textContent = currentAuthor[oneItemArray]

      //  получаем контейнер кнопки Next и саму кнопку
      let buttonNextWrap = document.querySelector(".button-next-wrap")
      let buttonNext = document.querySelector(".button-modal-next")

      //  вешаем лиснер на кнопку Next
      buttonNext.addEventListener("click", () => {
        //  удаляем у контейнера кнопки Next класс open
        buttonNextWrap.classList.remove("button-next-wrap-open")
        //  получаем все кнопки с авторами
        let buttonAuthorClick = document.querySelectorAll(
          ".question-author-button"
        )

        // удаляем классы у кнопок
        buttonAuthorClick.forEach((item) => {
          item.classList.remove("question-author-button-green")
          item.classList.remove("question-author-button-red")
        })

        // генерируем рандомных авторов в кнопки
        buttonAuthor.forEach((item) => {
          item.textContent = allAuthors[random(240)]
        })

        //  генерируем нужного автора в рандомную кнопку
        buttonAuthor[random(4)].textContent = currentAuthor[oneItemArray + 1]

        if (oneItemArray != num) oneItemArray++ // увеличиваем магическое число
      })
    }
    return event()
  }
}

export default Author
