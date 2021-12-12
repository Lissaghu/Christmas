import './yearRangeSlider.scss'
import { noUiSlider } from '../valueRangeSlider/valueRangeSlider'
import { target } from 'nouislider'

const rangeSlider = <target>document.querySelector('.main__toys__year-slider')

export const sliderYear = () => {
  noUiSlider.create(rangeSlider, {
    start: [1940, 2021],
    connect: true,
    step: 1,
    range: {
        'min': 1940,
        'max': 2021
    }
  });
}