import './sources.css'
import { SourcesType } from '../../controller/Models'

class Sources {
  draw(data: SourcesType[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement

    data.forEach((item: SourcesType) => {
      const sourceClone: HTMLTemplateElement = sourceItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
      ;(sourceClone.querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.name

      sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id)

      fragment.append(sourceClone)
    })
    document.querySelector('.sources')?.append(fragment)
  }
}

export default Sources
