import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SubHeaderButton from 'common/presentation/SubHeaderButton'
import PaymentMethod from 'common/presentation/SummaryPaymentProduct/PaymentMethod'
import HeadTitle from 'common/presentation/HeadTitle'
import SummaryPaymentProduct from 'common/presentation/SummaryPaymentProduct'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  checkOut,
  createSingleOrder,
  getPaymentMethod,
  selectCurrentPaymentMethod,
  selectDataPaymentMethod,
  selectPaymentMethod,
  updateCurrentPaymentMethod
} from 'store/app/orderSlice'
import { ACCESS_TOKEN, PRODUCT_GUID } from 'common/config/app.constants'
import {
  getProductCourseDetail,
  selectProductCourseDetailForPayment,
  selectProductGuidCourseDetail
} from 'store/app/courseProductGuidSlice'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import InformationPay from 'common/presentation/SummaryPaymentProduct/InformationPay'

const Payment = (props) => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const userToken = localStorage.getItem(ACCESS_TOKEN)
  const product = useSelector(selectProductCourseDetailForPayment)
  const courseFree = product?.productDetail?.isCourseFree
  const paymentMethodList = useSelector(selectDataPaymentMethod)
  const productGuid = localStorage.getItem(PRODUCT_GUID)
  const currentPaymentType = useSelector(selectCurrentPaymentMethod)

  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.ORDER.CHECKOUT) ||
      selectLoading(state, APP_TYPES.ORDER.CREATESINGLEORDER) ||
      selectLoading(state, APP_TYPES.PAYMENT.PAYMENTGATEWAY)
  )
  const handlePaymentCourse = async () => {
    if (!userToken || isEmpty(productGuid))
      return window.location.replace(
        `/sign-in?route=course/${product?.productDetail?.seoName}`
      )
    const toastOptions = {
      toastId: 'alert-save-warning',
      className: 'bg-toast-custom',
      closeButton: false,
      position: 'top-center',
      hideProgressBar: true,
      autoClose: 3000
    }
    const handlePaymentError = (errorMessage) => {
      toast(
        AlertError({
          title: 'Vui lòng chọn phương thức thanh toán'
        }),
        toastOptions
      )
    }
    const handleCourseSuccess = (seoName) => {
      window.location.replace(`/course/${seoName}/result?resultCode=0`)
    }
    const handlePaymentSuccess = (paymentUrl) => {
      window.location.href = paymentUrl
    }
    if (courseFree) {
      const payload = {
        productGuid: productGuid,
        paymentGatewayId: null // Khoá học Free thì đẩy null lên
      }
      const singleOrderAPI = await dispatch(createSingleOrder(payload))
      const res = unwrapResult(singleOrderAPI)
      if (res?.isSuccess) {
        handleCourseSuccess(product?.productDetail?.seoName) // đi đến trang result
      } else {
        handlePaymentError(res?.payload?.errorMessage) // thông báo error
      }
    } else if (currentPaymentType) {
      const payloadSingleOrder = {
        productGuid: productGuid,
        paymentGatewayId: currentPaymentType
      }
      const singleOrderAPI = await dispatch(
        createSingleOrder(payloadSingleOrder)
      )
      const res = unwrapResult(singleOrderAPI)
      if (res?.isSuccess) {
        handlePaymentSuccess(res?.data?.paymentUrl)
      } else {
        handlePaymentError(res?.payload?.errorMessage)
      }
    } else {
      handlePaymentError('Vui lòng chọn phương thức thanh toán')
    }
  }
  const handleChangePaymentMethod = async (value) => {
    dispatch(updateCurrentPaymentMethod(value))
  }
  useEffect(() => {
    const payload = {
      productGuid: productGuid
    }
    dispatch(getProductCourseDetail(payload))
    dispatch(getPaymentMethod())
    return () => {}
  }, [userToken, productGuid, dispatch])

  return (
    <>
      {loading && <LoadingRole />}
      <div className="bg-light-blue">
        <div className="max-w-[1149px] mx-auto  mt-8 mb-40">
          <div className="flex flex-col lg:flex-row justify-center gap-[32px] lg:justify-between">
            {/* <div className="lg:w-[560px] flex flex-col gap-8 items-center lg:items-start mx-5 lg:mx-0 ">
              <SubHeaderButton />
              <HeadTitle title="Thanh toán" />
              <p className="text-p18-bold text-black">
                Chọn phương thức thanh toán
              </p>
              {!courseFree && (
                <PaymentMethod
                  handleChangePaymentMethod={handleChangePaymentMethod}
                  listPaymentMethod={paymentMethodList}
                />
              )}
            </div> */}
            <div className="lg:w-[548px] w-auto lg:mx-0 mx-4">
              <p className="text-p20-bold text-black mb-[24px]">
                Thông tin khoá học
              </p>
              <div>
                <InformationPay productDetail={product?.productDetail} />
              </div>
            </div>
            <div className="lg:w-[569px] w-auto lg:mx-0 mx-4">
              <p className="text-p20-bold text-black mb-[24px]">
                Thông tin thanh toán
              </p>
              <SummaryPaymentProduct
                courseFree={courseFree}
                handleChangePaymentMethod={handleChangePaymentMethod}
                listPaymentMethod={paymentMethodList}
                handlePaymentCourse={handlePaymentCourse}
                productDetail={product?.productDetail}
                estimateInformation={product?.estimateInformation}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Payment.propTypes = {}

export default Payment
