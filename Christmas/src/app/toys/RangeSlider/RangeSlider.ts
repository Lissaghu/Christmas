import 'nouislider/dist/nouislider.css'
import './RangeSliderYear.scss'
import './RangeSliderNumber.scss'
import _default, { target } from "nouislider";
import { ISliderArg, IRangeSlider } from '../../models/Models';

export const noUiSlider = _default;

class RangeSlider implements IRangeSlider {

  renderRangeSliderNumber(sliderArg: ISliderArg): void {
    const rangeSliderNumber = <target>document.querySelector('.main__toys__number-slider')
    
    if (rangeSliderNumber) {
      noUiSlider.create(rangeSliderNumber, {
        start: [1, 12],
        connect: true,
        step: 1,
        range: {
            'min': 1,
            'max': 12
        }
      });
    }

    let localFilterObj = JSON.parse(localStorage.getItem('filter') as string)
    rangeSliderNumber.noUiSlider?.set([localFilterObj.count.start, localFilterObj.count.end])

    let numberMinValue = document.getElementById('number-min') as HTMLDivElement
    let numberMaxValue = document.getElementById('number-max') as HTMLDivElement

    rangeSliderNumber.noUiSlider?.on('update', () => {
      let sliderNum =  rangeSliderNumber.noUiSlider?.get() as string[]
      
      numberMinValue.textContent = +sliderNum[0] + '' 
      numberMaxValue.textContent = +sliderNum[1] + '' 

      sliderArg.filters.count.start = +sliderNum[0]
      sliderArg.filters.count.end = +sliderNum[1]

      localStorage.setItem('filter', JSON.stringify(sliderArg.filters))
      
      // All filter and render card method
      sliderArg.filterCard()
      sliderArg.render()
    })
  }

  renderRangeSliderYear(sliderArg: ISliderArg): void {
    const rangeSliderYear = <target>document.querySelector('.main__toys__year-slider')

    if (rangeSliderYear) {
      noUiSlider.create(rangeSliderYear, {
        start: [1940, 2021],
        connect: true,
        step: 10,
        range: {
            'min': 1940,
            'max': 2021
        }
      });
    }

    let localFilterObj = JSON.parse(localStorage.getItem('filter') as string)
    rangeSliderYear.noUiSlider?.set([localFilterObj.year.start, localFilterObj.year.end])

    let yearMinValue = document.getElementById('year-min') as HTMLDivElement
    let yearMaxValue = document.getElementById('year-max') as HTMLDivElement

    rangeSliderYear.noUiSlider?.on('update', () => {
      let sliderYear =  rangeSliderYear.noUiSlider?.get() as string[]
      
      yearMinValue.textContent = +sliderYear[0] + ''
      yearMaxValue.textContent = +sliderYear[1] + ''

      sliderArg.filters.year.start = +sliderYear[0]
      sliderArg.filters.year.end = +sliderYear[1]

      localStorage.setItem('filter', JSON.stringify(sliderArg.filters))

      // All filter and render card method
      sliderArg.filterCard()
      sliderArg.render()
    })
  }
}

export default RangeSlider