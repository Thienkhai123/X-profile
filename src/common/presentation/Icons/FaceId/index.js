import PropTypes from 'prop-types'

const FaceIdIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M15.9072 45.0003H6.81624C6.33403 45.0003 5.87156 44.8088 5.53058 44.4678C5.18961 44.1268 4.99805 43.6643 4.99805 43.1821V34.0911C4.99805 33.6089 5.18961 33.1465 5.53058 32.8055C5.87156 32.4645 6.33403 32.2729 6.81624 32.2729C7.29846 32.2729 7.76093 32.4645 8.1019 32.8055C8.44288 33.1465 8.63444 33.6089 8.63444 34.0911V41.3639H15.9072C16.3894 41.3639 16.8519 41.5555 17.1929 41.8965C17.5339 42.2374 17.7254 42.6999 17.7254 43.1821C17.7254 43.6643 17.5339 44.1268 17.1929 44.4678C16.8519 44.8088 16.3894 45.0003 15.9072 45.0003Z"
        fill={fill}
      />
      <path
        d="M43.1807 45.0003H34.0897C33.6075 45.0003 33.145 44.8088 32.804 44.4678C32.463 44.1268 32.2715 43.6643 32.2715 43.1821C32.2715 42.6999 32.463 42.2374 32.804 41.8965C33.145 41.5555 33.6075 41.3639 34.0897 41.3639H41.3625V34.0911C41.3625 33.6089 41.554 33.1465 41.895 32.8055C42.236 32.4645 42.6985 32.2729 43.1807 32.2729C43.6629 32.2729 44.1253 32.4645 44.4663 32.8055C44.8073 33.1465 44.9989 33.6089 44.9989 34.0911V43.1821C44.9989 43.6643 44.8073 44.1268 44.4663 44.4678C44.1253 44.8088 43.6629 45.0003 43.1807 45.0003Z"
        fill={fill}
      />
      <path
        d="M43.1807 17.7274C42.6985 17.7274 42.236 17.5358 41.895 17.1948C41.554 16.8539 41.3625 16.3914 41.3625 15.9092V8.63639H34.0897C33.6075 8.63639 33.145 8.44483 32.804 8.10386C32.463 7.76288 32.2715 7.30041 32.2715 6.8182C32.2715 6.33598 32.463 5.87352 32.804 5.53254C33.145 5.19156 33.6075 5 34.0897 5H43.1807C43.6629 5 44.1253 5.19156 44.4663 5.53254C44.8073 5.87352 44.9989 6.33598 44.9989 6.8182V15.9092C44.9989 16.3914 44.8073 16.8539 44.4663 17.1948C44.1253 17.5358 43.6629 17.7274 43.1807 17.7274Z"
        fill={fill}
      />
      <path
        d="M6.81624 17.7274C6.33403 17.7274 5.87156 17.5358 5.53058 17.1948C5.18961 16.8539 4.99805 16.3914 4.99805 15.9092V6.8182C4.99805 6.33598 5.18961 5.87352 5.53058 5.53254C5.87156 5.19156 6.33403 5 6.81624 5H15.9072C16.3894 5 16.8519 5.19156 17.1929 5.53254C17.5339 5.87352 17.7254 6.33598 17.7254 6.8182C17.7254 7.30041 17.5339 7.76288 17.1929 8.10386C16.8519 8.44483 16.3894 8.63639 15.9072 8.63639H8.63444V15.9092C8.63444 16.3914 8.44288 16.8539 8.1019 17.1948C7.76093 17.5358 7.29846 17.7274 6.81624 17.7274Z"
        fill={fill}
      />
      <path
        d="M24.9974 27.7277C23.559 27.7277 22.1529 27.3012 20.9569 26.502C19.7609 25.7029 18.8287 24.567 18.2782 23.2381C17.7278 21.9092 17.5837 20.4469 17.8644 19.0361C18.145 17.6253 18.8376 16.3294 19.8548 15.3123C20.8719 14.2952 22.1678 13.6025 23.5785 13.3219C24.9893 13.0413 26.4516 13.1853 27.7806 13.7357C29.1095 14.2862 30.2454 15.2184 31.0445 16.4144C31.8436 17.6104 32.2702 19.0165 32.2702 20.4549C32.2702 22.3838 31.5039 24.2336 30.14 25.5976C28.7761 26.9615 26.9263 27.7277 24.9974 27.7277ZM24.9974 16.8185C24.2782 16.8185 23.5751 17.0318 22.9771 17.4314C22.3791 17.8309 21.913 18.3989 21.6378 19.0633C21.3626 19.7278 21.2906 20.459 21.4309 21.1643C21.5712 21.8697 21.9175 22.5177 22.4261 23.0262C22.9346 23.5348 23.5826 23.8811 24.288 24.0214C24.9934 24.1618 25.7245 24.0897 26.389 23.8145C27.0535 23.5393 27.6214 23.0732 28.021 22.4752C28.4205 21.8772 28.6338 21.1741 28.6338 20.4549C28.6338 19.4905 28.2507 18.5656 27.5687 17.8836C26.8868 17.2016 25.9618 16.8185 24.9974 16.8185Z"
        fill={fill}
      />
      <path
        d="M35.0951 36.637L34.6242 36.4006C31.633 34.9148 28.3385 34.1416 24.9986 34.1416C21.6588 34.1416 18.3643 34.9148 15.3731 36.4006L14.9022 36.637C14.4706 36.8525 13.9711 36.8878 13.5135 36.7351C13.0559 36.5823 12.6777 36.254 12.4622 35.8224C12.2466 35.3908 12.2114 34.8913 12.3641 34.4337C12.5169 33.9761 12.8451 33.598 13.2767 33.3824L13.7476 33.1479C17.2437 31.4105 21.0947 30.5064 24.9986 30.5064C28.9026 30.5064 32.7536 31.4105 36.2496 33.1479L36.7206 33.3824C36.9343 33.4891 37.1248 33.6369 37.2814 33.8173C37.438 33.9977 37.5575 34.2071 37.6332 34.4337C37.7088 34.6603 37.7391 34.8996 37.7223 35.1378C37.7054 35.3761 37.6418 35.6087 37.5351 35.8224C37.4284 36.0361 37.2806 36.2267 37.1002 36.3833C36.9198 36.5399 36.7104 36.6594 36.4838 36.7351C36.2572 36.8107 36.018 36.841 35.7797 36.8241C35.5414 36.8073 35.3088 36.7437 35.0951 36.637Z"
        fill={fill}
      />
    </svg>
  )
}

FaceIdIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

FaceIdIcon.defaultProps = {
  viewBox: '0 0 50 50',
  width: '50',
  height: '50',
  style: {},
  fill: '#999999'
}

export default FaceIdIcon
