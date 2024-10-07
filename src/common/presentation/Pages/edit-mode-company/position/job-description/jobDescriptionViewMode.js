import BreadCrumbs from 'common/presentation/breadCrumbs'
import XProfileIcon from 'common/presentation/Icons'
import DescriptionItemEdit from 'common/presentation/Pages/Profile-Company/DescriptionItemEdit'
import DescriptionSalaryEdit from 'common/presentation/Pages/Profile-Company/DescriptionSalaryEdit'
import Image from 'next/image'
import { Fragment } from 'react'
import { convertCurrency } from 'store/helper/functionHelper'

const JobDescriptionViewMode = (props) => {
  const {
    jobDescriptionList,
    toggleModal = () => {},
    pageEditMode,
    profile,
    handleOnChangeAverageSalaryField = () => {},
    handleOnChangeEmployeeAmountField = () => {},
    handleOnChangeMaxSalaryField = () => {
      handleOnChangeMaxSalaryField
    },
    handleResetSalary = () => {},
    errors = null,
    handleResetErrors = () => {}
  } = props
  const { employeeAmount, averageSalary, maxSalary, recruitmentAmount } =
    profile || {}

  return (
    <div className="w-full">
      <div className="">
        <p className="text-h2 text-neutral">Mô tả công việc</p>
      </div>
      <div>
        <div className="w-full grid grid-cols-[25%_50%_25%] gap-6 py-6 border-b border-grey-3 relative">
          <p className="text-p18-bold">Phần việc</p>
          <p className="text-p18-bold">Mô tả công việc</p>
          <p className="text-p18-bold">Vai trò</p>
          {jobDescriptionList?.length > 0 && pageEditMode && (
            <div
              onClick={() => toggleModal()}
              className="absolute right-0 w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
            >
              <XProfileIcon name="pen" />
            </div>
          )}
        </div>
        {jobDescriptionList?.map((el, index) => {
          const { id, name, childs } = el
          return (
            <div
              key={index}
              className={`py-6 border-b  ${
                index === jobDescriptionList.length - 1
                  ? 'border-transparent'
                  : 'border-grey-3'
              }`}
            >
              <div className="grid grid-cols-[25%_75%] ">
                <p className="text-p18">{name}</p>
                <div className="px-6">
                  {childs?.map((childEl, idx) => {
                    const { name, value } = childEl || {}
                    if (idx === 0) {
                      return (
                        <div key={idx} className="grid grid-cols-[75%_25%] ">
                          <p className="text-p18 w-full break-words pr-6">
                            {name}
                          </p>
                          <p className="text-p18">{value}</p>
                        </div>
                      )
                    }
                  })}
                  {childs?.map((childEl, ind) => {
                    const { name, value } = childEl || {}
                    if (ind > 0) {
                      return (
                        <div
                          key={ind}
                          className="grid grid-cols-[75%_25%]  my-6 "
                        >
                          <p className="text-p18 w-full break-words pr-6">
                            {name}
                          </p>
                          <p className="text-p18">{value}</p>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )
        })}
        <p id="JobDescriptionList" className="text-p16 text-semantic-red mt-4">
          {errors?.JobDescriptionList && 'Bạn phải thêm ít nhất một công việc'}
        </p>
        {jobDescriptionList?.length === 0 && pageEditMode && (
          <div
            onClick={() => toggleModal()}
            className="flex items-center gap-2 mt-8 cursor-pointer"
          >
            <XProfileIcon
              name="add"
              width={'24'}
              height={'24'}
              stroke="#294F9B"
            />
            <p className="text-p18-bold text-[#294F9B]">Thêm mô tả</p>
          </div>
        )}
      </div>
      <div className="w-full mt-4 flex gap-4 mb-5 justify-center xl:justify-start ">
        <div className="w-fit">
          <DescriptionItemEdit
            isEdit={pageEditMode}
            maxLength={3}
            title="Số lượng nhân sự"
            description={`${employeeAmount || 0} người`}
            value={employeeAmount}
            defaultDesc="Số lượng"
            require={true}
            width="xl:w-[230px] w-[162px]"
            onChange={handleOnChangeEmployeeAmountField}
            errors={errors?.EmployeeAmount}
          />
          <p
            id="EmployeeAmount"
            className="text-p16 text-semantic-red h-[24px] text-end mt-2"
          >
            {errors?.EmployeeAmount && 'Không được bỏ trống'}
          </p>
        </div>
        <div className="w-fit">
          <DescriptionItemEdit
            isEdit={pageEditMode}
            require={false}
            disable={true}
            value={recruitmentAmount}
            title="Số lượng cần tuyển"
            description={`${recruitmentAmount || 0} người`}
            defaultDesc="Số lượng"
            width="xl:w-[230px] w-[162px]"
          />
        </div>
        <div className="w-fit">
          <DescriptionSalaryEdit
            isEdit={pageEditMode}
            title="Mức lương"
            maxLength={9}
            require={true}
            // description={convertCurrency(averageSalary || 0, false)}
            value={averageSalary}
            maxSalaryValue={maxSalary}
            defaultDesc="Mức lương"
            width="xl:w-[388px] w-[162px]"
            onChange={handleOnChangeAverageSalaryField}
            onChangeMaxSalaryField={handleOnChangeMaxSalaryField}
            handleResetSalary={handleResetSalary}
            errors={errors?.AverageSalary}
          />
          {/* <p
            id="AverageSalary"
            className="text-p16 text-semantic-red h-[24px] text-end mt-2"
          >
            {errors?.AverageSalary && 'Không được bỏ trống'}
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default JobDescriptionViewMode
