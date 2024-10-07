import { REGEXSPECIAL } from 'common/config/app.constants'

export const debounce = (callback, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      callback.apply(this, args)
    }, wait)
  }
}

export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      )
    })
  } else {
    const value = data == null ? '' : data
    formData.append(parentKey, value)
  }
}

export function jsonToFormData(data) {
  const formData = new FormData()
  buildFormData(formData, data)
  return formData
}

export const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key])
    return formData
  }, new FormData())

export const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
]

export const removeAccents = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

export const urlToFile = async (url) => {
  const filename = `${Date.now().toString()}.png`
  const type = 'image/png'
  return fetch(url, { mode: 'no-cors' })
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type }))
}

export const secondsToHms = (second) => {
  if (second === 0) {
    return second + ' giây'
  } else {
    second = Number(second)

    const h = Math.floor(second / 3600)
    const m = Math.floor((second % 3600) / 60)
    const s = Math.floor((second % 3600) % 60)

    const hDisplay = h > 0 ? h + (h === 1 ? ' giờ ' : ' giờ, ') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? ' phút ' : ' phút ') : ''
    const sDisplay = s > 0 ? s + (s === 1 ? ' giây' : ' giây') : ''

    return hDisplay + mDisplay + sDisplay
  }
}

export const secondsToHmsCourse = (second) => {
  if (second === 0) {
    return second + ' giây'
  } else {
    second = Number(second)

    const h = Math.floor(second / 3600)
    const m = Math.floor((second % 3600) / 60)
    const s = Math.floor((second % 3600) % 60)

    const hDisplay = h > 0 ? h + (h === 1 ? ' giờ ' : ' giờ ') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? ' phút ' : ' phút ') : ''
    const sDisplay = s > 0 ? s + (s === 1 ? ' giây' : ' giây') : ''

    return hDisplay + mDisplay + sDisplay
  }
}

export const secondsToHmsVideo = (second) => {
  if (second === 0) {
    return second + ' giây'
  } else {
    second = Number(second)

    const h = Math.floor(second / 3600)
    const m = Math.floor((second % 3600) / 60)
    const s = Math.floor((second % 3600) % 60)
    if (h === 0 && m === 0) {
      const sDisplay = s > 0 ? s + (s === 1 ? 's' : 's') : ''
      return sDisplay
    }
    const hDisplay = h > 0 ? h + (h === 1 ? ':' : ':') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? ':' : ':') : '00:'
    const sDisplay =
      s > 0
        ? s === 1
          ? '0' + s + (s === 1 ? '' : '')
          : s + (s === 1 ? '' : '')
        : '00'
    return hDisplay + mDisplay + sDisplay
  }
}
export const secondsToHmsFormatSimple = (second) => {
  if (second === 0) {
    return second + 's'
  } else {
    second = Number(second)

    const h = Math.floor(second / 3600)
    const m = Math.floor((second % 3600) / 60)
    const s = Math.floor((second % 3600) % 60)

    const hDisplay = h > 0 ? h + (h === 1 ? 'h' : 'h') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? 'p' : 'p') : ''
    const sDisplay = s > 0 ? s + (s === 1 ? 's' : 's') : ''

    return hDisplay + mDisplay + sDisplay
  }
}

export const getCodeYoutube = (value) => {
  const REGEX = /v=(\w+)/
  const res = value.match(REGEX)
  if (res) return res[1]
  else return null
}

export const convertCurrency = (value, spacing = true) => {
  const maxval = 100000000
  const million = 1000000
  if (spacing) {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + 'M'
    }
    return value?.toLocaleString() + ' đ'
  } else {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + ' M'
    }
    return value?.toLocaleString() + 'đ'
  }
}

export const convertRegisterCourse = (value, spacing = true) => {
  const maxval = 100000000
  const million = 1000000
  if (spacing) {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString()
    }
    return value?.toLocaleString()
  } else {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString()
    }
    return value?.toLocaleString()
  }
}

export const convertCurrencyPayment = (value, spacing = true) => {
  const maxval = 100000000
  const million = 1000000
  if (spacing) {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + 'M'
    }
    return value?.toLocaleString() + ' VNĐ'
  } else {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + ' M'
    }
    return value?.toLocaleString() + ' VNĐ'
  }
}
export const convertCurrencyCompanyChart = (value, spacing = true) => {
  const maxval = 100000000
  const million = 1000000
  if (spacing) {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + 'M'
    }
    return value?.toLocaleString()
  } else {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + 'M'
    }
    return value?.toLocaleString()
  }
}
export const convertVietNamCurrency = (value, spacing = true) => {
  const maxval = 100000000
  const million = 1000000
  if (spacing) {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + 'triệu'
    }
    return value?.toLocaleString() + ' đ'
  } else {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + ' triệu'
    }
    return value?.toLocaleString() + 'đ'
  }
}

export const getDaysAgo = (date = new Date()) => {
  const nowDate = new Date()
  let Difference_In_Time = nowDate.getTime() - date.getTime()
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
  return Math.floor(Difference_In_Days)
}

export const handleValidate = (
  val = '',
  validationIds = [],
  setValue = () => {}
) => {
  if (val.trim() === '') {
    setValue([])
    return
  }
  const ids = [...validationIds]
  const regexNumber = /\d/
  if (val.toUpperCase() !== val) {
    if (!ids.includes(0)) {
      ids.push(0)
    }
  } else {
    let index = ids.indexOf(0)
    if (index !== -1) {
      ids.splice(index, 1)
    }
  }
  if (val.toLowerCase() !== val) {
    if (!ids.includes(1)) {
      ids.push(1)
    }
  } else {
    let index = ids.indexOf(1)
    if (index !== -1) {
      ids.splice(index, 1)
    }
  }
  if (REGEXSPECIAL.test(val)) {
    if (!ids.includes(2)) {
      ids.push(2)
    }
  } else {
    let index = ids.indexOf(2)
    if (index !== -1) {
      ids.splice(index, 1)
    }
  }
  if (regexNumber.test(val)) {
    if (!ids.includes(3)) {
      ids.push(3)
    }
  } else {
    let index = ids.indexOf(3)
    if (index !== -1) {
      ids.splice(index, 1)
    }
  }
  if (val.length >= 8) {
    if (!ids.includes(4)) {
      ids.push(4)
    }
  } else {
    let index = ids.indexOf(4)
    if (index !== -1) {
      ids.splice(index, 1)
    }
  }
  setValue(ids)
  return
}

export const calculateDiscount = (price = 0, basePrice = 0) => {
  return '-' + Math.round(100 - (100 * price) / basePrice).toFixed(2) + '%'
}

export const calculateDiscountNoDecimal = (price = 0, basePrice = 0) => {
  return '-' + Math.round(100 - (100 * price) / basePrice).toFixed(0) + '%'
}

export const calculateDiscountPayment = (price = 0, basePrice = 0) => {
  return Math.round(100 - (100 * price) / basePrice).toFixed(0)
}

const dynamicAnimation = (name, rules) => {
  let styleSheet = null
  if (!styleSheet) {
    styleSheet = document.createElement('style')
    styleSheet.type = 'text/css'
    document.head.appendChild(styleSheet)
  }

  styleSheet.sheet.insertRule(`@keyframes ${name} ${rules}`, styleSheet.length)
}

export const generateAnimate = (id, name, rules) => {
  dynamicAnimation(name, rules)
  document.getElementById(id.toString()).style.animation = ''
  document.getElementById(
    id.toString()
  ).style.animation = `${name} 0.2s forwards`
}

export const calculateSurveyColor = (role, position) => {
  const pink = '#E29D98'
  const yellow = '#ECB14E'
  const blue = '#1C3074'
  if (role === 1) {
    if (position % 3 === 0) return blue
    if (position % 3 === 1) return pink
    if (position % 3 === 2) return yellow
  } else {
    if (position % 3 === 0) return pink
    if (position % 3 === 1) return yellow
    if (position % 3 === 2) return blue
  }
}

export const formatSalaryFromTo = (salaryFrom, salaryTo) => {
  // return salaryFrom / 1000000 + ' - ' + salaryTo.toLocaleString() + ' đ'
  return salaryFrom.toLocaleString() + ' - ' + salaryTo.toLocaleString() + ' đ'
}

export const getPositionById = (ids, key) => {
  const arr = []
  ids.map((id) =>
    arr.push(
      document?.getElementById(key + id)?.getBoundingClientRect()?.top || 0
    )
  )
  return arr
}
export const displayStatusColorPointType = (status) => {
  let res = 'text-black'
  switch (status) {
    case 'plus':
      return (res = 'text-semantic-text-link')
      break
    case 'minus':
      return (res = 'text-semantic-red')
      break
    default:
      return res
      break
  }
}

export const getPositionOffsetById = (length, key) => {
  const arr = [...Array(length)]?.map((el, ind) => {
    return { id: ind, name: `${key}-${ind}` }
  })
  return arr
}

export const distanceYear = (year) => {
  const now = new Date()
  const target = new Date(year)
  return now.getFullYear() - target.getFullYear()
}

export const scrollToId = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}

export const scrollToIdInElement = (parentId) => {
  let parent = document.getElementById(parentId)
  parent.scrollTop = parent.scrollHeight
}

export const chooseIdOnScrollPosition = async (
  scrollPosition,
  setChooseSideMenuId = () => {},
  updateStickyBar = () => {},
  showStickyBar,
  chooseSideMenuId
) => {
  const standardDeviation = 1

  if (
    scrollPosition <
    document.getElementById('block-4')?.offsetTop - standardDeviation
  ) {
    if (showStickyBar) {
      updateStickyBar(false)
    }
    if (chooseSideMenuId !== 4) {
      setChooseSideMenuId(4)
    }
  } else if (
    scrollPosition <
    document.getElementById('block-0')?.offsetTop - standardDeviation
  ) {
    if (chooseSideMenuId !== 4) {
      setChooseSideMenuId(4)
    }
    if (
      scrollPosition >=
      document.getElementById('block-4')?.offsetTop - standardDeviation
    ) {
      if (!showStickyBar) {
        updateStickyBar(true)
      }
    }
  } else if (
    scrollPosition >=
      document.getElementById('block-0')?.offsetTop - standardDeviation &&
    scrollPosition <
      document.getElementById('block-1')?.offsetTop - standardDeviation
  ) {
    if (chooseSideMenuId !== 0) {
      setChooseSideMenuId(0)
    }
    if (!showStickyBar) {
      updateStickyBar(true)
    }
  } else if (
    scrollPosition >=
      document.getElementById('block-1')?.offsetTop - standardDeviation &&
    scrollPosition <
      document.getElementById('block-2')?.offsetTop - standardDeviation
  ) {
    if (chooseSideMenuId !== 1) {
      setChooseSideMenuId(1)
    }
    if (!showStickyBar) {
      updateStickyBar(true)
    }
  } else if (
    scrollPosition >=
      document.getElementById('block-2')?.offsetTop - standardDeviation &&
    scrollPosition <
      document.getElementById('block-3')?.offsetTop - standardDeviation
  ) {
    if (chooseSideMenuId !== 2) {
      setChooseSideMenuId(2)
    }
    if (!showStickyBar) {
      updateStickyBar(true)
    }
  } else if (
    scrollPosition >=
    document.getElementById('block-2')?.offsetTop - standardDeviation
  ) {
    if (chooseSideMenuId !== 2) {
      setChooseSideMenuId(2)
    }
    if (!showStickyBar) {
      updateStickyBar(true)
    }
  }
}

export const chooseIdCompany = (
  scrollPosition,
  blocksY = [],
  setChooseSideMenuId = () => {},
  chooseSideMenuId
) => {
  const firstElPos = document.getElementById(blocksY[0]?.name)?.offsetTop || 0
  const lastId = blocksY[blocksY.length - 1]?.id
  const lastElPos =
    document.getElementById(blocksY[blocksY.length - 1]?.name)?.offsetTop || 0
  const standardDeviation = 1
  if (scrollPosition >= firstElPos) {
    blocksY?.map((block, ind) => {
      if (scrollPosition >= lastElPos - standardDeviation) {
        if (chooseSideMenuId !== lastId) {
          setChooseSideMenuId(lastId)
          return
        }
      } else {
        const currentElPos =
          document.getElementById(block?.name)?.offsetTop || 0
        const nextElPos =
          document.getElementById(blocksY[ind + 1]?.name)?.offsetTop || 0
        if (
          scrollPosition >= currentElPos - standardDeviation &&
          scrollPosition < nextElPos - standardDeviation
        ) {
          if (chooseSideMenuId !== block?.id) {
            setChooseSideMenuId(block?.id)
            return
          }
        }
      }
    })
  } else {
    if (chooseSideMenuId !== blocksY[0]?.id) {
      setChooseSideMenuId(blocksY[0]?.id)
    }
  }
}

export const styleOfJob = (type) => {
  if (type === 1) return '#EC4E4E'
  if (type === 3) return '#317AE8'
  else return '#208D45'
}

export const addChildrenToParentTemplate = (parents) => {
  let tempValues = []
  parents.forEach((item1) => {
    let tempItem1 = { ...item1, children: {} }
    parents.forEach((item2) => {
      if (item2.parentId === item1.templateOptionId) {
        tempItem1.children[item2.templateOptionKey] = item2
      }
    })
    if (tempItem1.parentId === null) {
      tempValues.push(tempItem1)
    }
  })
  return tempValues
}

export const addChildrenToExistParentTemplate = (parents) => {
  let tempValues = []
  parents.forEach((item1) => {
    let tempItem1 = { ...item1, children: {} }
    parents.forEach((item2) => {
      if (item2.parentId === item1.templateOptionValueId) {
        const { group } = item2
        let tempItem2 = {}
        tempItem2[item2.templateOptionName] = item2

        if (!tempItem1?.children[group]) {
          tempItem1.children[group] = tempItem2
        } else {
          tempItem1.children[group] = {
            ...tempItem1.children[group],
            ...tempItem2
          }
        }
      }
    })
    if (tempItem1.parentId === null) {
      tempValues.push(tempItem1)
    }
  })
  if (Object.keys(tempValues).length > 0) {
    return tempValues
  } else {
    return {}
  }
}

export const getClickableLink = (link) => {
  return link.startsWith('http://') || link.startsWith('https://')
    ? link
    : `http://${link}`
}

export const getPositionSticky = (id = '') => {
  if (typeof window !== 'undefined') {
    let viewportHeight = window.innerHeight //viewport height
    let contentHeight = document
      .getElementById(id)
      ?.getBoundingClientRect()?.height // current content height
    return viewportHeight - contentHeight
  } else {
    return '0px'
  }
}

export function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + '</a>'
  })
}

export const getPercentage = (point = 0, maxPoint = 0) => {
  if (maxPoint === 0) {
    return 0
  }
  return Math.floor((point / maxPoint) * 100)
}

export function calculateTotalPriceByDay(price1Day, price7Day, totalDay) {
  if (totalDay <= 0) {
    return 0
  }
  let result =
    totalDay <= 7 ? price7Day : +price7Day + +((totalDay - 7) * price1Day)
  return result
}

export function calculateTotalPriceByPushDay(
  price1Day,
  totalDay,
  totalPushDay
) {
  if (isNaN(totalPushDay)) {
    return 0
  }
  if (totalPushDay <= 0) {
    return 0
  }
  let result =
    ((totalPushDay <= totalDay ? +totalPushDay : +totalDay) * price1Day * 40) /
    100
  return result
}

export function calculateTotalPriceByPushTime(
  price1Day,
  totalPushTime,
  totalMinutes
) {
  if (isNaN(totalPushTime)) {
    return 0
  }
  if (totalPushTime <= 0 || totalMinutes <= 0) {
    return 0
  }
  let result = 0

  if (totalMinutes >= 15 * 8) {
    result = +totalPushTime * +price1Day * 10 * 0.3
  } else {
    result =
      ((100 - (+totalMinutes / 15 - 1) * 10) / 100) *
      +totalPushTime *
      +price1Day *
      10
  }

  return result
}

export const checkDevice = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera

  // Android
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone'
  }

  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  // iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS'
  }

  return 'unknown'
}

export function toLowerCaseNonAccentVietnamese(str) {
  let res = str.toLowerCase()
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  res = res.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  res = res.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  res = res.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  res = res.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  res = res.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  res = res.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  res = res.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  res = res.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  res = res.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return res
}

export const isMobile = (mobileSize = 600) => {
  return window.innerWidth <= mobileSize
}
