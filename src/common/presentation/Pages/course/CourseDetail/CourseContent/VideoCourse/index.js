import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import Modal from 'common/presentation/Modal'
import VideoModal from '../VideoModal'
import useModal from 'common/hooks/useModal'
import { getLessonLicense } from 'store/app/courseLearnSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const CONFIG = {
  file: {
    attributes: {
      crossOrigin: 'true'
    }
  }
}

const VideoCourse = (props) => {
  const {
    videoId,
    url,
    image,
    handleReadDoneLession = () => {},
    chapterId,
    setTimeline,
    lessonId,
    isDrmVideo,
    uploadStatus
  } = props
  const refPlayer = useRef(null)
  const dispatch = useDispatch()

  const [video, setVideo] = useState({
    player: false,
    thumbnail: false
  })
  const [currentTimeAccept, setCurrentTimeAccept] = useState()
  const [action, setAction] = useState(false)
  const [videoTime, setVideoTime] = useState({
    id: 0,
    time: 0,
    totalTimeVieo: 0,
    onRead: false
  })
  const [isIos, setIsIos] = useState(false)
  const [open, toggleModal] = useModal()

  const handleCurrentTimeSuccess = () => {
    setCurrentTimeAccept(true)
    toggleModal()
  }

  const handleCurrentTimeUnSuccess = () => {
    setCurrentTimeAccept(false)
    toggleModal()
  }

  useEffect(() => {
    localStorage.setItem(
      'time_Vidseo_Course',
      JSON.stringify({ id: chapterId, time: 0, totalTimeVieo: 0 })
    )
    setTimeline(0)
    setVideoTime({ id: 0, time: 0, totalTimeVieo: 0, onRead: false })
  }, [chapterId])

  useEffect(() => {
    if (videoTime.time !== 0) {
      localStorage.setItem('time_Vidseo_Course', JSON.stringify(videoTime))
    }
  }, [videoTime.time])

  useEffect(() => {
    const timeLine = JSON.parse(localStorage.getItem('time_Vidseo_Course'))
    const checkTotalTime = videoTime?.totalTimeVieo * 0.9
    if (timeLine?.time > checkTotalTime && !videoTime.onRead) {
      handleReadDoneLession()
      setVideoTime({ ...videoTime, onRead: true })
    }
  }, [videoTime.time])

  useEffect(() => {
    const timeLine = JSON.parse(localStorage.getItem('time_Vidseo_Course'))
    if (timeLine?.time >= 5 && timeLine?.id === videoId) {
      toggleModal()
    } else {
      return
    }
  }, [])

  useEffect(() => {
    const timeLine = JSON.parse(localStorage.getItem('time_Vidseo_Course'))
    if (timeLine?.time >= 5 && timeLine?.id === videoId && currentTimeAccept) {
      refPlayer.current.seekTo(timeLine.time, 'seconds')
      setVideo({ ...video, player: true, thumbnail: false })
    }
    if (
      timeLine?.time < 5 ||
      timeLine?.id !== videoId ||
      currentTimeAccept === false ||
      timeLine?.time === undefined
    ) {
      // refPlayer.current.seekTo(0, 'seconds')
      localStorage.setItem(
        'time_Vidseo_Course',
        JSON.stringify({ id: 0, time: 0 })
      )
      setVideo({ ...video, thumbnail: true })
    }
  }, [currentTimeAccept])

  useEffect(() => {
    if ((isDrmVideo || false) && (uploadStatus || 0) === 2) {
      function iOS() {
        return (
          [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
          ].includes(navigator.platform) ||
          // iPad on iOS 13 detection
          (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
        )
      }
      const isDrmReady = async () => {
        try {
          const fetchLic = await dispatch(
            getLessonLicense({
              lessonId: lessonId,
              elementId: 'drm-player'
            })
          )
          const res = unwrapResult(fetchLic)
          if (res?.isSuccess) {
            if (!iOS()) {
              drmplayer.load(res?.data?.data?.lic)
            } else {
              setIsIos(true)
            }
          }
        } catch (err) {
          console.log('err: ', err)
        }
      }
      isDrmReady()
    }
  }, [lessonId])

  return (
    <div className="w-full h-full relative">
      {!isIos && (
        <div className="video-container w-full h-full">
          <ReactPlayer
            ref={refPlayer}
            onProgress={(element) => {
              setVideoTime({
                ...videoTime,
                id: videoId,
                time: element.playedSeconds
              })
              setTimeline(element.playedSeconds)
            }}
            onDuration={(time) => {
              setVideoTime({ ...videoTime, totalTimeVieo: time })
            }}
            url={url}
            width="100%"
            height="100%"
            controls
            type="video/mp4"
            config={{ file: { attributes: { id: 'drm-player' } } }}
            // style={{ borderRadius: '8px' }}
          />
        </div>
      )}
      {isIos && (
        <p className="text-p18-bold">Chưa hỗ trợ video trên thiết bị này!</p>
      )}
      <Modal toggleModal={toggleModal} open={open}>
        <VideoModal
          handleCurrentTimeSuccess={handleCurrentTimeSuccess}
          handleCurrentTimeUnSuccess={handleCurrentTimeUnSuccess}
        />
      </Modal>
    </div>
  )
}

VideoCourse.propTypes = {
  url: PropTypes.string,
  image: PropTypes.string
}
VideoCourse.defaultProps = {
  url: '',
  image: '/images/Thumbnail.png'
}

export default VideoCourse
