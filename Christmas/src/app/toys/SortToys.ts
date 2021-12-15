import data from "../../data";

class SortToys {
  startName() {
    return (a: { name: string; }, b: { name: string; }) => a.name > b.name ? 1 : -1
  }

  endName() {
    return (a: { name: string; }, b: { name: string; }) => b.name > a.name ? 1 : -1
  }

  maxCount() {
    return (a: {count: string}, b: {count: string}) => +b.count - +a.count
  }

  minCount() {
    return (a: {count: string}, b: {count: string}) => +a.count - +b.count
  }
}

type SortToysType = typeof SortToys

export default SortToys