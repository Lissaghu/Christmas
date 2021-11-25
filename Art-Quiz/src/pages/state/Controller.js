import "../../components/Button/buttonStyle.scss"
import QuestionPictures from "../QuestionPictres/QuestionPictures"
import Settings from "../Settings/Settings"
import Pictures from "../Pictures/Pictures"
import Artists from "../Artist/Artist"
import Main from "../Main/Main"

const classes = new Map([
  ["Settings", Settings],
  ["Main", Main],
  ["Pictures", Pictures],
  ["Artists", Artists]
])

const getClassRefByName = (name) => {
  let requestedClass = classes.get(name)
  return new requestedClass()
}

class Controller {
  constructor(currentPage = new Main(), category, score) {
    this.state = {
      currentPage, //  страница, на которой находимся
      resultAnswer: {},
      trueAnswer: {}, //
      category, //  какую категорию выбрали
      score //  нужная нам категория по которой выводим score
    }
  }

  init() {
    this.state.currentPage.render()
    this.setEventListeners()
  }

  setEventListeners() {
    document.querySelectorAll(".button-controller").forEach((el) => {
      el.addEventListener("click", () => this.changePage(event))
    })
  }

  changePage(e) {
    if (e) this.state.currentPage = getClassRefByName(e.target.dataset.page)
    let container = document.querySelector(".main-wrapper")
    container.classList.add("main-wrapper-out")
    setTimeout(() => {
      container.classList.remove("main-wrapper-out")
      this.state.currentPage.render(this)
      this.setEventListeners()
    }, 500)
  }
}

export default Controller
