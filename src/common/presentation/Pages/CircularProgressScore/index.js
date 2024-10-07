import React, { useEffect, useState } from 'react'

const CircularProgressScore = (props) => {
  const {
    value = 25,
    size = 68,
    strokeWidth = 3,
    max = 100,
    isPass,
    strokeColor = '#317AE8',
    passScore = 0
  } = props
  const [percent, setPercent] = useState(0)
  const dashArray = ((size - strokeWidth * 2) / 2) * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percent) / max

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercent((t) => {
        if (t >= value) return t > value ? t - 1 : t
        return t < value ? t + 1 : t
      })
    }, 10)
    return () => clearInterval(intervalId)
  }, [value])
  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth * 2) / 2}
          fill="none"
          stroke=""
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth * 2) / 2}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute flex items-center justify-center bg-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.04)] rounded-full w-[100px] h-[100px]">
        <span
          className={`text-h3 ${isPass ? 'text-[#294F9B]' : 'text-[#DB2E24]'}`}
        >{`${percent}%`}</span>
        {/* <div className="w-full h-[1px] bg-grey-1"></div>
        <span className="text-[24px] text-grey-1 font-medium">{`${passScore}%`}</span> */}
      </div>
    </div>
  )
}

export default CircularProgressScore
