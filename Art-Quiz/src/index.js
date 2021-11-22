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
  let preloader = document.querySelector(".pswp__preloader__icn")
  preloader.classList.add("pswp__preloader__icn-hide")
  new Controller().init()
}
