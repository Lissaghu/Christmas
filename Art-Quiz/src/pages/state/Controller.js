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
  constructor(currentPage = new Main(), trueAnswer, category) {
    this.state = {
      currentPage, //  страница, на которой находимся
      trueAnswer, //  не реализовано
      category //  какую категорию выбрали
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
    this.state.currentPage.render(this)
    this.setEventListeners()
  }
}

export default Controller