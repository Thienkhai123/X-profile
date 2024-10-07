import { async } from '@firebase/util'
import MetaSeo from 'common/container/meta-seo'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { ToastCopyLink } from 'common/presentation/Notification/Toast/ToastCopyLink'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  FacebookIcon,
  TwitterIcon,
  FacebookShareButton,
  TwitterShareButton,
  PinterestIcon,
  LinkedinShareButton,
  LinkedinIcon
} from 'react-share'
import Modal from 'common/presentation/Modal'
import useModal from 'common/hooks/useModal'
import ShareStory from '../../../common/presentation/Pages/landing/shareStory'
import Action from 'common/presentation/Pages/landing/action'
import ActionMobile from 'common/presentation/Pages/landing/actionMobile'
import ProductManagerSvg from 'common/presentation/Pages/landing/productManager/productManagerSvg'
import ProductManagerSvgMobile from 'common/presentation/Pages/landing/productManager/productManagerSvgMobile'
import { checkDevice } from 'store/helper/functionHelper'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const ProductManagerLandingPage = () => {
  const router = useRouter()

  const [openModal, toggleModal] = useModal()
  const [chooseTest, setChooseTest] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    toast(
      ToastCopyLink({
        title: 'Đã sao chép đường dẫn',
        background: 'bg-[#F6BB3A]'
      }),
      {
        toastId: 'alert-save-warning',
        className: 'pt-[24px] bg-transparent shadow-none border-none',
        position: 'top-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000
      }
    )
  }

  const handleCreateTest = () => {
    if (window !== undefined) {
      window.location.assign('/itcareers')
    }
  }

  const download = (name = 'ProductManager') => {
    fetch('/images/Landing/ITCareerPM.png')
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `ProductManager.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      })
  }

  const handleShareStory = () => {
    const device = checkDevice()
    if (device === 'Android' && !navigator.canShare()) {
      toggleModal()
    }
    if (device === 'iOS' && !navigator.canShare()) {
      handleShareFBMobile()
    }
    if (device === 'unknown' || navigator.canShare()) {
      toast(
        AlertWaring({
          title: 'Trình duyệt chưa được hỗ trợ.'
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

  const handleMap = () => {
    if (window !== undefined) {
      window.open('/career-path/it')
    }
  }

  const handleShareBlog = () => {
    if (window !== undefined) {
      window.open('https://blog.xprofile.vn/tag/project-manager/')
    }
  }

  const handleCreateProfile = () => {
    if (window !== undefined) {
      window.open('/applicant-profile')
    }
  }

  const handleShareInsMobile = async () => {
    const response = await fetch('/images/Landing/ITCareerMobile.png')
    const blob = await response.blob()
    const filesArray = [
      new File([blob], 'product_manager.jpg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime()
      })
    ]
    const shareData = {
      files: filesArray
    }
    navigator.share(shareData).then(() => {
      console.log('Shared successfully')
    })
  }

  const handleShareFBMobile = async () => {
    const response = await fetch('/images/Landing/ITCareerPMMobile.png')
    const blob = await response.blob()
    const filesArray = [
      new File([blob], 'product_manager.jpg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime()
      })
    ]
    const shareData = {
      files: filesArray
    }
    navigator.share(shareData).then(() => {
      console.log('Shared successfully')
    })
  }

  const shareFacebook = () => {
    const buttonShareFB = document.getElementById('shareFacebookPM')
    if (buttonShareFB) {
      buttonShareFB.click()
    }
  }

  const shareLinkedin = () => {
    const buttonShareLinkedIn = document.getElementById('shareLinkedInPM')
    if (buttonShareLinkedIn) {
      buttonShareLinkedIn.click()
    }
  }
  useEffect(() => {
    const element = document.getElementById('download-survey-productManager')
    if (element) {
      element.addEventListener('click', download)
    }
    return () => {}
  }, [])
  return (
    <div className="bg-yellow-survey">
      <div className="flex-1 max-w-[1240px] mx-auto px-[24px] xl:px-0 ">
        <MetaSeo
          title="Product Manager"
          titleContent={'Product Manager'}
          descContent={'Product Manager'}
          urlContent="https://xprofile.vn/itcareers/productManager"
          imageContent="https://he44r2a3tgobj.vcdn.cloud/p/Website/SurveyITCareers/X-Profile_PM-1.png"
        />
        <div className="absolute right-0 hidden md:block">
          <Image
            src="/images/Landing/grid.png"
            alt=""
            width={533.48}
            height={1174}
          />
        </div>
        <div className="absolute md:hidden right-0">
          <Image
            src="/images/Landing/grid.png"
            alt=""
            width={292.48}
            height={645}
          />
        </div>
        <div className="py-[16px] xl:py-[80px]  xl:px-0">
          <div className="flex justify-between  xl:mb-[40px] mb-[16px] pr-[28px] xl:pr-0 group">
            <div
              className="xl:hidden flex gap-[16px] items-center relative z-[100] cursor-pointer"
              onClick={() => handleCreateTest()}
            >
              <XProfileIcon name="arrowBackTest" fill="#F6BB3A" />
              <p className="sm:text-p14 text-button">Làm lại bài test</p>
            </div>
            <XProfileIcon name="logoLanding" />
            <div
              className="hidden xl:flex gap-[16px] items-center relative z-[100] cursor-pointer "
              onClick={() => handleCreateTest()}
              onMouseLeave={() => setChooseTest(false)}
              onMouseMove={() => setChooseTest(true)}
            >
              <XProfileIcon
                name="arrowBackTest"
                fill={chooseTest ? '#F6BB3A' : 'black'}
              />
              <p className="sm:text-p20 text-black group-hover:text-button">
                Làm lại bài test
              </p>
            </div>
          </div>
          <div className="flex gap-[68px]">
            <div className="xl:pt-[80px] pt-0">
              <div className="flex flex-col xl:gap-[12px] gap-[8px] max-w-[626px]  xl:mb-[80px] mb-[48px]">
                <p className="sm:text-p48 text-h3 text-neutral xl:max-w-[100%] ">
                  Ái chà chà! Bạn là
                </p>
                <p className="sm:text-p48 text-h3 text-neutral xl:max-w-[100%]">
                  THỦ LĨNH CHIẾN LƯỢC
                </p>
                <p className="sm:text-p48 text-h3 text-neutral xl:max-w-[100%] ">
                  đó nha! Ngầu đét!
                </p>
                <p className="sm:text-p24 text-p16 text-neutral">
                  {`Cư dân xứ sở IT gọi bạn là “Người Quản Lý Sản phẩm” (Product
                  Manager)`}
                </p>
                <p className="sm:text-p20 font-[300] italic text-p14 text-semantic-green">
                  {`/ Cái đầu lạnh, quả tim nóng, lướt ngọn sóng, đến thành công /`}
                </p>
              </div>
              <div className="xl:hidden block justify-end top-0 mb-[32px]">
                <Image
                  src="/images/Landing/ProductManagerNew.png"
                  width={600}
                  height={600}
                  alt=""

                  //   style={{ minWidth: '100%' }}
                />
              </div>
              <div>
                <div className="hidden md:block xl:w-[622px] w-full relative">
                  <ProductManagerSvg />
                  <div className="flex justify-center ">
                    <div className="flex justify-center relative w-[277px]">
                      <div className="absolute z-[100] bottom-[76px] pl-2 opacity-0 ">
                        <FacebookShareButton
                          url={`https://xprofile.vn${router?.pathname}`}
                          hashtag="#XProfile"
                          quote="ProductManager"
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex justify-center w-[277px] relative">
                      <div className="absolute bottom-[76px] right-[24px] opacity-0">
                        <LinkedinShareButton
                          url={`https://xprofile.vn${router?.pathname}`}
                          quote="ProductManager"
                          className="Demo__some-network__share-button"
                        >
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block md:hidden  relative ">
                  <ProductManagerSvgMobile
                    handleCopy={handleCopy}
                    download={download}
                    shareFacebook={shareFacebook}
                    shareLinkedin={shareLinkedin}
                    handleShareStory={handleShareStory}
                  />
                  <div className="flex justify-center ">
                    <div className="flex justify-center relative ">
                      <div className="absolute hidden z-[100] bottom-[15vw] right-[24vw] pl-2 opacity-0">
                        <FacebookShareButton
                          id="shareFacebookPM"
                          url={`https://xprofile.vn${router?.pathname}`}
                          hashtag="#XProfile"
                          quote="ProductManager"
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={42} round />
                        </FacebookShareButton>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex justify-center  ">
                      <div className="absolute hidden z-[100] bottom-[4%] opacity-0">
                        <LinkedinShareButton
                          id="shareLinkedInPM"
                          url={`https://xprofile.vn${router?.pathname}`}
                          quote="ProductManager"
                          className="Demo__some-network__share-button"
                        >
                          <LinkedinIcon size={42} round />
                        </LinkedinShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:flex hidden justify-end  sticky top-0 w-[600px] h-[600px]">
              <Image
                src="/images/Landing/ProductManagerNew.png"
                priority
                quality={100}
                objectFit="contain"
                layout="fill"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[24px] xl:px-0">
        <div className="xl:block hidden">
          <Action
            title="Product Manager"
            handleMap={handleMap}
            handleShareBlog={handleShareBlog}
            handleCreateProfile={handleCreateProfile}
          />
        </div>
        <div className="xl:hidden block mt-[24px]">
          <ActionMobile
            title="Product Manager"
            handleMap={handleMap}
            handleShareBlog={handleShareBlog}
            handleCreateProfile={handleCreateProfile}
          />
        </div>
      </div>
      <div className="mt-[80px]">
        <a
          target="_blank"
          href="https://www.facebook.com/groups/vietcodecangay"
          rel="noopener noreferrer"
          className="block sm:h-[304px] h-[139px] w-full relative"
        >
          <Image
            alt="join-us"
            placeholder="blur"
            blurDataURL="/images/Banner_JoinUs1.webp"
            src="/images/Banner_JoinUs1.webp"
            layout="fill"
            width={4320}
            height={912}
            objectFit="cover"
            quality={100}
          />
        </a>
      </div>
      <div className="h-[120px] flex  gap-[16px] bg-black justify-between items-center px-[24px] xl:px-[80px]">
        <div className="flex gap-[8px]">
          <p className="text-p14 text-white ">&copy; X-Profile</p>
        </div>
        <div className="flex gap-[8px]">
          <XProfileIcon name="mail" stroke="white" />
          <p className="text-p14 text-white ">hello@xprofile.vn</p>
        </div>
      </div>
      <div className="relative">
        <Modal
          open={openModal}
          toggleModal={toggleModal}
          modalStyle="w-[100vw] h-[100vh]   flex justify-center items-start pt-[72px] fixed bg-black/30 z-[200] left-[calc(0%)] top-[calc(0%)]"
          childStyle="w-auto"
        >
          <div className="flex justify-center">
            <div className="w-[54.313vw]  h-[104.271vw] relative">
              <Image
                layout="fill"
                alt="share your result survey"
                priority
                objectFit="contain"
                src="/images/Landing/ITCareerPMMobile.png"
                quality={100}
              />
            </div>
          </div>
          <p className="text-white text-p14 font-light mt-[16px] text-center">
            Hình ảnh đã được lưu!
          </p>
          <div className="absolute bottom-0 w-full left-0">
            <ShareStory
              toggleModal={toggleModal}
              handleShareInsMobile={handleShareInsMobile}
              handleShareFBMobile={handleShareFBMobile}
            />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default ProductManagerLandingPage
