import { unwrapResult } from '@reduxjs/toolkit'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectCareerMap } from 'store/app/careerPathSlice'
import { getJobByTag } from 'store/app/jobSlice'

const CarrerMap = () => {
  const dispatch = useDispatch()
  const careerMap = useSelector(selectCareerMap)
  const { push, query } = useRouter()
  const { categoryId } = query || {}
  function drawStuff(ctx, cv, scaleFactor) {
    // do your drawing stuff here
    let canvasBackground = new window.Image()
    canvasBackground.setAttribute('src', '/images/Career_Map.jpg')
    let listPath = {}

    Object.keys(careerMap).map((careers) =>
      careerMap[careers].map((career) => {
        const { x, y, w, h, name } = career
        let tempPath = {}
        const child = new Path2D()
        child.rect(cv.width * x, cv.height * y, cv.width * w, cv.height * h)
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.fill(child)
        tempPath[name] = child
        listPath = { ...listPath, ...tempPath }
      })
    )

    canvasBackground.addEventListener('load', function () {
      ctx.drawImage(canvasBackground, 0, 0, cv.width, cv.height)
      cv.addEventListener('mousemove', function (event) {
        Object.keys(careerMap).map((careers) =>
          careerMap[careers].map((career) => {
            const { name: targetName } = career
            const isPointInPath = ctx.isPointInPath(
              listPath[targetName],
              event.offsetX * scaleFactor,
              event.offsetY * scaleFactor
            )

            if (isPointInPath) {
              ctx.clearRect(0, 0, cv.width, cv.height)
              ctx.drawImage(canvasBackground, 0, 0, cv.width, cv.height)
              Object.keys(careerMap).map((careers) =>
                careerMap[careers].map((career) => {
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
              )
            }
          })
        )
      })

      cv.addEventListener('click', function (event) {
        Object.keys(careerMap).map((careers) =>
          careerMap[careers].map((career) => {
            const { name, tag } = career
            const isPointInPath = ctx.isPointInPath(
              listPath[name],
              event.offsetX * scaleFactor,
              event.offsetY * scaleFactor
            )
            if (isPointInPath && tag) {
              const handleClick = async () => {
                const fetchJobByTagName = await dispatch(
                  getJobByTag({
                    tag: tag
                  })
                )
                const { data } = unwrapResult(fetchJobByTagName)
                if (data) {
                  const { jobId } = data
                  push(`/career-path/${categoryId}/${jobId}`)
                }
              }
              handleClick()
            }
          })
        )
      })

      Object.keys(careerMap).map((careers) =>
        careerMap[careers].map((career) => {
          const { x, y, w, h, img } = career

          ctx.drawImage(
            img,
            cv.width * x,
            cv.height * y,
            cv.width * w,
            cv.height * h
          )
        })
      )
    })
  }

  useEffect(() => {
    const scaleFactor = 3
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false)

    function resizeCanvas() {
      canvas.style.width = window.innerWidth * 0.8 + 'px'
      canvas.style.height = window.innerWidth * 0.466 + 'px'
      canvas.width = window.innerWidth * 0.8 * scaleFactor
      canvas.height = window.innerWidth * 0.466 * scaleFactor

      /**
       * Your drawings need to be inside this function otherwise they will be reset when
       * you resize the browser window and the canvas goes will be cleared.
       */
      drawStuff(context, canvas, scaleFactor)
    }

    resizeCanvas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto">
      <canvas id="canvas" className="rounded-[24px] mx-auto cursor-pointer" />
    </div>
  )
}

export default CarrerMap
