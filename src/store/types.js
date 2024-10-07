export const APP_TYPES = {
  DEMO: {
    LIST: 'DEMO/LIST',
    DETAIL: 'DEMO/DETAIL',
    GETDATATABLE: 'DEMO/GETDATATABLE'
  },
  AUTH: {
    LOGIN: 'AUTH/LOGIN',
    LOGINBYTOKEN: 'AUTH/LOGINBYTOKEN',
    LOGOUT: 'AUTH/LOGOUT',
    REGISTER: 'AUTH/REGISTER',
    REGISTERVERIFY: 'AUTH/REGISTERVERIFY',
    REGISTERVERIFYCODE: 'AUTH/REGISTERVERIFYCODE',
    GETCITY: 'GETCITY',
    GETTOKENBYFIREBASE: 'GETTOKENBYFIREBASE',
    FORGOTPASSWORDSENDEMAIL: 'AUTH/FORGOTPASSWORDSENDEMAIL',
    FORGOTPASSWORDUPDATE: 'AUTH/FORGOTPASSWORDUPDATE'
  },
  COURSE: {
    GETALLPRODUCTCOURSEFILTER: 'COURSE/GETALLPRODUCTCOURSEFILTER',
    GETALLPRODUCTCOURSEFORSEARCH: 'COURSE/GETALLPRODUCTCOURSEFORSEARCH',
    GETALLUSERCOURSELIKED: 'COURSE/GETALLUSERCOURSELIKED',
    GETALLUSERCOURSEOWNED: 'COURSE/GETALLUSERCOURSEOWNED',
    GETALLCOURSESPARTNER: 'COURSE/GETALLCOURSESPARTNER',
    GETCOURSEDETAIL: 'COURSE/GETCOURSEDETAIL',
    GETLESSONDETAIL: 'COURSE/GETLESSONDETAIL',
    GETUSERLESSONPROGRESS: 'COURSE/GETUSERLESSONPROGRESS',
    GETPRODUCTCOURSEDETAIL: 'COURSE/GETPRODUCTCOURSEDETAIL',
    GETPRODUCTCOURSEDETAILSEO: 'COURSE/GETPRODUCTCOURSEDETAILSEO',
    GETCOURSEBANNER: 'COURSE/GETCOURSEBANNER',
    GETCOURSECATEGORY: 'COURSE/GETCOURSECATEGORY',
    GETCOURSERECOMMENDED: 'COURSE/GETCOURSERECOMMENDED',
    GETCOURSEPUBLIC: 'COURSE/GETCOURSEPUBLIC',
    GETALLPRODUCTCOURSE: 'COURSE/GETALLPRODUCTCOURSE',
    GETPRODUCTRECENTUSERLIST: 'COURSE/GETPRODUCTRECENTUSERLIST',
    ADDNEWCOURSECOMMENT: 'COURSE/ADDNEWCOURSECOMMENT',
    CHANGECOURSELIKESTATUS: 'COURSE/CHANGECOURSELIKESTATUS'
  },
  LESSON: {
    GETALLCOMMENTFORLESSON: 'LESS/GETALLCOMMENTFORLESSON',
    GETREPLYCOMMENTFORLESSON: 'LESS/GETREPLYCOMMENTFORLESSON',
    CREATECOMMENTFORLESSON: 'LESS/CREATECOMMENTFORLESSON',
    DELETECOMMENTFORLESSON: 'LESS/DELETECOMMENTFORLESSON',
    LIKECOMMENT: 'LESS/LIKECOMMENT',
    UNLIKECOMMENT: 'LESS/UNLIKECOMMENT',
    UNDISLIKECOMMENT: 'LESS/UNDISLIKECOMMENT',
    DISLIKECOMMENT: 'LESS/DISLIKECOMMENT',
    LESSONACTION: 'LESS/LESSONACTION',
    GETLESSONLICENSE: 'LESS/GETLESSONLICENSE'
  },
  JOB: {
    GETJOBCATEGORY: 'JOB/GETJOBCATEGORY',
    GETJOBBYJOBCATEGORY: 'JOB/GETJOBBYJOBCATEGORY',
    GETJOBBYJOBCATEGORYBYTAG: 'JOB/GETJOBBYJOBCATEGORYBYTAG',
    GETJOBBYCATEGORYID: 'JOB/GETJOBBYCATEGORYID',
    GETALLJOBS: 'JOB/GETALLJOBS',
    GETALLCITIES: 'JOB/GETALLCITIES',
    GETALLDISTRICTS: 'JOB/GETALLDISTRICTS',
    GETALLWARDS: 'JOB/GETALLWARDS',
    LOADMOREJOB: 'JOB/LOADMOREJOB',
    GETALLSKILL: 'JOB/GETALLSKILL',
    GETJOBFILTER: 'JOB/GETJOBFILTER',
    GETALLCOMPANIES: 'JOB/GETALLCOMPANIES',
    LOADMORECOMPANY: 'JOB/MORECOMPANY',
    JOBCATEGORYFAQROOT: 'JOB/JOBCATEGORYFAQROOT',
    JOBCATEGORYFAQROOTBYTAG: 'JOB/JOBCATEGORYFAQROOTBYTAG',
    JOBFAQROOT: 'JOB/JOBFAQROOT',
    CHILDFAQ: 'JOB/CHILDFAQ',
    CHILDFAQCAREERPATH: 'JOB/CHILDFAQCAREERPATH',
    CHILDJOBFAQ: 'JOB/CHILDJOBFAQ',
    GETJOBWORKINGDAY: 'JOB/GETJOBWALKINGDAY',
    GETJOBBYTAG: 'JOB/GETJOBBYTAG',
    GETJOBDETAIL: 'JOB/GETJOBDETAIL',
    GETJOBCATEGORYBYTAG: 'JOB/GETJOBCATEGORYBYTAG',
    GETJOBWORKINGDAYBYTAG: 'JOB/GETJOBWORKINGDAYBYTAG',
    JOBFAQROOTBYTAG: 'JOB/JOBFAQROOTBYTAG',
    GETTOPJOBCOMPANYBYTAG: 'JOB/GETTOPJOBCOMPANYBYTAG',
    CHILDFAQBYTAG: 'JOB/CHILDFAQBYTAG',
    GETALLJOBLEVELS: 'JOB/GETALLJOBLEVELS'
  },
  CAMPAIGN: {
    GETALLUSERFAVORITECAMPAIGNS: 'CAMPAIGN/GETALLUSERFAVORITECAMPAIGNS',
    GETMOREUSERFAVORITECAMPAIGNS: 'CAMPAIGN/GETMOREUSERFAVORITECAMPAIGNS',
    CHANGEUSERFAVORITECAMPAIGNS: 'CAMPAIGN/CHANGEUSERFAVORITECAMPAIGNS',
    APPLY: 'CAMPAIGN/APPLY',
    REJECT: 'CAMPAIGN/REJECT',
    REVIEW: 'CAMPAIGN/REVIEW',
    CANAPPLY: 'CAMPAIGN/CANAPPLY',
    GETMOREUSERAPPLIEDCAMPAIGNS: 'CAMPAIGN/GETMOREUSERAPPLIEDCAMPAIGNS',
    GETALLUSERAPPLIEDCAMPAIGNS: 'CAMPAIGN/GETALLUSERAPPLIEDCAMPAIGNS',
    GETUSERACCEPTINTERVIEWCAMPAIGNS: 'CAMPAIGN/GETUSERACCEPTINTERVIEWCAMPAIGNS',
    USERACCEPTINTERVIEWCAMPAIGNS: 'CAMPAIGN/USERACCEPTINTERVIEWCAMPAIGNS',
    GETALLUSERAPPLIEDCAMPAIGNS: 'CAMPAIGN/GETALLUSERAPPLIEDCAMPAIGNS',
    GETUSERCAMPAIGNFEEDBACK: 'GETUSERCAMPAIGNFEEDBACK'
  },
  NOTIFICATION: {
    GETALLNOTIFICATION: 'NOTIFICATION/GETALLNOTIFICATION',
    READNOTIFICATIONS: 'NOTIFICATION/READNOTIFICATIONS',
    LOADMORENOTIFICATIONS: 'NOTIFICATION/LOADMORENOTIFICATIONS',
    REMOVENOTIFICATIONS: 'NOTIFICATION/REMOVENOTIFICATIONS',
    CLICKNOTIFICATIONS: 'NOTIFICATION/CLICKNOTIFICATIONS'
  },
  TOAST: {
    SHOW: 'TOAST/SHOWTOAST'
  },
  USER: {
    GETPROFILE: 'USER/GETPROFILE',
    UPDATEPROFILE: 'USER/UPDATEPROFILE',
    UPDATEPERSONALPROFILE: 'USER/UPDATEPERSONALPROFILE',
    EXPORTPDF: 'USER/EXPORTPDF',
    EXPORTPDFHTML: 'USER/EXPORTPDFHTML'
  },
  ORDER: {
    GETUSERCART: 'ORDER/GETUSERCART',
    GETUSERORDERHISTORY: 'ORDER/GETUSERORDERHISTORY',
    GETUSERORDERHISTORYDETAIL: 'ORDER/GETUSERORDERHISTORYDETAIL',
    ADDCOURSETOCART: 'ORDER/ADDCOURSETOCART',
    REMOVECOURSEFROMCART: 'ORDER/REMOVECOURSEFROMCART',
    CHECKOUT: 'ORDER/CHECKOUT',
    CREATESINGLEORDER: 'ORDER/CREATESINGLEORDER'
  },
  PAYMENT: {
    PAYMENTGATEWAY: 'PAYMENT/PAYMENTGATEWAY'
  },
  SURVEY: {
    GETPUBLISHEDSURVEY: 'SURVEY/GETPUBLISHEDSURVEY',
    GETPUBLISHEDPOSTION: 'SURVEY/GETPUBLISHEDPOSTION',
    GETHOMEBLOCKTYPE: 'SURVEY/GETHOMEBLOCKTYPE',
    POSTSURVEY: 'SURVEY/POSTSURVEY',
    CREATEUSERSURVEY: 'SURVEY/CREATEUSERSURVEY'
  },
  HOME: {
    PICKCHARACTER: 'HOME/PICKCHARACTER',
    GETHOMEBLOCKS: 'HOME/GETHOMEBLOCKS',
    GETSKILLTYPE: 'HOME/GETSKILLTYPE',
    HOMEFEEDBACK: 'HOME/HOMEFEEDBACK'
  },
  COMPANY: {
    GETPROFILECOMPANY: 'COMPANY/GETPROFILECOMPANY',
    COURSE: 'COMPANY/COURSE',
    CHILDFAQ: 'COMPANY/CHILDFAQ',
    ROOTFAQ: 'COMPANY/ROOTFAQ',
    HASEDITPERMISSION: 'HASEDITPERMISSION',
    HASEDITPERMISSIONBYTAGNAME: 'HASEDITPERMISSIONBYTAGNAME',
    INFORMATIONCOMPANY: 'INFORMATIONCOMPANY',
    USERCONFIRMATION: 'USERCONFIRMATION',
    GETVIEWCOUNT: 'COMPANY/GETVIEWCOUNT'
  },
  DEPARTMENT: {
    GETALLDEPARTMENT: 'DEPARTMENT/GETALLDEPARTMENT',
    GETVIEWCOUNT: 'DEPARTMENT/GETVIEWCOUNT'
  },
  DEPARTMENTPOSITION: {
    PROFILE: 'DEPARTMENTPOSITION',
    USERSTATUS: 'DEPARTMENTPOSITION/STATUS',
    GETVIEWCOUNT: 'DEPARTMENTPOSITION/GETVIEWCOUNT',
    GETALLJOBLEVELS: 'DEPARTMENTPOSITION/GETALLJOBLEVELS',
    GETTEMPLATEBYJOBLEVEL: 'DEPARTMENTPOSITION/GETTEMPLATEBYJOBLEVEL'
  },
  PORTFOLIO: {
    GETALLTEMPLATEOPTION: 'PORTFOLIO/GETALLTEMPLATEOPTION',
    GETUSERPORTFOLIO: 'PORTFOLIO/GETUSERPORTFOLIO',
    UPDATEUSERPORTFOLIO: 'PORTFOLIO/UPDATEUSERPORTFOLIO',
    INACTIVETEMPLATE: 'PORTFOLIO/INACTIVETEMPLATE',
    UPDATEUSERTEMPLATEOPTIONVALUE: 'PORTFOLIO/UPDATEUSERTEMPLATEOPTIONVALUE',
    UPDATELISTUSERTEMPLATEOPTIONVALUE:
      'PORTFOLIO/UPDATELISTUSERTEMPLATEOPTIONVALUE',
    CREATEUSERTEMPLATEOPTIONVALUE: 'PORTFOLIO/CREATEUSERTEMPLATEOPTIONVALUE',
    CREATELISTUSERTEMPLATEOPTIONVALUE:
      'PORTFOLIO/CREATELISTUSERTEMPLATEOPTIONVALUE',
    UPDATEACTIVESTATUSUSERTEMPLATEOPTIONVALUE:
      'PORTFOLIO/UPDATEACTIVESTATUSUSERTEMPLATEOPTIONVALUE',
    GETACHIVEMENTIMAGES: 'PORTFOLIO/GETACHIVEMENTIMAGES',
    PUBLISHPORTFOLIO: 'PORTFOLIO/PUBLISHPORTFOLIO',
    SETOPENTOWORK: 'PORTFOLIO/SETOPENTOWORK',
    UPDATEPORTFOLIOTAG: 'PORTFOLIO/UPDATEPORTFOLIOTAG',
    CHECKTAGNAME: 'PORTFOLIO/CHECKTAGNAME',
    GETALLQUESTIONHINTS: 'GETALLQUESTIONHINTS',
    GETUSERAPPLYSTATUS: 'GETUSERAPPLYSTATUS',
    GETALLCONTENT: 'GETATSCONTENT',
    INVITEUSERAPPLY: 'INVITEUSERAPPLY'
  },
  USERSKILL: {
    GETALLSKILL: 'USERSKILL/GETALLSKILL',
    GETALLSKILLV2: 'USERSKILL/GETALLSKILLV2',
    GETALLUSERSKILL: 'USERSKILL/GETALLUSERSKILL',
    GETALLUSERSKILLBYTAG: 'USERSKILL/GETALLUSERSKILLBYTAG',
    GETALLLANGUAGE: 'USERSKILL/GETALLLANGUAGE'
  },
  HELPER: {
    UPLOADIMAGE: 'HELPER/UPLOADIMAGE',
    GETFUNFACTIMAGES: 'HELPER/GETFUNFACTIMAGES',
    GETSYSTEMIMAGES: 'HELPER/GETSYSTEMIMAGES'
  },
  CAREERPATH: {
    GETTOPCOMPANIES: 'CAREERPATH/GETTOPCOMPANIES',
    GETTOPCOMPANIESBYTAG: 'CAREERPATH/GETTOPCOMPANIESBYTAG'
  },
  EDIT: {
    GETBANNEREDIT: 'GETBANNEREDIT',
    GETPROFILEEDIT: 'GETPROFILEEDIT',
    SAVEBANNEREDIT: 'SAVEBANNEREDIT',
    GETFOOTEREDIT: 'GETFOOTEREDIT',
    SAVEFOOTEREDIT: 'SAVEFOOTEREDIT',
    SAVESTATICSEDIT: 'SAVESTATICSEDIT',
    UPDATEBANNEREDIT: 'UPDATEBANNEREDIT',
    GETINFORMATIONEDIT: 'GETINFORMATIONEDIT',
    SAVEINFORMATIONEDIT: 'SAVEINFORMATIONEDIT',
    GETALLIMAGES: 'GETALLIMAGES',
    GETALLHIGHLIGHT: 'GETALLHIGHLIGHT',
    GETWORKINGDAYS: 'GETWORKINGDAYS',
    GETIMAGEWORKINGDAYS: 'GETIMAGEWORKINGDAYS',
    SAVEWORKINGDAYS: 'SAVEWORKINGDAYS',
    GETPROFILEINTRO: 'EDIT/GETPROFILEINTRO',
    GETFUNCFACTINTRO: 'EDIT/GETFUNCFACTINTRO',
    GETCULTUREMEDIAEDIT: 'GETCULTUREMEDIAEDIT',
    SAVECULTUREMEDIAEDIT: 'SAVECULTUREMEDIAEDIT',
    CREATEDEPARTMENT: 'CREATEDEPARTMENT',
    GETDEPARTMENT: 'GETDEPARTMENT',
    GETADDRESSBOOKS: 'GETADDRESSBOOKS',
    SAVEDEPARTMENTBANNEREDIT: 'SAVEBANNEREDIT',
    SAVEDEPARTMENTINTROEDIT: 'EDIT/SAVEDEPARTMENTINTROEDIT',
    GETALLDEPARTMENTEDIT: 'GETALLDEPARTMENTEDIT',
    SAVETEAMLISTEDIT: 'SAVETEAMLISTEDIT',
    CREATEDEPARTMENTPOSITION: 'EDIT/CREATEDEPARTMENTPOSITION',
    GETPOSITION: 'EDIT/GETPOSITION',
    SAVEPOSITION: 'EDIT/SAVEPOSITION',
    GETREVIEWS: 'EDIT/GETREVIEWS',
    GETDEPARTMENTPOSITIONS: 'EDIT/GETDEPARTMENTPOSITIONS',
    SAVEDEPARTMENTPOSITION: 'EDIT/SAVEDEPARTMENTPOSITION',
    GETALLSOFTSKILLPOSITIONV2: 'EDIT/GETALLSOFTSKILLPOSITIONV2',
    GETALLPROSKILLPOSITIONV2: 'EDIT/GETALLPROSKILLPOSITIONV2',
    GETALLPROFESSIONALSKILLPOSITIONV2: 'EDIT/GETALLPROFESSIONALSKILLPOSITIONV2',
    DELETEDEPARTMENTEDIT: 'EDIT/DELETEDEPARTMENTEDIT',
    UPDATEDEPARTMENTEDIT: 'EDIT/UPDATEDEPARTMENTEDIT',
    UPDATEPOSITIONEDIT: 'EDIT/UPDATEPOSITIONEDIT',
    DELETEPOSITIONEDIT: 'EDIT/DELETEPOSITIONEDIT',
    GETPROFILEPOSITIONSOFTSKILL: 'EDIT/GETPROFILEPOSITIONSOFTSKILL',
    GETPROFILEPOSITIONPROSKILL: 'EDIT/GETPROFILEPOSITIONPROSKILL',
    SAVEPOSITIONSOFTSKILL: 'EDIT/SAVEPOSITIONSOFTSKILL',
    GETALLSKILLPOSITIONSOFTSKILL: 'EDIT/GETALLSKILLPOSITIONSOFTSKILL',
    GETROADMAPPOSITION: 'EDIT/GETROADMAPPOSITION',
    SAVEROADMAPPOSITION: 'EDIT/SAVEROADMAPPOSITION',
    SAVEPOSITIONPROSKILL: 'EDIT/SAVEPOSITIONPROSKILL',
    POSITIONS: {
      BENEFITS: {
        GETSYSTEMIMAGES: 'EDIT/POSITIONS/BENEFITS/GETSYSTEMIMAGES',
        GETBENEFITS: 'EDIT/POSITIONS/BENEFITS/GETBENEFITS',
        SAVEBENEFITS: 'EDIT/POSITIONS/BENEFITS/SAVEBENEFITS'
      },
      BANNER: {
        GETCAMPAIGNPRICE: 'EDIT/POSITIONS/BANNER/GETCAMPAIGNPRICE',
        CREATERECRUITMENTCAMPAIGN:
          'EDIT/POSITIONS/BANNER/EDITCREATERECRUITMENTCAMPAIGN',
        DEACTIVATECAMPAIGN: 'EDIT/POSITIONS/BANNER/DEACTIVATECAMPAIGN',
        GETDETAILRECRUITMENTCAMPAIGN:
          'EDIT/POSITIONS/BANNER/GETDETAILRECRUITMENTCAMPAIGN'
      }
    },
    GETJOBDESCRIPTION: 'EDIT/GETJOBDESCRIPTION',
    GETACHIVEMENTIMAGES: 'EDIT/GETACHIVEMENTIMAGES',
    SAVEJOBDESCRIPTION: 'EDIT/SAVEJOBDESCRIPTION',
    CLONEDEPARMENT: 'EDIT/CLONEDEPARMENT',
    CLONEDEPARMENTPOSITION: 'EDIT/CLONEDEPARMENTPOSITION',
    GETALLFAQS: 'EDIT/GETALLFAQS',
    ROOTFAQ: 'EDIT/ROOTFAQ',
    CHILDFAQ: 'EDIT/CHILDFAQ',
    GETALLDEPARTMENTEDIT: 'GETALLDEPARTMENTEDIT',
    GETRECRUITMENTCAMPAIGN: 'EDIT/GETRECRUITMENTCAMPAIGN',
    GETRECRUITMENT: 'EDIT/GETRECRUITMENT',
    GETINTERNALCOURSE: 'GETINTERNALCOURSE'
  },
  EXAM: {
    GETALLTEST: 'EXAM/GETALLTEST',
    GETEXAMDETAIL: 'EXAM/GETEXAMDETAIL',
    STARTEXAM: 'EXAM/STARTEXAM',
    FINISHEXAM: 'EXAM/FINISHEXAM',
    GETRESULT: 'EXAM/GETRESULT',
    GETEXAMBYSKILL: 'EXAM/GETEXAMBYSKILL'
  },
  CV: {
    GETALLCV: 'CV/GETALLCV',
    GETALLRECRUITMENTFILTER: 'CV/GETALLRECRUITMENTFILTER',
    GETMORECV: 'CV/GETMORECV',
    GETALLRECRUITMENTCV: 'CV/GETALLRECRUITMENTCV',
    INVITETOCAMPAIGN: 'CV/INVITETOCAMPAIGN'
  },
  COMPANYREPORT: {
    GETDETAIL: 'COMPANYREPORT/GETDETAIL',
    GETPASTDETAIL: 'COMPANYREPORT/GETPASTDETAIL',
    GETGENERAL: 'COMPANYREPORT/GETGENERAL',
    GETALLDEPARTMENTPOSITIONS: 'COMPANYREPORT/GETALLDEPARTMENTPOSITIONS'
  },
  JOURNEY: {
    GETSUGGESTEDSKILLS: 'USERJOURNEY/GETSUGGESTEDSKILLS',
    GETUSERJOBS: 'USERJOURNEY/GETUSERJOBS',
    GETSKILLSBYJOBS: 'USERJOURNEY/GETSKILLSBYJOBS',
    GETRELATEDCOURSEBYSKILL: 'USERJOURNEY/GETRELATEDCOURSEBYSKILL',
    GETRELATEDBLOGSBYSKILL: 'USERJOURNEY/GETRELATEDBLOGSBYSKILL',
    GETSKILL: 'USERJOURNEY/SKILL',
    RELATEDJOBS: 'USERJOURNEY/RELATEDJOBS',
    GETDOCUMENTS: 'USERJOURNEY/GETDOCUMENTS',
    GETDOCUMENTCATEGORIES: 'USERJOURNEY/GETDOCUMENTCATEGORIES',
    GETMAP: 'USERJOURNEY/MAP'
  }
}
