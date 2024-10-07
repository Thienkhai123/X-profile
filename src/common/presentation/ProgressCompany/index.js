import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

const ProgressCompany = (props) => {
  const { width = 0, background = '#FBECCA', price = 12000000 } = props

  const [hover, setHover] = useState(false)
  const [presentWidth, setPresentWidth] = useState(0)

  const bearRef = useRef()
  const popUp = useRef()

  const bearWidth = bearRef.current?.offsetWidth
  const popUpWidth = popUp.current?.offsetWidth / 2

  const bearHeight = bearRef.current?.offsetHeight
  const popUpHeight = popUp.current?.offsetHeight

  // useEffect(() => {
  //   if (presentWidth < width) {
  //     const timer = setInterval(() => {
  //       if (presentWidth < width) {
  //         setPresentWidth((presentWidth) => (presentWidth += 0.4))
  //       }
  //     }, 0.8)
  //     return () => {
  //       clearInterval(timer)
  //     }
  //   }
  // }, [])

  return (
    <div style={{ width: width + '%' }} className="relative">
      <div
        ref={bearRef}
        onMouseLeave={() => setHover(false)}
        onMouseMove={() => setHover(true)}
        className={`h-full w-full rounded-full cursor-pointer `}
        style={{
          background: background
        }}
      ></div>
      <div
        className={`absolute duration-200 xl:block hidden ${
          hover ? 'opacity-100 z-[10]' : 'opacity-0 -z-[1]'
        }`}
        ref={popUp}
        style={{
          left: -(bearWidth / 2 + (popUpWidth - bearWidth)) + 'px',
          top: -(bearHeight + (popUpHeight - bearHeight) + 16) + 'px'
        }}
      >
        <div
          className="speech3 bottom3 w-full border-black"
          style={{ background: 'black' }}
        >
          <div className="w-full mb-[4px]">
            <p className="text-white text-p14 text-center">Mức lương</p>
          </div>
          <div className="w-full">
            <p className="text-white text-p14-bold text-center">{price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressCompany
