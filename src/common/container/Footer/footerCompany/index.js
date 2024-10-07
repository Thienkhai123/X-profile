import React, { Fragment } from 'react'
import FooterList from './footerList'
import FooterImageList from './footerImageList'
import FooterIconList from './footerIconList'
import FooterContent from './footerContent'
import FooterLang from './footerLang'
import { useRouter } from 'next/router'
import { LOCALIZATION } from 'common/config/app.constants'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'
import Image from 'next/image'

const FooterCompany = (props) => {
  const { FOOTER } = props
  const { FOOTER_CONFIG, SETTING_THEMES } = FOOTER
  const { theme } = SETTING_THEMES
  const { asPath } = useRouter()
  const router = useRouter()

  const switchLanguage = (lang) => {
    localStorage.setItem(LOCALIZATION, lang)
    router.push(asPath, asPath, { locale: lang })
  }

  return (
    <div id="footer" className={`${theme}`}>
      <div className={`flex justify-center `}>
        <div className="xl:flex sm:pt-[56px] sm:pb-0 sm:pr-0 sm:pl-0 pt-[32px] pr-[30px] pl-[30px] pb-[16px]   w-full  xl:w-[1180px] xl:h-[340px] h-full">
          <div className="xl:mr-[88px] xl:mb-[0px] mb-[12px]">
            <div className="flex justify-center sm:justify-start">
              <div className="hidden sm:block">
                <XProfileIcon />
              </div>
              <div className="block sm:hidden">
                <Image
                  width={63}
                  height={30}
                  placeholder="blur"
                  blurDataURL="/images/logoMobile.png"
                  src="/images/logoMobile.png"
                  alt=""
                />
              </div>
            </div>

            <div className="w-[267px] mt-[32px] hidden sm:block">
              <p className="text-p16 text-grey-1">{FOOTER.content}</p>
            </div>
          </div>
          <div className="grid  xl:grid-cols-4 grid-cols-2 justify-between w-full gap-[20px]">
            {FOOTER_CONFIG?.map((element, index) => {
              return (
                <div key={index} className="">
                  <FooterList element={element} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className=" w-full bg-dark-blue flex justify-center">
        <div className="xl:flex md:justify-between grid-rows-2 xl:w-[1140px]  py-12 flex-wrap  xl:items-center">
          <div className="flex flex-col xl:flex-row xl:justify-between justify-center xl:gap-[24px] gap-[8px]">
            {SETTING_THEMES.conect.conected?.map((element, index) => {
              const { icon, description, href } = element
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="flex justify-center xl:justify-start items-center gap-4"
                >
                  <div className="hidden sm:block">
                    {icon && <XProfileIcon name={icon} fill="#E6E6E6" />}
                  </div>
                  <div className="block sm:hidden">
                    {icon && (
                      <XProfileIcon
                        name={icon}
                        fill="#E6E6E6"
                        width="18"
                        height="22"
                      />
                    )}
                  </div>
                  <p className="sm:text-p14 text-p12 text-grey-4">
                    {description}
                  </p>
                </a>
              )
            })}
            {/* <FooterContent imageContent={imageContent} content={content} /> */}
          </div>
          <div className="flex mt-[20px] xl:my-[0px] justify-center">
            {SETTING_THEMES.follow.followIcon?.map((element, index) => {
              const { icon, href } = element
              return (
                <Fragment key={index}>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-[12px] hover:cursor-pointer"
                    >
                      <XProfileIcon name={icon} fill="#0B2156" />
                    </a>
                  )}
                </Fragment>
              )
            })}
            {/* <FooterLang locale={locale} switchLanguage={switchLanguage} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

FooterCompany.propTypes = {}

export default FooterCompany
