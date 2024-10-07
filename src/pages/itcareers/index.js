import MetaSeo from 'common/container/meta-seo'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const LandingPage = () => {
  const handleClickStart = () => {
    window.location.href = '/itcareers/survey'
  }
  return (
    <div className="flex-1 relative h-screen w-full">
      <MetaSeo
        title="Bạn là ai trong thế giới IT - X-Profile"
        titleContent={'Cùng X-Profile khám phá nhân vật đại diện của bạn!'}
        descContent={'Cùng X-Profile khám phá nhân vật đại diện của bạn!'}
        imageContent="https://he44r2a3tgobj.vcdn.cloud/p/Website/SurveyITCareers/Background.png"
        urlContent="https://xprofile.vn/itcareers/"
      />
      <div className="hidden xl:block">
        <Image
          src="/images/Findtheway.webp"
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
          className="object-top"
          placeholder="blur"
          blurDataURL="/images/Findtheway.webp"
        />
      </div>
      <div className=" xl:hidden">
        <Image
          src="/images/findtheway-Mobile.webp"
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
          className="object-top"
          placeholder="blur"
          blurDataURL="/images/findtheway-Mobile.webp"
        />
      </div>

      <div className="absolute h-full w-full xl:py-20 py-10 flex xl:block flex-col items-center xl:justify-center">
        <div className="w-full flex xl:flex-row  justify-start xl:px-20 px-10">
          <div className="hidden xl:block">
            <XProfileIcon name="logoLandingWhite" />
          </div>
        </div>
        <div className="w-full mx-auto flex flex-col justify-between  items-center ">
          <div className="hidden xl:block cursor-default xl:max-w-[742px] max-w-[278px] xl:mt-28">
            <p className="text-white select-none xl:text-[64px] text-[24px] font-bold text-center xl:leading-[80px] leading-[36px] text-border drop-shadow-[0px_4px_16px_0px_rgba(255,255,255,0.16)]">
              Bạn là ai trong thế giới Công nghệ thông tin?
            </p>
          </div>
          <div className="xl:hidden cursor-default max-w-[278px] mt-44">
            <p className="text-white select-none  text-[24px] font-bold text-center  leading-[36px] drop-shadow-[0px_4px_16px_0px_rgba(255,255,255,0.16)]">
              Bạn là ai trong thế giới Công nghệ thông tin?
            </p>
          </div>

          <div className="relative xl:w-[181px] w-[128px] h-fit  group mx-auto xl:mt-20 mt-6">
            <div className="w-full h-full absolute bg-black left-1 top-1 rounded-lg transition-all  duration-300  group-hover:left-2 group-hover:top-2"></div>
            <button
              onClick={() => handleClickStart()}
              className="relative xl:text-p20-bold text-p16-bold bg-white group-hover:bg-button xl:h-16 h-14 border-[0.5px] border-black/50 w-full  rounded-lg z-10"
            >
              Khám phá
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
