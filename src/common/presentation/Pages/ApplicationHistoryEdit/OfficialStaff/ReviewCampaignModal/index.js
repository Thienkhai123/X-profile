import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import TextareaAutosize from 'react-textarea-autosize'

import { useDispatch } from 'react-redux'
import { getUserCampaignFeedback, reviewCampaign } from 'store/app/campaign'
import { toast } from 'react-toastify'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const ReviewCampaignModal = (props) => {
  const {
    userRecruitmentCampaignId,
    onCloseReview = () => {},
    companyName = ''
  } = props
  const schema = yup.object().shape({})
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    // mode: 'onChange',
    defaultValues: {}
  })
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const { rating, content } = data
    if (userRecruitmentCampaignId) {
      onCloseReview()
      const payload = {
        userRecruitmentCampaignId: userRecruitmentCampaignId,
        rating: parseFloat(rating),
        content: content
      }

      const res = await dispatch(reviewCampaign(payload))
      if (res?.payload?.isSuccess) {
        toast(
          AlertSuccess({
            title: res?.payload?.successMessage || 'Bạn đã gửi thành công'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      } else {
        toast(
          AlertError({
            title: res?.payload?.errorMessage || 'Có lỗi xảy ra'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      }
      dispatch(getUserCampaignFeedback())
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full"
      >
        <p className="text-p20-bold mb-1 max-w-[282px] text-center">
          Phản hồi về công ty
        </p>
        <p className="text-p20-bold mb-6 max-w-[282px] text-center">
          {companyName || ''}
        </p>
        <div className="flex flex-row-reverse gap-4 mb-10">
          {[1, 2, 3, 4, 5].reverse().map((item, index) => {
            return (
              <Fragment key={index}>
                <input
                  type="radio"
                  id={item}
                  value={item}
                  {...register('rating')}
                  className={`appearance-none hidden w-6 h-6 ${
                    watch('rating') >= item ? 'bg-button' : 'bg-white'
                  } accent-button bg-white border peer peer-hover:bg-button checked:bg-button hover:bg-button border-grey-4 rounded-full`}
                />
                {/* <label htmlFor={item}> */}
                <label
                  htmlFor={item}
                  className={`${
                    watch('rating') >= item ? 'hidden' : 'block'
                  } peer-hover:hidden peer-checked:hidden`}
                >
                  <XProfileIcon name="star" />
                </label>
                <label
                  htmlFor={item}
                  className={`${
                    watch('rating') >= item ? 'block' : 'hidden'
                  }  peer-hover:block peer-checked:block`}
                >
                  <XProfileIcon name="starFill" />
                </label>
                {/* </label> */}
              </Fragment>
            )
          })}
        </div>
        <div className="w-full">
          <p className="text-p18 mb-4">Cảm nhận về công ty</p>
          <div className="mb-8">
            <Controller
              control={control}
              name="content"
              render={({ field }) => {
                return (
                  <TextareaAutosize
                    {...field}
                    maxLength={250}
                    placeholder="Viết cảm nhận"
                    className={`custom-scrollbar-none-border placeholder:text-grey-3 min-h-[160px] max-h-[160px] resize-none outline-0 rounded-lg border border-grey-3  py-2 px-6  w-full peer`}
                  />
                )
              }}
            />
          </div>
        </div>
        <div className="w-full  justify-center items-center gap-4">
          {/* <Button
            title={'Huỷ'}
            rounded="rounded-lg"
            background={'bg-grey-4'}
            color={'text-neutral'}
            padding="py-[13px] px-8"
            height="h-[44px]"
            margin=""
            width="w-[200px]"
            textWeight={'text-p18-bold'}
            onClick={() => onCloseReview()}
          /> */}
          <Button
            title={'Gửi'}
            rounded="rounded-lg"
            background={'bg-button'}
            color={'text-neutral'}
            disabled={!watch('rating')}
            padding="py-[13px] px-8"
            height="h-[44px]"
            margin=""
            width="w-full"
            textWeight={'text-p18-bold'}
            // onClick={() => setSelect(0)}
          />
        </div>
      </form>
    </div>
  )
}

export default ReviewCampaignModal
