export interface IController {
  init: () => void,
  setEventListener: () => void,
  changePage: (event: Event | undefined) => void,
  render: () => void
}

export type TDataItem<T> = [ T extends {[key: string]: infer U} ? U : never ] 

export type DataItem = {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean
}
// {[key: string]: string}

export type Data = DataItem[]

export interface IToys {
  initToys: (state: IController) => void,
  renderToysCard: () => void,
  renderRangeSlider: (classToys: any) => void,
  sortCard: () => void,
  filterCard: () => void,
  shapeFilterCard: () => void,
  colorFilterCard: () => void,
  sizeFilterCard: () => void,
  favoriteFilterCard: () => void
}
