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
  private toysState: {[key: string]: string}
  private filterObj

  constructor(private toys = data) { 
    this.toysState = {
      currentSort: 'start',
      currentFilter: '',
    }
    this.filterObj = {
      shape: {
        колокольчик: false,
        шар: false,
        шишка: false,
        снежинка: false,
        фигурка: false
      },
      color: {
        white: false,
        yellow: false,
        red: false,
        blue: false,
        green: false
      },
      size: {
        big: false,
        average: false,
        small: false
      },
      // count: {
      //   start: 1,
      //   end: 12
      // },
      // year: {
      //   start: 1940,
      //   end: 2021
      // }
    }
  }

  initToys(state: IController): void {
    this.filterCard()
    this.renderToysCard() 
    state.setEventListener()
    this.renderRangeSlider()  
    this.sortCard()
    this.shapeFilterCard()
  }

  renderToysCard(): void {
    let toysCardContainer: HTMLDivElement = document.querySelector('.main__toys__card') as HTMLDivElement
    toysCardContainer.innerHTML = ''

    let dataToys = this.toys.sort(dataSort[this.toysState.currentSort])
                    
    for (let elem of dataToys) {
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
      if (this.toysState.currentSort === select.value) {
        return
      } else {
        this.toysState.currentSort = select.value
        this.renderToysCard()
      } 
    })
  }

  filterCard(): void {
    this.toys = data
    for (const [key, value] of Object.entries(this.filterObj)) {
      let toysCardFiltered = []
      for (const [k, v] of Object.entries(value)) {
        if (v === true) {
          toysCardFiltered = toysCardFiltered.concat(
            this.toys.filter(card => {
              return card[`${key}`] === k
            })
          )
          
        }
      }

      if (toysCardFiltered.length) {
        this.toys = this.toys.concat(toysCardFiltered)
        if (this.toys.length !== toysCardFiltered.length) {
          this.toys = this.toys.filter((item, index) => {
            return this.toys.indexOf(item) !== index
          })
        } 
      }
    }
  }

  shapeFilterCard(): void {
    let elements = document.querySelectorAll('.form')
    
    elements.forEach(item => {
      item.addEventListener('click', (e: Event): void => {
        let itemClass = document.querySelector(`.${item.className.slice(0, 21)} .main__toys__form_svg`)
        itemClass?.classList.add('.main__toys__form_svg-active')
        let filterShape = (e?.currentTarget as HTMLElement).dataset.form as string
        console.log(filterShape)
        
        this.filterObj.shape[filterShape] = true
        console.log(this.filterObj.shape[filterShape])
        this.filterCard()
        this.renderToysCard()
        console.log(this.toys)
      })
    })
    
  } 

}

export default Toys