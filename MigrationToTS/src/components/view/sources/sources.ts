import './sources.css'
import { SourcesType } from '../../app/app'

class Sources {
  draw(data: SourcesType[]) {
    const fragment = document.createDocumentFragment()
    const sourceItemTemp = document.querySelector('#sourceItemTemp')

    data
      .forEach((item) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true)

        sourceClone.querySelector('.source__item-name').textContent = item.name
        sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id)

        fragment.append(sourceClone)
      })(document.querySelector('.sources') as HTMLDivElement)
      .append(fragment)
  }
}

export default Sources
