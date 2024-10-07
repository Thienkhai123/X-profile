import ButtonIcon from 'common/presentation/ButtonIcon'
import LoadingConfirmCameraRear from '../LoadingConfirmCameraRear'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { useEffect, useState } from 'react'
import $ from 'jquery'

const ScreenRearCamera = ({
  frontStreamPath = '',
  backStreamPath = '',
  handleChangeScreen = () => {},
  setStep = () => {},
  examTitle
}) => {
  const [status, setStatus] = useState({
    isConnectedStreamFront: false,
    isConnectedStreamBack: false
  })
  const initialStreamCameraFront = () => {
    let sdkFront = null // Global handler to do cleanup when replaying.
    try {
      let startPlayFront = function () {
        const prefixUrl = `webrtc://stream.xprofile.vn`
        const fullUrl = prefixUrl + frontStreamPath
        $('#rtc_media_player_front').show()
        // Close PC when user replay.
        if (sdkFront) {
          sdkFront.close()
        }
        sdkFront = new SrsRtcPlayerAsync()

        // https://webrtc.org/getting-started/remote-streams
        $('#rtc_media_player_front').prop('srcObject', sdkFront.stream)

        // Optional callback, SDK will add track to stream.
        // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

        // For example: webrtc://r.ossrs.net/live/livestream
        sdkFront
          .play(fullUrl)
          .then(function (session) {
            // $('#sessionid').html(session.sessionid)
            // $('#simulator-drop').attr(
            //   'href',
            //   session.simulator + '?drop=1&username=' + session.sessionid
            // )
          })
          .catch(function (reason) {
            sdkFront.close()
            $('#rtc_media_player_front').hide()
            console.error(reason)
          })
      }

      $('#rtc_media_player_front').hide()
      // let query = parse_query_string()
      startPlayFront()
    } catch (err) {
      alert(err)
    }
  }

  const initialStreamCameraRear = () => {
    let sdkBack = null // Global handler to do cleanup when replaying.
    try {
      let startPlay = function () {
        const prefixUrl = `webrtc://stream.xprofile.vn`
        const fullUrl = prefixUrl + backStreamPath
        $('#rtc_media_player').show()
        // Close PC when user replay.
        if (sdkBack) {
          sdkBack.close()
        }
        sdkBack = new SrsRtcPlayerAsync()

        // https://webrtc.org/getting-started/remote-streams
        $('#rtc_media_player').prop('srcObject', sdkBack.stream)

        // Optional callback, SDK will add track to stream.
        // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

        // For example: webrtc://r.ossrs.net/live/livestream
        sdkBack
          .play(fullUrl)
          .then(function (session) {
            // $('#sessionid').html(session.sessionid)
            // $('#simulator-drop').attr(
            //   'href',
            //   session.simulator + '?drop=1&username=' + session.sessionid
            // )
            setStatus({
              ...status,
              isConnectedStreamBack: true
            })
          })
          .catch(function (reason) {
            sdkBack.close()
            $('#rtc_media_player').hide()
            alert(reason)
          })
      }

      $('#rtc_media_player').hide()
      // let query = parse_query_string()
      startPlay()
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    initialStreamCameraFront()
    initialStreamCameraRear()
  }, [frontStreamPath, backStreamPath])

  return (
    <div>
      <p className="text-h3 text-neutral mb-8">{examTitle}</p>
      <div className="grid grid-cols-[45%_45%] justify-between">
        <div>
          <p className="text-h4 mb-4">Bước 2: Cài đặt camera trên điện thoại</p>
          <p className="text-p18 text-neutral mb-10">
            Quét mã vạch bằng thiết bị di động của bạn, sau đó một được link sẽ
            được hiển thị. Mở đường link bằng trình duyệt trên điện thoại của
            bạn và để thiết bị đó ở bên cạnh mình như một góc quay thứ hai
          </p>
          {!frontStreamPath && !backStreamPath && (
            <div className="rounded-2xl border border-grey-4 py-6 px-8 flex justify-between">
              <p className="text-p18 text-neutral">Đang chờ quét..</p>
              <div className="w-8 h-8">
                <LoadingConfirmCameraRear />
              </div>
            </div>
          )}
          {frontStreamPath && backStreamPath && (
            <div className="rounded-2xl border border-grey-4 py-6 px-8 flex justify-between">
              <p className="text-p18 text-semantic-green">Đã kết nối</p>
              <div className="w-8 h-8">
                <XProfileIcon name="unread" />
              </div>
            </div>
          )}
        </div>

        <div>
          {!frontStreamPath && !backStreamPath && <canvas id="qrCode"></canvas>}
          <div
            className={`${
              frontStreamPath && backStreamPath ? 'block' : 'hidden'
            } grid grid-cols-[49%_49%] justify-between`}
          >
            <video
              id="rtc_media_player_front"
              muted
              autoPlay
              className="w-full h-[325px] bg-neutral"
            />
            <video
              id="rtc_media_player"
              muted
              autoPlay
              className="w-full h-[325px] bg-neutral"
            />
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
          disabled={!status.isConnectedStreamBack}
          disableBackground="disabled:bg-grey-4"
          disableColor="text-grey-3"
          onClick={() => setStep(3)}
        />
      </div>
    </div>
  )
}

export default ScreenRearCamera
