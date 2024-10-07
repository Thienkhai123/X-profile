import axios from 'axios'
import { api } from 'common/config'
import {
  ACCESS_TOKEN,
  ROLE_STORAGE,
  SURVEY_STORAGE
} from 'common/config/app.constants'
import { authService } from './authService'

export const loginAfterSignup = async (email, password) => {
  try {
    const response = await axios.post(api.AUTH.LOGIN, {
      email: email,
      password: password
    })
    if (response.data) {
      const role = localStorage.getItem(ROLE_STORAGE)
      const survey = JSON.parse(localStorage.getItem(SURVEY_STORAGE))
      if (role) {
        await axios.post(
          api.HOME.PICK_CHARACTER,
          { characterId: parseInt(role) },
          {
            headers: {
              Authorization: `Basic ${response.data.data.renewToken}`
            }
          }
        )
      }
      if (survey) {
        await axios.post(api.SURVEY.POST_SURVEY, survey, {
          headers: {
            Authorization: `Basic ${response.data.data.renewToken}`
          }
        })
      }
      localStorage.removeItem(ROLE_STORAGE)
      localStorage.removeItem(SURVEY_STORAGE)
      localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
      window.location.replace('/')
    }
    return response
  } catch (err) {
    return err.response
  }
}

export const uploadImage = async (file, maxWidth, folder = 'Avatar') => {
  try {
    const formData = new FormData()
    formData.append('File', file)
    if (maxWidth) {
      formData.append('MaxWidth', maxWidth)
      formData.append('Folder', folder)
    }
    const { data } = await axios.post(api.HELPER.UPLOAD_IMAGE, formData, {
      headers: {
        Authorization: `Bearer ${authService.getAccessToken()}`
      }
    })

    return data
  } catch (err) {}
}
export const convertToWebp = async (file, folder = '') => {
  if (!file) {
    return
  }
  return new Promise(function (resolve, reject) {
    let rawImage = new Image()

    rawImage.addEventListener('load', function () {
      resolve(rawImage)
    })

    rawImage.src = URL.createObjectURL(file)
  })
    .then(function (rawImage) {
      return new Promise(function (resolve, reject) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        canvas.width = rawImage.width
        canvas.height = rawImage.height
        ctx.drawImage(rawImage, 0, 0)

        canvas.toBlob(function (blob) {
          resolve(blob)
        }, 'image/webp')
      })
    })
    .then(async function (blob) {
      const fileData = new File([blob], `${file.name}.webp`)
      const url = await getPresignedUrl(fileData, folder)
      return url
    })
}

export const convertToWebpAxios = async (file, folder = '') => {
  if (!file) {
    return
  }
  return new Promise(function (resolve, reject) {
    let rawImage = new Image()

    rawImage.addEventListener('load', function () {
      resolve(rawImage)
    })

    rawImage.src = URL.createObjectURL(file)
  })
    .then(function (rawImage) {
      return new Promise(function (resolve, reject) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        canvas.width = rawImage.width
        canvas.height = rawImage.height
        ctx.drawImage(rawImage, 0, 0)

        canvas.toBlob(function (blob) {
          resolve(blob)
        }, 'image/webp')
      })
    })
    .then(async function (blob) {
      const fileData = new File([blob], `${file.name}.webp`)
      const url = await getPresignedUrlByAxios(fileData, folder)
      return url
    })
}

export const getPresignedUrl = async (file, folder = '') => {
  try {
    const { data } = await axios.get(
      `${
        api.HELPER.GETPRESIGNEDURL
      }?filename=${file.name.toString()}&folder=${folder}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getAccessToken()}`
        }
      }
    )
    const { uploadUrl, url } = data.data || {}
    if (uploadUrl) {
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
      })
    }
    return url
  } catch (err) {}
}

export const getPresignedUrlByAxios = async (
  file,
  folder = '',
  uploadPersent = () => {},
  persent = 0
) => {
  try {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    })
    const { data } = await axios.get(
      `${
        api.HELPER.GETPRESIGNEDURL
      }?filename=${file.name.toString()}&folder=${folder}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getAccessToken()}`,
          'Content-Type': 'application/octet-stream'
        }
      }
    )
    const { uploadUrl, url } = data.data || {}
    if (uploadUrl) {
      await instance({
        url: uploadUrl,
        method: 'put',
        data: file,
        onUploadProgress: (pevt) => {
          // console.log(
          //   'uploaded.:' + Math.round((pevt.loaded / pevt.total) * 100)
          // )
          persent = Math.round((pevt.loaded / pevt.total) * 100)
          uploadPersent(Math.round((pevt.loaded / pevt.total) * 100))
        }
      })
      return { url, persent }
    }
  } catch (err) {}
}

export const getPresignedUrlByAxiosProgress = async (
  file,
  folder = '',
  updateProgress = () => {}
) => {
  try {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    })
    const { data } = await axios.get(
      `${
        api.HELPER.GETPRESIGNEDURL
      }?filename=${file.name.toString()}&folder=${folder}`,
      {
        headers: {
          Authorization: `Bearer ${authService.getAccessToken()}`,
          'Content-Type': 'application/octet-stream'
        }
      }
    )
    const { uploadUrl, url } = data.data || {}
    if (uploadUrl) {
      await instance({
        url: uploadUrl,
        method: 'put',
        data: file,
        onUploadProgress: (pevt) => {
          updateProgress(Math.round((pevt.loaded / pevt.total) * 100))
        }
      })
      return url
    }
  } catch (err) {}
}

export const uploadFile = async (file, maxWidth, folder = 'Avatar') => {
  try {
    const formData = new FormData()
    formData.append('File', file)
    if (maxWidth) {
      formData.append('MaxWidth', maxWidth)
      formData.append('Folder', folder)
    }
    const { data } = await axios.post(api.HELPER.UPLOAD_FILE, formData, {
      headers: {
        Authorization: `Bearer ${authService.getAccessToken()}`
      }
    })

    return data
  } catch (err) {}
}

export const uploadImagePresignUrl = async (
  file,
  type = 'webp',
  folder = ''
) => {
  if (!file) {
    return
  }
  return new Promise(function (resolve, reject) {
    let rawImage = new Image()

    rawImage.addEventListener('load', function () {
      resolve(rawImage)
    })

    rawImage.src = URL.createObjectURL(file)
  })
    .then(function (rawImage) {
      return new Promise(function (resolve, reject) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        canvas.width = rawImage.width
        canvas.height = rawImage.height
        ctx.drawImage(rawImage, 0, 0)

        canvas.toBlob(function (blob) {
          resolve(blob)
        }, 'image/webp')
      })
    })
    .then(async function (blob) {
      const fileData = new File([blob], `${file.name}.${type}`)
      const url = await getPresignedUrl(fileData, folder)
      return url
    })
}
export const generateVideoThumbnail = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')

    // this is important
    video.autoplay = true
    video.muted = true
    video.src = URL.createObjectURL(file)

    video.onloadeddata = () => {
      let ctx = canvas.getContext('2d')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      video.pause()
      return resolve(canvas.toDataURL('image/png'))
    }
  })
}
export const reduceImageThumbnail = async (file, folder = '') => {
  if (!file) {
    return
  }
  return new Promise(function (resolve, reject) {
    let rawImage = new Image()

    rawImage.addEventListener('load', function () {
      resolve(rawImage)
    })

    rawImage.src = URL.createObjectURL(file)
  })
    .then(function (rawImage) {
      return new Promise(function (resolve, reject) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        const width = Math.min(800, rawImage.width)
        const scaleFactor = width / rawImage.width
        canvas.width = width
        canvas.height = rawImage.height * scaleFactor
        ctx.drawImage(rawImage, 0, 0, width, rawImage.height * scaleFactor)

        canvas.toBlob(function (blob) {
          resolve(blob)
        }, 'image/webp')
      })
    })
    .then(async function (blob) {
      const fileData = new File([blob], `${file.name}.webp`)
      const url = await getPresignedUrl(fileData, folder)
      return url
    })
}
export const supportsVideoType = (type) => {
  // Allow user to create shortcuts, i.e. just "webm"
  const formats = {
    ogg: 'video/ogg; codecs="theora"',
    h264: 'video/mp4; codecs="avc1.42E01E"',
    h265: 'video/mp4; codecs="hev1"'
    // webm: 'video/webm; codecs="vp8, vorbis"',
    // vp9: 'video/webm; codecs="vp9"',
    // hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
  }

  const video = document.createElement('video')
  return video.canPlayType(formats[type] || type)
}
