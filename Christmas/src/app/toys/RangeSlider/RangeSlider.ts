import 'nouislider/dist/nouislider.css'
import './RangeSliderYear.scss'
import './RangeSliderNumber.scss'
import _default, { target } from "nouislider";
import { IToys } from '../../models/Models';
import { ToysType } from '../Toys';

export const noUiSlider = _default;

class RangeSlider {

  renderRangeSliderNumber(classToys): void {
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

    let numberMinValue: HTMLDivElement = document.getElementById('number-min') as HTMLDivElement
    let numberMaxValue: HTMLDivElement = document.getElementById('number-max') as HTMLDivElement

    rangeSliderNumber.noUiSlider?.on('update', () => {
      let sliderNum: string[] =  rangeSliderNumber.noUiSlider?.get() as string[]

      numberMinValue.textContent = +sliderNum[0] + ''
      numberMaxValue.textContent = +sliderNum[1] + ''

      classToys.filterObj.count.start = +sliderNum[0]
      classToys.filterObj.count.end = +sliderNum[1]
      
      classToys.renderToysCard()
    })
  }

  renderRangeSliderYear(classToys): void {
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

    let yearMinValue: HTMLDivElement = document.getElementById('year-min') as HTMLDivElement
    let yearMaxValue: HTMLDivElement = document.getElementById('year-max') as HTMLDivElement

    rangeSliderYear.noUiSlider?.on('update', () => {
      let sliderYear: string[] =  rangeSliderYear.noUiSlider?.get() as string[]
      
      yearMinValue.textContent = +sliderYear[0] + ''
      yearMaxValue.textContent = +sliderYear[1] + ''

      classToys.filterObj.year.start = +sliderYear[0]
      classToys.filterObj.year.end = +sliderYear[1]

      classToys.renderToysCard()
    })
  }
}

export default RangeSlider