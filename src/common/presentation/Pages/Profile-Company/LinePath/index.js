import PropTypes from 'prop-types'
import { Fragment } from 'react'

const LinePath = (props) => {
  const { className, positon, isLastIndex } = props
  if (positon === 'left') {
    return (
      <div
        className={className}
        style={{
          transform: 'rotate(14deg)',
          left: -1
        }}
      />
    )
  }
  if (positon === 'center-bottom') {
    return (
      <Fragment>
        <div
          className={className}
          style={{
            transform: 'rotate(11deg)',
            left: -3
          }}
        />
        {!isLastIndex && (
          <div
            className={className}
            style={{
              transform: 'rotate(169deg)',
              right: -3
            }}
          />
        )}
      </Fragment>
    )
  }
  if (positon === 'center-top') {
    return (
      <Fragment>
        <div
          className={className}
          style={{
            transform: 'rotate(-12deg)',
            left: -3
          }}
        />
        {!isLastIndex && (
          <div
            className={className}
            style={{
              transform: 'rotate(193deg)',
              right: -3
            }}
          />
        )}
      </Fragment>
    )
  }
  if (positon === 'right-top') {
    return (
      <div
        className={className}
        style={{
          transform: 'rotate(12deg)',
          right: -1
        }}
      />
    )
  }
  return (
    <div
      className={className}
      style={{
        transform: 'rotate(12deg)',
        right: -1
      }}
    />
  )
}

LinePath.propTypes = {
  className: PropTypes.string,
  positon: PropTypes.oneOf([
    'left',
    'center-bottom',
    'center-top',
    'right',
    'right-top'
  ]),
  isLastIndex: PropTypes.bool
}
LinePath.defaultProps = {
  className: 'absolute h-[10px] bg-stoke w-[140px] top-[62%] z-0',
  positon: 'left',
  isLastIndex: false
}

export default LinePath
