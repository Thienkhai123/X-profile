import Button from 'common/presentation/Button'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'

const BannerPositionViewMode = (props) => {
  const {
    breadCrumbsTitle,
    profilePosition,
    toggleModal = () => {},
    toggleModal2 = () => {},
    toggleModalDetail = () => {},
    seenNumber = 0
  } = props
  const { meta, name, shortDescription, imageUrl } = profilePosition || {}
  const { avatarUrl } = meta || {}

  return (
    <div className="max-w-[1140px] mx-auto ">
      <div className=" sm:flex items-center gap-[64px] max-w-[1140px]">
        <div className="block sm:hidden mb-5">
          <BreadCrumbs
            type={true}
            nameList={breadCrumbsTitle}
            styleBread="text-grey-1 text-p14"
            textBreadLast="text-grey-1 text-p14"
            classNameType="text-grey-1 text-p14"
          />
        </div>
        <div className="absolute bottom-0 right-0 hidden xl:block">
          <Image
            src={'/images/absoluteBottomBanner.png'}
            width={344}
            height={168}
            alt=""
            objectFit="cover"
          />
        </div>
        <div className="flex gap-[4px] items-center absolute top-[52px]">
          <XProfileIcon name="eyeProfileCompany" />
          <p className="text-p16 text-grey-1">{seenNumber}</p>
        </div>
        {avatarUrl ? (
          <div className="sm:w-[514px] w-[340px] sm:h-[310px] h-[204.59px]  sm:mx-0 mx-auto relative rounded-[8px]  sm:mb-0 mb-[20px]">
            <div className="hidden md:block absolute -bottom-[48px] -left-10">
              <Image
                // placeholder="blur"
                // blurDataURL="/images/banner-profile-bottom.png"
                src={'/images/banner-profile-bottom.png'}
                width={122}
                height={90.31}
                alt=""
                objectFit="contain"
              />
            </div>
            <div className="hidden md:block absolute  -top-[44px] -right-10 ">
              <Image
                src={'/images/banner-profile-top.png'}
                width={91.43}
                height={83.72}
                objectFit="contain"
                alt=""
              />
            </div>
            <Image
              src={avatarUrl || '/images/default-avatar'}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-lg bg-white"
            />
          </div>
        ) : (
          <div className="sm:w-[514px] w-[340px] sm:h-[310px] h-[204.59px]  sm:mx-0 mx-auto relative rounded-[8px]  sm:mb-0 mb-[20px]">
            <div className="hidden md:block absolute -bottom-[48px] -left-10">
              <Image
                src={'/images/banner-profile-bottom.png'}
                width={122}
                height={90.31}
                alt=""
                objectFit="contain"
              />
            </div>
            <div className="hidden md:block absolute -top-[44px] -right-10 ">
              <Image
                src={'/images/banner-profile-top.png'}
                width={91.43}
                height={83.72}
                objectFit="contain"
                alt=""
              />
            </div>

            <div
              htmlFor="input-file-avatar"
              className="relative w-full h-full flex justify-center items-center border border-[#EBB14C80] rounded-lg bg-white"
            >
              <Image
                src={'/images/uploadAvatarEdit.png'}
                height={100}
                width={100}
                objectFit="contain"
                alt=""
                quality={100}
                className="rounded-lg bg-white"
              />
            </div>
          </div>
        )}

        <div className="max-w-[552px]">
          <div className="hidden xl:block mb-5">
            <BreadCrumbs
              type={true}
              nameList={breadCrumbsTitle}
              styleBread="text-grey-1 text-p14"
              textBreadLast="text-grey-1 text-p14"
              classNameType="text-grey-1 text-p14"
            />
          </div>
          <div className="mb-3 sm:text-center text-start xl:text-start">
            <p className="xl:text-h1 text-p20-bold font-bold text-neutral">
              {name || 'Nhập tên vị trí'}
            </p>
          </div>

          <div className="xl:w-[500px] text-start mb-6">
            <p
              style={{
                wordBreak: 'break-word'
              }}
              className="sm:text-p18 text-p12 text-grey-1"
            >
              {shortDescription || 'Nhập mô tả vị trí'}
            </p>
          </div>
          {profilePosition?.currentRecruitmentCampaignId && (
            // <Button
            //   title="Tắt tin tuyển dụng"
            //   width="w-auto py-7 px-[52px]"
            //   onClick={toggleModal2}
            // />
            <Button
              title="Xem chi tiết tuyển dụng"
              width="w-auto"
              height="h-14"
              padding="py-[13px] px-8"
              color="text-button"
              background="bg-white"
              hover="hover:bg-[#FBECCA] transition-all"
              textWeight="text-p18-bold"
              rounded="rounded-lg border border-button"
              onClick={() => toggleModalDetail()}
            />
          )}
          {!profilePosition?.currentRecruitmentCampaignId && (
            <Button
              title="Bật tuyển dụng"
              width="w-auto py-7 px-[52px]"
              onClick={toggleModal}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BannerPositionViewMode
