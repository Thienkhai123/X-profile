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
import UxWriterSvg from 'common/presentation/Pages/landing/uxWriter/uxWriterSvg'
import UxWriterSvgMobile from 'common/presentation/Pages/landing/uxWriter/uxWriterSvgMobile'
import { checkDevice } from 'store/helper/functionHelper'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const UxWriter = () => {
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

  const download = () => {
    fetch('/images/Landing/uxWriterDow.png')
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `UXWriter.png`
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
      window.open('/career-path/it', '_blank')
    }
  }

  const handleShareBlog = () => {
    if (window !== undefined) {
      window.open('https://blog.xprofile.vn/tag/ux-writer/', '_blank')
    }
  }

  const handleCreateProfile = () => {
    if (window !== undefined) {
      window.open('/applicant-profile', '_blank')
    }
  }

  const shareFacebook = () => {
    document.getElementById('shareFacebookUxWriter').click()
  }

  const shareLinkedin = () => {
    document.getElementById('shareLinkedinUxWriter').click()
  }

  const handleShareInsMobile = async () => {
    const response = await fetch('/images/Landing/uxWriterDowMobile.png')
    const blob = await response.blob()
    const filesArray = [
      new File([blob], 'ux_writer.jpg', {
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
    const response = await fetch('/images/Landing/uxWriterDowMobile.png')
    const blob = await response.blob()
    const filesArray = [
      new File([blob], 'ux_writer.jpg', {
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

  // useEffect(() => {
  //   const id = document.getElementById('downloadUxWriter')
  //   id.style.cursor = 'pointer'
  // }, [])

  return (
    <div className="bg-yellow-survey">
      <div className="flex-1 max-w-[1240px] mx-auto px-[24px] xl:px-0 ">
        <MetaSeo
          title="UX Writer"
          titleContent={'UX Writer'}
          descContent={'UX Writer'}
          imageContent="https://he44r2a3tgobj.vcdn.cloud/p/Website/SurveyITCareers/X-Profile_UXWriter-1.png"
          urlContent="https://xprofile.vn/itcareers/uxWriter"
        />
        <div className="absolute md:block hidden right-0">
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
              <div className="flex flex-col xl:gap-[16px] gap-[8px] max-w-[626px] xl:mb-[80px] mb-[48px]">
                <p className="sm:text-p48 text-h3 text-neutral xl:max-w-[100%] ">
                  Xin chào
                </p>
                <p className="sm:text-p48 text-h3 text-neutral xl:max-w-[100%]">
                  PHÙ THỦY NGÔN TỪ
                </p>
                <p className="sm:text-p24 text-p16 text-neutral">
                  Người thổi hồn vào các sản phẩm công nghệ - bạn phù hợp với vị
                  trí UX Writer trong ngành CNTT nha!
                </p>
                <p className="sm:text-p20 text-p14 text-semantic-green italic ">
                  / Sản phẩm này không phải là thuốc, nhưng có công dụng thu hút
                  người dùng /
                </p>
              </div>
              <div className="xl:hidden block justify-end top-0 mb-[32px]">
                <Image
                  src="/images/Landing/uxWriter.png"
                  width={600}
                  priority
                  objectFit="contain"
                  height={600}
                  alt=""
                  // style={{ minWidth: '100%' }}
                />
              </div>
              <div>
                <div className="hidden md:block xl:w-[622px] w-full relative">
                  <UxWriterSvg download={download} />
                  <div className="flex justify-center ">
                    <div className="flex justify-center relative w-[277px]">
                      <div className="absolute z-[100] bottom-[76px] pl-2 opacity-0 ">
                        <FacebookShareButton
                          url={`https://xprofile.vn${router?.pathname}`}
                          quote="UXWriter"
                          hashtag="#XProfile"
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
                          quote="UXWriter"
                          hashtag="#XProfile"
                          className="Demo__some-network__share-button"
                        >
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block md:hidden w-full relative ">
                  <UxWriterSvgMobile
                    handleCopy={handleCopy}
                    download={download}
                    handleShareStory={handleShareStory}
                    shareFacebook={shareFacebook}
                    shareLinkedin={shareLinkedin}
                  />
                  <div className="flex justify-center ">
                    <div className="flex justify-center ">
                      <div className="hidden">
                        <FacebookShareButton
                          id="shareFacebookUxWriter"
                          url={`https://xprofile.vn${router?.pathname}`}
                          quote="UXWriter"
                          hashtag="#XProfile"
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={42} round />
                        </FacebookShareButton>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex justify-center ">
                      <div className="hidden">
                        <LinkedinShareButton
                          id="shareLinkedinUxWriter"
                          url={`https://xprofile.vn${router?.pathname}`}
                          quote="UXWriter"
                          hashtag="#XProfile"
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
                src="/images/Landing/uxWriter.png"
                layout="fill"
                priority
                objectFit="contain"
                alt=""
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[24px] xl:px-0">
        <div className="xl:block hidden">
          <Action
            handleMap={handleMap}
            handleShareBlog={handleShareBlog}
            handleCreateProfile={handleCreateProfile}
            title="UX Writer"
          />
        </div>
        <div className="xl:hidden block mt-[24px]">
          <ActionMobile
            handleMap={handleMap}
            handleShareBlog={handleShareBlog}
            handleCreateProfile={handleCreateProfile}
            title="UX Writer"
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
          modalStyle="w-[100vw] h-[100vh]   flex justify-center items-start  pt-[12%] fixed bg-black/30 z-[200] left-[calc(0%)] top-[calc(0%)]"
          childStyle="w-auto"
        >
          <div className="flex justify-center">
            <div className="w-[48.313vw] h-[90.271vw] relative">
              <Image
                layout="fill"
                alt=""
                src="/images/Landing/uxWriterDowMobile.png"
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

export default UxWriter
