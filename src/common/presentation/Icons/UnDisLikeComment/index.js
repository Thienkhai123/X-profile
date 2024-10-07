
import PropTypes from 'prop-types'

const UnDisLikeCommentIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M12.4382 21.2216C12.2931 21.2682 12.1345 21.2569 11.9998 21.192C11.8523 21.1209 11.7548 20.9968 11.7197 20.8618L11.244 19.0279C11.0777 18.3866 10.8354 17.768 10.5235 17.184C10.0392 16.2773 9.30632 15.58 8.62647 14.9942L7.18773 13.7544C6.96475 13.5622 6.8474 13.2742 6.87282 12.9802L7.68498 3.58754C7.72601 3.11303 8.12244 2.75 8.59635 2.75H13.245C16.3813 2.75 19.0238 4.93226 19.5306 7.86285L20.2361 11.9426C20.3332 12.5041 19.9014 13.0158 19.3348 13.0158H14.1537C13.1766 13.0158 12.4344 13.8924 12.5921 14.8553L13.2548 18.8998C13.3456 19.4539 13.3197 20.0208 13.1787 20.5642C13.1072 20.8399 12.8896 21.0766 12.5832 21.175L12.4382 21.2216L12.6676 21.9356L12.4382 21.2216ZM11.3486 22.5433C11.8312 22.7758 12.3873 22.8135 12.897 22.6497L13.042 22.6031L12.8126 21.8891L13.042 22.6031C13.819 22.3535 14.4252 21.7328 14.6307 20.9408C14.8241 20.1952 14.8596 19.4174 14.7351 18.6573L14.0724 14.6128C14.0639 14.561 14.1038 14.5158 14.1537 14.5158H19.3348C20.8341 14.5158 21.9695 13.1635 21.7142 11.687L21.0087 7.60725C20.3708 3.91896 17.0712 1.25 13.245 1.25H8.59635C7.3427 1.25 6.29852 2.20975 6.19056 3.45832L5.3784 12.851C5.31149 13.6247 5.62022 14.3837 6.20855 14.8907L7.64729 16.1305C8.3025 16.6951 8.85404 17.2423 9.20042 17.8908C9.45699 18.3711 9.65573 18.8789 9.79208 19.4046L10.2678 21.2384C10.417 21.8137 10.8166 22.2869 11.3486 22.5433ZM2.96767 14.5151C3.36893 14.5324 3.71261 14.2306 3.74721 13.8304L4.71881 2.59389C4.78122 1.8721 4.21268 1.25 3.48671 1.25C2.80289 1.25 2.25 1.80474 2.25 2.48726V13.7658C2.25 14.1674 2.5664 14.4978 2.96767 14.5151Z" fill="#666666"/>

    </svg>
  )
}

UnDisLikeCommentIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
  
UnDisLikeCommentIcon.defaultProps = {
  viewBox: "0 0 24 24",
  width: "24",
  height: "24",
  fill: "black",
  stroke: "black",
  style: {}
}

export default UnDisLikeCommentIcon
