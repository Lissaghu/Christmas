import './Toys.scss'
import data from '../../data'
import { IController, Data, IToys, DataItem } from '../models/Models'
import RangeSlider from './RangeSlider/RangeSlider'
import SortToys from './SortToys'

const sortToys = new SortToys()

const dataSort: any = {
  start: sortToys.startName(),
  end: sortToys.endName(),
  max: sortToys.maxYear(),
  min: sortToys.minYear()
}

export type ToysType = typeof Toys

class Toys implements IToys {
  private rangeSlider = new RangeSlider()
  private toysState: {[key: string]: string}
  private filterObj: any
  private toys: Data
  
  constructor() { 
    this.toys = [] 
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
      favorite: {
        favorite: false
      },
      size: {
        большой: false,
        средний: false,
        малый: false
      },
      count: {
        start: 1,
        end: 12
      },
      year: {
        start: 1940,
        end: 2021
      },
      
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
    this.sizeFilterCard()
    this.favoriteFilterCard()
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
    
    if (this.filterObj.favorite.favorite === true) {
      copyToysCard = copyToysCard.filter((item : { favorite: boolean})=> {
        return item.favorite === this.filterObj.favorite.favorite
      })
    }

    if ((this.filterObj.size.малый === true)) {
      copyToysCard = copyToysCard.filter(item => {
        return item.size === 'малый'
      })
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

  renderRangeSlider(classToys: any): void {
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

      for (const [subKey, subValue] of Object.entries(value as any)) {
        if (subValue === true) {
          toysCardFiltered = toysCardFiltered.concat(
            this.toys.filter((card: any) => {
              return card[`${key}`] === subKey 
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
        let filterShape: any = (e?.currentTarget as HTMLElement).dataset.form

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
    let elements = document.querySelectorAll('.ckbx-sz-inp')

    elements.forEach(item => {
      item.addEventListener('input', () => {

        let value = (item as HTMLInputElement).value

        if ((item as HTMLInputElement).checked) {
          this.filterObj.size[value] = true
        }
        else {
          this.filterObj.size[value] = false
        }
        console.log(this.filterObj.size)

        this.filterCard()
        this.renderToysCard()
      })
    })
  }

  favoriteFilterCard(): void {
    let element: HTMLInputElement = document.querySelector('.main__toys__like_input') as HTMLInputElement

    element?.addEventListener('input', () => {

      if ((element as HTMLInputElement).checked) {
        this.filterObj.favorite.favorite = true
      }
      else {
        this.filterObj.favorite.favorite = false
      }

      this.filterCard()
      this.renderToysCard()
    })
  }

}

export default Toys