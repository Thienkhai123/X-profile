import PropTypes from 'prop-types'

const HeartUncheckIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill={fill}
    >
      <path
        d="M9.9131 17.9635L9.91173 17.9621L1.91757 9.8613L1.9175 9.86123C-1.12734 6.77699 1.06545 1.5 5.33751 1.5C7.40751 1.5 8.49254 2.64844 9.19782 3.39492C9.38763 3.59582 9.54993 3.7676 9.69652 3.88005L10.0009 4.11358L10.3053 3.87996C10.4507 3.76834 10.6123 3.59757 10.8015 3.39765C11.5073 2.65175 12.5971 1.5 14.6642 1.5C18.9478 1.5 21.1173 6.78957 18.085 9.86124L18.085 9.86128L10.09 17.9621L10.0886 17.9635C10.0659 17.9867 10.0349 18 10.0008 18C9.96676 18 9.93583 17.9867 9.9131 17.9635Z"
        stroke="#F7BB3A"
      />
    </svg>
  )
}

HeartUncheckIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

HeartUncheckIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  fill: 'none',
  stroke: '#DB2E24',

  style: {}
}

export default HeartUncheckIcon
