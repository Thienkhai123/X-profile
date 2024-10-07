import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import PaymentStatus from 'common/presentation/SummaryPaymentProduct/PaymentStatus'
import { useRouter } from 'next/router'
import { PRODUCT_GUID } from 'common/config/app.constants'
import { useDispatch } from 'react-redux'
import { getProductCourseDetail } from 'store/app/courseProductGuidSlice'
import { useSelector } from 'react-redux'
import { selectProductGuidCourseDetail } from 'store/app/courseProductGuidSlice'
import { isEmpty } from 'lodash'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'

const Result = (props) => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const productGuid = localStorage.getItem(PRODUCT_GUID)
  const product = useSelector(selectProductGuidCourseDetail)
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.COURSE.GETPRODUCTCOURSEDETAIL)
  )
  const handleRedirectPaymentSuccess = () => {
    window.location.replace(`/account-setting/courses`)
  }
  const handleRedirectPaymentFailled = () => {
    window.location.replace(`/course/${product?.seoName}`)
  }
  const handleRedirectPaymentAgain = () => {
    window.location.replace(`/course/${product?.seoName}/payment`)
  }

  useEffect(() => {
    if (isEmpty(productGuid)) return window.location.replace('/')
    const payload = {
      productGuid: productGuid
    }
    dispatch(getProductCourseDetail(payload))
    return () => {}
  }, [productGuid, dispatch])

  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex-1 bg-light-blue flex flex-col justify-center items-center xl:py-[70px] py-[30px]">
        <PaymentStatus
          status={query?.resultCode === '0' ? true : false}
          handleRedirectPaymentSuccess={handleRedirectPaymentSuccess}
          handleRedirectPaymentFailled={handleRedirectPaymentFailled}
          handleRedirectPaymentAgain={handleRedirectPaymentAgain}
        />
      </div>
    </>
  )
}

Result.propTypes = {}

export default Result
