import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import InformationItem from '../InformationItem'
import { convertCurrency, distanceYear } from 'store/helper/functionHelper'
import { SimpleSlider } from 'common/presentation/Swiper/SimpleSlider'
import { SwiperSlide } from 'swiper/react'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'

const Information = (props) => {
  const { profile, listImages, title, titleMapButon, titleMoreButton } = props
  const {
    description,
    addressBooks = [],
    employeeAmount,
    averageSalary,
    recruitmentAmount,
    establishDate,
    websiteUrl,
    maxSalary
  } = profile || {}
  const address = addressBooks?.filter((add) => add.isDefault === true)
  const { googleMapUrl } = address[0] || {}

  const { meta } = profile || {}
  const { websiteLinkTitle } = meta || {}

  const editTextWebsiteUrl = () => {
    if (websiteUrl?.match(/^https?:\/\//i)) {
      let tempUrl = websiteUrl
      tempUrl = tempUrl.replace('https://', '')
      return tempUrl
    } else if (websiteUrl?.match(/^http?:\/\//i)) {
      let tempUrl = websiteUrl
      tempUrl = tempUrl.replace('http://', '')
      return tempUrl
    } else {
      return websiteUrl
    }
  }

  return (
    <div>
      <div className="flex justify-center flex-wrap max-w-[1140px]">
        <div className="xl:mb-5  mb-[20px] text-center xl:text-start block xl:hidden">
          <p className="xl:text-h2 text-p20-bold text-neutral">{title}</p>
        </div>
        <div className=" xl:mr-[30px] px-[16px] xl:px-0">
          <div className="xl:w-[520px] xl:h-[589px] w-[340px] h-[184px]">
            {listImages?.length === 0 && (
              <SkeletonBox width="w-full" height="h-full" />
            )}
            {listImages?.length > 0 && (
              <SimpleSlider hasArrow={listImages?.length > 1}>
                {listImages?.map((element) => {
                  const { image } = element
                  const { imageId, imageUrl } = image
                  return (
                    <SwiperSlide key={`profile-company-${imageId}`}>
                      <div className="xl:w-[520px] xl:h-[589px] w-[340px] h-[184px] relative rounded-[8px] overflow-hidden cursor-pointer">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={`collection-${imageId}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  )
                })}
              </SimpleSlider>
            )}
          </div>
        </div>
        <div className="xl:ml-[30px] mt-[20px] xl:mt-[0px]   px-[16px] xl:px-0">
          <div className="mb-5 text-center xl:text-start hidden xl:block">
            <p className="text-h2 text-neutral">{title}</p>
          </div>
          <div className="mb-5 px-[12px] xl:px-0">
            <div className={`md:w-[556px] w-auto text-center xl:text-start`}>
              <pre
                className="xl:text-p18 text-p12 text-grey-1 whitespace-pre-wrap"
                style={{
                  wordBreak: 'break-word'
                }}
              >
                {description}
              </pre>
            </div>
          </div>

          <div className="flex xl:gap-6 gap-4  mb-[32px] flex-wrap justify-center xl:justify-start">
            {googleMapUrl && (
              <Button
                title={titleMapButon}
                width="xl:w-[268px] w-[240px]"
                height="h-[48px]"
                rounded="rounded-[8px]"
                margin="mt-0"
                textWeight="sm:text-p18-bold text-p14 font-bold"
                onClick={() => window.open(googleMapUrl)}
              />
            )}
            {websiteUrl && (
              <Button
                title={
                  websiteLinkTitle
                    ? websiteLinkTitle
                    : websiteUrl !== ''
                    ? editTextWebsiteUrl()
                    : titleMoreButton
                }
                width="xl:w-[268px]  w-[240px]"
                height="h-[48px]"
                textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                background="bg-[#294F9B]"
                color="text-white"
                margin="mt-0"
                rounded="rounded-[8px]"
                padding="px-4"
                onClick={() => {
                  if (!websiteUrl.match(/^https?:\/\//i)) {
                    window.open('https://' + websiteUrl)
                  } else {
                    window.open(websiteUrl)
                  }
                }}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-[20px] mb-5 justify-center xl:justify-start ">
            <div>
              <InformationItem
                title={
                  distanceYear(establishDate) <= 0
                    ? 'Năm thành lập'
                    : 'Số năm thành lập'
                }
                description={
                  distanceYear(establishDate) <= 0
                    ? new Date(establishDate).getFullYear()
                    : distanceYear(establishDate || 0) + ' năm'
                }
              />
            </div>
            <div>
              <InformationItem
                title="Mức lương lên đến"
                description={convertCurrency(maxSalary || 0)}
              />
            </div>
            <div>
              <InformationItem
                title="Số lượng nhân viên"
                description={`${employeeAmount || 0} người`}
              />
            </div>
            <div>
              <InformationItem
                title="Số vị trí đang tuyển dụng"
                description={`${recruitmentAmount || 0} vị trí`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Information.propTypes = {
  profile: PropTypes.object,
  listImages: PropTypes.array,
  title: PropTypes.string,
  titleMoreButton: PropTypes.string,
  titleMapButon: PropTypes.string
}
Information.defaultProps = {
  profile: {},
  listImages: [],
  title: '',
  titleMoreButton: '',
  titleMapButon: ''
}

export default Information
