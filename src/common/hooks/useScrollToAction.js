import React, { useEffect, useRef, useState } from 'react'

export const useScrollToAction = (
  id = 'box1',
  rootMargin = '450px 0px -146px 0px'
) => {
  const [valueScrollY, setValueScrollY] = useState()

  const intersectionCallback = (entries) => {
    entries.forEach((entry) => {
      let visible = `${Math.floor(entry.intersectionRatio * 100)}`
      setValueScrollY({ entry, visible })
    })
  }

  useEffect(() => {
    //option
    let observerOptions = {
      root: null,
      rootMargin: rootMargin,
      threshold: []
    }

    let thresholdSets = []

    // add  scroll value for id component
    for (let i = 0; i <= 1.0; i += 0.01) {
      thresholdSets.push(i)
    }
    // Add each box, creating a new observer for each
    observerOptions.threshold = thresholdSets
    const observers = new IntersectionObserver(
      intersectionCallback,
      observerOptions
    )
    const getId = document.getElementById(id)
    if (getId) {
      observers.observe(document.querySelector(`#${id}`))
    }
  }, [])

  //result
  return valueScrollY
}
