import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useCountdown } from 'common/hooks/useCountdown'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const AudioImageQuestion = (props) => {
  const {
    audioUrl = '',
    activeSlideIndex,
    imageUrls = [],
    handleToggleModal = () => {}
  } = props
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null)
  const play = (audioUrl, e) => {
    if (audioRef.current) {
      if (isPlaying) {
        // audioRef.current.pause()
      } else {
        audioRef.current.play()
        e.target.disabled = true
      }
      setIsPlaying(!isPlaying)
    } else {
      setCurrentAudioUrl(audioUrl)
    }
  }
  const stopAndClearAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      // audioRef.current.src = ''
      setIsPlaying(false)
    }
  }
  useEffect(() => {
    stopAndClearAudio()
    if (currentAudioUrl) {
      audioRef.current.src = currentAudioUrl
      // play();
    }
  }, [activeSlideIndex])
  return (
    <div>
      <div className="w-full border border-grey-4 rounded-2xl min-h-[164px] flex items-center justify-center shadow-[0px_8px_16px_0px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-32">
          <div>
            <button onClick={(e) => play(audioUrl, e)}>
              {/* play */}
              <div className="pointer-events-none">
                <XProfileIcon
                  name="play"
                  width="60"
                  height="60"
                  fill="#666666"
                />
              </div>
            </button>
            <audio ref={audioRef} src={audioUrl} />
          </div>
          {imageUrls?.length > 0 && (
            <div
              className={`w-full grid ${
                imageUrls?.length < 2 ? 'grid-cols-1' : 'grid-cols-2'
              }`}
            >
              {imageUrls?.map((image, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleModal(image)}
                    className="relative w-full h-[500px] flex items-center justify-center"
                  >
                    <Image
                      src={image}
                      layout="fill"
                      alt=""
                      objectFit="contain"
                      quality={100}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AudioImageQuestion.propTypes = {}
AudioImageQuestion.defaultProps = {}

export default AudioImageQuestion
