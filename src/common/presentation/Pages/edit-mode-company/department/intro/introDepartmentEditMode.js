import Image from 'next/image'
import IntroDepartmentFunFactEditMode from './introDepartmentFunFactEditMode'
import { useDispatch } from 'react-redux'
import {
  updateAvatarUrl,
  updateProfileEdit
} from 'store/app/edit-mode-company/department/introSlice'
import TextareaAutosize from 'react-textarea-autosize'

const IntroDepartmentEditMode = ({
  profileEdit = {},
  toggleModal = () => {},
  openFunfact = false,
  toggleModalFunfact = () => {},
  funfacts = [],
  errors = '',
  handleResetErrors = () => {},
  isFunfactsNull
}) => {
  const { description, avatarUrl } = profileEdit || {}
  const dispatch = useDispatch()
  const handleUploadAvatarUrl = (file) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        dispatch(updateAvatarUrl(reader.result))
        toggleModal()
      })
    }
  }

  const handleChangeDescription = (val) => {
    dispatch(
      updateProfileEdit({
        ...profileEdit,
        description: val
      })
    )
    handleResetErrors('Description')
  }
  return (
    <div className="xl:w-[1140px] w-full mx-auto md:flex gap-5 xl:mt-0 mt-4">
      <div className="flex gap-8 md:w-1/2 w-full">
        <div id="Description" className="pt-8 xl:pt-[52px] flex-1">
          <p className="text-h2 text-neutral mb-5">Đôi nét về Team</p>
          <TextareaAutosize
            className={`text-p18 peer  hover:border-b transition-all text-grey-1 w-full p-4 outline-0 resize-none focus:border-b  focus:transition-all focus:duration-500 custom-scrollbar-none-border bg-transparent
            ${
              errors?.Description
                ? 'border-b border-semantic-red'
                : 'border-b border-transparent hover:border-semantic focus:border-semantic'
            }`}
            maxLength={400}
            defaultValue={description}
            rows={5}
            onChange={(e) => handleChangeDescription(e.target.value)}
          />
          {errors?.Description && (
            <p className="text-p16 text-end text-semantic-red h-[28px]">
              {errors?.Description}
            </p>
          )}
          <p className="opacity-0 peer-focus:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
            {400 - (description?.length || 0)}
          </p>
        </div>
      </div>
      <IntroDepartmentFunFactEditMode
        funfacts={funfacts}
        isFunfactsNull={isFunfactsNull}
        profileEdit={profileEdit}
        openFunfact={openFunfact}
        toggleModalFunfact={toggleModalFunfact}
        errors={errors}
        handleResetErrors={handleResetErrors}
      />
    </div>
  )
}

export default IntroDepartmentEditMode
