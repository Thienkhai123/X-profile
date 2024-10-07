const REPLACE_DICTIONARY = {
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-width': 'strokeWidth',
  'clip-path': 'clipPath'
}

const SUFFIX_FILE_NAME = 'Icon'

const IMPORT_LIBRARY = `
import PropTypes from 'prop-types'
`

function firstUppercase(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })
}

const renderHeadComponent = ({ fileName = '' }) => {
  return `
const ${fileName} = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
`
}

const renderBodyComponent = ({ childrenSvg = {} }) => {
  // console.log('childrenSvg: ', childrenSvg)
  let res = ''
  for (let item of childrenSvg) {
    let thisContent = item.outerHTML
    Object.keys(REPLACE_DICTIONARY).forEach((key) => {
      const val = REPLACE_DICTIONARY[key]
      thisContent = thisContent.replaceAll(key, val)
    })
    res += `
      ${thisContent}
`
  }
  res += `
    </svg>
  )
}
`
  return res
}

const renderEndOfComponent = ({
  fileName = '',
  viewBox = '',
  width = '',
  height = '',
  fill = '',
  stroke = ''
}) => {
  return `
${fileName}.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
  
${fileName}.defaultProps = {
  viewBox: "${viewBox}",
  width: "${width}",
  height: "${height}",
  fill: "${fill}",
  stroke: "${stroke}",
  style: {}
}

export default ${fileName}
`
}

export const generateFileContentFromString = ({
  fileName = '',
  content = ''
}) => {
  const oParser = new DOMParser()
  const oDOM = oParser.parseFromString(content, 'image/svg+xml')
  const root = oDOM.documentElement
  const childrenSvg = root.children
  console.log(root instanceof SVGElement)
  if (root instanceof SVGElement) {
    const attributeSvg = {
      width: root.getAttribute('width'),
      height: root.getAttribute('height'),
      viewBox: root.getAttribute('viewBox'),
      fill: 'black',
      stroke: 'black'
    }
    if (attributeSvg.fill || attributeSvg.stroke) {
      return (
        IMPORT_LIBRARY +
        renderHeadComponent({
          fileName: firstUppercase(fileName + SUFFIX_FILE_NAME)
        }) +
        renderBodyComponent({
          childrenSvg: childrenSvg,
          fillName: attributeSvg.fill
        }) +
        renderEndOfComponent({
          fileName: firstUppercase(fileName + SUFFIX_FILE_NAME),
          ...attributeSvg
        })
      )
    }
  }
}
