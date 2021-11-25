import "../Pictures/Pictures.scss"
import Pictures, { itemTitleArray } from "../Pictures/Pictures" // массив тайтлов для карточек
import { dataImage } from "../Pictures/Pictures"
import QuestionArtist from "../QuestionArtist/QuestionArtist"
import PicturesArtist from "../QuestionArtist/PicturesArtist"
import ScoreArtist from "../Score/ScoreArtist"
import ScorePictures from "../Score/Score"

class Artists {
  constructor() {
    this.pictureClass = new Pictures()
    this.state // передаём контроллер
  }

  render(state) {
    let event = async () => {
      const wrap = document.querySelector(".main-wrapper")
      wrap.innerHTML = ""
      let currentPageHTML = `
        <div class="categories-pictures-wrapper">
            <div class="main-categories-pictures">
                <div class="categories-pictures-title">Categories</div>
                <div class="pictures-grid"></div>
                <div class="categories-pictures-sidebar">
                    <button class="sidebar-home sidebar-button button-controller" data-page="Main">Home</button>
                    <button class="sidebar-categories sidebar-button" data-page="Artists">Categories</button>
                </div>
            </div>
        </div>`
      wrap.innerHTML = currentPageHTML
      this.state = state
      await this.pictureClass.createCategoryCard(12, 10, 119, 12)
      this.pictureClass.setEventListeners(new QuestionArtist(), state)
      this.pictureClass.setEventScore(this.state)
    }
    return event()
  }
}

export default Artists
