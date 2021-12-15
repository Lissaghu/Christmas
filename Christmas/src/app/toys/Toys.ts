import './Toys.scss'
import data from '../../data'
import { IController } from '../models/Models'
import RangeSlider from './RangeSlider/RangeSlider'
import SortToys from './SortToys'

const sortToys = new SortToys()

const dataSort = {
  start: sortToys.startName(),
  end: sortToys.endName(),
  max: sortToys.maxCount(),
  min: sortToys.minCount()
}

class Toys {
  private rangeSlider = new RangeSlider()
  private toysState

  constructor(private toys = data) { 
    this.toysState = {
      currentSort: 'start',
      currentFilter: ''
    }
  }

  initToys(state: IController): void {
    this.renderToysCard()
    state.setEventListener()
    this.renderRangeSlider()  
    this.sortCard()
    this.formFilterCard()
  }

  renderToysCard(): void {
    let toysCardContainer: HTMLDivElement = document.querySelector('.main__toys__card') as HTMLDivElement
    toysCardContainer.innerHTML = ''
    
    this.toys = data 
                    .sort(dataSort[this.toysState.currentSort])
                    

    for (let elem of this.toys) {
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
  }

  renderRangeSlider(): void {
    this.rangeSlider.renderRangeSliderNumber()
    this.rangeSlider.renderRangeSliderYear()
  }

  sortCard(): void {
    let select: HTMLSelectElement = document.querySelector('.main__toys__sort_select') as HTMLSelectElement
    select.addEventListener('click', () => {
      this.toysState.currentSort = select.value
      this.renderToysCard()
    })
  }

  formFilterCard() {
    let elements = document.querySelector('.main__toys__form')
    elements?.addEventListener('click', (e) => {
      if ((e.currentTarget as HTMLElement).className == 'main__toys__form_bell') {
        console.log('bell')
      } else {
        console.log('not bell')
      }
    })
  }

}

export default Toys