import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const RadioInputItem = (props) => {
  const {
    content,
    value,
    idRadio,
    nameField,
    imgUrls,
    handleChangePaymentMethod,
    isActiveSuggest = false,
    isVisa = false,
    informationCard = 'Visa ****4567',
    handleEditInformationCard = () => {}
  } = props

  return (
    <div className=" xl:flex  gap-[24px]">
      <div className="w-[40px] h-[40px] relative">
        <Image
          src={imgUrls || ''}
          priority
          objectFit="contain"
          alt="payment method"
          layout="fill"
        />
      </div>
      <div className="flex-1">
        <div className=" flex items-center justify-between h-[40px]">
          <div className="flex gap-[8px] items-center">
            <p className="text-p18 leading-[30px] text-black first-letter:uppercase">
              {content}
            </p>
            {isActiveSuggest && (
              <div className="bg-light-blue px-[16px] rounded-[8px] min-h-[28px] justify-center">
                <p className="text-p14 leading-[26px] my-auto text-button-2 first-letter:uppercase ">
                  Khuyên dùng
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center group">
            <input
              id={idRadio}
              type="radio"
              name={nameField}
              className="radio-inputPayment peer/Choose"
              value={value}
            />
            <label
              htmlFor={idRadio}
              onClick={() => handleChangePaymentMethod(value)}
              className="flex items-center cursor-pointer text-p18 radio-labelPayment border border-grey-3 p-[4px] rounded-full  peer-checked/Choose:border-button"
            >
              <span className="w-[15px] h-[15px] inline-block rounded-full flex-no-shrink"></span>
            </label>
          </div>
        </div>
        {isVisa && (
          <div className="mt-[21px] pt-[16px] border-t border-grey-4">
            <div className="flex gap-[6px] items-center ">
              <p className="text-black text-p16 leading-[28px]">
                {informationCard}
              </p>
              <div className="h-[6px] w-[6px] bg-black rounded-full"></div>
              <buton
                onClick={() => handleEditInformationCard()}
                className="text-black text-p16 leading-[28px] font-bold cursor-pointer"
              >
                Chỉnh sửa
              </buton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

RadioInputItem.propTypes = {
  content: PropTypes.string,
  value: PropTypes.number,
  idRadio: PropTypes.string,
  nameField: PropTypes.string,
  imgUrls: PropTypes.string,
  handleChangePaymentMethod: PropTypes.func
}
RadioInputItem.defaultProps = {
  content: '',
  value: '',
  idRadio: '',
  nameField: 'paymentMethod',
  imgUrls: '',
  handleChangePaymentMethod: () => {}
}

export default RadioInputItem
