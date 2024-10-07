import Button from 'common/presentation/Button'
import Image from 'next/image'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectUserProfile } from 'store/app/userSlice'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
import { convertToRaw, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { sendApply } from 'store/app/campaign'
import { async } from '@firebase/util'
import { getUserStatus } from 'store/app/departmentPositionSlice'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mode) => mode.Editor),
  { ssr: false }
)

const ApplyModal = (props) => {
  const {
    profile,
    profileCompany,
    recruitment,
    departmentPositionId,
    setApplyModal,
    applyModal
  } = props
  const userProfile = useSelector(selectUserProfile)
  const { name, userMatchingPercentage } = profile || {}
  const { avatarUrl: companyAvatar, name: companyName } = profileCompany || {}
  const { avatarUrl, name: userName } = userProfile || {}
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const isEmpty =
    convertToRaw(editorState.getCurrentContent()).blocks.length === 1 &&
    convertToRaw(editorState.getCurrentContent()).blocks[0].text === ''

  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    setEditorState(e)
  }
  const handleClickSubmit = async () => {
    if (!isEmpty) {
      const { recruitmentCampaignId } = recruitment.find(
        (e) => e.departmentPositionId === parseInt(departmentPositionId)
      )
      const res = await dispatch(
        sendApply({
          coverLetter: stateToHTML(editorState.getCurrentContent()),
          recruitmentCampaignId: recruitmentCampaignId
        })
      )
      if (!res?.payload?.isSuccess) {
        setApplyModal({
          ...applyModal,
          error: true,
          open: false,
          errorMessage: res?.payload?.errorMessage
        })
      } else {
        setApplyModal({ ...applyModal, success: true, open: false })
        dispatch(
          getUserStatus({
            id: departmentPositionId
          })
        )
      }
    }
  }

  return (
    <div className="bg-white  w-full  xl:p-10 p-[8px]">
      <div className="mx-auto w-fit mb-8">
        <p className="text-h3 text-neutral">
          Ứng tuyển vị trí{' '}
          <span className="text-semantic-text-link">{name}</span>
        </p>
      </div>
      <div className="flex justify-center items-center bg-nude rounded-xl py-5 mb-8">
        <div className="grid xl:grid-cols-3   items-center gap-6">
          <div>
            <div className="flex flex-col items-center">
              <div className="rounded-full w-[60px] h-[60px] overflow-hidden relative">
                <Image
                  src={avatarUrl}
                  alt="avatar-user"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-p16 break-words line-clamp-2 break-words max-w-[200px]">
                {userName}
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <div className="rotate-90 xl:rotate-0  sm:w-[200px] min-w-[50px] h-[24px] overflow-hidden relative">
                <Image
                  src="/images/longArrow.png"
                  alt="avatar-user"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {/* <p className="text-p14 font-bold text-semantic-text-link">
                {`${userMatchingPercentage}%  phù hợp`}
              </p> */}
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center px-4">
              <div className="rounded-full w-[60px] h-[60px] overflow-hidden relative">
                <Image
                  src={companyAvatar}
                  alt="avatar-user"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-p16 text-center">{companyName}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-p18-bold text-grey-1 mb-5">
          Hãy gửi thư ứng tuyển và đính kèm link CV của bạn ở đây nhé
        </p>
        <div className="border border-grey-4 rounded-md">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            editorClassName="min-h-[200px]"
          />
        </div>
        {isEmpty && (
          <p className="text-semantic-red">Mô tả không được bỏ trống</p>
        )}
      </div>
      <div className="flex justify-center items-center mt-8 w-full">
        <Button
          title="Ứng tuyển ngay"
          rounded="rounded-xl"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          margin="m-0"
          padding="py-[10px] px-[20px]"
          height="h-auto"
          width="min-w-[180px]"
          textWeight={'text-p18 font-bold'}
          onClick={handleClickSubmit}
          disabled={isEmpty}
          // disabled={isEditing}
        />
      </div>
    </div>
  )
}

ApplyModal.propTypes = {}

export default ApplyModal
