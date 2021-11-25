import Main from "./pages/Main/Main"
import Settings from "./pages/Settings/Settings"
import Pictures from "./pages/Pictures/Pictures"
import Artists from "./pages/Artist/Artist"
import QuestionPictures from "./pages/QuestionPictres/QuestionPictures"
import Author from "./pages/QuestionPictres/Author"
import QuestionArtist from "./pages/QuestionArtist/QuestionArtist"
import PicturesArtist from "./pages/QuestionArtist/PicturesArtist"
import Controller from "./pages/state/Controller"
import "./styles/style.scss"
import "./components/Button/buttonStyle.scss"

window.onload = () => {
  let preloader = document.querySelector(".preloader")
  preloader.classList.add("pswp__preloader__icn-hide")
  new Controller().init()
}

alert(
  `Спасибо большое, что подождали! Проверьте работу пожалуйста на мобильном разрешении, желательно на 360х640, на адаптив времени не хватило)`
)

console.log(`
Спасибо всем, кто смог подождать до последнего дня кросс-чека!
Сделал многое, но не всё:
- Игра на вермя не сделана,
- При клике по карточкам на странице результата не выводится информация по ним
- Особо никаких уникальных анимаций, кроме плавной смены страниц и выезжающих модальных окон, 
тут всё на ваше усмотрение)

--- Почему-то GitHub не может найти пути к mp3, поэтому пришлось залить на нетлифай
работоспособность звука можете проверить по ссылке https://brave-davinci-38c203.netlify.app/
`)
