import { useState } from 'react'
import { StarterPackage } from './StarterPackage'
import { BasicPackage } from './BasicPackage'
import { ProPackage } from './ProPackage'
import { EnterprisePackage } from './EnterprisePackage'

import Image from 'next/image'
import Modal from 'common/presentation/Modal'
import LandingPageModalContent from './ModalPackage'
import XProfileIcon from 'common/presentation/Icons'
import useModal from 'common/hooks/useModal'
import RegisterModalContent from './RegisterModalContent'
import CreatingProfile from '../CreatingProfile'

export const BlockPackages = () => {
  const [open, toggleModal] = useModal()
  const [openRegister, toggleRegisterModal] = useModal()
  const [openSuccess, toggleSuccessModal] = useModal()
  const [packageChoose, setPackageChoose] = useState({ name: '', id: null })
  const [tabActive, setTabActive] = useState(0)
  const [minutes, setMinutes] = useState(100)
  const [student, setStudent] = useState(20)

  const handleChooseTab = (id) => {
    setTabActive(id)
  }

  const handleToggleRegisterModal = (id, name) => {
    toggleRegisterModal()
    if (!openRegister) {
      setPackageChoose({ name: name, id: id })
      document.body.style.overflow = 'hidden'
    } else {
      setPackageChoose({ name: '', id: null })
      document.body.style.overflow = 'auto'
    }
  }
  const handleToggleModal = () => {
    toggleModal()
    if (!open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
  const handleToggleSuccessModal = () => {
    toggleSuccessModal()
    if (!openSuccess) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  return (
    <div
      id="block-1"
      className="max-w-[1440px] pt-20 pb-[205px] xl:px-[150px] px-10 mx-auto scroll-mt-[95px] "
    >
      <div className="mb-14 ">
        <p className="text-h2 text-center mb-4">Gói Giải Pháp</p>
        <p className="text-p18 text-grey-1 leading-[30px] text-center">
          Bắt đầu tuyển dụng thông minh ngay hôm nay cùng gói giải pháp phù hợp!
        </p>
      </div>
      <div className="flex items-center justify-center mb-14">
        <div className="flex items-center gap-4 bg-light-blue p-2 rounded-full w-fit">
          <div
            onClick={() => handleChooseTab(0)}
            className={`${
              tabActive === 0 ? 'bg-white' : 'hover:bg-[#ECEFF1]'
            } px-10 py-[10px] rounded-full cursor-pointer  transition-all`}
          >
            <p className="text-p16-bold leading-7">Theo tháng</p>
          </div>
          <div
            onClick={() => handleChooseTab(1)}
            className={`${
              tabActive === 1 ? 'bg-white' : 'hover:bg-[#ECEFF1]'
            } px-10 py-[10px] rounded-full cursor-pointer  transition-all`}
          >
            <p className="text-p16-bold leading-7">Theo năm</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  items-stretch justify-center gap-10 mb-14">
        <StarterPackage
          currency={tabActive === 0 ? Math.round(6000000 / 12) : 6000000}
          time={tabActive === 0 ? 'tháng' : 'năm'}
          handleToggleRegisterModal={handleToggleRegisterModal}
        />
        <BasicPackage
          currency={tabActive === 0 ? Math.round(14000000 / 12) : 14000000}
          time={tabActive === 0 ? 'tháng' : 'năm'}
          handleToggleRegisterModal={handleToggleRegisterModal}
        />
        <ProPackage
          currency={tabActive === 0 ? Math.round(35000000 / 12) : 35000000}
          time={tabActive === 0 ? 'tháng' : 'năm'}
          handleToggleRegisterModal={handleToggleRegisterModal}
        />
        <EnterprisePackage
          currency={tabActive === 0 ? Math.round(70000000 / 12) : 70000000}
          time={tabActive === 0 ? 'tháng' : 'năm'}
          handleToggleRegisterModal={handleToggleRegisterModal}
          timeType={tabActive}
          setMinutes={setMinutes}
          minutes={minutes}
          student={student}
          setStudent={setStudent}
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          className=" border rounded-full border-grey-4 px-20 py-4   hover:shadow-[0px_16px_24px_0px_rgba(38,58,124,0.08)] hover:-translate-y-1 duration-200 transition-all flex items-center gap-4 "
          onClick={handleToggleModal}
        >
          <XProfileIcon name="transfer" />
          <p className="text-p18-bold">So sánh các gói</p>
        </button>
      </div>

      <Modal
        open={open}
        toggleModal={handleToggleModal}
        childStyle="w-screen h-fit md:w-[1024px] min-h-[1572px]  translate-y-20 mt-4 transition-all animate-fadeIn shadow-md p-10 bg-white rounded-2xl "
        modalStyle={`w-[100vw] h-[100vh] bg-black/30  z-[10000] fixed flex justify-center items-start  left-[calc(0%)] top-[calc(0%)] transition-all pb-24 duration-500 overflow-y-scroll custom-scrollbar`}
        title="Gói Giải Pháp"
        styleTitle="text-p28-bold text-neutral"
      >
        <LandingPageModalContent />
      </Modal>
      <Modal
        open={openRegister}
        useClickOutside={false}
        toggleModal={handleToggleRegisterModal}
        childStyle="w-screen h-fit md:w-[1124px] min-h-fit  translate-y-10 mt-4 animate-fadeIn shadow-md p-10 bg-white rounded-2xl "
        modalStyle={`w-[100vw] h-[100vh] bg-black/30  z-[10000] fixed flex justify-center items-start  left-[calc(0%)] top-[calc(0%)] transition-all pb-24  overflow-y-scroll custom-scrollbar`}
        title={`Thông tin đăng ký gói ${packageChoose.name || ''}`}
        styleTitle="text-p28-bold text-neutral"
      >
        <RegisterModalContent
          packageId={packageChoose?.id}
          handleToggleRegisterModal={handleToggleRegisterModal}
          handleToggleSuccessModal={handleToggleSuccessModal}
          minutes={minutes}
          student={student}
        />
      </Modal>
      <Modal
        open={openSuccess}
        toggleModal={handleToggleSuccessModal}
        childStyle="w-screen h-fit md:w-[480px] min-h-[322px]  mt-4 transition-all animate-fadeIn shadow-md p-8 bg-white rounded-2xl "
        modalStyle={`w-[100vw] h-[100vh] bg-black/30  z-[10000] fixed flex justify-center items-center left-[calc(0%)] top-[calc(0%)] transition-all duration-200 overflow-y-scroll custom-scrollbar`}
        styleTitle="text-p28-bold text-neutral"
      >
        <div className="flex flex-col gap-8 items-center justify-center">
          <div>
            <Image
              src={'/images/bearSuccess.png'}
              width={160}
              height={160}
              objectFit="cover"
              quality={100}
              alt=""
            />
          </div>
          <div className="flex items-center flex-col gap-1 justify-center">
            <p className="text-p20-bold">Đăng ký thành công</p>
            <p>X-Profile sẽ liên hệ bạn sớm nhất!</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
