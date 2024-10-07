import React, { useEffect, useState } from 'react'
import BlockSelect from '../BlockSelect'
import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  createListUserTemplateOptionValue,
  getUserPortfolio,
  updateActiveStatusUserTemplateOptionValue,
  updateUserPortfolio
} from 'store/app/portfolioSlice'
import { useDispatch } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { delay } from 'store/helper/functionHelper'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import cloneDeep from 'lodash/cloneDeep'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const buttonStyle = {
  title: 'Xác nhận',
  rounded: 'rounded-[8px]',
  background: 'bg-[#F6BB3A]',
  color: 'text-neutral',
  padding: 'py-[10px] px-[20px]',
  height: 'h-auto',
  width: 'w-[240px]',
  textWeight: 'text-p18 font-bold'
}

const BlockModal = (props) => {
  const {
    title = 'Add Block',
    desc = 'Chọn các mẫu thông tin dưới đây để thêm vào hồ sơ của bạn:',
    closeModal = () => {},
    templateOptions = [],
    userPortfolio = {}
  } = props
  const dispatch = useDispatch()
  const { templateOptionValues, portfolioId, templateOptionValueIds } =
    userPortfolio || {}
  const loading = useSelector((state) =>
    selectLoading(
      state,
      APP_TYPES.PORTFOLIO.CREATELISTUSERTEMPLATEOPTIONVALUE ||
        APP_TYPES.PORTFOLIO.UPDATELISTUSERTEMPLATEOPTIONVALUE
    )
  )
  const [selectedTemplates, setSelectedTemplate] = useState([])

  const updateStatusTemplate = async (ids) => {
    if (ids !== templateOptionValueIds) {
      await new Promise(async (resolve) => {
        dispatch(
          updateUserPortfolio({
            portfolioId: portfolioId,
            templateOptionValueIds: ids
          })
        )
        resolve()
      })
    }
    await new Promise(async (resolve) => {
      dispatch(
        updateActiveStatusUserTemplateOptionValue({
          selectedTemplates: selectedTemplates
        })
      )
      resolve()
    }).then(async () => {
      await delay(300)
      await new Promise(async (resolve) => {
        dispatch(getUserPortfolio())
        resolve()
      })
      toast(
        AlertSuccess({
          title: 'Cập nhật thành công',
          description: 'Thông tin của bạn đã được ghi nhận.'
          // information: 'Tìm hiểu thêm'
        }),
        {
          toastId: 'alert-sort-block-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      closeModal()
    })
  }

  const handleSelected = (templateOption) => {
    const existTemplateIndex = selectedTemplates?.findIndex(
      (template) =>
        template.templateOptionId === templateOption.templateOptionId
    )
    if (existTemplateIndex !== -1) {
      let cloneArr = [...selectedTemplates]
      cloneArr[existTemplateIndex] = {
        ...cloneArr[existTemplateIndex],
        isActive: !cloneArr[existTemplateIndex].isActive
      }
      setSelectedTemplate(cloneArr)
    } else {
      setSelectedTemplate([
        ...selectedTemplates,
        { ...templateOption, isActive: true }
      ])
    }
  }

  const submit = async () => {
    if (templateOptionValues.length > 0) {
      const findMissingElement = templateOptions.filter((el) => {
        const filterEl = templateOptionValues.find(
          (elVal) => elVal.templateOptionId === el.templateOptionId
        )
        if (filterEl) {
          return filterEl
        }
      })
      const tempArrOptionActiveIds = findMissingElement.map(
        (el) => el.templateOptionId
      )

      if (tempArrOptionActiveIds.length < templateOptions.length) {
        const findElementNotExist = templateOptions.find((el) => {
          if (!tempArrOptionActiveIds.includes(el.templateOptionId)) {
            return el
          }
        })
        if (findElementNotExist) {
          const { templateOptionId } = findElementNotExist
          const newCreatePayload = selectedTemplates.filter(
            (el) => el.templateOptionId === templateOptionId
          )

          if (newCreatePayload.length > 0) {
            const createNewPayload = []
            newCreatePayload.map((el) => {
              const {
                templateOptionId,
                templateOptionType,
                placeholder,
                isActive,
                templateOptionName
              } = el
              createNewPayload.push({
                templateOptionId: templateOptionId,
                templateOptionType: templateOptionType,
                portfolioId: portfolioId,
                templateOptionName: templateOptionName,
                value: placeholder,
                isActive: isActive
              })
            })
            const updateUserPayload = {
              portfolioId,
              templateOptionValueIds:
                templateOptionValueIds + ',' + templateOptionId
            }
            dispatch(updateUserPortfolio(updateUserPayload))

            await new Promise(async (resolve) => {
              dispatch(createListUserTemplateOptionValue(createNewPayload))
              resolve()
            }).then(() => {
              updateStatusTemplate()
            })
          } else {
            const {
              templateOptionId,
              templateOptionType,
              placeholder,
              templateOptionName
            } = findElementNotExist
            await new Promise(async (resolve) => {
              dispatch(
                createListUserTemplateOptionValue([
                  {
                    templateOptionId: templateOptionId,
                    templateOptionType: templateOptionType,
                    portfolioId: portfolioId,
                    templateOptionName: templateOptionName,
                    value: placeholder,
                    isActive: false
                  }
                ])
              )
              resolve()
            }).then(() => {
              updateStatusTemplate()
            })
          }
        }
      } else {
        if (
          tempArrOptionActiveIds?.length >
          templateOptionValueIds?.split(',')?.length
        ) {
          const newIds = tempArrOptionActiveIds?.toString()
          updateStatusTemplate(newIds)
        } else {
          updateStatusTemplate(templateOptionValueIds)
        }
      }
    } else {
      // Update Position Blocks By Id
      const templateOptionIds = templateOptions?.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          currentValue.templateOptionId
        ],
        []
      )

      const updateUserPayload = {
        portfolioId,
        jobId: null,
        description: '',
        templateOptionValueIds: templateOptionIds?.toString() || ''
      }

      dispatch(updateUserPortfolio(updateUserPayload))

      // Create New User Blocks Template
      const cloneTemplateOptions = [...templateOptions]
      selectedTemplates.map((selectTemplate) => {
        const templateIndex = cloneTemplateOptions.findIndex(
          (el) => el.templateOptionId === selectTemplate.templateOptionId
        )
        if (templateIndex !== -1) {
          cloneTemplateOptions[templateIndex].isActive = selectTemplate.isActive
        }
      })

      const createPayload = cloneTemplateOptions.map((template) => {
        return {
          templateOptionId: template.templateOptionId,
          templateOptionType: template.templateOptionType,
          portfolioId: portfolioId,
          templateOptionName: template.templateOptionName,
          value: template.placeholder,
          isActive: template.isActive
        }
      })

      const fetchCreateUsertemplate = await dispatch(
        createListUserTemplateOptionValue(createPayload)
      )
      const { data } = unwrapResult(fetchCreateUsertemplate)

      // Create children template for CareerTarget (Add Button not exist)
      if (data) {
        const findTargetDescription = data.find(
          (el) => el.templateOptionName === 'CareerTarget'
        )
        const { templateOptionValueId } = findTargetDescription || {}
        const findTargetDescriptionTemplate = cloneTemplateOptions.find(
          (el) => el.templateOptionName === 'CareerTarget'
        )
        const { templateOptionId, templateOptionType, templateOptionName } =
          findTargetDescriptionTemplate.children['CareerTargetDescription']

        const createPayloadChildren = [
          {
            parentId: templateOptionValueId,
            templateOptionId: templateOptionId,
            templateOptionType: templateOptionType,
            portfolioId: portfolioId,
            templateOptionName: templateOptionName,
            value: '',
            isActive: true
          }
        ]
        const fetchCreateUserChildrenTemplate = await dispatch(
          createListUserTemplateOptionValue(createPayloadChildren)
        )
        const result = unwrapResult(fetchCreateUserChildrenTemplate)
        if (result.data) {
          // Get UserPortfolio and Close Modal after create success
          await dispatch(getUserPortfolio())
          closeModal()
        }
      }
    }
  }

  useEffect(() => {
    if (templateOptionValues?.length > 0) {
      const cloneTemplateOptions = cloneDeep(templateOptionValues)
      const tempArr = []
      templateOptions?.map((el) => {
        const { templateOptionId } = el || {}
        const findEl = cloneTemplateOptions?.find(
          (opt) => opt?.templateOptionId === templateOptionId
        )
        if (findEl) {
          tempArr.push(findEl)
        }
      })
      const sortArr = tempArr?.sort(
        (a, b) => Number(a.isActive) - Number(b.isActive)
      )
      setSelectedTemplate(sortArr)
    } else {
      setSelectedTemplate(templateOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative">
      <div className="sm:px-[63px] px-1 sm:py-[34px] py-1 max-h-[80vh] overflow-y-scroll custom-scrollbar relative">
        <p className="text-p20-bold">{title}</p>
        <p className="text-p16 text-grey-1 mt-2">{desc}</p>
        <div className="mt-8 flex flex-col gap-6">
          {selectedTemplates?.map((template) => {
            const {
              value,
              templateOptionId,
              templateOptionName,
              isActive,
              placeholder
            } = template || {}

            return (
              <div
                onClick={() => handleSelected(template)}
                key={templateOptionId}
              >
                <BlockSelect
                  title={value || placeholder}
                  status={isActive}
                  templateOptionName={templateOptionName}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className=" pt-4 absolute bottom-0 left-0 w-full  -translateX-[50%] bg-white flex justify-center">
        <Button
          margin="m-0"
          {...buttonStyle}
          onClick={submit}
          disabled={loading}
        />
      </div>
    </div>
  )
}

BlockModal.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  closeModal: PropTypes.func,
  templateOptions: PropTypes.array,
  userPortfolio: PropTypes.object
}

export default BlockModal
