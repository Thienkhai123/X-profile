import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import PropressBar from 'common/presentation/ProgressBar'
import { useSelector } from 'react-redux'
import { selectDataPersennal } from 'store/app/companySlice'
import XProfileIcon from 'common/presentation/Icons'

const Price = (props) => {
  const { priceList = ['1', '1', '1'] } = props
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[16px]">
        <div>
          <XProfileIcon name="priceCompany" />
        </div>
        <div>
          <p className="text-[#76E6A0] text-p20-bold">Mức lương</p>
        </div>
      </div>
      {priceList?.map((item, ind) => {
        return (
          <div key={ind} className="flex flex-col gap-[8px]">
            <div className="flex gap-[16px] items-center">
              <div className="w-[100px]">
                <p className="text-p28-bold text-white">{item?.present}%</p>
              </div>
              <div className="w-[120px]">
                <PropressBar
                  height="h-[6px]"
                  background="bg-[#76E6A0]"
                  backgroundOut="bg-[#051442]"
                  type={1}
                  skillMatchingPercentage={item?.present}
                  percentValue={100}
                />
              </div>
            </div>
            <div>
              <p className="text-p16 text-white leading-[28px]">
                {item?.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Development = (props) => {
  const { developmentList = ['1', '1', '1'] } = props
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[16px]">
        <div>
          <XProfileIcon name="developmentCompany" />
        </div>
        <div>
          <p className="text-[#F6BB3A] text-p20-bold">Cơ hội phát triển</p>
        </div>
      </div>
      {developmentList?.map((item, ind) => {
        return (
          <div key={ind} className="flex flex-col gap-[8px]">
            <div className="flex gap-[16px] items-center">
              <div className="w-[100px]">
                <p className="text-p28-bold text-white">{item?.present}%</p>
              </div>
              <div className="w-[120px]">
                <PropressBar
                  height="h-[6px]"
                  background="bg-[#F6BB3A]"
                  backgroundOut="bg-[#051442]"
                  type={1}
                  skillMatchingPercentage={item?.present}
                  percentValue={100}
                />
              </div>
            </div>
            <div>
              <p className="text-p16 text-white leading-[28px]">
                {item?.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Management = (props) => {
  const { managementList = ['1', '1', '1'] } = props
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[16px]">
        <div>
          <XProfileIcon name="managementCompany" />
        </div>
        <div>
          <p className="text-[#69ADF9] text-p20-bold">Quản lý trực tiếp</p>
        </div>
      </div>
      {managementList?.map((item, ind) => {
        return (
          <div key={ind} className="flex flex-col gap-[8px]">
            <div className="flex gap-[16px] items-center">
              <div className="w-[100px]">
                <p className="text-p28-bold text-white">{item?.present}%</p>
              </div>
              <div className="w-[120px]">
                <PropressBar
                  height="h-[6px]"
                  background="bg-[#69ADF9]"
                  backgroundOut="bg-[#051442]"
                  type={1}
                  skillMatchingPercentage={item?.present}
                  percentValue={100}
                />
              </div>
            </div>
            <div>
              <p className="text-p16 text-white leading-[28px]">
                {item?.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Culture = (props) => {
  const { cultureList = ['1', '1', '1'] } = props
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[16px]">
        <div>
          <XProfileIcon name="cultureCompany" />
        </div>
        <div>
          <p className="text-[#FF8514] text-p20-bold">Văn hóa công ty</p>
        </div>
      </div>
      {cultureList?.map((item, ind) => {
        return (
          <div key={ind} className="flex flex-col gap-[8px]">
            <div className="flex gap-[16px] items-center">
              <div className="w-[100px]">
                <p className="text-p28-bold text-white">{item?.present}%</p>
              </div>
              <div className="w-[120px]">
                <PropressBar
                  height="h-[6px]"
                  background="bg-[#FF8514]"
                  backgroundOut="bg-[#051442]"
                  type={1}
                  skillMatchingPercentage={item?.present}
                  percentValue={100}
                />
              </div>
            </div>
            <div>
              <p className="text-p16 text-white leading-[28px]">
                {item?.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Welfare = (props) => {
  const { welfareList = ['1', '1', '1'] } = props
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-[16px]">
        <div>
          <XProfileIcon name="welfareCompany" />
        </div>
        <div>
          <p className="text-[#FF14AF] text-p20-bold">Phúc lợi cho nhân viên</p>
        </div>
      </div>
      {welfareList?.map((item, ind) => {
        return (
          <div key={ind} className="flex flex-col gap-[8px]">
            <div className="flex gap-[16px] items-center">
              <div className="w-[100px]">
                <p className="text-p28-bold text-white">{item?.present}%</p>
              </div>
              <div className="w-[120px]">
                <PropressBar
                  height="h-[6px]"
                  background="bg-[#FF14AF]"
                  backgroundOut="bg-[#051442]"
                  type={1}
                  skillMatchingPercentage={item?.present}
                  percentValue={100}
                />
              </div>
            </div>
            <div>
              <p className="text-p16 text-white leading-[28px]">
                {item?.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const PersonnelFactors = (props) => {
  const { type } = props
  const dataPersonnal = useSelector(selectDataPersennal)

  const typeFactors = (props) => {
    const { type, priceList } = props

    switch (type) {
      case 0:
        return <Price priceList={priceList} />
      case 1:
        return <Development developmentList={priceList} />
      case 2:
        return <Management managementList={priceList} />
      case 3:
        return <Culture cultureList={priceList} />
      case 4:
        return <Welfare welfareList={priceList} />
      default:
        break
    }
  }

  return (
    <div className="grid gap-[24px] xl:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <div className="my-auto mx-auto">
        <div className="relative w-[319px] h-[316px]">
          <Image
            alt=""
            src="/images/company/companyPersonnel.png"
            layout="fill"
            quality={100}
          />
        </div>
      </div>
      {dataPersonnal?.map((element, ind) => {
        return (
          <div
            key={ind}
            className="w-full h-[484px] bg-[#162A66] border border-[#2E50B0] rounded-[24px] p-[32px]"
          >
            <div>{typeFactors({ ...element })}</div>
          </div>
        )
      })}
    </div>
  )
}

PersonnelFactors.propTypes = {}

export default PersonnelFactors
