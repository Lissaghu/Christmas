import { ISortToys } from "../models/Models"

class SortToys implements ISortToys {
  startName() {
    return (a: { name: string }, b: { name: string }) => a.name > b.name ? 1 : -1
  }

  endName() {
    return (a: { name: string }, b: { name: string }) => b.name > a.name ? 1 : -1
  }

  maxYear() {
    return (a: { year: string }, b: { year: string }) => +a.year - +b.year
  }

  minYear() {
    return (a: { year: string }, b: { year: string }) => +b.year - +a.year
  }
}

type SortToysType = typeof SortToys

export default SortToys