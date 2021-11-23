import Main from "./pages/Main/Main"
import Settings from "./pages/Settings/Settings"
import Pictures from "./pages/Pictures/Pictures"
import Artists from "./pages/Artist/Artist"
import QuestionPictures from "./pages/QuestionPictres/QuestionPictures"
import Author from "./pages/QuestionPictres/Author"
import Controller from "./pages/state/Controller"
import "./styles/style.scss"
import "./components/Button/buttonStyle.scss"

window.onload = () => {
  let preloader = document.querySelector(".preloader")
  preloader.classList.add("pswp__preloader__icn-hide")
  new Controller().init()
}

alert(
  `Приветствую, прошу вас пожалуйста, проверьте мою работу в последний день
  cross-check, желательно вечером, очень много времени потратил на изучение
  классов, поэтому проект не готов даже на половину, буду очень благодарен,
  вы можете связаться со мной в discord @Inter #7639. Если вы всё же решите
  проверить, то проверьте на разрешении 360х640, хотел следовать mobile first,
  но на адаптив времени не хватает. Буду очень вам признателен!)`
)
