import 'nouislider/dist/nouislider.css'
import './RangeSliderYear.scss'
import './RangeSliderNumber.scss'
import _default, { target } from "nouislider";

const noUiSlider = _default;

class RangeSlider {
  renderRangeSliderNumber() {
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
  }

  renderRangeSliderYear() {
    const rangeSliderYear = <target>document.querySelector('.main__toys__year-slider')

    if (rangeSliderYear) {
      noUiSlider.create(rangeSliderYear, {
        start: [1940, 2021],
        connect: true,
        step: 1,
        range: {
            'min': 1940,
            'max': 2021
        }
      });
    }
  }
}

export default RangeSlider