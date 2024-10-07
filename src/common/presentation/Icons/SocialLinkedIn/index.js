import PropTypes from 'prop-types'

const SocialLinkedInIcon = (props) => {
  const { viewBox, style, width, height, fill, scale, margin = 0 } = props
  return (
    <svg
      viewBox={viewBox}
      style={{
        margin: margin
      }}
      width={width}
      height={height}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM6.19672 18V10.1311H8.65574V18H6.19672ZM8.77301 6.88345C8.84299 7.05579 8.87835 7.24022 8.87705 7.42623V7.47049C8.87258 7.65651 8.83151 7.83983 8.75617 8.00997C8.68083 8.18011 8.57271 8.33374 8.43797 8.46208C8.30324 8.59041 8.14454 8.69095 7.97094 8.75793C7.79734 8.82491 7.61225 8.85703 7.42623 8.85246C7.04797 8.85246 6.6852 8.7022 6.41773 8.43473C6.15026 8.16726 6 7.80449 6 7.42623C6 7.04797 6.15026 6.6852 6.41773 6.41773C6.6852 6.15026 7.04797 6 7.42623 6H7.47049C7.6565 6.00129 7.84043 6.0392 8.01178 6.11157C8.18313 6.18394 8.33855 6.28936 8.46916 6.4218C8.59977 6.55424 8.70302 6.7111 8.77301 6.88345ZM15 9.93443C16.4951 9.93443 18 10.8541 18 13.2197L17.9803 18H15.5213V13.7852C15.5213 12.5459 14.941 12.0541 14.159 12.0541H14.0656C13.6373 12.0941 13.2422 12.3014 12.9659 12.6311C12.6896 12.9608 12.5546 13.3861 12.5902 13.8148V18H10.1311V10.1311H12.4426V11.2033H12.5115C12.7791 10.7927 13.1498 10.4595 13.5864 10.2368C14.0231 10.0142 14.5105 9.90991 15 9.93443Z"
        fill={fill}
      />
    </svg>
  )
}

SocialLinkedInIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

SocialLinkedInIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#666666'
}

export default SocialLinkedInIcon
