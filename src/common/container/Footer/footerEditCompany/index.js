import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
// import { LOCALIZATION } from 'common/config/app.constants'
import { useDispatch } from 'react-redux'
import {
  getFooterEdit,
  saveFooterEdit,
  selectFooterProfile,
  updateAddressBookCreate,
  updateFooterEdit,
  updateFooterSocial
} from 'store/app/edit-mode-company/profile/footerSlice'
import { useSelector } from 'react-redux'
import BlockEditorContainer from 'common/container/block-editor'
import FooterViewMode from 'common/presentation/Pages/edit-mode-company/company/footer/footerViewMode'
import FooterEditMode from 'common/presentation/Pages/edit-mode-company/company/footer/footerEditMode'
import { toast } from 'react-toastify'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import FooterSocial from '../footerSocial'
import FooterAddressCompany from '../FooterAddressCompany'
import Button from 'common/presentation/Button'
import FormCreateAddressCompany from '../FormCreateAddressCompany'
import { getAllCities } from 'store/app/jobSlice'
import FormUpdateAddressCompany from '../FormUpdateAddressCompany'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const FooterEditCompany = (props) => {
  const {
    FOOTER,
    FOOTER_PROFILE,
    editmode = false,
    errors = '',
    handleResetErrors = () => {},
    addressBooks
  } = props
  const { FOOTER_CONFIG, SETTING_THEMES } = FOOTER
  // const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  const { theme } = SETTING_THEMES
  const { asPath, query } = useRouter()
  const { companyId } = query
  const router = useRouter()
  const dispatch = useDispatch()
  const footerProfile = useSelector(selectFooterProfile)
  const [openModal, toggleModal] = useModal()
  const [openModalListAddress, toggleModalListAddress] = useModal()
  const [state, setState] = useState({
    isCreateNewAddress: false,
    isUpdateAddress: false,
    defaultValueAddress: {}
  })

  const onChangeFooterCompany = (data) => {
    dispatch(updateFooterEdit(data))
  }
  const handleChangeSocial = (data) => {
    dispatch(updateFooterSocial(data))
  }
  const onClickEdit = () => {
    // handleShowEditMode()
  }
  const onClickOutSide = () => {
    // ... add function or logical here
    // if (!cropModal) {
    // }
    // onClickSave()
  }
  const onClickCancel = () => {
    if (companyId) {
      dispatch(getFooterEdit(query))
    }
    // handleShowViewMode()
  }

  const onClickSave = async () => {
    const payload = {
      ...footerProfile,
      updateProperties: ['ContactEmail', 'ContactPhone', 'Address'],
      companyId
    }
    const res = await dispatch(saveFooterEdit(payload))

    if (!res?.payload?.isSuccess) {
      toast(
        AlertError({
          title: 'Lưu không thành công'
          // description: res?.payload?.errorMessage,
          // background: 'warning'
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    } else {
      toast(
        AlertSuccess({
          title: 'Lưu thành công'
        }),
        {
          toastId: 'alert-save-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
    if (companyId) {
      dispatch(getFooterEdit(query))
    }
    // handleShowViewMode()
  }

  const handleUpdateAddress = (idAddress, addressTemporaryId) => {
    if (idAddress !== 0) {
      const currentValueAddress = addressBooks?.find(
        (x) => x?.addressBookId === idAddress
      )
      setState({
        ...state,
        isUpdateAddress: true,
        defaultValueAddress: currentValueAddress
      })
    } else if (addressTemporaryId !== 0) {
      const currentValueAddress = addressBooks?.find(
        (x) => x?.addressTemporaryId === addressTemporaryId
      )
      setState({
        ...state,
        isUpdateAddress: true,
        defaultValueAddress: currentValueAddress
      })
    }
  }
  const handleDeleteAddress = (idAddress, tempId) => {
    const currentListAddress = !tempId
      ? addressBooks?.filter((x) => x?.addressBookId !== idAddress)
      : addressBooks?.filter((x) => x?.addressTemporaryId !== tempId)

    // Kiểm tra xem danh sách đã lọc có địa chỉ mặc định không
    const checkHaveIsDefaultInList = currentListAddress.some(
      (x) => x.isDefault === true
    )
    if (checkHaveIsDefaultInList) {
      dispatch(updateAddressBookCreate(currentListAddress))
      toggleModalListAddress()
    } else {
      toast(
        AlertWaring({
          title: 'Lưu không thành công'
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }

  useEffect(() => {
    if (companyId) {
      dispatch(getFooterEdit(query))
    }
  }, [dispatch, companyId])

  useEffect(() => {
    dispatch(getAllCities())
  }, [dispatch])

  useEffect(() => {
    setState({ ...state, isCreateNewAddress: false, isUpdateAddress: false })
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalListAddress])

  return (
    <div id="footer" className={`${theme}`}>
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <FooterEditMode
            addressBooks={addressBooks}
            onChangeFooterCompany={onChangeFooterCompany}
            footerProfile={footerProfile}
            FOOTER_PROFILE={FOOTER_PROFILE}
            toggleModal={toggleModal}
            toggleModalListAddress={toggleModalListAddress}
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
        }
        viewState={
          <FooterViewMode
            footerProfile={footerProfile}
            addressBooks={addressBooks}
            FOOTER_PROFILE={FOOTER_PROFILE}
            onClickEdit={onClickEdit}
          />
        }
        onClickEdit={onClickEdit}
        onClickSave={onClickSave}
        onClickOutSide={onClickOutSide}
        onClickCancel={onClickCancel}
      />
      <Modal
        styleTitle="text-h3 text-black"
        title="Thêm tài khoản Social"
        open={openModal}
        toggleModal={toggleModal}
      >
        <FooterSocial
          toggleModal={toggleModal}
          handleChangeSocial={handleChangeSocial}
          socials={footerProfile?.meta?.socials}
        />
      </Modal>
      <Modal
        modalStyle={
          'w-[100vw] h-[100vh] overflow-y-auto p-2 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]'
        }
        childStyle="w-screen sm:w-[720px] h-5/6  flex flex-col mt-4 shadow-md p-[40px] bg-white rounded-lg"
        styleTitle="text-p28-bold text-black"
        title={
          state?.isCreateNewAddress
            ? 'Tạo mới địa chỉ'
            : state?.isUpdateAddress
            ? 'Chỉnh sửa địa chỉ'
            : 'Sổ địa chỉ'
        }
        open={openModalListAddress}
        toggleModal={toggleModalListAddress}
      >
        {!state?.isCreateNewAddress && !state?.isUpdateAddress && (
          <div className="flex flex-col justify-between h-full">
            <div className="h-full xl:h-[55vw] overflow-y-auto custom-scrollbar mt-10 pr-4 ">
              <FooterAddressCompany
                listAddress={addressBooks}
                handleUpdateAddress={handleUpdateAddress}
              />
            </div>
            <div className="flex justify-between items-end py-10">
              <Button
                title="Thêm mới"
                textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                background="bg-white border-grey-3 border"
                color="text-neutral"
                height="h-auto"
                width="w-auto"
                rounded="rounded-lg"
                padding="p-[13px_32px]"
                onClick={() => setState({ ...state, isCreateNewAddress: true })}
              />
              <div className="flex justify-center items-center gap-4">
                <Button
                  title="Huỷ"
                  textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                  background="bg-grey-4"
                  color="text-neutral"
                  height="h-auto"
                  width="w-auto"
                  rounded="rounded-lg"
                  padding="p-[13px_32px]"
                  onClick={toggleModalListAddress}
                />
                <Button
                  title="Xác nhận"
                  background={'bg-button'}
                  textWeight={'text-p18 font-bold'}
                  color="text-neutral"
                  height="h-auto"
                  width="w-auto"
                  rounded="rounded-lg"
                  padding="p-[13px_32px]"
                  onClick={toggleModalListAddress}
                />
              </div>
            </div>
          </div>
        )}
        {state?.isCreateNewAddress && (
          <div className="flex flex-col justify-between h-full">
            <div className="h-full overflow-y-auto custom-scrollbar my-10 pr-4">
              <FormCreateAddressCompany toggleModal={toggleModalListAddress} />
            </div>
            <div className="flex gap-4 justify-end items-center mb-10 ">
              <button
                onClick={() =>
                  setState({ ...state, isCreateNewAddress: false })
                }
                className="py-3 px-8 bg-grey-4 text-p18-bold rounded-lg line-clamp-1 hover:opacity-80 duration-200"
              >
                Huỷ
              </button>
              <button
                className="py-3 px-8 bg-button text-p18-bold rounded-lg line-clamp-1 hover:opacity-80 duration-200"
                form="formCreateAddressCompany"
                type="submit"
              >
                Tạo mới
              </button>
            </div>
          </div>
        )}
        {state?.isUpdateAddress && state?.defaultValueAddress && (
          <FormUpdateAddressCompany
            toggleModal={toggleModalListAddress}
            defaultValue={state?.defaultValueAddress}
            stateParent={state}
            setStateParent={setState}
            handleDeleteAddress={handleDeleteAddress}
          />
        )}
      </Modal>
    </div>
  )
}

FooterEditCompany.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  address: PropTypes.string,
  firstPhone: PropTypes.string,
  secondPhone: PropTypes.string,
  email: PropTypes.string,
  srcAddress: PropTypes.string,
  wardName: PropTypes.string,
  districtName: PropTypes.string,
  cityName: PropTypes.string,
  titleAddress: PropTypes.string,
  titlePhone: PropTypes.string,
  titleEmail: PropTypes.string,
  layoutFirst: PropTypes.string,
  layoutSecond: PropTypes.string
}
FooterEditCompany.defaultProps = {
  src: '',
  alt: '',
  address: '',
  srcAddress: '/images/address_default.png',
  firstPhone: '',
  secondPhone: '',
  email: '',
  wardName: '',
  districtName: '',
  cityName: '',
  titleAddress: 'Address',
  titlePhone: 'Phone',
  titleEmail: 'Email',
  layoutFirst: '/images/layout_Footer_profile.png',
  layoutSecond: '/images/layout_Right_Footer_profile.png'
}

export default FooterEditCompany
