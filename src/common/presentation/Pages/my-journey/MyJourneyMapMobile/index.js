import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const MyJourneyMapMobile = (props) => {
  const { state, role } = props

  const renderImageByStateAndRole = () => {
    if (role === 0) {
      switch (state) {
        case 1:
          return (
            <Fragment>
              <div className=" relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Cuu-1.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        case 2:
          return (
            <Fragment>
              <div className=" relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Cuu-2.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        case 3:
          return (
            <Fragment>
              <div className=" relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Cuu-3.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        case 4:
          return (
            <Fragment>
              <div className="  relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Cuu-4.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        default:
          return <></>
      }
    } else {
      switch (state) {
        case 1:
          return (
            <Fragment>
              <div className=" relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Chuot-1.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        case 2:
          return (
            <Fragment>
              <div className=" relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Chuot-2.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        case 3:
          return (
            <Fragment>
              <div className=" relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Chuot-3.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        case 4:
          return (
            <Fragment>
              <div className=" relative">
                <Image
                  alt="my-journey-role"
                  src="/images/my-journey-mobile/Chuot-4.png"
                  width={342}
                  height={151}
                  sizes="100vw"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </Fragment>
          )
        default:
          return <></>
      }
    }
  }

  return <Fragment>{renderImageByStateAndRole()}</Fragment>
}

MyJourneyMapMobile.propTypes = {
  state: PropTypes.number,
  role: PropTypes.number
}

MyJourneyMapMobile.defaultProps = { state: 1, role: 0 }

export default MyJourneyMapMobile
