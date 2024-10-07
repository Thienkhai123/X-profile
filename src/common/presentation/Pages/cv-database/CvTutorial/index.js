import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const CvTutorial = (props) => {
  const { closeTutorial = () => {}, onClickCreate = () => {} } = props

  return (
    <div className="w-full py-6 px-8 bg-stoke rounded-lg flex items-center justify-between">
      <p className="text-p18">
        Hãy tạo vị trí tuyển dụng để biết mức độ phù hợp của ứng viên với doanh
        nghiệp của bạn!{' '}
        <span
          onClick={() => onClickCreate()}
          className="text-blue-main text-p18-bold cursor-pointer"
        >
          Tạo tuyển dụng
        </span>
      </p>
      <div className="cursor-pointer" onClick={() => closeTutorial()}>
        <XProfileIcon name="cross" stroke="#000000" />
      </div>
    </div>
  )
}

CvTutorial.propTypes = {}

export default CvTutorial
