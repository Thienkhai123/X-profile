import Head from 'next/head'
import Script from 'next/script'
import { Fragment, useEffect } from 'react'
import $ from 'jquery'

const ReceivePage = () => {
  const initial = () => {
    /**
     * update the navigator, add same query string.
     */

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
      $('#nav_srs_chat').attr('href', 'srs_chat.html' + window.location.search)
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
      uri =
        'webrtc://d5cq0tqb4vobj.vcdn.cloud/live/phuctest?vhost=ja16ciat7dobj.vcdn.cloud&secret=f0384f09b15d56b7a2123e603c998be9&exp=1690324489'
      return uri
    }

    function srs_init_rtc(id, query) {
      update_nav()
      $(id).val(build_default_rtc_url(query))
    }

    var sdk = null // Global handler to do cleanup when replaying.
    var startPlay = function () {
      $('#rtc_media_player').show()

      // Close PC when user replay.
      if (sdk) {
        sdk.close()
      }
      sdk = new SrsRtcPlayerAsync()

      // https://webrtc.org/getting-started/remote-streams
      $('#rtc_media_player').prop('srcObject', sdk.stream)
      // Optional callback, SDK will add track to stream.
      // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

      // For example: webrtc://r.ossrs.net/live/livestream
      var url = $('#txt_url').val()
      sdk
        .play(url)
        .then(function (session) {
          $('#sessionid').html(session.sessionid)
          $('#simulator-drop').attr(
            'href',
            session.simulator + '?drop=1&username=' + session.sessionid
          )
        })
        .catch(function (reason) {
          sdk.close()
          $('#rtc_media_player').hide()
          console.error(reason)
        })
    }

    $('#rtc_media_player').hide()
    var query = parse_query_string()

    srs_init_rtc('#txt_url', query)

    $('#btn_play').click(function () {
      $('#rtc_media_player').prop('muted', false)
      startPlay()
    })

    if (query.autostart === 'true') {
      $('#rtc_media_player').prop('muted', true)
      console.warn(
        'For autostart, we should mute it, see https://www.jianshu.com/p/c3c6944eed5a ' +
          'or https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#audiovideo_elements'
      )
      window.addEventListener('load', function () {
        startPlay()
      })
    }
  }
  useEffect(() => {
    initial()
  }, [])
  return (
    <Fragment>
      <Head>
        <title>Nhận Cam</title>
      </Head>
      <Script src="/asset/js/srs.sdk.js" />
      <div>
        <div>
          <div>
            URL:
            <input
              type="text"
              id="txt_url"
              defaultValue="webrtc://d5cq0tqb4vobj.vcdn.cloud/live/phuctest?vhost=ja16ciat7dobj.vcdn.cloud&secret=f0384f09b15d56b7a2123e603c998be9&exp=1690324489"
            />
            <button
              id="btn_play"
              className="bg-button rounded-lg py-2 px-4 ml-2"
            >
              Nhận Stream
            </button>
          </div>
          <label></label>
          <video id="rtc_media_player" controls autoPlay></video>
          <label></label>
          SessionID: <span id="sessionid"></span>
          <label></label>
          Simulator:{' '}
          <a href="#" id="simulator-drop">
            Drop
          </a>
          <footer>
            <p></p>
            <p>
              <a href="https://github.com/ossrs/srs">SRS Team &copy; 2020</a>
            </p>
          </footer>
        </div>
      </div>
    </Fragment>
  )
}

export default ReceivePage
