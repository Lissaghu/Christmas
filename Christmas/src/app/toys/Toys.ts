import './Toys.scss'
import data from '../../data'
import { IController } from '../models/Models'
import RangeSlider from './RangeSlider/RangeSlider'
import SortToys from './SortToys'
import { Data } from '../models/Models'

const sortToys = new SortToys()

const dataSort = {
  start: sortToys.startName(),
  end: sortToys.endName(),
  max: sortToys.maxYear(),
  min: sortToys.minYear()
}

class Toys {
  private rangeSlider = new RangeSlider()
  private toysState: {[key: string]: string}
  private filterObj

  constructor(private toys: Data, private rangeToys: Data) { 
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
        белый: false,
        желтый: false,
        красный: false,
        синий: false,
        зелёный: false
      },
      size: {
        big: false,
        average: false,
        small: false
      },
      count: {
        start: 1,
        end: 12
      },
      year: {
        start: 1940,
        end: 2021
      }
    }
  }

  initToys(state: IController): void {
    this.filterCard()
    this.renderToysCard() 
    state.setEventListener()
    this.renderRangeSlider(this)  
    this.sortCard()
    this.shapeFilterCard()
    this.colorFilterCard()
  }

  renderToysCard(): void {
    let toysCardContainer: HTMLDivElement = document.querySelector('.main__toys__card') as HTMLDivElement
    toysCardContainer.innerHTML = ''

    let toysCard = [...this.toys]

    let copyToysCard: Data = []

    if (this.filterObj.count.start >= 1 || this.filterObj.count.end <= 12) {
      copyToysCard = toysCard.filter((item: { count: string | number; }) => {
        return +item.count >= this.filterObj.count.start && +item.count <= this.filterObj.count.end
      }).sort(dataSort[this.toysState.currentSort])   
    } 

    if (this.filterObj.year.start >= 1940 || this.filterObj.year.start <= 2021) {
      copyToysCard = copyToysCard.filter((item: { year: string | number; }) => {
        return +item.year >= this.filterObj.year.start && +item.year <= this.filterObj.year.end
      }).sort(dataSort[this.toysState.currentSort])   
    }
              
    for (let elem of copyToysCard) {
      let wrap = document.createElement('div')
      wrap.classList.add('main__toys__card-wrap')
      toysCardContainer.append(wrap)

      let favorite = elem.favorite ? 'да' : 'нет'

      let card = `
      <div class="toys__card_container">
        <span class="toys__card_title">${elem.name}</span>
        <img class="toys__card_img" src="./assets/toys/${elem.num}.webp" alt="">
        <span class="toys__card_description">Количество: ${elem.count}</span>
        <span class="toys__card_description">Год покупки: ${elem.year} год</span>
        <span class="toys__card_description">Форма игрушки: ${elem.shape}</span>
        <span class="toys__card_description">Цвет игрушки: ${elem.color}</span>
        <span class="toys__card_description">Размер игрушки: ${elem.size}</span>
        <span class="toys__card_description">Любимая: ${favorite}</span>
      </div>`
      wrap.innerHTML = card
    }
    this.toys = toysCard
  }

  renderRangeSlider(classToys): void {
    this.rangeSlider.renderRangeSliderNumber(classToys)
    this.rangeSlider.renderRangeSliderYear(classToys)
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
      let toysCardFiltered: Data = []

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
        let filterShape = (e?.currentTarget as HTMLElement).dataset.form 

        if (!itemClass?.classList.contains('main__toys__form_svg-active')) {
          this.filterObj.shape[filterShape] = true
          itemClass?.classList.add('main__toys__form_svg-active')
        } 
        else {
          this.filterObj.shape[filterShape] = false
          itemClass?.classList.remove('main__toys__form_svg-active')
        }
        this.filterCard()
        this.renderToysCard()
      })
    }) 
  } 

  colorFilterCard(): void {
    let elements = document.querySelectorAll('.ckbx')

    elements.forEach(item => {
      item.addEventListener('input', () => {

        let value = (item as HTMLInputElement).value

        if ((item as HTMLInputElement).checked) {
          this.filterObj.color[value] = true
        }
        else {
          this.filterObj.color[value] = false
        }

        this.filterCard()
        this.renderToysCard()
      })
    })
  }

  sizeFilterCard(): void {
    let elements = document.querySelectorAll('.ckbx-size')

    
  }

}

export default Toys