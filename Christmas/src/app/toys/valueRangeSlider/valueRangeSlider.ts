import './valueRangeSlider.scss'
import _default, { target } from "nouislider";

export const noUiSlider = _default;

const rangeSlider = <target>document.querySelector('.main__toys__number-slider')

export const slider = () => {
  noUiSlider.create(rangeSlider, {
    start: [1, 12],
    connect: true,
    step: 1,
    range: {
        'min': 1,
        'max': 12
    }
  });
}

