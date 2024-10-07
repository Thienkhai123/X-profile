import BreadCrumbs from 'common/presentation/breadCrumbs'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const BannerDepartmentViewMode = (props) => {
  const { breadCrumbsTitle, profileDepartment, seenNumber } = props
  const {
    imageUrl,
    name,
    shortDescription,
    meta,
    departmentPositionId,
    avatarUrl
  } = profileDepartment || {}
  return (
    <div className="max-w-[1140px] mx-auto">
      <div className=" sm:flex items-center gap-[40px] max-w-[1140px]">
        <div className="block sm:hidden mb-5">
          <BreadCrumbs type={true} nameList={breadCrumbsTitle} />
        </div>
        <div className="absolute top-[88px] right-[72px] hidden xl:block">
          <Image
            src={'/images/banner-profile-top.png'}
            width={140}
            height={168}
            alt=""
            // objectFit="cover"
          />
        </div>

        <div className="flex gap-[4px] items-center absolute top-[52px]">
          <XProfileIcon name="eyeProfileCompany" />
          <p className="text-p16 text-grey-1">{seenNumber}</p>
        </div>
        {imageUrl ? (
          <div className="sm:w-[514px] w-[340px] sm:h-[310px] h-[204.59px]  sm:mx-0 mx-auto relative rounded-[8px]  sm:mb-0 mb-[20px]">
            {/* <div className="hidden md:block absolute -bottom-9 -left-10">
              <Image
                src={'/images/banner-profile-bottom.png'}
                width={122}
                height={90.31}
                alt=""
                objectFit="contain"
              />
            </div>
            <div className="hidden md:block absolute -top-9 -right-10 ">
              <Image
                src={'/images/banner-profile-top.png'}
                width={91.43}
                height={83.72}
                objectFit="contain"
                alt=""
              />
            </div> */}
            <Image
              src={imageUrl}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-lg bg-white"
            />
          </div>
        ) : (
          <div className="sm:w-[515px] w-[340px] sm:h-[310px] h-[204.59px]  sm:mx-0 mx-auto relative rounded-[8px]  sm:mb-0 mb-[20px]">
            {/* <div className="hidden md:block absolute -bottom-9 -left-10">
              <Image
                src={'/images/banner-profile-bottom.png'}
                width={122}
                height={90.31}
                alt=""
                objectFit="contain"
              />
            </div>
            <div className="hidden md:block absolute -top-9 -right-10 ">
              <Image
                src={'/images/banner-profile-top.png'}
                width={91.43}
                height={83.72}
                objectFit="contain"
                alt=""
              />
            </div> */}

            <div
              htmlFor="input-file-avatar"
              className="relative w-full h-full flex flex-col justify-center items-center  border-custom-img-deparment rounded-lg "
            >
              <div className="relative w-[100px] xl:h-[100px]">
                <Image
                  src="/images/uploadAvatarEdit.png"
                  height={300}
                  width={300}
                  objectFit="contain"
                  alt=""
                  quality={100}
                />
              </div>

              <p className="text-p28-bold text-button mt-6">Thêm ảnh</p>
              <p className="hidden xl:block w-[142px] text-p16 text-neutral ">
                hoặc kéo và thả
              </p>
            </div>
          </div>
        )}

        <div className="max-w-[552px]">
          <div className="hidden xl:block mb-5">
            <BreadCrumbs type={true} nameList={breadCrumbsTitle} />
          </div>
          <div className="mb-3 sm:text-center text-start xl:text-start">
            <p className="xl:text-h1 text-p20-bold font-bold text-neutral">
              {name || 'Nhập Tên Phòng Ban'}
            </p>
          </div>

          <div className="xl:w-[500px] text-start mb-6">
            <p
              style={{
                wordBreak: 'break-word'
              }}
              className="sm:text-p18 text-p12 text-grey-1 "
            >
              {shortDescription || 'Nhập mô tả phòng ban'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerDepartmentViewMode
