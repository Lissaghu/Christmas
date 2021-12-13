import './Toys.scss'
import data from '../../data'
import { IController } from '../models/Models'
import RangeSlider from './RangeSlider/RangeSlider'


class Toys {
  private rangeSlider = new RangeSlider()

  renderToysCard(state: IController): void {
    let toysCardContainer: HTMLDivElement = document.querySelector('.main__toys__card') as HTMLDivElement
    toysCardContainer.innerHTML = ''

    for (let elem of data) {
      let wrap = document.createElement('div')
      wrap.classList.add('main__toys__card-wrap')
      toysCardContainer.append(wrap)

      let card = `
      <div class="toys__card_container">
        <span class="toys__card_title">${elem.name}</span>
        <img class="toys__card_img" src="./assets/toys/${elem.num}.webp" alt="">
        <span class="toys__card_description">Количество: ${elem.count}</span>
        <span class="toys__card_description">Год покупки: ${elem.year} год</span>
        <span class="toys__card_description">Форма игрушки: ${elem.shape}</span>
        <span class="toys__card_description">Цвет игрушки: ${elem.color}</span>
        <span class="toys__card_description">Размер игрушки: ${elem.size}</span>
        <span class="toys__card_description">Любимая: нет</span>
      </div>`
      wrap.innerHTML = card
    }
    state.setEventListener()
    this.renderRangeSlider()
  }

  renderRangeSlider(): void {
    this.rangeSlider.renderRangeSliderNumber()
    this.rangeSlider.renderRangeSliderYear()
  }
}

export default Toys