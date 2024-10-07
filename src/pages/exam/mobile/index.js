import Button from 'common/presentation/Button'
import Head from 'next/head'
import Script from 'next/script'
import { Fragment, useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const signalR = require('@microsoft/signalr')

const CAM_TYPES = [
  {
    type: 'user',
    name: 'Camera trước'
  },
  {
    type: 'environment',
    name: 'Camera sau'
  }
]
const ExamMobile = () => {
  const refCamOpt = useRef(null)
  const [cameraType, setCameraType] = useState(null)
  const [camSelectedName, setCamSelectedName] = useState('Chọn nguồn camera')
  const [checkingConnect, setCheckingConnect] = useState({
    status: false,
    error: false
  })
  const [hiddenAction, setHiddenAction] = useState(false)
  const [completeSetupCamera, setCompleteSetupCamera] = useState(false)
  const [showCamOpt, setShowCamOpt] = useState(false)

  const handleCloseCamOpt = () => {
    setShowCamOpt(false)
  }

  const startSignalRConnection = function (
    { url = null, token = null } = null
  ) {
    const con = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(url, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build()
    //============= NHẬN TỪ SERVER ===========
    con.on('connect', function (data) {
      // Khi connect thành công, trả về email của người dùng
      console.log('Connect thành công', data)
    })

    con.on('start-back-camera-session', function (data) {
      // Nhận được khi update start_session back camera thành công
      // Khi nhận được lệnh này thì mình bắt đầu validate camera, cho chọn nguồn video, audio v.v...
      console.log('Bắt đầu session camera sau', data)
      setCheckingConnect({ ...checkingConnect, status: true })

      // hideItem('button-start-checking-back-camera')
      // showItem('step-2')
      // showItem('step-1-done')
    })

    con.on('done-exam-back-camera', function (data) {
      // Nhận được khi call update done_setup camera sau thành công
      console.log('Hoàn tất setup camera sau', data)
      startPublish({
        url: data?.streamPath,
        type: data?.cameraType
      })
      // hideItem('button-done-back-camera')
      // showItem('step-2-done')
    })

    con.on('done-all', function (data) {
      console.log('done all: ', data)
      // Khi trang camera sau done setup thì sẽ nhận được lệnh này ở cả 2 trang
      // Lúc này trang chính sẽ di chuyển qua detail bài test
      // hideItem('button-start-checking-back-camera')
      // hideItem('step-1')
      // hideItem('step-2')
      // showItem('step-3')
    })

    con.on('terminate-session', function (data) {
      // Xảy ra khi:
      //   + Trang camera sau bị mất kết nối
      //   + Trang chính bị mất kết nối
      //   + Khi userId này bắt đầu session test nào khác

      // Việc cần làm trước mắt: redirect qua 1 trang nào đó báo lỗi
      alert('có session bị tắt giữa chừng')
    })
    return con
  }

  const [connection, setConnection] = useState(
    startSignalRConnection({
      url: `${process.env.NEXT_PUBLIC_API_HOST}/notificationhub`,
      token: ''
    })
  )

  const startCheckingBackCamera = function (connection) {
    const urlParams = new URLSearchParams(window.location?.search)
    const token = urlParams.get('token')
    const sessionId = urlParams.get('sessionId')
    if (token && sessionId) {
      connection.start().then(function () {
        connection.invoke('UpdateExamSession', {
          sessionId: sessionId,
          action: 'start_session',
          type: 1,
          validateToken: token
        })
      })
    } else {
      // window.location.replace('/404')
      setCheckingConnect({ ...checkingConnect, status: true })
    }
  }

  const doneSetupBackCamera = function () {
    const urlParams = new URLSearchParams(window.location?.search)
    const token = urlParams.get('token')
    const sessionId = urlParams.get('sessionId')
    connection.invoke('UpdateExamSession', {
      sessionId: sessionId,
      action: 'done_setup',
      type: 1,
      validateToken: token,
      cameraType: cameraType
    })
  }

  const startPublish = async ({ url = '', type = 'user' }) => {
    let sdk = null
    const prefixUrl = `webrtc://stream.xprofile.vn`
    const fullUrl = prefixUrl + url
    $('#rtc_media_player_mobile').hide()
    $('#rtc_media_player_mobile').show()
    // Close PC when user replay.
    if (sdk) {
      sdk.close()
    }
    sdk = new SrsRtcPublisherAsync({
      facingMode: type
    })
    // User should set the stream when publish is done, @see https://webrtc.org/getting-started/media-devices
    // However SRS SDK provides a consist API like https://webrtc.org/getting-started/remote-streams

    $('#rtc_media_player_mobile').prop('srcObject', sdk.stream)

    // Optional callback, SDK will add track to stream.
    // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

    // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/WebRTC_codecs#getting_the_supported_codecs
    sdk.pc.onicegatheringstatechange = function (event) {
      if (sdk.pc.iceGatheringState === 'complete') {
        // $('#acodecs').html(SrsRtcFormatSenders(sdk.pc.getSenders(), 'audio'))
        // $('#vcodecs').html(SrsRtcFormatSenders(sdk.pc.getSenders(), 'video'))
      }
    }

    // For example: webrtc://r.ossrs.net/live/livestream
    sdk
      .publish(fullUrl)
      .then(function (session) {
        setHiddenAction(true)
      })
      .catch(function (reason) {
        // Throw by sdk.
        if (reason instanceof SrsError) {
          if (reason.name === 'HttpsRequiredError') {
            alert(
              `WebRTC推流必须是HTTPS或者localhost：${reason.name} ${reason.message}`
            )
          } else {
            alert(`${reason.name} ${reason.message}`)
          }
        }
        // See https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#exceptions
        if (reason instanceof DOMException) {
          if (reason.name === 'NotFoundError') {
            alert(`Không tìm thấy thiết bị`)
          } else if (reason.name === 'NotAllowedError') {
            alert(`Không tìm thấy thiết bị`)
          } else if (
            [
              'AbortError',
              'NotAllowedError',
              'NotFoundError',
              'NotReadableError',
              'OverconstrainedError',
              'SecurityError',
              'TypeError'
            ].includes(reason.name)
          ) {
            alert(`getUserMedia ${reason.name} ${reason.message}`)
          }
        }

        sdk.close()
        $('#rtc_media_player_mobile').hide()
      })
  }

  const handleFinishSetupExamSession = () => {
    const urlParams = new URLSearchParams(window.location?.search)
    const sessionId = urlParams.get('sessionId')
    connection.invoke('FinishSetupExamSession', {
      sessionId: sessionId
    })
    setCompleteSetupCamera(true)
  }

  useEffect(() => {
    if (window.location?.search) {
      const urlParams = new URLSearchParams(window.location?.search)
      let sessionId = urlParams.get('sessionId')
      let token = urlParams.get('token')
      const tempConnection = startSignalRConnection({
        url: `${process.env.NEXT_PUBLIC_API_HOST}/notificationhub?sessionId=${sessionId}&token=${token}`,
        token: ''
      })
      setConnection(tempConnection)
      startCheckingBackCamera(tempConnection)
    }
  }, [])

  useOnClickOutside(refCamOpt, handleCloseCamOpt)

  if (!checkingConnect.status) {
    return <></>
  }

  if (checkingConnect.status && checkingConnect.error) {
    return (
      <div>
        <p className="text-h3 text-center">
          Có lỗi xảy ra vui lòng thử lại sau
        </p>
      </div>
    )
  }

  return (
    <div>
      <Fragment>
        <Head>
          <title>Mobile Exam</title>
        </Head>
        <Script src="/asset/js/srs.sdk.js" />

        <div className="pt-6 pb-[48px]">
          {!hiddenAction && (
            <div className="px-8">
              <div className="relative" ref={refCamOpt}>
                <button
                  className="bg-white rounded-xl  w-full flex justify-between py-3 px-4 items-center border border-grey-4"
                  onClick={() => setShowCamOpt(!showCamOpt)}
                >
                  <Fragment>
                    <p className="xl:text-p18 text-p14">{camSelectedName}</p>
                    <XProfileIcon name="arrowDown" />
                  </Fragment>
                </button>
                {showCamOpt && (
                  <div className="bg-white  w-full absolute top-[64px] rounded-2xl border border-grey-4 overflow-hidden p-2 z-[100]">
                    <div className="custom-scrollbar max-h-[212px]  overflow-x-hidden ">
                      {CAM_TYPES?.map((cam, ind) => {
                        const { type, name } = cam
                        if (type === cameraType) {
                          return (
                            <div
                              key={`camera-device-${ind}`}
                              className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                            >
                              <p className="xl:text-p18 text-p14 truncate">
                                {name}
                              </p>
                              <XProfileIcon name="check" />
                            </div>
                          )
                        } else {
                          return (
                            <div
                              key={`camera-device-${ind}`}
                              className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px] cursor-pointer"
                              onClick={() => {
                                setCameraType(type)
                                setCamSelectedName(name)
                                handleCloseCamOpt()
                              }}
                            >
                              <p className="xl:text-p18 text-p14 truncate">
                                {name}
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
          )}
          <div className={`${hiddenAction ? 'block' : 'hidden'}`}>
            <video
              id="rtc_media_player_mobile"
              muted
              autoPlay
              className="w-full"
            />
          </div>
          {!hiddenAction && (
            <Button
              title="Hoàn tất setup camera mobile"
              margin="mx-auto mt-[48px]"
              width="w-auto"
              padding="py-3 px-5"
              rounded="rounded-lg"
              disabled={!cameraType}
              onClick={() => doneSetupBackCamera()}
            />
          )}
          {hiddenAction && !completeSetupCamera && (
            <Button
              title="Hoàn tất"
              margin="mx-auto mt-[48px]"
              width="w-auto"
              padding="py-3 px-5"
              rounded="rounded-lg"
              disabled={!cameraType}
              onClick={() => handleFinishSetupExamSession()}
            />
          )}
        </div>
      </Fragment>
    </div>
  )
}

export default ExamMobile
