import { GUEST_ROUTES } from 'common/config/app.constants'
import FooterCompany from 'common/container/Footer/footerCompany'
import NavbarCompany from 'common/container/Header/navbarCompany'
import MetaSeo from 'common/container/meta-seo'
import useModal from 'common/hooks/useModal'
import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'
import ButtonIcon from 'common/presentation/ButtonIcon'
import XProfileIcon from 'common/presentation/Icons'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import Modal from 'common/presentation/Modal'
import BlockContentProfileViewMode from 'common/presentation/Pages/applicant-profile/BlockContentProfileViewMode'
import HintQuestion from 'common/presentation/Pages/applicant-profile/HintQuestion'
import ProfilePublicInviteModal from 'common/presentation/Pages/applicant-profile/ProfilePublicInviteModal'
import ProfileView from 'common/presentation/Pages/applicant-profile/ProfileView'
import EmptyTemplate from 'common/presentation/Pages/applicant-profile/TemplateContainer/EmptyTemplate'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import { getJobByJobCategory } from 'store/app/jobSlice'
import {
  getAchivementImages,
  getAllLanguages,
  getAllQuestionHints,
  getAllSkillV2,
  getAllTemplateOption,
  getAllUserSkillByTagName,
  getUserApplyStatus,
  getUserPortfolio,
  selectAllQuestionHints,
  selectAllTemplateOptions,
  selectApplyStatus,
  selectLanguages,
  selectSkillsAdvance,
  selectSkillsCommon,
  selectTemplateForDndViewMode
} from 'store/app/portfolioSlice'
import { getProfile, selectUserProfile } from 'store/app/userSlice'
import { delay } from 'store/helper/functionHelper'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'

const FIELDLIST = [
  { name: 'facebook', icon: 'socialFacebook', title: 'Facebook', type: 1 },
  // { name: 'youtube', icon: 'socialYoutube', title: 'Youtube' },
  { name: 'linkedin', icon: 'socialLinkedIn', title: 'LinkedIn', type: 2 }
  // { name: 'instagram', icon: 'socialInstagram', title: 'Instagram' }
]

const generateLinkPublish = (tag) => {
  if (process.env.NODE_ENV === 'production') {
    const PREFIX = 'https://'
    const SUFFIX = '.bio'
    return PREFIX + tag + process.env.NEXT_PUBLIC_DOMAIN + SUFFIX
  } else {
    return process.env.NEXT_PUBLIC_HOST_URL + 'profile/' + tag
  }
}

const renderIconsSocial = (name = '', url = '', type = 0) => {
  switch (type) {
    case 1:
      return (
        <FacebookShareButton
          id="shareFacebookPortfolio"
          url={url}
          quote="Portfolio"
          className="Demo__some-network__share-button"
        >
          <XProfileIcon name={name} fill="#000000" />
        </FacebookShareButton>
      )
    case 2:
      return (
        <LinkedinShareButton
          id="shareLinkedinPortfolio"
          url={url}
          quote="Portfolio"
          className="Demo__some-network__share-button"
        >
          <XProfileIcon name={name} fill="#000000" />
        </LinkedinShareButton>
      )
    default:
      return <></>
  }
}

const UserPublicProfile = (props) => {
  const { data } = props || {}
  const { templateOptionValueIds, user, templateOptionValues, metadata } =
    data || {}
  const dispatch = useDispatch()
  const trans = useTrans()
  const { HEADER, FOOTER, APPLICANT_PROFILE } = trans
  const { pathname, query } = useRouter()
  const { guiId } = query || {}
  const userProfile = useSelector(selectUserProfile)
  const templateForDnd = useSelector((state) =>
    selectTemplateForDndViewMode(
      state,
      templateOptionValues,
      templateOptionValueIds
    )
  )
  const templateOptions = useSelector(selectAllTemplateOptions)
  const skillsCommon = useSelector(selectSkillsCommon)
  const skillsAdvanced = useSelector(selectSkillsAdvance)
  const languages = useSelector(selectLanguages)
  const { commonQuestions, professionalQuestions } = useSelector(
    selectAllQuestionHints
  )
  const applyStatus = useSelector(selectApplyStatus)

  const [modalShare, toggleModalShare] = useModal()
  const [interviewInvitationModal, toggleInterviewInvitationModal] = useModal()
  const [userGuiIdValue, setUserGuiIdValue] = useState('')
  const [tooltip, setTooltip] = useState(null)

  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.PORTFOLIO.GETALLTEMPLATEOPTION) ||
      selectLoading(state, APP_TYPES.USERSKILL.GETALLUSERSKILL) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.GETACHIVEMENTIMAGES) ||
      selectLoading(state, APP_TYPES.JOB.GETJOBBYJOBCATEGORY) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.GETUSERPORTFOLIO) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.INVITEUSERAPPLY)
  )

  const handlePublishProfile = async () => {
    setUserGuiIdValue(metadata?.guid)
    toggleModalShare()
  }

  function copyText() {
    // Get the text field
    const copyText = document.getElementById('select-text')

    // Select the text field
    copyText.select()
    copyText.setSelectionRange(0, 99999) // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value)

    // Alert the copied text
    setTooltip('Đã sao chép')
  }
  const checkEmptyTemplateOptionValues = (list = []) => {
    const activeOptions = []
    list.forEach((el) => {
      const { templateOptionId, children, isActive, templateOptionName } =
        el || {}
      if (isActive && Object.keys(children).length > 0) {
        if (templateOptionName === 'CareerTarget') {
          if (children[0]['CareerTargetDescription']['value']?.length > 0) {
            activeOptions.push(templateOptionId)
          }
        } else {
          activeOptions.push(templateOptionId)
        }
      }
    })
    if (activeOptions.length > 0) {
      return true
    } else {
      return false
    }
  }
  const isEmptyTemplateOptions = checkEmptyTemplateOptionValues(templateForDnd)

  useEffect(() => {
    const splitTagUrl = window.location.pathname.split('/')
    const userTag = splitTagUrl[splitTagUrl.length - 1]
    const fetchInitData = async () => {
      await Promise.all([
        dispatch(getProfile()),
        dispatch(getAllTemplateOption()),
        dispatch(getAllSkillV2({ type: 0 })),
        dispatch(getAllSkillV2({ type: 1 })),
        dispatch(getAllUserSkillByTagName({ tag: metadata?.guid })),
        dispatch(getAchivementImages()),
        dispatch(getJobByJobCategory()),
        dispatch(getUserPortfolio()),
        dispatch(getAllLanguages()),
        dispatch(
          getAllQuestionHints({
            tag: userTag
          })
        ),
        dispatch(
          getUserApplyStatus({
            tag: userTag
          })
        )
      ])
    }
    fetchInitData()
  }, [])

  return (
    <Fragment>
      <MetaSeo
        title={`${user?.name} - Hồ sơ năng lực - X-Profile`}
        descContent={user?.name}
        titleContent={`Hồ sơ ứng viên - ${user?.name}`}
        imageContent={
          user?.avatarUrl ||
          'https://he44r2a3tgobj.vcdn.cloud/p/Website/Thumbnail.png'
        }
        urlContent={`https://xprofile.vn/profile/${metadata?.guid}`}
      />
      <div className="min-h-[100vh] relative flex flex-col">
        <NavbarCompany
          typeNavbar="top"
          NAVIGATION={HEADER}
          isLogin={userProfile}
          info={userProfile}
        />
        {loading && <LoadingRole />}
        <div className="flex-1 pb-[7.75rem] xl:pt-10 pt-6 xl:px-0 px-6 bg-white">
          <div className="xl:flex xl:w-[1140px] w-full justify-between mx-auto items-center relative py-[20px]">
            <p className="sm:text-p28-bold text-p18-bold ">Hồ sơ năng lực</p>
            {userProfile?.setting?.characterId === 2 && (
              <div className="flex items-center gap-4 xl:mt-0 mt-2">
                <ButtonIcon
                  width="sm:w-auto w-full "
                  height="sm:h-[48px] h-[36px]"
                  rounded="rounded-[8px]"
                  background="white border border-grey-3 cursor-careerPath "
                  hover="hover:bg-nude"
                  title="Chia sẻ hồ sơ"
                  textWeight="sm:text-p18-bold text-p14-bold text-black"
                  padding="px-8 py-4"
                  iconName="forward"
                  margin="m-0"
                  onClick={handlePublishProfile}
                />
                {applyStatus !== null && isEmptyTemplateOptions && (
                  <Fragment>
                    {applyStatus === 2 ? (
                      <ButtonIcon
                        width="sm:w-auto w-full "
                        height="sm:h-[48px] h-[36px]"
                        rounded="rounded-[8px]"
                        background="bg-grey-4 cursor-careerPath "
                        hover="hover:bg-grey-3"
                        title="Đã gửi lời mời ứng tuyển"
                        textWeight="sm:text-p18-bold text-p14-bold"
                        padding="px-8 py-4"
                        iconName="check2"
                        margin="m-0"
                      />
                    ) : (
                      <ButtonIcon
                        width="sm:w-auto w-full "
                        height="sm:h-[48px] h-[36px]"
                        rounded="rounded-[8px]"
                        background="bg-button-2 cursor-careerPath "
                        hover="hover:opacity-80"
                        title="Mời ứng tuyển"
                        textWeight="sm:text-p18-bold text-p14-bold text-white"
                        padding="px-8 py-4"
                        iconName="email2"
                        margin="m-0"
                        onClick={toggleInterviewInvitationModal}
                      />
                    )}
                  </Fragment>
                )}
              </div>
            )}
          </div>
          <div className="lg:flex xl:w-[1140px] w-full gap-6 mx-auto mt-[16px]">
            <div className="break-words md:w-[360px] w-full">
              <ProfileView
                connect={APPLICANT_PROFILE?.society}
                titleButton={APPLICANT_PROFILE?.titleButton}
                userPortfolio={data}
                isHiddenStatusOpenToWork={!data?.isOpenToWork}
                isViewPublic={true}
              />
              {userProfile?.setting?.characterId === 2 &&
                (commonQuestions.length > 0 ||
                  professionalQuestions.length > 0) && (
                  <div className="mt-[72px] xl:mb-0 mb-6 md:max-w-[360px]">
                    <HintQuestion
                      commonQuestions={commonQuestions}
                      professionalQuestions={professionalQuestions}
                    />
                  </div>
                )}
            </div>

            <div className="md:flex-1  w-full overflow-hidden">
              {templateForDnd?.filter((el) => el?.isActive)?.length > 0 && (
                <BlockContentProfileViewMode
                  data={templateForDnd}
                  templateOptions={templateOptions}
                  skillsCommon={skillsCommon}
                  skillsAdvanced={skillsAdvanced}
                  showEditTool={false}
                  hiddenDoExamBtn={true}
                  languages={languages}
                />
              )}
              {templateForDnd?.filter((el) => el?.isActive)?.length === 0 && (
                <EmptyTemplate />
              )}
            </div>
          </div>
        </div>
        {!GUEST_ROUTES.includes(pathname) && <FooterCompany FOOTER={FOOTER} />}
      </div>

      <Modal
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-[40px] bg-white rounded-[16px]"
        open={modalShare}
        toggleModal={toggleModalShare}
      >
        <p className="text-h3 text-center">Chia sẻ hồ sơ cá nhân</p>
        <div className="flex justify-center item-center gap-6 mt-6 mb-8">
          {FIELDLIST?.map((field, ind) => {
            const urlPortfolio =
              process.env.NEXT_PUBLIC_HOST_URL + 'profile/' + userGuiIdValue
            const { icon, type } = field || {}
            return (
              <div key={ind}>{renderIconsSocial(icon, urlPortfolio, type)}</div>
            )
          })}
        </div>
        <div className="w-full bg-light-nude py-2 px-6 mb-6 rounded-lg">
          <input
            id="select-text"
            className={`text-p18  text-center w-full outline-0 ${
              tooltip ? 'text-blue-light' : 'text-black'
            }`}
            value={generateLinkPublish(userGuiIdValue)}
            disabled
          />
        </div>

        <div
          className="group w-fit mx-auto relative"
          onMouseLeave={async () => {
            await delay(200)
            setTooltip(null)
          }}
        >
          <Button
            title="Sao chép link"
            width="md:w-[240px] w-full"
            height="h-[48px]"
            rounded="rounded-[8px]"
            textWeight="sm:text-p18-bold text-p14-bold"
            margin="my-0 mx-auto"
            padding="px-6"
            onClick={copyText}
          />
          <div
            className="group-hover:opacity-100 transition-opacity bg-gray-800  text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -top-[44px] opacity-0  mx-auto w-max	py-2 px-4"
          >
            {tooltip || 'Nhấn để sao chép link'}
          </div>
        </div>
      </Modal>
      <Modal
        open={interviewInvitationModal}
        toggleModal={toggleInterviewInvitationModal}
        childStyle="w-screen h-fit sm:w-[1024px] max-h-[780px]  mt-4 shadow-md  relative bg-white rounded-2xl"
        styleTitle="text-p28-bold text-neutral"
        hiddenCancel={true}
      >
        <ProfilePublicInviteModal
          toggleModal={toggleInterviewInvitationModal}
          userPortfolio={data}
          userTag={guiId}
        />
      </Modal>
    </Fragment>
  )
}

export async function getServerSideProps(ctx) {
  const tagName = ctx.query.guiId
  if (tagName) {
    // Fetch data from external API
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_HOST +
        '/api/Portfolio/GetPortfolio/' +
        tagName
    )

    const data = await res.json()
    if (data.data) {
      // Pass data to the page via props
      const result = {
        user: {
          email: data.data?.email || '',
          avatarUrl: data.data?.avatarUrl || '',
          phone: data.data?.phone || '',
          name: data.data?.fullName || '',
          setting: {
            currentJob: data.data?.currentJob || '',
            displayName: data.data?.displayName || '',
            jobName: data.data?.job?.name || '',
            socials: data.data?.socials || [],
            characterId: data.data?.characterId || 0
          },
          cityName: data?.data?.cityName || ''
        },
        isOpenToWork: data?.data?.isOpenToWork || false,
        education: data.data?.education || '',
        description: data.data?.description || '',
        templateOptionValues: data.data?.templateOptionValues || [],
        templateOptionValueIds: data.data?.templateOptionValueIds || '',
        fullName: data.data?.fullName || '',
        metadata: data.data?.metadata
      }
      return { props: { data: result } }
    } else {
      return {
        notFound: true
      }
    }
  } else {
    return {
      notFound: true
    }
  }
}

export default UserPublicProfile
