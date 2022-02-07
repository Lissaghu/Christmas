import { FilterObjectType } from "../toys/Toys"

export interface IController {
  init: () => void,
  setEventListener: () => void,
  changePage: (event: Event | undefined) => void,
  render: () => void
}

export interface ISliderArg {
  filters: FilterObjectType
  filterCard: () => void
  render: () => void
}

export type TDataItem<T> = [ T extends {[key: string]: infer U} ? U : never ] 

type DataItem = {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean
}

export type Data = DataItem[]

export interface IToys {
  initToys: (state: IController) => void
  renderToysCard: () => void
  renderRangeSlider: (state: IToys) => void
  sortCard: () => void
  filterCard: () => void
  shapeFilterCard: () => void
  colorFilterCard: () => void
  sizeFilterCard: () => void
  favoriteFilterCard: () => void
  resetAllFilter:() => void
  setFavoriteCard: () => void
  searchFilterCard: () => void
  localStorage: () => void
}

export interface ITree {
  initTree: () => void
  renderToys: () => void
  choiseBackground: () => void
  choiseTree: () => void
  musicControl: () => void
  snowControl: () => void
  dragAndDropToysOnTheTree: () => void
  dragAndDropToysInCell: () => void
}

export interface IRangeSlider {
  renderRangeSliderNumber: (sliderArg: ISliderArg) => void
  renderRangeSliderYear: (sliderArg: ISliderArg) => void
}

export interface ISortToys {
  startName: () => (a: {name: string}, b: {name: string}) => 1 | -1
  endName: () => (a: {name: string}, b: {name: string}) => 1 | -1
  maxYear: () => (a: {year: string}, b: {year: string}) => number
  minYear: () => (a: {year: string}, b: {year: string}) => number
}
