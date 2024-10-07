
import PropTypes from 'prop-types'

const Map2Icon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >

      <path xmlns="http://www.w3.org/2000/svg" d="M2.5 7.25782C2.5 6.02987 2.5 5.41589 2.8272 5.05779C2.94337 4.93065 3.08456 4.82889 3.24191 4.75888C3.6851 4.56171 4.26757 4.75587 5.43251 5.14418C6.32189 5.44064 6.76657 5.58887 7.21592 5.57353C7.38095 5.56789 7.54501 5.54592 7.70571 5.50794C8.14326 5.40451 8.53327 5.1445 9.31331 4.62448L10.4653 3.85649C11.4645 3.19036 11.9641 2.8573 12.5376 2.7805C13.111 2.7037 13.6807 2.89357 14.8199 3.27332L15.7906 3.59687C16.6156 3.87188 17.0281 4.00938 17.2641 4.33674C17.5 4.6641 17.5 5.09893 17.5 5.96858V12.7422C17.5 13.9702 17.5 14.5841 17.1728 14.9422C17.0566 15.0694 16.9154 15.1711 16.7581 15.2411C16.3149 15.4383 15.7324 15.2442 14.5675 14.8558C13.6781 14.5594 13.2334 14.4112 12.7841 14.4265C12.6191 14.4321 12.455 14.4541 12.2943 14.4921C11.8567 14.5955 11.4667 14.8555 10.6867 15.3756L9.53471 16.1435C8.53552 16.8097 8.03593 17.1427 7.46244 17.2195C6.88895 17.2963 6.31932 17.1065 5.18007 16.7267L4.20943 16.4032C3.38441 16.1281 2.97189 15.9906 2.73595 15.6633C2.5 15.3359 2.5 14.9011 2.5 14.0314V7.25782Z" stroke="black" strokeWidth="1.5"/>

      <path xmlns="http://www.w3.org/2000/svg" d="M7.5 5.53223V17.0834" stroke="black" strokeWidth="1.5"/>

      <path xmlns="http://www.w3.org/2000/svg" d="M12.5 2.5V14.1667" stroke="black" strokeWidth="1.5"/>

    </svg>
  )
}

Map2Icon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
  
Map2Icon.defaultProps = {
  viewBox: "0 0 20 20",
  width: "20",
  height: "20",
  fill: "black",
  stroke: "black",
  style: {}
}

export default Map2Icon
