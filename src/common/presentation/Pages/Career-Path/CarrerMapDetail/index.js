import XProfileIcon from 'common/presentation/Icons'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  selectCareerMapByJobId,
  selectLevelInfoLeft,
  selectLevelInfoMore,
  selectLevelInfoRight,
  selectShowMoreLevel,
  updateLevelId,
  updateShowMoreLevel
} from 'store/app/careerPathSlice'
import LevelInfo from './LevelInfo'

const CarrerMapDetail = ({
  handleAction = () => {},
  levelId = 0,
  description = '',
  id = 0,
  name = ''
}) => {
  const dispatch = useDispatch()
  const levelInfosLeft = useSelector(selectLevelInfoLeft)
  const levelInfosRight = useSelector(selectLevelInfoRight)
  const levelInfoMore = useSelector(selectLevelInfoMore)
  const careerMapJob = useSelector((state) => selectCareerMapByJobId(state, id))
  const { width, height } = careerMapJob || {}
  const { levels } = careerMapJob || {}
  const showMoreLevel = useSelector(selectShowMoreLevel)
  const handleShowMoreLevel = () => {
    dispatch(updateShowMoreLevel(true))
  }

  function drawStuff(ctx, cv, scaleFactor) {
    // do your drawing stuff here
    const { background } = careerMapJob
    let canvasBackground = new window.Image()
    canvasBackground.setAttribute('src', background)
    let listPath = {}

    levels?.map((career) => {
      const { x, y, w, h, name } = career
      let tempPath = {}
      const child = new Path2D()
      child.rect(cv.width * x, cv.height * y, cv.width * w, cv.height * h)
      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      ctx.fill(child)
      tempPath[name] = child
      listPath = { ...listPath, ...tempPath }
    })

    canvasBackground.addEventListener('load', function () {
      ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height)
      cv.addEventListener('mousemove', function (event) {
        levels?.map((career) => {
          const { name: targetName } = career
          const isPointInPath = ctx.isPointInPath(
            listPath[targetName],
            event.offsetX * scaleFactor,
            event.offsetY * scaleFactor
          )

          if (isPointInPath) {
            ctx.clearRect(0, 0, cv.width, cv.height)
            ctx.drawImage(canvasBackground, 0, 0, cv.width, cv.height)
            levels?.map((career) => {
              const { x, y, w, h, img, highlightImg, name } = career
              if (name === targetName) {
                ctx.drawImage(
                  highlightImg,
                  cv.width * x,
                  cv.height * y,
                  cv.width * w,
                  cv.height * h
                )
              } else {
                ctx.drawImage(
                  img,
                  cv.width * x,
                  cv.height * y,
                  cv.width * w,
                  cv.height * h
                )
              }
            })
          }
        })
      })
      cv.addEventListener('click', function (event) {
        levels?.map((career) => {
          const { name, id } = career
          const isPointInPath = ctx.isPointInPath(
            listPath[name],
            event.offsetX * scaleFactor,
            event.offsetY * scaleFactor
          )
          if (isPointInPath && id !== 0) {
            dispatch(updateLevelId(id))
          }
        })
      })

      levels?.map((career) => {
        const { x, y, w, h, img } = career
        ctx.drawImage(
          img,
          cv.width * x,
          cv.height * y,
          cv.width * w,
          cv.height * h
        )
      })
    })
  }

  useEffect(() => {
    if (width && height) {
      const scaleFactor = 3
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')

      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false)

      function resizeCanvas() {
        canvas.style.width = window.innerWidth * width + 'px'
        canvas.style.height = window.innerWidth * height + 'px'
        canvas.width = window.innerWidth * width * scaleFactor
        canvas.height = window.innerWidth * height * scaleFactor

        /**
         * Your drawings need to be inside this function otherwise they will be reset when
         * you resize the browser window and the canvas goes will be cleared.
         */
        drawStuff(context, canvas, scaleFactor)
      }

      resizeCanvas()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <div className="md:py-[68px] py-8">
      <p className="sm:text-h2 text-p20-bold text-center text-black mb-[12px]">
        Lộ trình nghề {name}
      </p>
      <p className="max-w-[1000px] text-center sm:text-p18 text-p12 text-grey-1 mx-auto mb-[32px] sm:px-0 px-10">
        {description}
      </p>
      <div
        id="parent-canvas"
        className="md:flex items-center justify-center w-[80vw] mx-auto gap-[1.7vw]"
      >
        <div className="md:flex hidden w-[13vw] flex-col justify-center items-center gap-[28px]">
          {levelInfosLeft?.map((level, ind) => (
            <LevelInfo
              key={`left-info-${ind}`}
              {...level}
              handleAction={handleAction}
              levelId={levelId}
            />
          ))}
        </div>
        <canvas
          id="canvas"
          className="rounded-[24px] cursor-pointer md:mx-0 mx-auto"
        />
        <div className="md:hidden flex w-[57.33vw] md:mx-0 mx-auto flex-col justify-center items-center gap-[28px] md:mt-0 mt-4">
          {levelInfosLeft?.map((level, ind) => (
            <LevelInfo
              key={`left-info-${ind}`}
              {...level}
              handleAction={handleAction}
              levelId={levelId}
            />
          ))}
        </div>
        <div className="md:w-[13vw] w-[57.33vw] md:mx-0 mx-auto flex flex-col justify-center items-center gap-[28px] md:mt-0 mt-4">
          {levelInfosRight?.map((level, ind) => (
            <LevelInfo
              key={`left-info-${ind}`}
              {...level}
              handleAction={handleAction}
              levelId={levelId}
            />
          ))}
        </div>
      </div>
      <div className=" mx-auto mt-[48px]">
        {levelInfoMore?.length > 0 && !showMoreLevel && (
          <div
            className="flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-80"
            onClick={handleShowMoreLevel}
          >
            <p className="text-blue-light text-center  text-p18-bold">
              Xem thêm {levelInfoMore?.length} vị trí công việc
            </p>
            <div className="rotate-90	">
              <XProfileIcon name="arrowVector" fill="#294F9B" />
            </div>
          </div>
        )}
        {levelInfoMore?.length > 0 && showMoreLevel && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-[20px] mx-[5.4vw]">
            {levelInfoMore?.map((level, ind) => (
              <LevelInfo
                key={`left-more-${ind}`}
                {...level}
                handleAction={handleAction}
                levelId={levelId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CarrerMapDetail
