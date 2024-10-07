import React, { useEffect, useState } from 'react'

const CircularProgressDashboard = (props) => {
  const {
    value = 70,
    size = 120,
    strokeWidth = 24,
    max = 100,
    strokeColor = '#F6BB3A',
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
    }, 8)
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
          stroke="#FBECCA"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth * 2) / 2}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth + 8}
          strokeLinecap="butt"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* <div className="absolute flex flex-col">
        <span className="text-[36px] text-neutral font-medium">{`${value}%`}</span>
        <div className="w-full h-[1px] bg-grey-1"></div>
        <span className="text-[24px] text-grey-1 font-medium">{`${passScore}%`}</span>
      </div> */}
    </div>
  )
}

export default CircularProgressDashboard
