import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'common/presentation/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkillCompanySoftSkillPosition } from 'store/app/edit-mode-company/position/softSkillSlice'

const ModalEdit = (props) => {
  const {
    percentValue,
    id,
    ind,
    submit,
    onClickCancel,
    title = '',
    examList = [],
    titleModal = 'Chỉnh sửa  kỹ năng ',
    isDisplayChart = false
  } = props

  const schema = yup.object().shape({
    passScore: yup
      .string()
      .required('Vui lòng điền nội dung bạn nhé!')
      .matches(/^[0-9]*$/g, 'Giá trị không hợp lệ')
      .test('positive', 'Giá trị tối thiểu: 0', (value) => value >= 0)
      .test('max-length', 'Giá trị tối đa: 100', (value) => value <= 100)
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      index: ind,
      id: id,
      passScore: percentValue,
      isDisplayChart: isDisplayChart
    },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const { passScore } = watch() || {}

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mt-[40px]">
        {/* <p className="text-h2 text-neutral mb-4 text-start">{titleModal}</p> */}
        <div className="mb-4">
          <p className="text-p18 text-neutral mb-2">
            Tên kỹ năng: <span className="text-red-500">*</span>
          </p>
          <input
            defaultValue={title}
            placeholder="Nhập tên kỹ năng"
            className="rounded-[8px] py-2 px-6 w-full outline-0 border border-stoke "
            disabled
          />
        </div>
        <div>
          <p className="text-p18 text-neutral mb-2">
            Mức độ yêu cầu: <span className="text-red-500">*</span>
          </p>

          <div className="relative">
            <p className="sm:text-p18 text-p14 text-button">{passScore}</p>
            <input
              id="default-range"
              type="range"
              min={0}
              max={100}
              step={5}
              defaultValue={20}
              className="accent-button w-full  h-2  rounded-lg  cursor-pointer dark:bg-gray-700"
              {...register('passScore')}
            />
          </div>

          <p className="text-p14 text-red-500 mb-2 h-[22px]">
            {errors.passScore?.message}
          </p>
        </div>

        <div>
          <p className="text-p18 text-neutral mb-[16px]">
            Chọn bài test phù hợp: <span className="text-red-500">*</span>
          </p>
          <div className="flex justify-start mb-[24px] gap-[80px]">
            <div className="flex items-center gap-[8px]">
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="Bài test của bạn"
                className="w-[24px] h-[24px] border border-button"
              />
              <label
                className="sm:text-p18 text-p14 text-grey-1"
                htmlFor="html"
              >
                Bài test của bạn
              </label>
            </div>
            <div className="flex items-center gap-[8px]">
              <input
                type="radio"
                id="html1"
                name="fav_language"
                value="Bài test từ X-Profile"
                className="w-[24px] h-[24px] border border-button "
              />
              <label
                className="sm:text-p18 text-p14 text-grey-1"
                htmlFor="html1"
              >
                Bài test từ X-Profile
              </label>
            </div>
          </div>
          <select
            {...register('examId')}
            disabled={examList?.length === 0}
            className="rounded-[8px] py-2 px-6 w-full outline-0 border border-stoke bg-grey-4"
          >
            {examList?.length === 0 && (
              <option value={null} className="hidden">
                Chưa có bài kiểm tra nào...
              </option>
            )}
          </select>
          <p className="text-p14 text-red-500 mb-2 h-[22px]">
            {errors.examId?.message}
          </p>
        </div>

        {/* <div className="mb-10 flex gap-2 items-center mt-[8px]">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              {...register('isDisplayChart')}
            />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#F6BB3A]"></div>
            <span class="text-p18 ml-[16px]">
              Cho phép hiển thị ở bảng mức độ phù hợp
            </span>
          </label>
        </div> */}
      </div>
      <div className="flex justify-end gap-[16px] mt-[18px]">
        <Button
          title="Hủy"
          width="w-[99px]"
          margin="m-0"
          padding="py-2"
          background="bg-[#E6E6E6]"
          // color="text-white"
          height="h-[56px]"
          rounded="rounded-[8px]"
          onClick={() => onClickCancel()}
          textWeight={'sm:text-p18-bold text-p14-bold'}
        />
        <Button
          title="Cập nhật"
          width="w-[115px]"
          margin="m-0"
          padding="py-2"
          background="bg-button"
          // color="text-white"
          height="h-[56px]"
          rounded="rounded-[8px]"
          // onClick={onClickSaveSkill}
          textWeight={'sm:text-p18-bold text-p14-bold'}
        />
      </div>
    </form>
  )
}

ModalEdit.propTypes = {}
ModalEdit.defaultProps = {}

export default ModalEdit
