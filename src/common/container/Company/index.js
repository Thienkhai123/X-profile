import Head from 'next/head'
import Image from 'next/image'
import CompanyChart from './CompanyChart'
import HowToUse from './HowToUse'
import RenewRecruitment from './RenewRecruitment'
import SolutionRecruitment from './SolutionRecruitment'
import { useEffect, useState } from 'react'
import FloatItCareers from 'common/presentation/FloatItCareers'
import CompanyBoard from './CompanyBoard'
import { BlockPackages } from './Packages'
import { selectUserProfile } from 'store/app/userSlice'
import { useSelector } from 'react-redux'

const CompanyPage = () => {
  const [floatingCareers, setFloatingCareers] = useState(false)
  const userProfile = useSelector(selectUserProfile)
  const { ownedCompany } = userProfile || {}
  const { companyId, tag, name } = ownedCompany || {}
  const handleCreateProfile = () => {
    window.open(process.env.NEXT_PUBLIC_LMS + 'User/Register')
  }
  const handleCloseFloatingCareers = () => {
    setFloatingCareers(false)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setFloatingCareers(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="flex-1">
      <Head>
        <title>X-Profile - Giải pháp xây dựng thương hiệu tuyển dụng</title>
      </Head>
      {floatingCareers && (
        <div className="hidden xl:block">
          <FloatItCareers
            handleCloseFloatingCareers={handleCloseFloatingCareers}
          />
        </div>
      )}
      <CompanyBoard />
      <SolutionRecruitment handleCreateProfile={handleCreateProfile} />
      <RenewRecruitment />

      <div className="bg-white">
        <BlockPackages />
      </div>

      <HowToUse />
      <div className="">
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
    </div>
  )
}

export default CompanyPage
