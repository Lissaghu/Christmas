import data from "../../data"

export interface IController {
  init: () => void,
  setEventListener: () => void,
  changePage: (event: Event | undefined) => void,
  render: () => void
}

export type DataItem = {
  num: string
  name: string
  count: string
  year: string
  shape: string
  color: string
  size: string
  favorite: boolean
}

export type Data = DataItem[]

