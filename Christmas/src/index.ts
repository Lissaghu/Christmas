import Controller from './app/controller/Controller'

import 'nouislider/dist/nouislider.css'
import './style.scss'


new Controller().init()

import { slider } from './app/toys/valueRangeSlider/valueRangeSlider'
slider()
import { sliderYear } from './app/toys/yearRangeSlider/yearRangeSlider'
sliderYear()

