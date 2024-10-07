import Button from 'common/presentation/Button'
import ButtonIcon from 'common/presentation/ButtonIcon'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import LoadingRole from 'common/presentation/Loading/LoadingRole'

const RenderUiEmptyCam = () => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-5">
        <div>
          <XProfileIcon name="videocamera" />
        </div>
        <p className="text-grey-2 text-p18-bold">Camera: Tắt</p>
      </div>
      <div>
        <button className="bg-grey-4 rounded-2xl  w-full flex justify-between py-4 px-8 items-center border border-grey-4">
          <Fragment>
            <p className="xl:text-p18 text-p14 text-grey-2">
              FaceTime HD Camera
            </p>
            <XProfileIcon name="arrowDown" />
          </Fragment>
        </button>
      </div>
      <div className="flex items-center gap-4 mb-5 mt-7">
        <div>
          <XProfileIcon name="microphone2" />
        </div>
        <p className="text-grey-2 text-p18-bold">Micro: Tắt</p>
      </div>
      <div>
        <button className="bg-grey-4 rounded-2xl  w-full flex justify-between py-4 px-8 items-center border border-grey-4">
          <Fragment>
            <p className="xl:text-p18 text-p14 text-grey-2">
              External microphone
            </p>
            <XProfileIcon name="arrowDown" />
          </Fragment>
        </button>
      </div>
      <p className="text-p18 italic text-grey-1 mt-6">
        Đừng quên mở chặn camera trên trình duyệt nhé. Nếu gặp khó khăn trong
        quá trình cài đặt camarea, bạn có thể xem hướng dẫn{' '}
        <span
          onClick={() => {
            window.open(
              'https://blog.xprofile.vn/huong-dan-cai-dat-camera-chong-gian-lan/',
              '_blank'
            )
          }}
          className="text-button-2 text-p18-bold underline not-italic cursor-pointer hover:opacity-80"
        >
          tại đây
        </span>
      </p>
    </div>
  )
}

const ScreenCameraFront = (props) => {
  const {
    connection,
    handleChangeScreen,
    doneSetupFrontCamera,
    selectedDeviceId,
    setSelectedDeviceId,
    examTitle
  } = props
  const refCamOpt = useRef(null)
  const refMicroOpt = useRef(null)

  const videoRef = useRef(null)
  const [mediaStream, setMediaStream] = useState(null)

  const [checkingCamera, setCheckingCamera] = useState(false)

  const [showCamOpt, setShowCamOpt] = useState(false)
  const [showMicroOpt, setShowMicroOpt] = useState(false)

  const [devices, setDevices] = useState({
    cameras: [],
    micros: []
  })

  const handleCloseCamOpt = () => {
    setShowCamOpt(false)
  }

  const handleCloseMicroOpt = () => {
    setShowMicroOpt(false)
  }

  const handleSelectCameraDevice = (id, label) => {
    setSelectedDeviceId({
      ...selectedDeviceId,
      video: {
        deviceId: id,
        label: label
      }
    })
    setShowCamOpt(false)
  }

  const handleSelectMicroDevice = (id, label) => {
    setSelectedDeviceId({
      ...selectedDeviceId,
      audio: {
        deviceId: id,
        label: label
      }
    })
    setShowMicroOpt(false)
  }

  const checkCamFront = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      if (stream) {
        if (!navigator.mediaDevices?.enumerateDevices) {
          console.log('enumerateDevices() not supported.')
        } else {
          // List cameras and microphones.
          navigator.mediaDevices.enumerateDevices().then((devices) => {
            const output = []
            devices.forEach((device) => {
              // console.log(
              //   `${device.kind}: ${device.label} id = ${device.deviceId}`
              // )
              if (device.deviceId !== 'communications') {
                output.push({
                  label: device.label,
                  kind: device.kind,
                  id: device.deviceId
                })
              }
            })

            if (output?.length > 0) {
              const findCameras = output?.filter(
                (el) => el?.kind === 'videoinput'
              )
              const findMicros = output?.filter(
                (el) => el?.kind === 'audioinput'
              )
              if (findCameras?.length > 0 && findMicros?.length > 0) {
                const findDefaultCamera = findCameras?.find(
                  (cam) => cam?.kind === 'videoinput'
                )
                const findDefaultMicro = findMicros?.find(
                  (cam) => cam?.kind === 'audioinput'
                )
                if (findDefaultCamera && findDefaultMicro) {
                  setSelectedDeviceId({
                    video: {
                      deviceId: findDefaultCamera?.id,
                      label: findDefaultCamera?.label
                    },
                    audio: {
                      deviceId: findDefaultMicro?.id,
                      label: findDefaultMicro?.label
                    }
                  })
                  setDevices({
                    cameras: findCameras,
                    micros: findMicros
                  })
                  setMediaStream(stream)
                  setCheckingCamera(true)
                }
              }
            }
          })
        }
      }
    } catch (err) {
      console.log(err)
      setCheckingCamera(true)
    }
  }

  useEffect(() => {
    checkCamFront()
  }, [])

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream
    }
  }, [videoRef, mediaStream])

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [mediaStream])

  useOnClickOutside(refCamOpt, handleCloseCamOpt)
  useOnClickOutside(refMicroOpt, handleCloseMicroOpt)

  if (!checkingCamera) {
    return (
      <div>
        <LoadingRole />
      </div>
    )
  }

  return (
    <div>
      <p className="text-h3 text-neutral">{examTitle}</p>
      <div className="grid grid-cols-[45%_45%] mt-7 justify-between">
        <div>
          <p className="text-neutral text-h4 mb-4">
            Bước 1: Cài đặt camera trước
          </p>
          <p className="text-neutral text-p18 mb-7">
            X-Profile ghi lại hình ảnh của bạn liên tục trong suốt quá trình
            thực hiện kiểm tra để đảm bảo tính công bằng.
          </p>

          {devices?.cameras?.length === 0 && devices?.micros?.length === 0 && (
            <RenderUiEmptyCam />
          )}
          {devices?.cameras?.length > 0 && devices?.micros?.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div>
                  <XProfileIcon name="videocamera" />
                </div>
                <p className="text-neutral text-p18-bold">Camera: Bật</p>
                <div className="rounded-full w-[12px] h-[12px] bg-[#378711]" />
              </div>
              <div>
                <div className="relative" ref={refCamOpt}>
                  <button
                    className="bg-white rounded-2xl  w-full flex justify-between py-4 px-8 items-center border border-grey-4"
                    onClick={() => setShowCamOpt(!showCamOpt)}
                  >
                    <Fragment>
                      <p className="xl:text-p18 text-p14">
                        {selectedDeviceId.video.label}
                      </p>
                      <XProfileIcon name="arrowDown" />
                    </Fragment>
                  </button>
                  {showCamOpt && (
                    <div className="bg-white  w-full absolute top-[64px] rounded-2xl border border-grey-4 overflow-hidden p-2 z-[100]">
                      <div className="custom-scrollbar max-h-[212px]  overflow-x-hidden ">
                        {devices?.cameras?.map((camera, ind) => {
                          if (selectedDeviceId.video.deviceId === camera?.id) {
                            return (
                              <div
                                key={`camera-device-${ind}`}
                                className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                              >
                                <p className="xl:text-p18 text-p14 truncate">
                                  {camera?.label}
                                </p>
                                <XProfileIcon name="check" />
                              </div>
                            )
                          } else {
                            return (
                              <div
                                key={`camera-device-${ind}`}
                                className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px] cursor-pointer"
                                onClick={() =>
                                  handleSelectCameraDevice(
                                    camera?.id,
                                    camera?.label
                                  )
                                }
                              >
                                <p className="xl:text-p18 text-p14 truncate">
                                  {camera?.label}
                                </p>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5 mt-7">
                <div>
                  <XProfileIcon name="microphone2" />
                </div>
                <p className="text-neutral text-p18-bold">Micro: Bật</p>
                <div className="rounded-full w-[12px] h-[12px] bg-[#378711]" />
              </div>
              <div>
                <div className="relative" ref={refMicroOpt}>
                  <button
                    className="bg-white rounded-2xl  w-full flex justify-between py-4 px-8 items-center border border-grey-4"
                    onClick={() => setShowMicroOpt(!showMicroOpt)}
                  >
                    <Fragment>
                      <div className="max-w-[90%]">
                        <p className="xl:text-p18 text-p14 truncate">
                          {selectedDeviceId.audio.label}
                        </p>
                      </div>
                      <div>
                        <XProfileIcon name="arrowDown" />
                      </div>
                    </Fragment>
                  </button>
                  {showMicroOpt && (
                    <div className="bg-white  w-full absolute top-[64px] rounded-2xl border border-grey-4 overflow-hidden p-2 z-[100]">
                      <div className="custom-scrollbar max-h-[212px]  overflow-x-hidden ">
                        {devices?.micros?.map((micro, ind) => {
                          if (selectedDeviceId.audio.deviceId === micro?.id) {
                            return (
                              <div
                                key={`micro-device-${ind}`}
                                className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                              >
                                <p className="xl:text-p18 text-p14 truncate">
                                  {micro?.label}
                                </p>
                                <XProfileIcon name="check" />
                              </div>
                            )
                          } else {
                            return (
                              <div
                                key={`micro-device-${ind}`}
                                className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px] cursor-pointer"
                                onClick={() =>
                                  handleSelectMicroDevice(
                                    micro?.id,
                                    micro?.label
                                  )
                                }
                              >
                                <p className="xl:text-p18 text-p14">
                                  {micro?.label}
                                </p>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-p18 italic text-grey-1 mt-6">
                Đừng quên mở chặn camera trên trình duyệt nhé. Nếu gặp khó khăn
                trong quá trình cài đặt camarea, bạn có thể xem hướng dẫn{' '}
                <span
                  onClick={() => {
                    window.open(
                      'https://blog.xprofile.vn/huong-dan-cai-dat-camera-chong-gian-lan/',
                      '_blank'
                    )
                  }}
                  className="text-button-2 text-p18-bold underline not-italic cursor-pointer hover:opacity-80"
                >
                  tại đây
                </span>
              </p>
            </div>
          )}
        </div>

        <div>
          {devices?.cameras?.length === 0 && (
            <Image
              alt=""
              src="/images/exam/minh-hoa-chua-bat-cam.png"
              width={528}
              height={400}
              quality={100}
            />
          )}
          <div
            className={`flex gap-2 ${
              devices?.cameras?.length === 0 ? 'hidden' : ''
            }`}
          >
            <div className="w-full relative">
              <div className="absolute z-10 top-8 right-8">
                <XProfileIcon name="checkCameraIcon" />
              </div>
              <video
                ref={videoRef}
                autoPlay
                muted
                className="rounded-xl"
              ></video>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 items-center justify-center mt-[56px]">
        <ButtonIcon
          background="bg-transparent"
          rounded="rounded-lg border border-grey-3"
          iconName="arrowBackTest"
          title=" Trở về"
          width="w-auto"
          padding="py-3 px-8"
          height="h-[56px]"
          margin="m-0"
          onClick={() => handleChangeScreen(1)}
        />
        <Button
          title="Tiếp theo"
          margin="m-0"
          rounded="rounded-lg"
          width="w-[151px]"
          padding="py-3 px-5"
          height="h-[56px]"
          disabled={
            devices?.cameras?.length === 0 && devices?.micros?.length === 0
          }
          disableBackground="disabled:bg-grey-4"
          disableColor="text-grey-3"
          onClick={() => {
            doneSetupFrontCamera(connection)
            mediaStream.getTracks().forEach((track) => {
              track.stop()
            })
          }}
        />
      </div>
    </div>
  )
}

ScreenCameraFront.propTypes = {
  connection: PropTypes.any,
  handleChangeScreen: PropTypes.func,
  examId: PropTypes.any,
  userId: PropTypes.any,
  sessionId: PropTypes.any,
  doneSetupFrontCamera: PropTypes.func,
  tokenValidate: PropTypes.string
}

ScreenCameraFront.defaultProps = {
  handleChangeScreen: () => {},
  examId: '',
  userId: '',
  sessionId: '',
  doneSetupFrontCamera: () => {},
  tokenValidate: ''
}

export default ScreenCameraFront
