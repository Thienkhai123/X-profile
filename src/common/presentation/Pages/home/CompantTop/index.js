import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import { OrgCard } from 'common/presentation/Card'
import useTrans from 'common/hooks/useTrans'
import { useRouter } from 'next/router'

const CompanyTop = (props) => {
  const {
    title,
    id,
    orgs,
    companyName,
    handleRedirectCompanyTop,
    roleId = 0
  } = props
  const trans = useTrans()
  const { push } = useRouter()
  const handleAction = (companyId) => {
    push(`/profile-company/${companyId}`)
  }

  return (
    <div
      className={`w-full ${
        parseInt(roleId) === 1 ? 'bg-yellow-bg' : 'bg-pink-light'
      } pt-[88px] pb-[88px] xl:px-0 px-4 `}
    >
      <div id={id} className="">
        <div className="w-full xl:h-[732px] h-full pb-[60px] px-5 xl:px-[60px] h-auto bg-blue-light rounded-default pt-[56px]  xl:w-[1140px] xl:flex  xl:justify-between xl:pr-0 xl:pl-0 mx-auto">
          <div className="xl:pl-[56px] flex flex-col justify-between sm:w-[483px] w-full mx-auto">
            <div>
              <div className="mb-[32px]">
                <p className="xl:text-h2 text-p20-bold text-white text-center">
                  {title}
                </p>
                <p className="xl:text-h2 text-p20-bold text-button text-center">
                  {companyName}
                </p>
              </div>
              <div className="hidden xl:flex justify-center">
                <Button
                  onClick={handleRedirectCompanyTop}
                  title="Xem tất cả"
                  width="w-[164px] "
                  height="h-[48px]"
                  rounded="rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/background-top-company.png"
                width={440}
                height={270}
                alt=""
                quality={100}
              />
            </div>
          </div>
          <div className="xl:pr-[56px] xl:pl-[28px] xl:flex-1">
            <div className="max-w-auto mx-auto  h-full">
              {orgs?.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center mt-[20px]">
                  <p className="text-p18 text-white text-center">
                    {trans.home.empty.orgs}
                  </p>
                </div>
              )}
              {orgs?.length > 0 && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px] ">
                  {orgs.map((org, ind) => (
                    <OrgCard org={org} key={ind} handleAction={handleAction} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="xl:hidden flex justify-center mt-8">
            <Button title="Xem thêm" width="w-[131px] h-[52px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

CompanyTop.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  orgs: PropTypes.array,
  companyName: PropTypes.string,
  handleRedirectCompanyTop: PropTypes.func
}

CompanyTop.defaultProps = {
  id: '',
  title: '',
  orgs: [],
  companyName: '',
  handleRedirectCompanyTop: () => {}
}

export default CompanyTop
