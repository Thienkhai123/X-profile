import Button from 'common/presentation/Button'
import Head from 'next/head'
import { useState, useEffect, Fragment } from 'react'
import $ from 'jquery'
import Script from 'next/script'

// const signalR = require('@microsoft/signalr')

// const yourId = Math.floor(Math.random() * 1000000000)
// const servers = {
//   iceServers: [
//     { urls: 'stun:stun.services.mozilla.com' },

//     { urls: 'stun:stun.l.google.com:19302' }
//   ]
// }

const StartExam = (props) => {
  const { handleChangeScreen = () => {} } = props
  return (
    <div className="flex flex-col h-screen justify-center">
      <Button
        title="Bắt đầu"
        margin="mx-auto my-auto"
        padding="px-4 py-2"
        height="h-auto"
        width="w-auto"
        onClick={() => handleChangeScreen(2)}
      />
    </div>
  )
}

const CamScreen = () => {
  const enableVideoStream = async () => {
    try {
      var sdk = null // Global handler to do cleanup when republishing..
      function parse_query_string() {
        var obj = {}

        // add the uri object.
        // parse the host(hostname:http_port), pathname(dir/filename)
        obj.host = window.location.host
        obj.hostname = window.location.hostname
        obj.http_port = window.location.port == '' ? 80 : window.location.port
        obj.pathname = window.location.pathname
        if (obj.pathname.lastIndexOf('/') <= 0) {
          obj.dir = '/'
          obj.filename = ''
        } else {
          obj.dir = obj.pathname.slice(0, obj.pathname.lastIndexOf('/'))
          obj.filename = obj.pathname.slice(obj.pathname.lastIndexOf('/'))
        }

        // pure user query object.
        obj.user_query = {}

        // parse the query string.
        var query_string = String(window.location.search)
          .replace(' ', '')
          .split('?')[1]
        if (query_string === undefined) {
          query_string = String(window.location.hash)
            .replace(' ', '')
            .split('#')[1]
          if (query_string === undefined) {
            return obj
          }
        }

        __fill_query(query_string, obj)

        return obj
      }

      function update_nav() {
        $('#srs_index').attr('href', 'index.html' + window.location.search)
        $('#nav_srs_player').attr(
          'href',
          'srs_player.html' + window.location.search
        )
        $('#nav_rtc_player').attr(
          'href',
          'rtc_player.html' + window.location.search
        )
        $('#nav_rtc_publisher').attr(
          'href',
          'rtc_publisher.html' + window.location.search
        )
        $('#nav_whip').attr('href', 'whip.html' + window.location.search)
        $('#nav_whep').attr('href', 'whep.html' + window.location.search)
        $('#nav_srs_publisher').attr(
          'href',
          'srs_publisher.html' + window.location.search
        )
        $('#nav_srs_chat').attr(
          'href',
          'srs_chat.html' + window.location.search
        )
        $('#nav_srs_bwt').attr('href', 'srs_bwt.html' + window.location.search)
        $('#nav_vlc').attr('href', 'vlc.html' + window.location.search)
      }

      // Special extra params, such as auth_key.
      function user_extra_params(query, params, rtc) {
        var queries = params || []

        for (var key in query.user_query) {
          if (
            key === 'app' ||
            key === 'autostart' ||
            key === 'dir' ||
            key === 'filename' ||
            key === 'host' ||
            key === 'hostname' ||
            key === 'http_port' ||
            key === 'pathname' ||
            key === 'port' ||
            key === 'server' ||
            key === 'stream' ||
            key === 'buffer' ||
            key === 'schema' ||
            key === 'vhost' ||
            key === 'api' ||
            key === 'path'
          ) {
            continue
          }

          if (query[key]) {
            queries.push(key + '=' + query[key])
          }
        }

        return queries
      }

      function build_default_rtc_url(query) {
        // The format for query string to overwrite configs of server.
        console.log(
          '?eip=x.x.x.x to overwrite candidate. 覆盖服务器candidate(外网IP)配置'
        )
        console.log('?api=x to overwrite WebRTC API(1985).')
        console.log('?schema=http|https to overwrite WebRTC API protocol.')

        var server = !query.server ? window.location.hostname : query.server
        var vhost = !query.vhost ? window.location.hostname : query.vhost
        var app = !query.app ? 'live' : query.app
        var stream = !query.stream ? 'livestream' : query.stream
        var api = query.api ? ':' + query.api : ''

        var queries = []
        if (server !== vhost && vhost !== '__defaultVhost__') {
          queries.push('vhost=' + vhost)
        }
        if (query.schema && window.location.protocol !== query.schema + ':') {
          queries.push('schema=' + query.schema)
        }
        queries = user_extra_params(query, queries, true)

        var uri =
          'webrtc://' +
          server +
          api +
          '/' +
          app +
          '/' +
          stream +
          '?' +
          queries.join('&')
        while (uri.lastIndexOf('?') === uri.length - 1) {
          uri = uri.slice(0, uri.length - 1)
        }
        uri = `webrtc://d5cq0tqb4vobj.vcdn.cloud/live/phuctest?vhost=ja16ciat7dobj.vcdn.cloud&secret=f0384f09b15d56b7a2123e603c998be9&exp=1690324489`
        return uri
      }

      function srs_init_rtc(id, query) {
        update_nav()
        $(id).val(build_default_rtc_url(query))
      }

      var startPublish = async function ({ facingMode = 'environment' }) {
        $('#rtc_media_player').show()

        // Close PC when user replay.
        if (sdk) {
          await sdk.close()
        }
        sdk = new SrsRtcPublisherAsync({ facingMode: facingMode })

        // User should set the stream when publish is done, @see https://webrtc.org/getting-started/media-devices
        // However SRS SDK provides a consist API like https://webrtc.org/getting-started/remote-streams
        $('#rtc_media_player').prop('srcObject', sdk.stream)
        // Optional callback, SDK will add track to stream.
        // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

        // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/WebRTC_codecs#getting_the_supported_codecs
        sdk.pc.onicegatheringstatechange = function (event) {
          if (sdk.pc.iceGatheringState === 'complete') {
            $('#acodecs').html(
              SrsRtcFormatSenders(sdk.pc.getSenders(), 'audio')
            )
            $('#vcodecs').html(
              SrsRtcFormatSenders(sdk.pc.getSenders(), 'video')
            )
          }
        }

        // For example: webrtc://r.ossrs.net/live/livestream
        var url = $('#txt_url').val()
        sdk
          .publish(url)
          .then(function (session) {
            $('#sessionid').html(session.sessionid)
            $('#simulator-drop').attr(
              'href',
              session.simulator + '?drop=1&username=' + session.sessionid
            )
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
                alert(
                  `找不到麦克风和摄像头设备：getUserMedia ${reason.name} ${reason.message}`
                )
              } else if (reason.name === 'NotAllowedError') {
                alert(
                  `你禁止了网页访问摄像头和麦克风：getUserMedia ${reason.name} ${reason.message}`
                )
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
            $('#rtc_media_player').hide()
            console.error(reason)
          })
      }

      $('#rtc_media_player').hide()
      var query = parse_query_string()
      srs_init_rtc('#txt_url', query)

      $('#btn_publish').click(startPublish)
      $('#btn_publish-front-cam').click(() =>
        startPublish({
          facingMode: 'user'
        })
      )
      // Never play util windows loaded @see https://github.com/ossrs/srs/issues/2732
      if (query.autostart === 'true') {
        window.addEventListener('load', function () {
          startPublish()
        })
      }
    } catch (error) {
      console.error('Error accessing webcam', error)
    }
  }

  useEffect(() => {
    enableVideoStream()
  }, [])

  return (
    <div className="p-10">
      <div className="form-inline">
        URL:
        <input
          type="text"
          id="txt_url"
          className="input-xxlarge"
          defaultValue="webrtc://d5cq0tqb4vobj.vcdn.cloud/live/phuctest?vhost=ja16ciat7dobj.vcdn.cloud&secret=f0384f09b15d56b7a2123e603c998be9&exp=1690324489"
        />
        <button
          className="bg-button rounded-lg py-2 px-4 ml-2 sm:my-0 my-2"
          id="btn_publish"
        >
          Gửi Camera sau
        </button>
        <button
          className="bg-button rounded-lg py-2 px-4 ml-2 sm:my-0 my-2"
          id="btn_publish-front-cam"
        >
          Gửi Camera trước
        </button>
      </div>

      <div>
        <video id="rtc_media_player" width="320" autoPlay muted></video>
        <p>
          SessionID: <span id="sessionid"></span>
        </p>
        <p>
          Audio: <span id="acodecs"></span>
        </p>
        <p>
          Video: <span id="vcodecs"></span>
        </p>
        Simulator:{' '}
        <a href="#" id="simulator-drop">
          Drop
        </a>
      </div>
    </div>
  )
}

const DemoExam = () => {
  const [screen, setScreen] = useState(1)
  const handleChangeScreen = (num) => {
    setScreen(num)
  }

  return (
    <Fragment>
      <Head>
        <title>Demo Exam</title>
      </Head>
      <Script src="/asset/js/srs.sdk.js" />
      <div className="min-h-[100vh] relative flex flex-col">
        <div className="flex-1">
          {screen === 1 && (
            <StartExam handleChangeScreen={handleChangeScreen} />
          )}
          {screen === 2 && <CamScreen />}
        </div>
      </div>
    </Fragment>
  )
}

export default DemoExam
