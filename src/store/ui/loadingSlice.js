import { createSlice } from '@reduxjs/toolkit'
import {
  forgotPasswordSendEmail,
  forgotPasswordUpdate,
  getCity,
  getTokenByFirebase,
  login,
  loginByToken,
  registerAccount,
  registerVerify,
  registerVerifyCode
} from 'store/app/authSlice'
import { APP_TYPES } from 'store/types'
import {
  addNewCourseComment,
  changeCourseLikeStatus,
  getAllUserCourseLiked,
  getAllUserCourseOwned,
  getCourse,
  getCourseBanner,
  getCourseCategory,
  getCourseDetail,
  getCoursePublic,
  getCourseRecommended,
  getCoursesPartner
} from 'store/app/courseSlice'
import {
  getExportPdf,
  getProfile,
  updatePersonalProfile,
  updateProfile
} from 'store/app/userSlice'
import {
  getHomeBlockType,
  getPublishedPostion,
  getPublishedSurvey,
  postSurvey
} from 'store/app/surveySlice'
import {
  getAllCities,
  getAllDistricts,
  getAllJobs,
  getAllWards,
  getJobByCategoryId,
  getJobByJobCategory,
  getJobCategories,
  getJobCategoryChildFaq,
  getJobCategoryFaqRoot,
  getJobChildFaq,
  getJobChildFaqByTag,
  getJobDetail,
  getJobFaqRoot,
  getJobWorkingDay,
  loadMoreJobs
} from 'store/app/jobSlice'
import {
  getChildFaq,
  getCompanyCourse,
  getCompanyProfile,
  getFaqRoot,
  getInformationCompany,
  hasEditPermission,
  userConfirmation
} from 'store/app/companySlice'
import {
  createListUserTemplateOptionValue,
  createUserTemplateOptionValue,
  getAchivementImages,
  getAllContent,
  getAllSkillV2,
  getAllTemplateOption,
  getAllUserSkill,
  getUserPortfolio,
  inActiveTemplate,
  inviteUserApply,
  publishPortfolio,
  setOpenToWork,
  updateActiveStatusUserTemplateOptionValue,
  updateListUserTemplateOptionValue,
  updateUserPortfolio
} from 'store/app/portfolioSlice'
import { getAllJobsCompanies, loadMoreCompanies } from 'store/app/searchSlice'
import {
  canApply,
  changeUserFavoriteCampaign,
  getAllAppliedCampaigns,
  getAllFavoriteCampaigns,
  getMoreAppliedCampaigns,
  getMoreFavoriteCampaigns,
  getUserAcceptInterview,
  rejectCampaign,
  reviewCampaign,
  userUpdateAcceptInterview
} from 'store/app/campaign'
import { getHomeBlocks, getSkillType } from 'store/app/homeSlice'
import { getTopCompanies } from 'store/app/careerPathSlice'
import {
  getAllDepartmentsEdit,
  saveTeamListEdit
} from 'store/app/edit-mode-company/profile/teamListSlice'
import {
  getAllWorkingDays,
  getWorkingDayImages,
  saveWorkingDays
} from 'store/app/edit-mode-company/profile/workDaySlice'
import EditContentWorkday from 'common/presentation/Pages/Profile-Company/EditContentWorkday'
import { getCultureMediaEdit } from 'store/app/edit-mode-company/profile/thumbSlice'
import {
  getAllHighLight,
  saveStaticsEdit
} from 'store/app/edit-mode-company/profile/staticsSlice'
import {
  getInformationEdit,
  saveInformationEdit
} from 'store/app/edit-mode-company/profile/informationSlice'
import {
  getBannerEdit,
  saveBannerEdit
} from 'store/app/edit-mode-company/profile/bannerSlice'
import { createDepartment, getAllDepartment } from 'store/app/departmentSlice'
import {
  getAllDepartmentPositionsEdit,
  savePositionsEdit
} from 'store/app/edit-mode-company/department/positionsDepartmentSlice'
import {
  getDepartmentPosition,
  getTemplateByJobLevel
} from 'store/app/departmentPositionSlice'
import { getDepartmentReview } from 'store/app/edit-mode-company/department/reviewSlice'
import {
  getDepartmentIntro,
  saveDepartmentIntroEdit
} from 'store/app/edit-mode-company/department/introSlice'
import {
  deleteDepartmentEdit,
  getBannerEditDepartment,
  saveDepartmentBannerEdit,
  updateDepartmentEdit
} from 'store/app/edit-mode-company/department/bannerSlice'
import {
  getRoadmapEditPosition,
  getSystemImages,
  saveRoadmapPositionEdit
} from 'store/app/edit-mode-company/position/roadmapSlice'
import {
  getProfilePostionProfessionalSkill,
  savePositionProfessionalSkillEdit
} from 'store/app/edit-mode-company/position/professionalSkillSlice'
import {
  getAllSkillPostionSoftSkill,
  getAllSoftSkillPositionV2,
  getProfilePostionSoftSkill,
  savePositionSoftSkillEdit
} from 'store/app/edit-mode-company/position/softSkillSlice'
import {
  deactivateCampaign,
  deletePositionEdit,
  getBannerEditPosition,
  savePositionBannerEdit,
  updatePositionEdit
} from 'store/app/edit-mode-company/position/bannerSlice'
import { cloneDepartmentEdit } from 'store/app/edit-mode-company/department/cloneSlice'
import { cloneDepartmentPositionEdit } from 'store/app/edit-mode-company/position/cloneSlice'
import { getChildFaqEdit } from 'store/app/edit-mode-company/profile/questionsSlice'
import {
  checkOut,
  createSingleOrder,
  getPaymentMethod
} from 'store/app/orderSlice'
import { getAllCV, inviteToCampaign, loadMoreCV } from 'store/app/cvSlice'
import {
  getProductCourseDetail,
  getProductResentUserList,
  likeCourseProductGuid
} from 'store/app/courseProductGuidSlice'
import { createUserSurvey } from 'store/app/landingSlice'
import { getProductCourseDetailSeo } from 'store/app/courseLearnSlice'

const buildLoading = (action, context) => {
  return {
    [action.pending]: (state) => {
      return { ...state, ...{ [context]: true } }
    },
    [action.fulfilled]: (state) => {
      return { ...state, ...{ [context]: false } }
    },
    [action.rejected]: (state) => {
      return { ...state, ...{ [context]: false } }
    }
  }
}

const ui = createSlice({
  name: 'ui',
  initialState: {},
  reducers: {},
  extraReducers: {
    ...buildLoading(login, APP_TYPES.AUTH.LOGIN),
    ...buildLoading(loginByToken, APP_TYPES.AUTH.LOGINBYTOKEN),
    ...buildLoading(getTokenByFirebase, APP_TYPES.AUTH.GETTOKENBYFIREBASE),
    ...buildLoading(registerAccount, APP_TYPES.AUTH.REGISTER),
    ...buildLoading(registerVerify, APP_TYPES.AUTH.REGISTERVERIFY),
    ...buildLoading(registerVerifyCode, APP_TYPES.AUTH.REGISTERVERIFYCODE),
    ...buildLoading(getCity, APP_TYPES.AUTH.GETCITY),
    ...buildLoading(getCourse, APP_TYPES.COURSE.GETALLPRODUCTCOURSE),
    ...buildLoading(getCourse, APP_TYPES.COURSE.GETALLPRODUCTCOURSEFILTER),
    ...buildLoading(getCourseBanner, APP_TYPES.COURSE.GETCOURSEBANNER),
    ...buildLoading(
      getCourseRecommended,
      APP_TYPES.COURSE.GETCOURSERECOMMENDED
    ),
    ...buildLoading(getCoursePublic, APP_TYPES.COURSE.GETCOURSEPUBLIC),
    ...buildLoading(getCoursesPartner, APP_TYPES.COURSE.GETALLCOURSESPARTNER),
    ...buildLoading(
      getAllUserCourseLiked,
      APP_TYPES.COURSE.GETALLUSERCOURSELIKED
    ),
    ...buildLoading(
      getAllUserCourseOwned,
      APP_TYPES.COURSE.GETALLUSERCOURSEOWNED
    ),
    ...buildLoading(getCourseDetail, APP_TYPES.COURSE.GETCOURSEDETAIL),
    ...buildLoading(getCourseCategory, APP_TYPES.COURSE.GETCOURSECATEGORY),
    ...buildLoading(addNewCourseComment, APP_TYPES.COURSE.ADDNEWCOURSECOMMENT),
    ...buildLoading(
      changeCourseLikeStatus,
      APP_TYPES.COURSE.CHANGECOURSELIKESTATUS
    ),
    ...buildLoading(getProfile, APP_TYPES.USER.GETPROFILE),
    ...buildLoading(updateProfile, APP_TYPES.USER.UPDATEPROFILE),
    ...buildLoading(getJobByJobCategory, APP_TYPES.JOB.GETJOBBYJOBCATEGORY),
    ...buildLoading(getPublishedSurvey, APP_TYPES.SURVEY.GETPUBLISHEDSURVEY),
    ...buildLoading(getPublishedPostion, APP_TYPES.SURVEY.GETPUBLISHEDPOSTION),
    ...buildLoading(getHomeBlockType, APP_TYPES.SURVEY.GETHOMEBLOCKTYPE),
    ...buildLoading(getCompanyProfile, APP_TYPES.COMPANY.GETPROFILECOMPANY),
    ...buildLoading(getCompanyCourse, APP_TYPES.COMPANY.COURSE),
    ...buildLoading(getChildFaq, APP_TYPES.COMPANY.CHILDFAQ),
    ...buildLoading(
      createUserTemplateOptionValue,
      APP_TYPES.PORTFOLIO.CREATEUSERTEMPLATEOPTIONVALUE
    ),
    ...buildLoading(
      updateListUserTemplateOptionValue,
      APP_TYPES.PORTFOLIO.UPDATELISTUSERTEMPLATEOPTIONVALUE
    ),
    ...buildLoading(
      createListUserTemplateOptionValue,
      APP_TYPES.PORTFOLIO.CREATELISTUSERTEMPLATEOPTIONVALUE
    ),
    ...buildLoading(getAllJobsCompanies, APP_TYPES.JOB.GETALLCOMPANIES),
    ...buildLoading(getAllJobs, APP_TYPES.JOB.GETALLJOBS),
    ...buildLoading(loadMoreJobs, APP_TYPES.JOB.LOADMOREJOB),
    ...buildLoading(loadMoreCompanies, APP_TYPES.JOB.LOADMORECOMPANY),
    ...buildLoading(
      updateUserPortfolio,
      APP_TYPES.PORTFOLIO.UPDATEUSERPORTFOLIO
    ),
    ...buildLoading(getJobCategoryChildFaq, APP_TYPES.JOB.CHILDFAQCAREERPATH),
    ...buildLoading(getJobChildFaq, APP_TYPES.JOB.CHILDJOBFAQ),
    ...buildLoading(getJobChildFaqByTag, APP_TYPES.JOB.CHILDFAQBYTAG),
    ...buildLoading(
      changeUserFavoriteCampaign,
      APP_TYPES.CAMPAIGN.CHANGEUSERFAVORITECAMPAIGNS
    ),
    ...buildLoading(publishPortfolio, APP_TYPES.PORTFOLIO.PUBLISHPORTFOLIO),
    ...buildLoading(
      getAllFavoriteCampaigns,
      APP_TYPES.CAMPAIGN.GETALLUSERFAVORITECAMPAIGNS
    ),
    ...buildLoading(
      getAllAppliedCampaigns,
      APP_TYPES.CAMPAIGN.GETALLUSERAPPLIEDCAMPAIGNS
    ),
    ...buildLoading(
      getAchivementImages,
      APP_TYPES.PORTFOLIO.GETACHIVEMENTIMAGES
    ),
    ...buildLoading(
      getAllTemplateOption,
      APP_TYPES.PORTFOLIO.GETALLTEMPLATEOPTION
    ),
    ...buildLoading(inActiveTemplate, APP_TYPES.PORTFOLIO.INACTIVETEMPLATE),

    ...buildLoading(postSurvey, APP_TYPES.SURVEY.POSTSURVEY),
    ...buildLoading(getHomeBlocks, APP_TYPES.HOME.GETHOMEBLOCKS),
    ...buildLoading(getAllSkillV2, APP_TYPES.USERSKILL.GETALLSKILLV2),
    ...buildLoading(getAllUserSkill, APP_TYPES.USERSKILL.GETALLUSERSKILL),
    ...buildLoading(getUserPortfolio, APP_TYPES.PORTFOLIO.GETUSERPORTFOLIO),
    ...buildLoading(getJobCategories, APP_TYPES.JOB.GETJOBCATEGORY),
    ...buildLoading(getSkillType, APP_TYPES.HOME.GETSKILLTYPE),
    ...buildLoading(getExportPdf, APP_TYPES.USER.EXPORTPDF),
    ...buildLoading(getJobByCategoryId, APP_TYPES.JOB.GETJOBBYCATEGORYID),
    ...buildLoading(getJobCategoryFaqRoot, APP_TYPES.JOB.JOBCATEGORYFAQROOT),
    ...buildLoading(getTopCompanies, APP_TYPES.CAREERPATH.GETTOPCOMPANIES),
    ...buildLoading(getJobDetail, APP_TYPES.JOB.GETJOBDETAIL),
    ...buildLoading(getJobFaqRoot, APP_TYPES.JOB.JOBFAQROOT),
    ...buildLoading(getJobChildFaq, APP_TYPES.JOB.CHILDFAQ),
    ...buildLoading(getJobWorkingDay, APP_TYPES.JOB.GETJOBWORKINGDAY),
    ...buildLoading(getFaqRoot, APP_TYPES.COMPANY.ROOTFAQ),
    ...buildLoading(hasEditPermission, APP_TYPES.COMPANY.HASEDITPERMISSION),
    ...buildLoading(getBannerEdit, APP_TYPES.EDIT.GETBANNEREDIT),
    ...buildLoading(saveBannerEdit, APP_TYPES.EDIT.SAVEBANNEREDIT),
    ...buildLoading(getInformationEdit, APP_TYPES.EDIT.GETINFORMATIONEDIT),
    ...buildLoading(saveInformationEdit, APP_TYPES.EDIT.SAVEINFORMATIONEDIT),
    ...buildLoading(saveStaticsEdit, APP_TYPES.EDIT.SAVESTATICSEDIT),
    ...buildLoading(getAllHighLight, APP_TYPES.EDIT.GETALLHIGHLIGHT),
    ...buildLoading(getCultureMediaEdit, APP_TYPES.EDIT.GETCULTUREMEDIAEDIT),
    ...buildLoading(getAllWorkingDays, APP_TYPES.EDIT.GETWORKINGDAYS),
    ...buildLoading(saveWorkingDays, APP_TYPES.EDIT.SAVEWORKINGDAYS),
    ...buildLoading(getWorkingDayImages, APP_TYPES.EDIT.GETIMAGEWORKINGDAYS),
    ...buildLoading(getAllDepartmentsEdit, APP_TYPES.EDIT.GETALLDEPARTMENTEDIT),
    ...buildLoading(saveTeamListEdit, APP_TYPES.EDIT.SAVETEAMLISTEDIT),
    ...buildLoading(createDepartment, APP_TYPES.EDIT.CREATEDEPARTMENT),
    ...buildLoading(getAllDepartment, APP_TYPES.DEPARTMENT.GETALLDEPARTMENT),
    ...buildLoading(deleteDepartmentEdit, APP_TYPES.EDIT.DELETEDEPARTMENTEDIT),
    ...buildLoading(updateDepartmentEdit, APP_TYPES.EDIT.UPDATEDEPARTMENTEDIT),
    ...buildLoading(deletePositionEdit, APP_TYPES.EDIT.DELETEPOSITIONEDIT),
    ...buildLoading(updatePositionEdit, APP_TYPES.EDIT.UPDATEPOSITIONEDIT),
    ...buildLoading(getBannerEditPosition, APP_TYPES.EDIT.GETPOSITION),
    ...buildLoading(savePositionBannerEdit, APP_TYPES.EDIT.SAVEPOSITION),
    ...buildLoading(
      savePositionSoftSkillEdit,
      APP_TYPES.EDIT.SAVEPOSITIONSOFTSKILL
    ),
    ...buildLoading(
      getAllSoftSkillPositionV2,
      APP_TYPES.EDIT.GETALLSOFTSKILLPOSITIONV2
    ),
    ...buildLoading(
      getProfilePostionSoftSkill,
      APP_TYPES.EDIT.GETPROFILEPOSITIONSOFTSKILL
    ),
    ...buildLoading(
      getAllSkillPostionSoftSkill,
      APP_TYPES.EDIT.GETALLSKILLPOSITIONSOFTSKILL
    ),
    ...buildLoading(
      savePositionProfessionalSkillEdit,
      APP_TYPES.EDIT.SAVEPOSITIONPROSKILL
    ),
    ...buildLoading(
      getProfilePostionProfessionalSkill,
      APP_TYPES.EDIT.GETPROFILEPOSITIONPROSKILL
    ),
    ...buildLoading(getRoadmapEditPosition, APP_TYPES.EDIT.GETROADMAPPOSITION),
    ...buildLoading(
      saveRoadmapPositionEdit,
      APP_TYPES.EDIT.SAVEROADMAPPOSITION
    ),
    ...buildLoading(getSystemImages, APP_TYPES.HELPER.GETSYSTEMIMAGES),
    ...buildLoading(canApply, APP_TYPES.CAMPAIGN.CANAPPLY),
    ...buildLoading(
      getDepartmentPosition,
      APP_TYPES.DEPARTMENTPOSITION.PROFILE
    ),
    ...buildLoading(
      saveDepartmentBannerEdit,
      APP_TYPES.EDIT.SAVEDEPARTMENTBANNEREDIT
    ),
    ...buildLoading(
      saveDepartmentIntroEdit,
      APP_TYPES.EDIT.SAVEDEPARTMENTINTROEDIT
    ),
    ...buildLoading(getDepartmentIntro, APP_TYPES.EDIT.GETPROFILEINTRO),
    ...buildLoading(getDepartmentReview, APP_TYPES.EDIT.GETREVIEWS),
    ...buildLoading(
      getAllDepartmentPositionsEdit,
      APP_TYPES.EDIT.GETDEPARTMENTPOSITIONS
    ),
    ...buildLoading(savePositionsEdit, APP_TYPES.EDIT.SAVEDEPARTMENTPOSITION),

    ...buildLoading(
      updateActiveStatusUserTemplateOptionValue,
      APP_TYPES.SURVEY.UPDATEACTIVESTATUSUSERTEMPLATEOPTIONVALUE
    ),
    ...buildLoading(cloneDepartmentEdit, APP_TYPES.EDIT.CLONEDEPARMENT),
    ...buildLoading(
      cloneDepartmentPositionEdit,
      APP_TYPES.EDIT.CLONEDEPARMENTPOSITION
    ),
    ...buildLoading(getChildFaqEdit, APP_TYPES.EDIT.CHILDFAQ),
    ...buildLoading(checkOut, APP_TYPES.ORDER.CHECKOUT),
    ...buildLoading(getAllCV, APP_TYPES.CV.GETALLCV),
    ...buildLoading(loadMoreCV, APP_TYPES.CV.GETMORECV),
    ...buildLoading(inviteToCampaign, APP_TYPES.CV.INVITETOCAMPAIGN),
    ...buildLoading(createSingleOrder, APP_TYPES.ORDER.CREATESINGLEORDER),
    ...buildLoading(
      getMoreFavoriteCampaigns,
      APP_TYPES.CAMPAIGN.GETMOREUSERFAVORITECAMPAIGNS
    ),
    ...buildLoading(
      getMoreAppliedCampaigns,
      APP_TYPES.CAMPAIGN.GETMOREUSERAPPLIEDCAMPAIGNS
    ),
    ...buildLoading(getPaymentMethod, APP_TYPES.PAYMENT.PAYMENTGATEWAY),
    ...buildLoading(
      getProductCourseDetail,
      APP_TYPES.COURSE.GETPRODUCTCOURSEDETAIL
    ),
    ...buildLoading(
      forgotPasswordSendEmail,
      APP_TYPES.AUTH.FORGOTPASSWORDSENDEMAIL
    ),
    ...buildLoading(forgotPasswordUpdate, APP_TYPES.AUTH.FORGOTPASSWORDUPDATE),
    ...buildLoading(createUserSurvey, APP_TYPES.SURVEY.CREATEUSERSURVEY),
    ...buildLoading(getAllCities, APP_TYPES.JOB.GETALLCITIES),
    ...buildLoading(getAllDistricts, APP_TYPES.JOB.GETALLDISTRICTS),
    ...buildLoading(getAllWards, APP_TYPES.JOB.GETALLWARDS),
    ...buildLoading(
      updatePersonalProfile,
      APP_TYPES.USER.UPDATEPERSONALPROFILE
    ),
    ...buildLoading(userConfirmation, APP_TYPES.COMPANY.USERCONFIRMATION),
    ...buildLoading(
      getInformationCompany,
      APP_TYPES.COMPANY.INFORMATIONCOMPANY
    ),
    ...buildLoading(setOpenToWork, APP_TYPES.PORTFOLIO.SETOPENTOWORK),
    ...buildLoading(
      getAllUserCourseLiked,
      APP_TYPES.COURSE.GETALLUSERCOURSELIKED
    ),
    ...buildLoading(
      getProductCourseDetailSeo,
      APP_TYPES.COURSE.GETPRODUCTCOURSEDETAILSEO
    ),
    ...buildLoading(
      getProductResentUserList,
      APP_TYPES.COURSE.GETPRODUCTRECENTUSERLIST
    ),
    ...buildLoading(
      likeCourseProductGuid,
      APP_TYPES.COURSE.CHANGECOURSELIKESTATUS
    ),
    ...buildLoading(reviewCampaign, APP_TYPES.CAMPAIGN.REVIEW),
    ...buildLoading(rejectCampaign, APP_TYPES.CAMPAIGN.REJECT),
    ...buildLoading(
      getUserAcceptInterview,
      APP_TYPES.CAMPAIGN.GETUSERACCEPTINTERVIEWCAMPAIGNS
    ),
    ...buildLoading(
      userUpdateAcceptInterview,
      APP_TYPES.CAMPAIGN.USERACCEPTINTERVIEWCAMPAIGNS
    ),
    ...buildLoading(getAllContent, APP_TYPES.PORTFOLIO.GETALLCONTENT),
    ...buildLoading(inviteUserApply, APP_TYPES.PORTFOLIO.INVITEUSERAPPLY),
    ...buildLoading(
      deactivateCampaign,
      APP_TYPES.EDIT.POSITIONS.BANNER.DEACTIVATECAMPAIGN
    ),
    ...buildLoading(
      getTemplateByJobLevel,
      APP_TYPES.DEPARTMENTPOSITION.GETTEMPLATEBYJOBLEVEL
    )
  }
})

export const selectLoading = (state, Context) => {
  return state.ui[[Context]] || false
}
export default ui.reducer
