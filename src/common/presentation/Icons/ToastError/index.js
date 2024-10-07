
import PropTypes from 'prop-types'

const ToastErrorIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M30.5108 14.5293C31.3132 14.5293 31.9637 15.1798 31.9637 15.9822C31.9637 20.2208 30.2799 24.2859 27.2827 27.2831C24.2855 30.2802 20.2205 31.964 15.9818 31.964C15.1794 31.964 14.5289 31.3135 14.5289 30.5111C14.5289 29.7087 15.1794 29.0582 15.9818 29.0582C19.4498 29.0582 22.7758 27.6806 25.228 25.2284C27.6802 22.7761 29.0579 19.4502 29.0579 15.9822C29.0579 15.1798 29.7084 14.5293 30.5108 14.5293Z" fill="#FF8066"/>

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M1.45289 14.5293C2.25531 14.5293 2.90579 15.1798 2.90579 15.9822C2.90579 19.4502 4.28344 22.7761 6.73568 25.2284C9.18791 27.6806 12.5139 29.0582 15.9818 29.0582C16.7843 29.0582 17.4347 29.7087 17.4347 30.5111C17.4347 31.3135 16.7843 31.964 15.9818 31.964C11.7432 31.964 7.67815 30.2802 4.68097 27.2831C1.6838 24.2859 0 20.2208 0 15.9822C0 15.1798 0.650483 14.5293 1.45289 14.5293Z" fill="#E86664"/>

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M4.68097 4.68097C7.67815 1.6838 11.7432 0 15.9818 0C16.7843 0 17.4347 0.650483 17.4347 1.45289C17.4347 2.25531 16.7843 2.90579 15.9818 2.90579C12.5139 2.90579 9.18791 4.28344 6.73568 6.73568C4.28344 9.18791 2.90579 12.5139 2.90579 15.9818C2.90579 16.7843 2.25531 17.4347 1.45289 17.4347C0.650483 17.4347 0 16.7843 0 15.9818C0 11.7432 1.6838 7.67815 4.68097 4.68097Z" fill="#FF8066"/>

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M14.5289 1.45289C14.5289 0.650483 15.1794 0 15.9818 0C20.2205 0 24.2855 1.6838 27.2827 4.68097C30.2799 7.67815 31.9637 11.7432 31.9637 15.9818C31.9637 16.7843 31.3132 17.4347 30.5108 17.4347C29.7084 17.4347 29.0579 16.7843 29.0579 15.9818C29.0579 12.5139 27.6802 9.18791 25.228 6.73568C22.7758 4.28344 19.4498 2.90579 15.9818 2.90579C15.1794 2.90579 14.5289 2.25531 14.5289 1.45289Z" fill="#E86664"/>

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M17.0174 14.9636C17.5842 15.5315 17.5834 16.4515 17.0154 17.0183L13.1435 20.883C12.5755 21.4499 11.6556 21.449 11.0888 20.8811C10.5219 20.3132 10.5228 19.3932 11.0907 18.8264L14.9627 14.9617C15.5306 14.3948 16.4505 14.3957 17.0174 14.9636Z" fill="#E86664"/>

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M11.0897 11.0896C11.6571 10.5222 12.577 10.5222 13.1444 11.0896L17.0164 14.9616C17.5838 15.529 17.5838 16.4489 17.0164 17.0163C16.449 17.5837 15.5291 17.5837 14.9617 17.0163L11.0897 13.1443C10.5223 12.5769 10.5223 11.657 11.0897 11.0896Z" fill="#FF8066"/>

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M14.9618 14.9627C15.5292 14.3953 16.4491 14.3953 17.0165 14.9627L20.8812 18.8274C21.4486 19.3947 21.4486 20.3147 20.8812 20.8821C20.3138 21.4494 19.3939 21.4494 18.8265 20.8821L14.9618 17.0174C14.3944 16.45 14.3944 15.53 14.9618 14.9627Z" fill="#FF8066"/>

      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M20.8802 11.0886C21.4482 11.6555 21.449 12.5754 20.8822 13.1433L17.0175 17.0153C16.4506 17.5832 15.5307 17.5841 14.9628 17.0172C14.3948 16.4504 14.394 15.5305 14.9608 14.9625L18.8255 11.0906C19.3924 10.5226 20.3123 10.5218 20.8802 11.0886Z" fill="#E86664"/>

      <path xmlns="http://www.w3.org/2000/svg" d="M30.5181 17.4429C31.3205 17.4429 31.971 16.7924 31.971 15.99C31.971 15.1876 31.3205 14.5371 30.5181 14.5371C29.7157 14.5371 29.0652 15.1876 29.0652 15.99C29.0652 16.7924 29.7157 17.4429 30.5181 17.4429Z" fill="#B24750"/>

      <path xmlns="http://www.w3.org/2000/svg" d="M15.9891 17.4429C16.7916 17.4429 17.442 16.7924 17.442 15.99C17.442 15.1876 16.7916 14.5371 15.9891 14.5371C15.1867 14.5371 14.5363 15.1876 14.5363 15.99C14.5363 16.7924 15.1867 17.4429 15.9891 17.4429Z" fill="#B24750"/>

      <path xmlns="http://www.w3.org/2000/svg" d="M1.46022 17.4429C2.26263 17.4429 2.91311 16.7924 2.91311 15.99C2.91311 15.1876 2.26263 14.5371 1.46022 14.5371C0.657807 14.5371 0.00732422 15.1876 0.00732422 15.99C0.00732422 16.7924 0.657807 17.4429 1.46022 17.4429Z" fill="#B24750"/>

      <path xmlns="http://www.w3.org/2000/svg" d="M15.9891 2.9136C16.7916 2.9136 17.442 2.26312 17.442 1.46071C17.442 0.658295 16.7916 0.0078125 15.9891 0.0078125C15.1867 0.0078125 14.5363 0.658295 14.5363 1.46071C14.5363 2.26312 15.1867 2.9136 15.9891 2.9136Z" fill="#B24750"/>

      <path xmlns="http://www.w3.org/2000/svg" d="M15.9892 31.9993C16.7996 31.9993 17.4566 31.3423 17.4566 30.5319C17.4566 29.7214 16.7996 29.0645 15.9892 29.0645C15.1787 29.0645 14.5217 29.7214 14.5217 30.5319C14.5217 31.3423 15.1787 31.9993 15.9892 31.9993Z" fill="#B24750"/>

    </svg>
  )
}

ToastErrorIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
  
ToastErrorIcon.defaultProps = {
  viewBox: "0 0 32 32",
  width: "32",
  height: "32",
  fill: "black",
  stroke: "black",
  style: {}
}

export default ToastErrorIcon
