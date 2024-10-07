import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import $ from 'jquery'
import ScreenCameraFront from './ScreenFrontCamera'
import ScreenRearCamera from './ScreenRearCamera'
import ScreenExamination from './ScreenExamination'
import { useRouter } from 'next/router'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
const signalR = require('@microsoft/signalr')
const QRCode = require('qrcode')

const ExamScreenCheckCamera = (props) => {
  const { handleChangeScreen, token, examTitle } = props
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { examId } = router.query
  const [modalLostConnection, toggleModalLostConnection] = useModal()
  const [urlStream, setUrlStream] = useState({
    frontStreamPath: '',
    backStreamPath: ''
  })
  const [sessionId, setSessionId] = useState(null)
  const [checkingConnect, setCheckingConnect] = useState({
    status: false,
    error: false
  })

  const [selectedDeviceId, setSelectedDeviceId] = useState({
    video: {
      deviceId: null,
      label: ''
    },
    audio: {
      deviceId: null,
      label: ''
    }
  })

  const returnStartExamPage = () => {
    window.location.replace(`/exam/${examId}`)
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
      // console.log('Connect thành công', data)
    })

    con.on('start-exam-session', function (data) {
      // Khi invoke StartExamSession thành công thì sẽ trả về sessionId
      // Lưu cái sessionId này lại để process tiếp các data sau
      // Khi nhận được lệnh này thì mình bắt đầu validate camera, cho chọn nguồn video, audio v.v...
      // console.log('Bắt đầu session', data)
      if (data?.sessionId) {
        setSessionId(data.sessionId)
        setCheckingConnect({ ...checkingConnect, status: true })
      }
    })

    con.on('done-exam-front-camera', function (data) {
      // Khi done setup camera chính, server sẽ trả về token để đưa vào link cho camera sau
      // Lúc này generate ra QR code để điện thoại quét
      // console.log('Hoàn tất setup camera trước', data)
      if (data?.token) {
        startPublish({
          deviceId: selectedDeviceId.video.deviceId,
          token: data?.token,
          url: data?.streamPath
        })
        let url = `${process.env.NEXT_PUBLIC_HOST_URL}exam/mobile?sessionId=${data?.sessionId}&token=${data.token}`
        const canvas = document.getElementById('qrCode')
        const qrOptions = {
          width: 400,
          height: 400
        }
        // console.log(url)

        QRCode.toCanvas(canvas, url, qrOptions, function (error) {
          if (error) console.error(error)
          console.log('success!')
        })
        setStep(2)
      }
    })

    con.on('done-all', function (data) {
      // console.log('done-alllll: ', data)
      // Khi trang camera sau done setup thì sẽ nhận được lệnh này ở cả 2 trang
      // Lúc này trang chính sẽ di chuyển qua detail bài test
    })

    con.on('finish-setup-exam-session', function (data) {
      // console.log('finish-setup-exam-session: ', data)
      setUrlStream({ ...data })
      // Khi trang camera sau done setup thì sẽ nhận được lệnh này ở cả 2 trang
      // Lúc này trang chính sẽ di chuyển qua detail bài test
    })

    con.on('terminate-session', function (data) {
      // Xảy ra khi:
      //   + Trang camera sau bị mất kết nối
      //   + Trang chính bị mất kết nối
      //   + Khi userId này bắt đầu session test nào khác

      // Việc cần làm trước mắt: redirect qua 1 trang nào đó báo lỗi
      toggleModalLostConnection()
      // if (examId) {
      //   window.location.replace(`/exam/${examId}`)
      // }
    })
    return con
  }

  const [connection, setConnection] = useState(
    startSignalRConnection({
      url: `${process.env.NEXT_PUBLIC_API_HOST}/notificationhub`,
      token: token
    })
  )

  const startExamSession = async function () {
    try {
      await connection.start()
      connection.invoke('StartExamSession')
    } catch (err) {
      setCheckingConnect({
        ...checkingConnect,
        error: true
      })
      return console.error(err.toString())
    }
  }

  const doneSetupFrontCamera = async function (connection) {
    try {
      await connection.invoke('UpdateExamSession', {
        sessionId: sessionId,
        action: 'done_setup',
        type: 0
      })
    } catch (err) {
      console.log(err)
    }
  }
  const startPublish = async ({
    facingMode = 'user',
    deviceId = '',
    url = ''
  }) => {
    let sdk = null
    const prefixUrl = `webrtc://stream.xprofile.vn`
    const fullUrl = prefixUrl + url
    // console.log('fullUrl: ', fullUrl)
    // $('#rtc_media_player').show()

    // Close PC when user replay.
    if (sdk) {
      await sdk.close()
    }
    sdk = new SrsRtcPublisherAsync({
      facingMode: facingMode,
      deviceId: deviceId
    })

    // User should set the stream when publish is done, @see https://webrtc.org/getting-started/media-devices
    // However SRS SDK provides a consist API like https://webrtc.org/getting-started/remote-streams
    // $('#rtc_media_player').prop('srcObject', sdk.stream)
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
        $('#sessionid').html(session.sessionid)
        // $('#simulator-drop').attr(
        //   'href',
        //   session.simulator + '?drop=1&username=' + session.sessionid
        // )
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
        // $('#rtc_media_player').hide()
        console.error(reason)
      })
  }

  useEffect(() => {
    startExamSession()
    return () => {}
  }, [])

  if (!checkingConnect.status) {
    return <LoadingRole />
  }

  if (checkingConnect.status && checkingConnect.error) {
    return (
      <div className="pt-10">
        <p className="text-h3 text-center">
          Có lỗi xảy ra vui lòng thử lại sau
        </p>
      </div>
    )
  }

  return (
    <>
      <Modal
        open={modalLostConnection}
        hiddenCancel={true}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-[40px] bg-white rounded-[16px]"
      >
        <div>
          <div className="flex justify-center relative">
            <Image
              alt="lost-connection"
              src="/images/exam/lost-connection.png"
              width={88}
              height={88}
              quality={100}
            />
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={returnStartExamPage}
            >
              <XProfileIcon name="cancel" width="14" height="14" />
            </div>
          </div>
          <p className="mt-6 text-h4 text-center">Camera bị ngắt kết nối!</p>
          <p className="text-p18 text-grey-1 mt-2 text-center">
            Rất tiếc, bài thi của bạn đã bị tạm dừng do xảy ra lỗi trong quá
            trình thi.
          </p>
          <Button
            title="Trở về trang chủ"
            width="w-auto"
            padding="py-3 px-8"
            margin="mt-10 mx-auto"
            rounded="rounded-lg"
            onClick={returnStartExamPage}
          />
        </div>
      </Modal>
      {step === 1 && (
        <div className="xl:max-w-[1134px] w-[90%] pt-10 mx-auto">
          <ScreenCameraFront
            examTitle={examTitle || '[Tên_Bài_Thi]'}
            connection={connection}
            handleChangeScreen={handleChangeScreen}
            doneSetupFrontCamera={doneSetupFrontCamera}
            selectedDeviceId={selectedDeviceId}
            setSelectedDeviceId={setSelectedDeviceId}
          />
        </div>
      )}
      <div
        className={`${
          step === 2
            ? 'block xl:max-w-[1134px] w-[90%] pt-10 mx-auto'
            : 'hidden'
        }`}
      >
        <ScreenRearCamera
          {...urlStream}
          examTitle={examTitle || '[Tên_Bài_Thi]'}
          handleChangeScreen={handleChangeScreen}
          setStep={setStep}
        />
      </div>
      {step === 3 && <ScreenExamination />}
    </>
  )
}

ExamScreenCheckCamera.propTypes = {
  handleChangeScreen: PropTypes.func,
  token: PropTypes.string,
  userId: PropTypes.any
}

ExamScreenCheckCamera.defaultProps = {
  handleChangeScreen: () => {},
  token: '',
  userId: null
}

export default ExamScreenCheckCamera
