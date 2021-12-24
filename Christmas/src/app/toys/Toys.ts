import './Toys.scss'
import data from '../../data'
import { IController, IToys, Data, DataItem, TDataItem, ISliderArg } from '../models/Models'
import RangeSlider from './RangeSlider/RangeSlider'
import { noUiSlider } from './RangeSlider/RangeSlider'
import SortToys from './SortToys'
import { target } from 'nouislider'

const sortToys = new SortToys()

const dataSort = {
  start: sortToys.startName(),
  end: sortToys.endName(),
  max: sortToys.maxYear(),
  min: sortToys.minYear()
}

let filter = {
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
  }
}

export type FilterObjectType = typeof filter
export type ToysType = typeof Toys

class Toys implements IToys {
  private rangeSlider = new RangeSlider()
  private currentSort
  private filters
  private count: number
  private sliderArg: ISliderArg
  
  constructor(private toys: Data) { 
    this.currentSort = 'start'
    this.filters = JSON.parse(JSON.stringify(filter))
    this.count = 0
    this.sliderArg = {
      filters: this.filters,
      filterCard: () => this.filterCard(),
      render:() => this.renderToysCard()
    }
  }

  initToys(state: IController): void {
    this.filterCard()
    this.renderToysCard() 
    state.setEventListener()
    this.resetAllFilter()
    this.renderRangeSlider()  
    this.sortCard()
    this.shapeFilterCard()
    this.colorFilterCard()
    this.sizeFilterCard()
    this.favoriteFilterCard()
  }

  renderToysCard(): void {
    let toysCardContainer: HTMLDivElement = document.querySelector('.main__toys__card') as HTMLDivElement
    toysCardContainer.innerHTML = ''    
    
    if (this.toys.length === 0) {
      let sorryContainer = document.createElement('div')
      sorryContainer.classList.add('sorry-container')
      sorryContainer.innerHTML = `Извините, совпадений не обнаружено`
      toysCardContainer.append(sorryContainer)
    }

    if (this.currentSort !== localStorage.getItem('sort')) {
      this.toys.sort(dataSort[localStorage.getItem('sort')])
    }
    else {
      this.toys.sort(dataSort[this.currentSort])
    }
    
        
    for (let elem of this.toys) {
      let wrap = document.createElement('div')
      wrap.classList.add('main__toys__card-wrap')
      toysCardContainer.append(wrap)

      let favorite = elem.favorite ? 'да' : 'нет'

      let card = `
      <div class="toys__card_container" data-pic="${elem.num}">
        <span class="toys__card_title">${elem.name}</span>
        <img class="toys__card_img" src="./assets/toys/${elem.num}.webp" alt="" data-pic="${elem.num}">
        <span class="toys__card_description">Количество: ${elem.count}</span>
        <span class="toys__card_description">Год покупки: ${elem.year} год</span>
        <span class="toys__card_description">Форма игрушки: ${elem.shape}</span>
        <span class="toys__card_description">Цвет игрушки: ${elem.color}</span>
        <span class="toys__card_description">Размер игрушки: ${elem.size}</span>
        <span class="toys__card_description">Любимая: ${favorite}</span>
      </div>`
      wrap.innerHTML = card
    }
  
    this.setFavoriteCard()
    this.searchFilterCard()
    this.localStorage()
  }

  renderRangeSlider(): void {    
    this.rangeSlider.renderRangeSliderNumber(this.sliderArg)
    this.rangeSlider.renderRangeSliderYear(this.sliderArg)
  }

  sortCard(): void {
    let select: HTMLSelectElement = document.querySelector('.main__toys__sort_select') as HTMLSelectElement

    if (localStorage.getItem('sort')) {
      select.value = localStorage.getItem('sort') as string
    }
    
    select.addEventListener('click', () => {
      if (this.currentSort === select.value) {
        return
      } else {
        localStorage.setItem('sort', select.value)
        this.currentSort = select.value
        this.renderToysCard()
      } 
    })
  }

  // All filter card method
  filterCard(): void {
    if (localStorage.getItem('filter')) {
      this.filters = JSON.parse(localStorage.getItem('filter') as string)
    }

    let toys = data
    const fKey = ['shape', 'color', 'size']
    fKey.forEach(key => {
      const shape = Object.keys(this.filters[key]).filter(item => this.filters[key][item])

      if (shape.length) {
        toys = toys.filter(item => shape.includes(item[key]))
      }
    })
    
    // RangeSlider count filter
    if (this.filters.count.start >= 1 || this.filters.count.end <= 12) {
      toys = toys.filter((item: { count: string | number; }) => {
        return +item.count >= this.filters.count.start && +item.count <= this.filters.count.end
      }).sort(dataSort[this.currentSort])   
    } 

    // RangeSlider year filter
    if (this.filters.year.start >= 1940 || this.filters.year.start <= 2021) {
      toys = toys.filter((item: { year: string | number; }) => {
        return +item.year >= this.filters.year.start && +item.year <= this.filters.year.end
      }).sort(dataSort[this.currentSort])   
    }
    
    // Favorite filter
    if (this.filters.favorite.favorite === true) {
      toys = toys.filter((item : { favorite: boolean})=> {
        return item.favorite === this.filters.favorite.favorite
      })
    }
    
    this.toys = toys 
  }

  shapeFilterCard(): void {
    let elements = document.querySelectorAll('.form')

    let localFilterObj = JSON.parse(localStorage.getItem('filter') as string)

    for (const [key, value] of Object.entries(localFilterObj.shape)) {
      elements.forEach((item) => {
        if ((item as HTMLElement).dataset.form === key && value === true) {
          let itemClass = document.querySelector(`.${item.className.slice(0, 21)} .main__toys__form_svg`)
          itemClass?.classList.add('main__toys__form_svg-active')
        }
      })
    }
    
    elements.forEach(item => {
      item.addEventListener('click', (e: Event): void => {

        let itemClass = document.querySelector(`.${item.className.slice(0, 21)} .main__toys__form_svg`)
        let filterShape = (e?.currentTarget as HTMLElement).dataset.form

        if (!itemClass?.classList.contains('main__toys__form_svg-active')) {
          this.filters.shape[filterShape as string] = true
          itemClass?.classList.add('main__toys__form_svg-active')
        } 
        else {
          this.filters.shape[filterShape as string] = false
          itemClass?.classList.remove('main__toys__form_svg-active')
        }

        this.localStorage()
        this.filterCard()
        this.renderToysCard()
        
      })
    }) 
  } 

  colorFilterCard(): void {
    let elements = document.querySelectorAll('.ckbx')

    let localFilterObj = JSON.parse(localStorage.getItem('filter') as string)

    for (const [key, value] of Object.entries(localFilterObj.color)) {
      elements.forEach((item) => {
        if ((item as HTMLInputElement).value === key && value === true) {
          (item as HTMLInputElement).checked = true
        }
      })
    }

    elements.forEach(item => {
      item.addEventListener('input', () => {

        let value = (item as HTMLInputElement).value 

        if ((item as HTMLInputElement).checked) {
          this.filters.color[value] = true
        }
        else {
          this.filters.color[value] = false
        }

        this.localStorage()
        this.filterCard()
        this.renderToysCard()
      })
    })
  }

  sizeFilterCard(): void {
    let elements = document.querySelectorAll('.ckbx-sz-inp')

    let localFilterObj = JSON.parse(localStorage.getItem('filter') as string)

    for (const [key, value] of Object.entries(localFilterObj.size)) {
      elements.forEach((item) => {
        if ((item as HTMLInputElement).value === key && value === true) {
          (item as HTMLInputElement).checked = true
        }
      })
    }

    elements.forEach(item => {
      item.addEventListener('input', () => {

        let value = (item as HTMLInputElement).value

        if ((item as HTMLInputElement).checked) {
          this.filters.size[value] = true
        }
        else {
          this.filters.size[value] = false
        }

        this.localStorage()
        this.filterCard()
        this.renderToysCard()
        
      })
    })
  }

  favoriteFilterCard(): void {
    let element: HTMLInputElement = document.querySelector('.main__toys__like_input') as HTMLInputElement

    let localFilterObj = JSON.parse(localStorage.getItem('filter') as string)

    for (const [key, value] of Object.entries(localFilterObj.favorite)) {
      if (element.value === key && value === true) {
        element.checked = true
      }
    }

    element?.addEventListener('input', () => {

      if ((element as HTMLInputElement).checked) {
        this.filters.favorite.favorite = true
      }
      else {
        this.filters.favorite.favorite = false
      }

      this.localStorage()
      this.filterCard()
      this.renderToysCard()
    })
  }

  resetAllFilter(): void {
    let buttonReset: HTMLButtonElement = document.querySelector('.main__toys_remove') as HTMLButtonElement

    buttonReset?.addEventListener('click', () => {
      this.filters = JSON.parse(JSON.stringify(filter))

      // Reset all
      const rangeSliderNumber = <target>document.querySelector('.main__toys__number-slider')
      rangeSliderNumber.noUiSlider?.set([this.filters.count.start, this.filters.count.end])

      const rangeSliderYear = <target>document.querySelector('.main__toys__year-slider')
      rangeSliderYear.noUiSlider?.set([this.filters.year.start, this.filters.year.end])

      let formElements = document.querySelectorAll('.main__toys__form_svg')
      formElements.forEach(item => {
        item.classList.remove('main__toys__form_svg-active')
      })

      let colorElements = document.querySelectorAll('.ckbx')
      colorElements.forEach(item => {
        (item as HTMLInputElement).checked = false
      })

      let sizeElements = document.querySelectorAll('.ckbx-sz-inp')
      sizeElements.forEach(item => {
        (item as HTMLInputElement).checked = false
      })

      let favoriteElement: HTMLInputElement = document.querySelector('.main__toys__like_input') as HTMLInputElement
      (favoriteElement as HTMLInputElement).checked = false

      // Reset sort
      this.currentSort = 'start'
      let select: HTMLSelectElement = document.querySelector('.main__toys__sort_select') as HTMLSelectElement
      select.value = 'start'

      localStorage.clear()
      this.filterCard()
      this.renderToysCard()
    })
  }

  setFavoriteCard(): void {
    let picturesContainer = document.querySelectorAll('.toys__card_container')
    let countFavoriteToys: HTMLSpanElement = document.querySelector('.header__toys_like') as HTMLSpanElement
    let modal = document.querySelector('.toys__modal')
    let modalClose = document.querySelector('.toys__modal_close')

    picturesContainer.forEach(item => {
      item.addEventListener('click', () => {

        if (this.count < 20) {
          if (item.classList.contains('favorite')) {
            item.classList.remove('favorite')
            countFavoriteToys.textContent = `Любимые игрушки: ${--this.count}`
          }
          else {
            item.classList.add('favorite')
            countFavoriteToys.textContent = `Любимые игрушки: ${++this.count}`
          }
        }
        else {
          modal?.classList.add('toys__modal_active')
          modalClose?.addEventListener('click', () => modal?.classList.remove('toys__modal_active'))
          return
        }
      })
    })
  }

  searchFilterCard(): void {
    let element: HTMLInputElement = document.querySelector('.header__toys_input') as HTMLInputElement
    element.focus()

    element.addEventListener('input', () => {
      let elementValue = element.value.trim().toLowerCase()
      let searchElements: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.toys__card_title')
      let hideElements = document.querySelectorAll('.hide')
      let toysCardContainer: HTMLDivElement = document.querySelector('.main__toys__card') as HTMLDivElement

      if (hideElements.length == 60) {
        let sorryContainer = document.createElement('div')
        sorryContainer.classList.add('sorry-container')
        sorryContainer.innerHTML = `Извините, совпадений не обнаружено`
        toysCardContainer.append(sorryContainer)
      }
      else {
        let sorryContainer = document.querySelectorAll('.sorry-container')
        sorryContainer.forEach(item => {
          item.remove()
        })
      }

      if (elementValue !== '') {
        searchElements.forEach(item => {
          if (item.innerText.toLowerCase().search(elementValue) === -1) {
            (item.parentElement?.parentElement as HTMLElement).classList.add('hide')
            
          }
          else {
            (item.parentElement?.parentElement as HTMLElement).classList.remove('hide')
          }
        })
      }
      else {
        searchElements.forEach(item => {
          (item.parentElement?.parentElement as HTMLElement).classList.remove('hide')
        })
      } 
    })
  }

  localStorage() {
    localStorage.setItem('filter', JSON.stringify(this.filters))
  }

}

export default Toys