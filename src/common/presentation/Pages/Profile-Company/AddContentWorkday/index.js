import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'
import Modal from 'common/presentation/Modal'
import {
  selectLogo,
  selectLogoList,
  updateLogo
} from 'store/app/edit-mode-company/profile/workDaySlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const AddContentWorkday = (props) => {
  const { title, description, onSubmitModal = {} } = props

  const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [logoList, setLogoList] = useState([])

  const dispatch = useDispatch()
  const temps = useSelector(selectLogoList)
  const selectlogo = useSelector(selectLogo)

  const handleChooseLogo = (logo) => {
    dispatch(updateLogo(logo))
    toggleModal()
  }

  const [chooseLogoModal, setChooseLogoModal] = useState({
    open: false,
    success: false,
    error: false
  })

  const toggleModal = () => {
    setChooseLogoModal({ open: !chooseLogoModal.open })
  }

  useEffect(() => {
    setLogoList(temps)
  }, [temps])

  return (
    <div>
      <div className="flex justify-center my-[12px]">
        {selectlogo ? (
          <button
            onClick={() => toggleModal()}
            className="hover:cursor-pointer"
          >
            <Image
              width={74}
              height={74}
              src={selectlogo}
              alt=""
              objectFit="contain"
            />
          </button>
        ) : (
          <button
            onClick={() => toggleModal()}
            className="hover:cursor-pointer"
          >
            <Image
              width={74}
              height={74}
              src="/images/uploadAvatarEdit.png"
              alt=""
              objectFit="contain"
            />
          </button>
        )}
      </div>
      <form>
        <div className="flex flex-col gap-[12px]">
          <p className="sm:text-p16-bold text-p14-bold">{title}</p>
          <div>
            <input
              className="sm:text-p14 text-p12 w-full border-2 border-grey-3 rounded-borderStep focus:outline-none p-2"
              {...register('title')}
            />
          </div>
          <p className="sm:text-p16-bold text-p14-bold">{description}</p>
          <div>
            <textarea
              className="sm:text-p14 text-p12 w-full border-2 rounded-borderStep border-grey-3 focus:outline-none p-2"
              rows="4"
              cols="50"
              maxLength={100}
              {...register('description')}
            />
          </div>
          <div className="flex justify-end">
            <input
              onClick={handleSubmit(onSubmitModal)}
              type="submit"
              value="Xong"
              className="p-2 bg-[#F6BB3A] rounded-borderStep sm:w-[120px] w-[90px] sm:text-p18-bold text-p16-bold hover:cursor-pointer hover:bg-[#ffcf67] duration-200"
            />
          </div>
        </div>
      </form>
      <Modal
        toggleModal={toggleModal}
        open={chooseLogoModal.open}
        modalStyle="w-[100vw] h-[100vh] p-2  px-[20px] flex justify-center items-start fixed bg-black/30 z-[200] left-[calc(0%)] top-[calc(0%)] z-[9999]"
        childStyle="w-screen h-fit sm:w-[500px] mt-4 shadow-md p-4 bg-white rounded-lg max-h-[85vh] overflow-y-scroll custom-scrollbar"
      >
        <div className="flex flex-wrap gap-[12px]">
          {logoList.map((e, ind) => {
            return (
              <div
                key={ind}
                className="w-[78px] h-[78px] rounded-borderStep relative hover:cursor-pointer hover:scale-105 duration-200"
                onClick={() => handleChooseLogo(e.imageUrl)}
              >
                <Image
                  src={e.imageUrl}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}

AddContentWorkday.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}
AddContentWorkday.defaultProps = {
  title: 'Buổi làm việc',
  description:
    'Nhập mô tả tổng quan về môi trường làm việc mà doanh nghiệp của bạn (giới hạn 100 chữ)'
}

export default AddContentWorkday
