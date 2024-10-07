import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { toast } from 'react-toastify'
import { api } from 'common/config'

const handleClick = (tag, level, subpath = 'it') => {
  const handleClickTag = async () => {
    const fetchJobByTagName = await fetch(`${api.JOB.GET_JOB_BY_TAG}/${tag}`)
    const { data } = await fetchJobByTagName.json()
    if (data) {
      const { tag } = data

      let newWin = window.open(`/career-path/${subpath}/${tag}?level=${level}`)
      if (data) {
        if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
          //POPUP BLOCKED
          toast(
            AlertError({
              title: 'Thông báo'
            }),
            {
              toastId: 'alert-popup-prevent-warning',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
        }
      } else {
        toast(
          AlertError({
            title: 'Bạn hãy chọn vị trí khác'
          }),
          {
            toastId: 'alert-save-warning',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      }
    }
  }
  if (tag) {
    handleClickTag()
  }
}

const handleClickDetail = (tag, level, subpath = 'it') => {
  const handleClick = async () => {
    const fetchJobByTagName = await fetch(`${api.JOB.GET_JOB_BY_TAG}/${tag}`)
    const { data } = await fetchJobByTagName.json()
    if (data) {
      const { tag } = data
      window.location.replace(`/career-path/${subpath}/${tag}?level=${level}`)
    } else {
      toast(
        AlertError({
          title: 'Bạn hãy chọn vị trí khác'
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }
  if (tag) {
    handleClick()
  }
}

export const addEventToPositionCrp = (positionName) => {
  const positions = {
    'ba-map-crp': [
      {
        id: '_2-ba-fresher',
        action: () => {
          handleClick('ba', 'fresher')
        }
      },
      {
        id: '_2-ba-junior',
        action: () => {
          handleClick('ba', 'junior')
        }
      },
      {
        id: '_2-ba-middle',
        action: () => {
          handleClick('ba', 'middle')
        }
      },
      {
        id: '_2-ba-senior',
        action: () => {
          handleClick('ba', 'senior')
        }
      },
      {
        id: '_2-ba-manager',
        action: () => {
          handleClick('ba', 'manager')
        }
      },
      {
        id: '_1-starter',
        action: () => {
          handleClick('ba', 'starter')
        }
      },
      {
        id: '_2-ba-intern',
        action: () => {
          handleClick('ba', 'intern')
        }
      },
      {
        id: '_1-product-manager',
        action: async () => {
          handleClick('product-manager', 'product-manager')
        }
      },
      {
        id: '_1-ba-management-consultant',
        action: () => {
          handleClick('ba', 'management-consultant')
        }
      }
    ],
    'id-map-crp': [
      // UI DESIGNER
      {
        id: '_2-uid-stater',
        action: () => {
          handleClick('ui-designer', 'starter')
        }
      },
      {
        id: '_2-uid-intern',
        action: () => {
          handleClick('ui-designer', 'intern')
        }
      },
      {
        id: '_2-uid-fresher',
        action: () => {
          handleClick('ui-designer', 'fresher')
        }
      },
      {
        id: '_2-uid-junior',
        action: () => {
          handleClick('ui-designer', 'junior')
        }
      },
      {
        id: '_2-uid-middle',
        action: () => {
          handleClick('ui-designer', 'middle')
        }
      },
      {
        id: '_2-uid-senior',
        action: () => {
          handleClick('ui-designer', 'senior')
        }
      },
      // {
      //   id: '_2-uid-manager',
      //   action: () => {
      //     handleClick('ui-designer', 'manager')
      //   }
      // },
      // // UX DESIGNER
      // {
      //   id: '_2-uxd-stater',
      //   action: () => {
      //     handleClick('ux-designer', 'starter')
      //   }
      // },
      // {
      //   id: '_2-uxd-intern',
      //   action: () => {
      //     handleClick('ux-designer', 'intern')
      //   }
      // },
      // {
      //   id: '_2-uxd-fresher',
      //   action: () => {
      //     handleClick('ux-designer', 'fresher')
      //   }
      // },
      {
        id: '_2-uxd-junior',
        action: () => {
          handleClick('ux-designer', 'junior')
        }
      },
      {
        id: '_2-uxd-middle',
        action: () => {
          handleClick('ux-designer', 'middle')
        }
      },
      {
        id: '_2-uxd-senior',
        action: () => {
          handleClick('ux-designer', 'senior')
        }
      },
      // {
      //   id: '_2-uxd-manager',
      //   action: () => {
      //     handleClick('ux-designer', 'manager')
      //   }
      // },
      // UX WRITER
      {
        id: '_2-uxwriter-stater',
        action: () => {
          handleClick('ux-writer', 'starter')
        }
      },
      {
        id: '_2-uxwriter-intern',
        action: () => {
          handleClick('ux-writer', 'intern')
        }
      },
      {
        id: '_2-uxwriter-fresher',
        action: () => {
          handleClick('ux-writer', 'fresher')
        }
      },
      {
        id: '_2-uxwriter-junior',
        action: () => {
          handleClick('ux-writer', 'junior')
        }
      },
      {
        id: '_2-uxwriter-middle',
        action: () => {
          handleClick('ux-writer', 'middle')
        }
      },
      {
        id: '_2-uxwriter-senior',
        action: () => {
          handleClick('ux-writer', 'senior')
        }
      },
      {
        id: '_2-uxwriter-manager',
        action: () => {
          handleClick('ux-writer', 'manager')
        }
      }
    ],
    'se-map-crp': [
      {
        id: '_3-product-manager',
        action: () => {
          handleClick('product-manager', 'product-manager')
        }
      },
      {
        id: '_3-cto',
        action: () => {
          handleClick('cto', 'cto')
        }
      },
      {
        id: '_3-product-owner',
        action: () => {
          handleClick('product-owner', 'product-owner')
        }
      },
      // SOFTWARE ENGINEER
      {
        id: '_3-se-stater',
        action: () => {
          handleClick('dev', 'starter')
        }
      },
      {
        id: '_3-se-intern',
        action: () => {
          handleClick('dev', 'intern')
        }
      },
      {
        id: '_3-se-fresher',
        action: () => {
          handleClick('dev', 'fresher')
        }
      },
      {
        id: '_3-se-junior',
        action: () => {
          handleClick('dev', 'junior')
        }
      },
      {
        id: '_3-se-middle',
        action: () => {
          handleClick('dev', 'middle')
        }
      },
      {
        id: '_3-se-senior',
        action: () => {
          handleClick('dev', 'senior')
        }
      },
      {
        id: '_3-se-manager',
        action: () => {
          handleClick('dev', 'manager')
        }
      },
      // SOFTWARE TECH LEADER
      {
        id: '_3-tl-stater',
        action: () => {
          handleClick('techlead', 'starter')
        }
      },
      {
        id: '_3-tl-intern',
        action: () => {
          handleClick('techlead', 'intern')
        }
      },
      {
        id: '_3-tl-fresher',
        action: () => {
          handleClick('techlead', 'fresher')
        }
      },
      {
        id: '_3-tl-junior',
        action: () => {
          handleClick('techlead', 'junior')
        }
      },
      {
        id: '_3-tl-middle',
        action: () => {
          handleClick('techlead', 'middle')
        }
      },
      {
        id: '_3-tl-senior',
        action: () => {
          handleClick('techlead', 'senior')
        }
      },
      {
        id: '_3-tl-manager',
        action: () => {
          handleClick('techlead', 'manager')
        }
      },
      // SOFTWARE ARCHITECT
      // {
      //   id: '_3-sw-stater',
      //   action: () => {
      //     handleClick('software-architecture', 'starter')
      //   }
      // },
      // {
      //   id: '_3-sw-intern',
      //   action: () => {
      //     handleClick('software-architecture', 'intern')
      //   }
      // },
      // {
      //   id: '_3-sw-fresher',
      //   action: () => {
      //     handleClick('software-architecture', 'fresher')
      //   }
      // },
      // {
      //   id: '_3-sw-junior',
      //   action: () => {
      //     handleClick('software-architecture', 'junior')
      //   }
      // },
      // {
      //   id: '_3-sw-middle',
      //   action: () => {
      //     handleClick('software-architecture', 'middle')
      //   }
      // },
      {
        id: '_3-sw-senior',
        action: () => {
          handleClick('software-architecture', 'senior')
        }
      },
      {
        id: '_3-sw-manager',
        action: () => {
          handleClick('software-architecture', 'manager')
        }
      }
    ],
    'sqc-map-crp': [
      {
        id: '_4-product-manager',
        action: () => {
          handleClick('product-manager', 'product-manager')
        }
      },
      // TESTER
      {
        id: '_4-t-stater',
        action: () => {
          handleClick('tester', 'starter')
        }
      },
      {
        id: '_4-t-intern',
        action: () => {
          handleClick('tester', 'intern')
        }
      },
      {
        id: '_4-t-fresher',
        action: () => {
          handleClick('tester', 'fresher')
        }
      },
      {
        id: '_4-t-junior',
        action: () => {
          handleClick('tester', 'junior')
        }
      },
      {
        id: '_4-t-middle',
        action: () => {
          handleClick('tester', 'middle')
        }
      },
      {
        id: '_4-t-senior',
        action: () => {
          handleClick('tester', 'senior')
        }
      },
      {
        id: '_4-t-manager',
        action: () => {
          handleClick('tester', 'manager')
        }
      },
      // QUALITY ASSURANCE
      {
        id: '_4-qae-stater',
        action: () => {
          handleClick('qa', 'starter')
        }
      },
      {
        id: '_4-qae-intern',
        action: () => {
          handleClick('qa', 'intern')
        }
      },
      {
        id: '_4-qae-fresher',
        action: () => {
          handleClick('qa', 'fresher')
        }
      },
      {
        id: '_4-qae-junior',
        action: () => {
          handleClick('qa', 'junior')
        }
      },
      {
        id: '_4-qae-middle',
        action: () => {
          handleClick('qa', 'middle')
        }
      },
      {
        id: '_4-qae-senior',
        action: () => {
          handleClick('qa', 'senior')
        }
      },
      {
        id: '_4-qae-manager',
        action: () => {
          handleClick('qa', 'manager')
        }
      }
    ],
    'cs-si-map-crp': [
      {
        id: '_1-security-consultant',
        action: () => {
          handleClick('security-consultant', 'security-consultant')
        }
      },
      // Security Operations Analyst
      {
        id: '_1-soa-stater',
        action: () => {
          handleClick(
            'security-operations-analyst',
            'starter',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-intern',
        action: () => {
          handleClick('security-operations-analyst', 'intern', 'cyber-security')
        }
      },
      {
        id: '_1-soa-fresher',
        action: () => {
          handleClick(
            'security-operations-analyst',
            'fresher',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-junior',
        action: () => {
          handleClick('security-operations-analyst', 'junior', 'cyber-security')
        }
      },
      {
        id: '_1-soa-middle',
        action: () => {
          handleClick('security-operations-analyst', 'middle', 'cyber-security')
        }
      },
      {
        id: '_1-soa-senior',
        action: () => {
          handleClick('security-operations-analyst', 'senior', 'cyber-security')
        }
      },
      {
        id: '_1-soa-manager',
        action: () => {
          handleClick(
            'security-operations-analyst',
            'manager',
            'cyber-security'
          )
        }
      },
      // Security Analyst
      {
        id: '_1-sa-stater',
        action: () => {
          handleClick('security-analyst', 'starter', 'cyber-security')
        }
      },
      {
        id: '_1-sa-intern',
        action: () => {
          handleClick('security-analyst', 'intern', 'cyber-security')
        }
      },
      {
        id: '_1-sa-fresher',
        action: () => {
          handleClick('security-analyst', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_1-sa-junior',
        action: () => {
          handleClick('security-analyst', 'junior', 'cyber-security')
        }
      },
      {
        id: '_1-sa-middle',
        action: () => {
          handleClick('security-analyst', 'middle', 'cyber-security')
        }
      },
      {
        id: '_1-sa-senior',
        action: () => {
          handleClick('security-analyst', 'senior', 'cyber-security')
        }
      },
      {
        id: '_1-sa-manager',
        action: () => {
          handleClick('security-analyst', 'manager', 'cyber-security')
        }
      },
      // Securty Administrator
      {
        id: '_1-sa2-stater',
        action: () => {
          handleClick('security-administrator', 'starter', 'cyber-security')
        }
      },
      {
        id: '_1-sa2-intern',
        action: () => {
          handleClick('security-administrator', 'intern', 'cyber-security')
        }
      },
      {
        id: '_1-sa2-fresher',
        action: () => {
          handleClick('security-administrator', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_1-sa2-junior',
        action: () => {
          handleClick('security-administrator', 'junior', 'cyber-security')
        }
      },
      {
        id: '_1-sa2-middle',
        action: () => {
          handleClick('security-administrator', 'middle', 'cyber-security')
        }
      },
      {
        id: '_1-sa2-senior',
        action: () => {
          handleClick('security-administrator', 'senior', 'cyber-security')
        }
      },
      {
        id: '_1-sa2-manager',
        action: () => {
          handleClick('security-administrator', 'manager', 'cyber-security')
        }
      }
    ],
    'cs-se-map-crp': [
      {
        id: '_2-ca',
        action: () => {
          handleClick('cloud-architect', 'cloud-architect', 'cyber-security')
        }
      },
      {
        id: '_2-hoci',
        action: () => {
          handleClick('hoci', 'hoci', 'cyber-security')
        }
      },
      {
        id: '_2-cto',
        action: () => {
          handleClick('cbs-cto', 'cbs-cto', 'cyber-security')
        }
      },
      // System Engineer
      {
        id: '_2-se-stater',
        action: () => {
          handleClick('system-engineer', 'starter', 'cyber-security')
        }
      },
      {
        id: '_2-se-intern',
        action: () => {
          handleClick('system-engineer', 'intern', 'cyber-security')
        }
      },
      {
        id: '_2-se-fresher',
        action: () => {
          handleClick('system-engineer', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_2-se-junior',
        action: () => {
          handleClick('system-engineer', 'junior', 'cyber-security')
        }
      },
      {
        id: '_2-se-middle',
        action: () => {
          handleClick('system-engineer', 'middle', 'cyber-security')
        }
      },
      {
        id: '_2-se-senior',
        action: () => {
          handleClick('system-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-se-manager',
        action: () => {
          handleClick('system-engineer', 'manager', 'cyber-security')
        }
      },
      // System Analyst
      {
        id: '_2-sa-stater',
        action: () => {
          handleClick('system-analyst', 'starter', 'cyber-security')
        }
      },
      {
        id: '_2-sa-intern',
        action: () => {
          handleClick('system-analyst', 'intern', 'cyber-security')
        }
      },
      {
        id: '_2-sa-fresher',
        action: () => {
          handleClick('system-analyst', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_2-sa-junior',
        action: () => {
          handleClick('system-analyst', 'junior', 'cyber-security')
        }
      },
      {
        id: '_2-sa-middle',
        action: () => {
          handleClick('system-analyst', 'middle', 'cyber-security')
        }
      },
      {
        id: '_2-sa-senior',
        action: () => {
          handleClick('system-analyst', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-sa-manager',
        action: () => {
          handleClick('system-analyst', 'manager', 'cyber-security')
        }
      },
      // Enterprise Architect
      // {
      //   id: '_2-ea-stater',
      //   action: () => {
      //     handleClick('enterprise-architect', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-intern',
      //   action: () => {
      //     handleClick('enterprise-architect', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-fresher',
      //   action: () => {
      //     handleClick('enterprise-architect', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-junior',
      //   action: () => {
      //     handleClick('enterprise-architect', 'junior', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-middle',
      //   action: () => {
      //     handleClick('enterprise-architect', 'middle', 'cyber-security')
      //   }
      // },
      {
        id: '_2-ea-senior',
        action: () => {
          handleClick('enterprise-architect', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-ea-manager',
        action: () => {
          handleClick('enterprise-architect', 'manager', 'cyber-security')
        }
      },
      // System Administrator
      {
        id: '_2-sa2-stater',
        action: () => {
          handleClick('system-administrator', 'starter', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-intern',
        action: () => {
          handleClick('system-administrator', 'intern', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-fresher',
        action: () => {
          handleClick('system-administrator', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-junior',
        action: () => {
          handleClick('system-administrator', 'junior', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-middle',
        action: () => {
          handleClick('system-administrator', 'middle', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-senior',
        action: () => {
          handleClick('system-administrator', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-manager',
        action: () => {
          handleClick('system-administrator', 'manager', 'cyber-security')
        }
      }
    ],
    'cs-sd-map-crp': [
      {
        id: '_3-ca',
        action: () => {
          handleClick('cloud-architect', 'cloud-architect', 'cyber-security')
        }
      },
      {
        id: '_3-hoci',
        action: () => {
          handleClick('hoci', 'hoci', 'cyber-security')
        }
      },
      {
        id: '_3-cto',
        action: () => {
          handleClick('cbs-cto', 'cbs-cto', 'cyber-security')
        }
      },
      // Principal software Engineer
      // {
      //   id: '_3-pse-stater',
      //   action: () => {
      //     handleClick(
      //       'principal-software-engineer',
      //       'starter',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_3-pse-intern',
      //   action: () => {
      //     handleClick('principal-software-engineer', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-pse-fresher',
      //   action: () => {
      //     handleClick(
      //       'principal-software-engineer',
      //       'fresher',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_3-pse-junior',
      //   action: () => {
      //     handleClick('principal-software-engineer', 'junior', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-pse-middle',
      //   action: () => {
      //     handleClick('principal-software-engineer', 'middle', 'cyber-security')
      //   }
      // },
      {
        id: '_3-pse-senior',
        action: () => {
          handleClick('principal-software-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_3-pse-manager',
        action: () => {
          handleClick(
            'principal-software-engineer',
            'manager',
            'cyber-security'
          )
        }
      },
      // devOps engineer
      // {
      //   id: '_3-doe-stater',
      //   action: () => {
      //     handleClick('devOps-engineer', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-doe-intern',
      //   action: () => {
      //     handleClick('devOps-engineer', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-doe-fresher',
      //   action: () => {
      //     handleClick('devOps-engineer', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-doe-junior',
      //   action: () => {
      //     handleClick('devOps-engineer', 'junior', 'cyber-security')
      //   }
      // },
      {
        id: '_3-doe-middle',
        action: () => {
          handleClick('devOps-engineer', 'middle', 'cyber-security')
        }
      },
      {
        id: '_3-doe-senior',
        action: () => {
          handleClick('devOps-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_3-doemanager',
        action: () => {
          handleClick('devOps-engineer', 'manager', 'cyber-security')
        }
      },
      // Software developer SC
      {
        id: '_3-sd-stater',
        action: () => {
          handleClick('cbs', 'starter', 'cyber-security')
        }
      },
      {
        id: '_3-sd-intern',
        action: () => {
          handleClick('cbs', 'intern', 'cyber-security')
        }
      },
      {
        id: '_3-sd-fresher',
        action: () => {
          handleClick('cbs', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_3-sd-junior',
        action: () => {
          handleClick('cbs', 'junior', 'cyber-security')
        }
      },
      {
        id: '_3-sd-middle',
        action: () => {
          handleClick('cbs', 'middle', 'cyber-security')
        }
      },
      {
        id: '_3-sd-senior',
        action: () => {
          handleClick('cbs', 'senior', 'cyber-security')
        }
      },
      {
        id: '_3-sd-manager',
        action: () => {
          handleClick('cbs', 'manager', 'cyber-security')
        }
      },
      // security engineer
      {
        id: '_3-se-stater',
        action: () => {
          handleClick('security-engineer', 'starter', 'cyber-security')
        }
      },
      {
        id: '_3-se-intern',
        action: () => {
          handleClick('security-engineer', 'intern'), 'cyber-security'
        }
      },
      {
        id: '_3-se-fresher',
        action: () => {
          handleClick('security-engineer', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_3-se-junior',
        action: () => {
          handleClick('security-engineer', 'junior', 'cyber-security')
        }
      },
      {
        id: '_3-se-middle',
        action: () => {
          handleClick('security-engineer', 'middle', 'cyber-security')
        }
      },
      {
        id: '_3-se-senior',
        action: () => {
          handleClick('security-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_3-se-manager',
        action: () => {
          handleClick('security-engineer', 'manager', 'cyber-security')
        }
      }
    ],
    'cs-network-map-crp': [
      // network administrator
      {
        id: '_4-na-stater',
        action: () => {
          handleClick('network-administrator', 'starter', 'cyber-security')
        }
      },
      {
        id: '_4-na-intern',
        action: () => {
          handleClick('network-administrator', 'intern', 'cyber-security')
        }
      },
      {
        id: '_4-na-fresher',
        action: () => {
          handleClick('network-administrator', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_4-na-junior',
        action: () => {
          handleClick('network-administrator', 'junior', 'cyber-security')
        }
      },
      {
        id: '_4-na-middle',
        action: () => {
          handleClick('network-administrator', 'middle', 'cyber-security')
        }
      },
      {
        id: '_4-na-senior',
        action: () => {
          handleClick('network-administrator', 'senior', 'cyber-security')
        }
      },
      {
        id: '_4-na-manager',
        action: () => {
          handleClick('network-administrator', 'manager', 'cyber-security')
        }
      },
      // network technician
      {
        id: '_4-nt-stater',
        action: () => {
          handleClick('network-technician', 'starter', 'cyber-security')
        }
      },
      {
        id: '_4-nt-intern',
        action: () => {
          handleClick('network-technician', 'intern', 'cyber-security')
        }
      },
      {
        id: '_4-nt-fresher',
        action: () => {
          handleClick('network-technician', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_4-nt-junior',
        action: () => {
          handleClick('network-technician', 'junior', 'cyber-security')
        }
      },
      {
        id: '_4-nt-middle',
        action: () => {
          handleClick('network-technician', 'middle', 'cyber-security')
        }
      },
      {
        id: '_4-nt-senior',
        action: () => {
          handleClick('network-technician', 'senior', 'cyber-security')
        }
      },
      {
        id: '_4-nt-manager',
        action: () => {
          handleClick('network-technician', 'manager', 'cyber-security')
        }
      },
      // machine learning engineer
      // {
      //   id: '_4-mle-stater',
      //   action: () => {
      //     handleClick('machine-learning-engineer', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_4-mle-intern',
      //   action: () => {
      //     handleClick('machine-learning-engineer', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_4-mle-fresher',
      //   action: () => {
      //     handleClick('machine-learning-engineer', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_4-mle-junior',
      //   action: () => {
      //     handleClick('machine-learning-engineer', 'junior', 'cyber-security')
      //   }
      // },
      {
        id: '_4-mle-middle',
        action: () => {
          handleClick('machine-learning-engineer', 'middle', 'cyber-security')
        }
      },
      {
        id: '_4-mle-senior',
        action: () => {
          handleClick('machine-learning-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_4-mle-manager',
        action: () => {
          handleClick('machine-learning-engineer', 'manager', 'cyber-security')
        }
      }
    ],
    'cs-is-map-crp': [
      {
        id: '_5-ca',
        action: () => {
          handleClick('cloud-architect', 'cloud-architect', 'cyber-security')
        }
      },
      {
        id: '_5-hoci',
        action: () => {
          handleClick('hoci', 'hoci', 'cyber-security')
        }
      },
      {
        id: '_5-cto',
        action: () => {
          handleClick('cbs-cto', 'cbs-cto', 'cyber-security')
        }
      },
      // database architect
      // {
      //   id: '_5-da2-stater',
      //   action: () => {
      //     handleClick('database-architect', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-intern',
      //   action: () => {
      //     handleClick('database-architect', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-fresher',
      //   action: () => {
      //     handleClick('database-architect', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-junior',
      //   action: () => {
      //     handleClick('database-architect', 'junior', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-middle',
      //   action: () => {
      //     handleClick('database-architect', 'middle', 'cyber-security')
      //   }
      // },
      {
        id: '_5-da2-senior',
        action: () => {
          handleClick('database-architect', 'senior', 'cyber-security')
        }
      },
      {
        id: '_5-da2-manager',
        action: () => {
          handleClick('database-architect', 'manager', 'cyber-security')
        }
      },
      // database administrator
      // {
      //   id: '_5-da-stater',
      //   action: () => {
      //     handleClick('database-administrator', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da-intern',
      //   action: () => {
      //     handleClick('database-administrator', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da-fresher',
      //   action: () => {
      //     handleClick('database-administrator', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da-junior',
      //   action: () => {
      //     handleClick('database-administrator', 'junior', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da-middle',
      //   action: () => {
      //     handleClick('database-administrator', 'middle', 'cyber-security')
      //   }
      // },
      {
        id: '_5-da-senior',
        action: () => {
          handleClick('database-administrator', 'senior', 'cyber-security')
        }
      },
      {
        id: '_5-da-manager',
        action: () => {
          handleClick('database-administrator', 'manager', 'cyber-security')
        }
      },
      // it support specialist
      {
        id: '_5-itss-stater',
        action: () => {
          handleClick('it-support-specialist', 'starter', 'cyber-security')
        }
      },
      {
        id: '_5-itss-intern',
        action: () => {
          handleClick('it-support-specialist', 'intern', 'cyber-security')
        }
      },
      {
        id: '_5-itss-fresher',
        action: () => {
          handleClick('it-support-specialist', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_5-itss-junior',
        action: () => {
          handleClick('it-support-specialist', 'junior', 'cyber-security')
        }
      },
      {
        id: '_5-itss-middle',
        action: () => {
          handleClick('it-support-specialist', 'middle', 'cyber-security')
        }
      },
      {
        id: '_5-itss-senior',
        action: () => {
          handleClick('it-support-specialist', 'senior', 'cyber-security')
        }
      },
      {
        id: '_5-itss-manager',
        action: () => {
          handleClick('it-support-specialist', 'manager', 'cyber-security')
        }
      },
      // help desk technician
      {
        id: '_5-hdt-stater',
        action: () => {
          handleClick('help-desk-technician', 'starter', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-intern',
        action: () => {
          handleClick('help-desk-technician', 'intern', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-fresher',
        action: () => {
          handleClick('help-desk-technician', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-junior',
        action: () => {
          handleClick('help-desk-technician', 'junior', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-middle',
        action: () => {
          handleClick('help-desk-technician', 'middle', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-senior',
        action: () => {
          handleClick('help-desk-technician', 'senior', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-manager',
        action: () => {
          handleClick('help-desk-technician', 'manager', 'cyber-security')
        }
      }
    ]
  }
  if (positionName) {
    positions[positionName].forEach((position) => {
      const { id, action } = position
      let elPosition = document.getElementById(id)
      if (elPosition) {
        elPosition.addEventListener('click', action)
      }
    })
  }
}

export const addEventToPositionCrpDetail = (positionName) => {
  const positions = {
    'ba-map-crp': [
      {
        id: '_2-ba-fresher',
        action: () => {
          handleClickDetail('ba', 'fresher')
        }
      },
      {
        id: '_2-ba-junior',
        action: () => {
          handleClickDetail('ba', 'junior')
        }
      },
      {
        id: '_2-ba-middle',
        action: () => {
          handleClickDetail('ba', 'middle')
        }
      },
      {
        id: '_2-ba-senior',
        action: () => {
          handleClickDetail('ba', 'senior')
        }
      },
      {
        id: '_2-ba-manager',
        action: () => {
          handleClickDetail('ba', 'manager')
        }
      },
      {
        id: '_1-starter',
        action: () => {
          handleClickDetail('ba', 'starter')
        }
      },
      {
        id: '_2-ba-intern',
        action: () => {
          handleClickDetail('ba', 'intern')
        }
      },
      {
        id: '_1-product-manager',
        action: async () => {
          handleClickDetail('product-manager', 'product-manager')
        }
      },
      {
        id: '_1-ba-management-consultant',
        action: () => {
          handleClickDetail('ba', 'management-consultant')
        }
      }
    ],
    'id-map-crp': [
      // UI DESIGNER
      {
        id: '_2-uid-stater',
        action: () => {
          handleClickDetail('ui-designer', 'starter')
        }
      },
      {
        id: '_2-uid-intern',
        action: () => {
          handleClickDetail('ui-designer', 'intern')
        }
      },
      {
        id: '_2-uid-fresher',
        action: () => {
          handleClickDetail('ui-designer', 'fresher')
        }
      },
      {
        id: '_2-uid-junior',
        action: () => {
          handleClickDetail('ui-designer', 'junior')
        }
      },
      {
        id: '_2-uid-middle',
        action: () => {
          handleClickDetail('ui-designer', 'middle')
        }
      },
      {
        id: '_2-uid-senior',
        action: () => {
          handleClickDetail('ui-designer', 'senior')
        }
      },
      {
        id: '_2-uid-manager',
        action: () => {
          handleClickDetail('ui-designer', 'manager')
        }
      },
      // UX DESIGNER
      // {
      //   id: '_2-uxd-stater',
      //   action: () => {
      //     handleClickDetail('ux-designer', 'starter')
      //   }
      // },
      // {
      //   id: '_2-uxd-intern',
      //   action: () => {
      //     handleClickDetail('ux-designer', 'intern')
      //   }
      // },
      // {
      //   id: '_2-uxd-fresher',
      //   action: () => {
      //     handleClickDetail('ux-designer', 'fresher')
      //   }
      // },
      {
        id: '_2-uxd-junior',
        action: () => {
          handleClickDetail('ux-designer', 'junior')
        }
      },
      {
        id: '_2-uxd-middle',
        action: () => {
          handleClickDetail('ux-designer', 'middle')
        }
      },
      {
        id: '_2-uxd-senior',
        action: () => {
          handleClickDetail('ux-designer', 'senior')
        }
      },
      // {
      //   id: '_2-uxd-manager',
      //   action: () => {
      //     handleClickDetail('ux-designer', 'manager')
      //   }
      // },
      // UX WRITER
      {
        id: '_2-uxwriter-stater',
        action: () => {
          handleClickDetail('ux-writer', 'starter')
        }
      },
      {
        id: '_2-uxwriter-intern',
        action: () => {
          handleClickDetail('ux-writer', 'intern')
        }
      },
      {
        id: '_2-uxwriter-fresher',
        action: () => {
          handleClickDetail('ux-writer', 'fresher')
        }
      },
      {
        id: '_2-uxwriter-junior',
        action: () => {
          handleClickDetail('ux-writer', 'junior')
        }
      },
      {
        id: '_2-uxwriter-middle',
        action: () => {
          handleClickDetail('ux-writer', 'middle')
        }
      },
      {
        id: '_2-uxwriter-senior',
        action: () => {
          handleClickDetail('ux-writer', 'senior')
        }
      },
      {
        id: '_2-uxwriter-manager',
        action: () => {
          handleClickDetail('ux-writer', 'manager')
        }
      }
    ],
    'se-map-crp': [
      {
        id: '_3-product-manager',
        action: () => {
          handleClickDetail('product-manager', 'product-manager')
        }
      },
      {
        id: '_3-cto',
        action: () => {
          handleClickDetail('cto', 'cto')
        }
      },
      {
        id: '_3-product-owner',
        action: () => {
          handleClickDetail('product-owner', 'product-owner')
        }
      },
      // SOFTWARE ENGINEER
      {
        id: '_3-se-stater',
        action: () => {
          handleClickDetail('dev', 'starter')
        }
      },
      {
        id: '_3-se-intern',
        action: () => {
          handleClickDetail('dev', 'intern')
        }
      },
      {
        id: '_3-se-fresher',
        action: () => {
          handleClickDetail('dev', 'fresher')
        }
      },
      {
        id: '_3-se-junior',
        action: () => {
          handleClickDetail('dev', 'junior')
        }
      },
      {
        id: '_3-se-middle',
        action: () => {
          handleClickDetail('dev', 'middle')
        }
      },
      {
        id: '_3-se-senior',
        action: () => {
          handleClickDetail('dev', 'senior')
        }
      },
      {
        id: '_3-se-manager',
        action: () => {
          handleClickDetail('dev', 'manager')
        }
      },
      // SOFTWARE TECH LEADER
      {
        id: '_3-tl-stater',
        action: () => {
          handleClickDetail('techlead', 'starter')
        }
      },
      {
        id: '_3-tl-intern',
        action: () => {
          handleClickDetail('techlead', 'intern')
        }
      },
      {
        id: '_3-tl-fresher',
        action: () => {
          handleClickDetail('techlead', 'fresher')
        }
      },
      {
        id: '_3-tl-junior',
        action: () => {
          handleClickDetail('techlead', 'junior')
        }
      },
      {
        id: '_3-tl-middle',
        action: () => {
          handleClickDetail('techlead', 'middle')
        }
      },
      {
        id: '_3-tl-senior',
        action: () => {
          handleClickDetail('techlead', 'senior')
        }
      },
      {
        id: '_3-tl-manager',
        action: () => {
          handleClickDetail('techlead', 'manager')
        }
      },
      // SOFTWARE ARCHITECT
      // {
      //   id: '_3-sw-stater',
      //   action: () => {
      //     handleClickDetail('software-architecture', 'starter')
      //   }
      // },
      // {
      //   id: '_3-sw-intern',
      //   action: () => {
      //     handleClickDetail('software-architecture', 'intern')
      //   }
      // },
      // {
      //   id: '_3-sw-fresher',
      //   action: () => {
      //     handleClickDetail('software-architecture', 'fresher')
      //   }
      // },
      // {
      //   id: '_3-sw-junior',
      //   action: () => {
      //     handleClickDetail('software-architecture', 'junior')
      //   }
      // },
      // {
      //   id: '_3-sw-middle',
      //   action: () => {
      //     handleClickDetail('software-architecture', 'middle')
      //   }
      // },
      {
        id: '_3-sw-senior',
        action: () => {
          handleClickDetail('software-architecture', 'senior')
        }
      },
      {
        id: '_3-sw-manager',
        action: () => {
          handleClickDetail('software-architecture', 'manager')
        }
      }
    ],
    'sqc-map-crp': [
      {
        id: '_4-product-manager',
        action: () => {
          handleClickDetail('product-manager', 'product-manager')
        }
      },
      // TESTER
      {
        id: '_4-t-stater',
        action: () => {
          handleClickDetail('tester', 'starter')
        }
      },
      {
        id: '_4-t-intern',
        action: () => {
          handleClickDetail('tester', 'intern')
        }
      },
      {
        id: '_4-t-fresher',
        action: () => {
          handleClickDetail('tester', 'fresher')
        }
      },
      {
        id: '_4-t-junior',
        action: () => {
          handleClickDetail('tester', 'junior')
        }
      },
      {
        id: '_4-t-middle',
        action: () => {
          handleClickDetail('tester', 'middle')
        }
      },
      {
        id: '_4-t-senior',
        action: () => {
          handleClickDetail('tester', 'senior')
        }
      },
      {
        id: '_4-t-manager',
        action: () => {
          handleClickDetail('tester', 'manager')
        }
      },
      // QUALITY ASSURANCE
      {
        id: '_4-qae-stater',
        action: () => {
          handleClickDetail('qa', 'starter')
        }
      },
      {
        id: '_4-qae-intern',
        action: () => {
          handleClickDetail('qa', 'intern')
        }
      },
      {
        id: '_4-qae-fresher',
        action: () => {
          handleClickDetail('qa', 'fresher')
        }
      },
      {
        id: '_4-qae-junior',
        action: () => {
          handleClickDetail('qa', 'junior')
        }
      },
      {
        id: '_4-qae-middle',
        action: () => {
          handleClickDetail('qa', 'middle')
        }
      },
      {
        id: '_4-qae-senior',
        action: () => {
          handleClickDetail('qa', 'senior')
        }
      },
      {
        id: '_4-qae-manager',
        action: () => {
          handleClickDetail('qa', 'manager')
        }
      }
    ],
    'cs-si-map-crp': [
      {
        id: '_1-security-consultant',
        action: () => {
          handleClickDetail(
            'security-consultant',
            'security-consultant',
            'cyber-security'
          )
        }
      },
      // Security Operations Analyst
      {
        id: '_1-soa-stater',
        action: () => {
          handleClickDetail(
            'security-operations-analyst',
            'starter',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-intern',
        action: () => {
          handleClickDetail(
            'security-operations-analyst',
            'intern',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-fresher',
        action: () => {
          handleClickDetail(
            'security-operations-analyst',
            'fresher',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-junior',
        action: () => {
          handleClickDetail(
            'security-operations-analyst',
            'junior',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-middle',
        action: () => {
          handleClickDetail(
            'security-operations-analyst',
            'middle',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-senior',
        action: () => {
          handleClickDetail(
            'security-operations-analyst',
            'senior',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-soa-manager',
        action: () => {
          handleClickDetail(
            'security-operations-analyst',
            'manager',
            'cyber-security'
          )
        }
      },
      // Security Analyst
      {
        id: '_1-sa-stater',
        action: () => {
          handleClickDetail('security-analyst', 'starter', 'cyber-security')
        }
      },
      {
        id: '_1-sa-intern',
        action: () => {
          handleClickDetail('security-analyst', 'intern', 'cyber-security')
        }
      },
      {
        id: '_1-sa-fresher',
        action: () => {
          handleClickDetail('security-analyst', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_1-sa-junior',
        action: () => {
          handleClickDetail('security-analyst', 'junior', 'cyber-security')
        }
      },
      {
        id: '_1-sa-middle',
        action: () => {
          handleClickDetail('security-analyst', 'middle', 'cyber-security')
        }
      },
      {
        id: '_1-sa-senior',
        action: () => {
          handleClickDetail('security-analyst', 'senior', 'cyber-security')
        }
      },
      {
        id: '_1-sa-manager',
        action: () => {
          handleClickDetail('security-analyst', 'manager', 'cyber-security')
        }
      },
      // Securty Administrator
      {
        id: '_1-sa2-stater',
        action: () => {
          handleClickDetail(
            'security-administrator',
            'starter',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-sa2-intern',
        action: () => {
          handleClickDetail(
            'security-administrator',
            'intern',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-sa2-fresher',
        action: () => {
          handleClickDetail(
            'security-administrator',
            'fresher',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-sa2-junior',
        action: () => {
          handleClick('security-administrator', 'junior', 'cyber-security')
        }
      },
      {
        id: '_1-sa2-middle',
        action: () => {
          handleClickDetail(
            'security-administrator',
            'middle',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-sa2-senior',
        action: () => {
          handleClickDetail(
            'security-administrator',
            'senior',
            'cyber-security'
          )
        }
      },
      {
        id: '_1-sa2-manager',
        action: () => {
          handleClickDetail(
            'security-administrator',
            'manager',
            'cyber-security'
          )
        }
      }
    ],
    'cs-se-map-crp': [
      {
        id: '_2-ca',
        action: () => {
          handleClickDetail(
            'cloud-architect',
            'cloud-architect',
            'cyber-security'
          )
        }
      },
      {
        id: '_2-hoci',
        action: () => {
          handleClickDetail('hoci', 'hoci', 'cyber-security')
        }
      },
      {
        id: '_2-cto',
        action: () => {
          handleClickDetail('cbs-cto', 'cbs-cto', 'cyber-security')
        }
      },
      // System Engineer
      {
        id: '_2-se-stater',
        action: () => {
          handleClickDetail('system-engineer', 'starter', 'cyber-security')
        }
      },
      {
        id: '_2-se-intern',
        action: () => {
          handleClickDetail('system-engineer', 'intern', 'cyber-security')
        }
      },
      {
        id: '_2-se-fresher',
        action: () => {
          handleClickDetail('system-engineer', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_2-se-junior',
        action: () => {
          handleClickDetail('system-engineer', 'junior', 'cyber-security')
        }
      },
      {
        id: '_2-se-middle',
        action: () => {
          handleClickDetail('system-engineer', 'middle', 'cyber-security')
        }
      },
      {
        id: '_2-se-senior',
        action: () => {
          handleClickDetail('system-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-se-manager',
        action: () => {
          handleClickDetail('system-engineer', 'manager', 'cyber-security')
        }
      },
      // System Analyst
      {
        id: '_2-sa-stater',
        action: () => {
          handleClickDetail('system-analyst', 'starter', 'cyber-security')
        }
      },
      {
        id: '_2-sa-intern',
        action: () => {
          handleClickDetail('system-analyst', 'intern', 'cyber-security')
        }
      },
      {
        id: '_2-sa-fresher',
        action: () => {
          handleClickDetail('system-analyst', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_2-sa-junior',
        action: () => {
          handleClickDetail('system-analyst', 'junior', 'cyber-security')
        }
      },
      {
        id: '_2-sa-middle',
        action: () => {
          handleClickDetail('system-analyst', 'middle', 'cyber-security')
        }
      },
      {
        id: '_2-sa-senior',
        action: () => {
          handleClickDetail('system-analyst', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-sa-manager',
        action: () => {
          handleClickDetail('system-analyst', 'manager', 'cyber-security')
        }
      },
      // Enterprise Architect
      // {
      //   id: '_2-ea-stater',
      //   action: () => {
      //     handleClickDetail('enterprise-architect', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-intern',
      //   action: () => {
      //     handleClickDetail('enterprise-architect', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-fresher',
      //   action: () => {
      //     handleClickDetail('enterprise-architect', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-junior',
      //   action: () => {
      //     handleClickDetail('enterprise-architect', 'junior', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_2-ea-middle',
      //   action: () => {
      //     handleClickDetail('enterprise-architect', 'middle', 'cyber-security')
      //   }
      // },
      {
        id: '_2-ea-senior',
        action: () => {
          handleClickDetail('enterprise-architect', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-ea-manager',
        action: () => {
          handleClickDetail('enterprise-architect', 'manager', 'cyber-security')
        }
      },
      // System Administrator
      {
        id: '_2-sa2-stater',
        action: () => {
          handleClickDetail('system-administrator', 'starter', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-intern',
        action: () => {
          handleClickDetail('system-administrator', 'intern', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-fresher',
        action: () => {
          handleClickDetail('system-administrator', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-junior',
        action: () => {
          handleClickDetail('system-administrator', 'junior', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-middle',
        action: () => {
          handleClickDetail('system-administrator', 'middle', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-senior',
        action: () => {
          handleClickDetail('system-administrator', 'senior', 'cyber-security')
        }
      },
      {
        id: '_2-sa2-manager',
        action: () => {
          handleClickDetail('system-administrator', 'manager', 'cyber-security')
        }
      }
    ],
    'cs-sd-map-crp': [
      {
        id: '_3-ca',
        action: () => {
          handleClickDetail(
            'cloud-architect',
            'cloud-architect',
            'cyber-security'
          )
        }
      },
      {
        id: '_3-hoci',
        action: () => {
          handleClickDetail('hoci', 'hoci', 'cyber-security')
        }
      },
      {
        id: '_3-cto',
        action: () => {
          handleClickDetail('cbs-cto', 'cbs-cto', 'cyber-security')
        }
      },
      // Principal software Engineer
      // {
      //   id: '_3-pse-stater',
      //   action: () => {
      //     handleClickDetail(
      //       'principal-software-engineer',
      //       'starter',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_3-pse-intern',
      //   action: () => {
      //     handleClickDetail(
      //       'principal-software-engineer',
      //       'intern',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_3-pse-fresher',
      //   action: () => {
      //     handleClickDetail(
      //       'principal-software-engineer',
      //       'fresher',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_3-pse-junior',
      //   action: () => {
      //     handleClickDetail(
      //       'principal-software-engineer',
      //       'junior',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_3-pse-middle',
      //   action: () => {
      //     handleClickDetail(
      //       'principal-software-engineer',
      //       'middle',
      //       'cyber-security'
      //     )
      //   }
      // },
      {
        id: '_3-pse-senior',
        action: () => {
          handleClickDetail(
            'principal-software-engineer',
            'senior',
            'cyber-security'
          )
        }
      },
      {
        id: '_3-pse-manager',
        action: () => {
          handleClickDetail(
            'principal-software-engineer',
            'manager',
            'cyber-security'
          )
        }
      },
      // devOps engineer
      // {
      //   id: '_3-doe-stater',
      //   action: () => {
      //     handleClickDetail('devOps-engineer', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-doe-intern',
      //   action: () => {
      //     handleClickDetail('devOps-engineer', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-doe-fresher',
      //   action: () => {
      //     handleClickDetail('devOps-engineer', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_3-doe-junior',
      //   action: () => {
      //     handleClickDetail('devOps-engineer', 'junior', 'cyber-security')
      //   }
      // },
      {
        id: '_3-doe-middle',
        action: () => {
          handleClickDetail('devOps-engineer', 'middle', 'cyber-security')
        }
      },
      {
        id: '_3-doe-senior',
        action: () => {
          handleClickDetail('devOps-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_3-doemanager',
        action: () => {
          handleClickDetail('devOps-engineer', 'manager', 'cyber-security')
        }
      },
      // Software developer SC
      {
        id: '_3-sd-stater',
        action: () => {
          handleClickDetail('cbs', 'starter', 'cyber-security')
        }
      },
      {
        id: '_3-sd-intern',
        action: () => {
          handleClickDetail('cbs', 'intern', 'cyber-security')
        }
      },
      {
        id: '_3-sd-fresher',
        action: () => {
          handleClickDetail('cbs', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_3-sd-junior',
        action: () => {
          handleClickDetail('cbs', 'junior', 'cyber-security')
        }
      },
      {
        id: '_3-sd-middle',
        action: () => {
          handleClickDetail('cbs', 'middle', 'cyber-security')
        }
      },
      {
        id: '_3-sd-senior',
        action: () => {
          handleClickDetail('cbs', 'senior', 'cyber-security')
        }
      },
      {
        id: '_3-sd-manager',
        action: () => {
          handleClickDetail('cbs', 'manager', 'cyber-security')
        }
      },
      // security engineer
      {
        id: '_3-se-stater',
        action: () => {
          handleClickDetail('security-engineer', 'starter', 'cyber-security')
        }
      },
      {
        id: '_3-se-intern',
        action: () => {
          handleClickDetail('security-engineer', 'intern', 'cyber-security')
        }
      },
      {
        id: '_3-se-fresher',
        action: () => {
          handleClickDetail('security-engineer', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_3-se-junior',
        action: () => {
          handleClickDetail('security-engineer', 'junior', 'cyber-security')
        }
      },
      {
        id: '_3-se-middle',
        action: () => {
          handleClickDetail('security-engineer', 'middle', 'cyber-security')
        }
      },
      {
        id: '_3-se-senior',
        action: () => {
          handleClickDetail('security-engineer', 'senior', 'cyber-security')
        }
      },
      {
        id: '_3-se-manager',
        action: () => {
          handleClickDetail('security-engineer', 'manager', 'cyber-security')
        }
      }
    ],
    'cs-network-map-crp': [
      // network administrator
      {
        id: '_4-na-stater',
        action: () => {
          handleClickDetail(
            'network-administrator',
            'starter',
            'cyber-security'
          )
        }
      },
      {
        id: '_4-na-intern',
        action: () => {
          handleClickDetail('network-administrator', 'intern', 'cyber-security')
        }
      },
      {
        id: '_4-na-fresher',
        action: () => {
          handleClickDetail(
            'network-administrator',
            'fresher',
            'cyber-security'
          )
        }
      },
      {
        id: '_4-na-junior',
        action: () => {
          handleClickDetail('network-administrator', 'junior', 'cyber-security')
        }
      },
      {
        id: '_4-na-middle',
        action: () => {
          handleClickDetail('network-administrator', 'middle', 'cyber-security')
        }
      },
      {
        id: '_4-na-senior',
        action: () => {
          handleClickDetail('network-administrator', 'senior', 'cyber-security')
        }
      },
      {
        id: '_4-na-manager',
        action: () => {
          handleClickDetail(
            'network-administrator',
            'manager',
            'cyber-security'
          )
        }
      },
      // network technician
      {
        id: '_4-nt-stater',
        action: () => {
          handleClickDetail('network-technician', 'starter', 'cyber-security')
        }
      },
      {
        id: '_4-nt-intern',
        action: () => {
          handleClickDetail('network-technician', 'intern', 'cyber-security')
        }
      },
      {
        id: '_4-nt-fresher',
        action: () => {
          handleClickDetail('network-technician', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_4-nt-junior',
        action: () => {
          handleClickDetail('network-technician', 'junior', 'cyber-security')
        }
      },
      {
        id: '_4-nt-middle',
        action: () => {
          handleClickDetail('network-technician', 'middle', 'cyber-security')
        }
      },
      {
        id: '_4-nt-senior',
        action: () => {
          handleClickDetail('network-technician', 'senior', 'cyber-security')
        }
      },
      {
        id: '_4-nt-manager',
        action: () => {
          handleClickDetail('network-technician', 'manager', 'cyber-security')
        }
      },
      // machine learning engineer
      // {
      //   id: '_4-mle-stater',
      //   action: () => {
      //     handleClickDetail(
      //       'machine-learning-engineer',
      //       'starter',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_4-mle-intern',
      //   action: () => {
      //     handleClickDetail(
      //       'machine-learning-engineer',
      //       'intern',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_4-mle-fresher',
      //   action: () => {
      //     handleClickDetail(
      //       'machine-learning-engineer',
      //       'fresher',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_4-mle-junior',
      //   action: () => {
      //     handleClickDetail(
      //       'machine-learning-engineer',
      //       'junior',
      //       'cyber-security'
      //     )
      //   }
      // },
      {
        id: '_4-mle-middle',
        action: () => {
          handleClickDetail(
            'machine-learning-engineer',
            'middle',
            'cyber-security'
          )
        }
      },
      {
        id: '_4-mle-senior',
        action: () => {
          handleClickDetail(
            'machine-learning-engineer',
            'senior',
            'cyber-security'
          )
        }
      },
      {
        id: '_4-mle-manager',
        action: () => {
          handleClickDetail(
            'machine-learning-engineer',
            'manager',
            'cyber-security'
          )
        }
      }
    ],
    'cs-is-map-crp': [
      {
        id: '_5-ca',
        action: () => {
          handleClickDetail(
            'cloud-architect',
            'cloud-architect',
            'cyber-security'
          )
        }
      },
      {
        id: '_5-hoci',
        action: () => {
          handleClickDetail('hoci', 'hoci', 'cyber-security')
        }
      },
      {
        id: '_5-cto',
        action: () => {
          handleClickDetail('cbs-cto', 'cbs-cto', 'cyber-security')
        }
      },
      // database architect
      // {
      //   id: '_5-da2-stater',
      //   action: () => {
      //     handleClickDetail('database-architect', 'starter', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-intern',
      //   action: () => {
      //     handleClickDetail('database-architect', 'intern', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-fresher',
      //   action: () => {
      //     handleClick('database-architect', 'fresher', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-junior',
      //   action: () => {
      //     handleClickDetail('database-architect', 'junior', 'cyber-security')
      //   }
      // },
      // {
      //   id: '_5-da2-middle',
      //   action: () => {
      //     handleClickDetail('database-architect', 'middle', 'cyber-security')
      //   }
      // },
      {
        id: '_5-da2-senior',
        action: () => {
          handleClickDetail('database-architect', 'senior', 'cyber-security')
        }
      },
      {
        id: '_5-da2-manager',
        action: () => {
          handleClickDetail('database-architect', 'manager', 'cyber-security')
        }
      },
      // database administrator
      // {
      //   id: '_5-da-stater',
      //   action: () => {
      //     handleClickDetail(
      //       'database-administrator',
      //       'starter',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_5-da-intern',
      //   action: () => {
      //     handleClickDetail(
      //       'database-administrator',
      //       'intern',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_5-da-fresher',
      //   action: () => {
      //     handleClickDetail(
      //       'database-administrator',
      //       'fresher',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_5-da-junior',
      //   action: () => {
      //     handleClickDetail(
      //       'database-administrator',
      //       'junior',
      //       'cyber-security'
      //     )
      //   }
      // },
      // {
      //   id: '_5-da-middle',
      //   action: () => {
      //     handleClickDetail(
      //       'database-administrator',
      //       'middle',
      //       'cyber-security'
      //     )
      //   }
      // },
      {
        id: '_5-da-senior',
        action: () => {
          handleClickDetail(
            'database-administrator',
            'senior',
            'cyber-security'
          )
        }
      },
      {
        id: '_5-da-manager',
        action: () => {
          handleClickDetail(
            'database-administrator',
            'manager',
            'cyber-security'
          )
        }
      },
      // it support specialist
      {
        id: '_5-itss-stater',
        action: () => {
          handleClickDetail(
            'it-support-specialist',
            'starter',
            'cyber-security'
          )
        }
      },
      {
        id: '_5-itss-intern',
        action: () => {
          handleClickDetail('it-support-specialist', 'intern', 'cyber-security')
        }
      },
      {
        id: '_5-itss-fresher',
        action: () => {
          handleClickDetail(
            'it-support-specialist',
            'fresher',
            'cyber-security'
          )
        }
      },
      {
        id: '_5-itss-junior',
        action: () => {
          handleClickDetail('it-support-specialist', 'junior', 'cyber-security')
        }
      },
      {
        id: '_5-itss-middle',
        action: () => {
          handleClickDetail('it-support-specialist', 'middle', 'cyber-security')
        }
      },
      {
        id: '_5-itss-senior',
        action: () => {
          handleClickDetail('it-support-specialist', 'senior', 'cyber-security')
        }
      },
      {
        id: '_5-itss-manager',
        action: () => {
          handleClickDetail(
            'it-support-specialist',
            'manager',
            'cyber-security'
          )
        }
      },
      // help desk technician
      {
        id: '_5-hdt-stater',
        action: () => {
          handleClickDetail('help-desk-technician', 'starter', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-intern',
        action: () => {
          handleClickDetail('help-desk-technician', 'intern', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-fresher',
        action: () => {
          handleClickDetail('help-desk-technician', 'fresher', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-junior',
        action: () => {
          handleClickDetail('help-desk-technician', 'junior', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-middle',
        action: () => {
          handleClickDetail('help-desk-technician', 'middle', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-senior',
        action: () => {
          handleClickDetail('help-desk-technician', 'senior', 'cyber-security')
        }
      },
      {
        id: '_5-hdt-manager',
        action: () => {
          handleClickDetail('help-desk-technician', 'manager', 'cyber-security')
        }
      }
    ]
  }
  if (positionName) {
    positions[positionName].forEach((position) => {
      const { id, action } = position
      let elPosition = document.getElementById(id)
      if (elPosition) {
        elPosition.addEventListener('click', action)
      }
    })
  }
}

export const drawMapCrp = (id) => {
  if (id) {
    // const elWidth = screen.width
    const thisMap = document.getElementById(id)
    switch (id) {
      case 'it-main':
        thisMap.style.width = window.innerWidth * 0.37 + 'px'
        thisMap.style.top = window.innerWidth * 0.214 + 'px'
        thisMap.style.left = window.innerWidth * 0.3 + 'px'
        break
      case 'ba-map-crp':
        thisMap.style.width = window.innerWidth * 0.38 + 'px'
        thisMap.style.top = window.innerWidth * 0.214 + 'px'
        thisMap.style.left = window.innerWidth * 0.24 + 'px'
        addEventToPositionCrp(id)
        break
      case 'id-map-crp':
        thisMap.style.width = window.innerWidth * 0.35 + 'px'
        thisMap.style.top = window.innerWidth * 0.217 + 'px'
        thisMap.style.left = window.innerWidth * 0.307 + 'px'
        addEventToPositionCrp(id)
        break
      case 'se-map-crp':
        thisMap.style.width = window.innerWidth * 0.5 + 'px'
        thisMap.style.top = window.innerWidth * 0.222 + 'px'
        thisMap.style.left = window.innerWidth * 0.237 + 'px'
        addEventToPositionCrp(id)
        break
      case 'sqc-map-crp':
        thisMap.style.width = window.innerWidth * 0.42 + 'px'
        thisMap.style.top = window.innerWidth * 0.2296 + 'px'
        thisMap.style.left = window.innerWidth * 0.238 + 'px'
        addEventToPositionCrp(id)
        break
      case 'cs-main':
        thisMap.style.width = window.innerWidth * 0.35 + 'px'
        thisMap.style.top = window.innerWidth * 0.238 + 'px'
        thisMap.style.left = window.innerWidth * 0.327 + 'px'
        break
      case 'cs-si-map-crp':
        thisMap.style.width = window.innerWidth * 0.34 + 'px'
        thisMap.style.top = window.innerWidth * 0.29 + 'px'
        thisMap.style.left = window.innerWidth * 0.335 + 'px'
        addEventToPositionCrp(id)
        break
      case 'cs-se-map-crp':
        thisMap.style.width = window.innerWidth * 0.45 + 'px'
        thisMap.style.top = window.innerWidth * 0.292 + 'px'
        thisMap.style.left = window.innerWidth * 0.279 + 'px'
        addEventToPositionCrp(id)
        break
      case 'cs-sd-map-crp':
        thisMap.style.width = window.innerWidth * 0.45 + 'px'
        thisMap.style.top = window.innerWidth * 0.288 + 'px'
        thisMap.style.left = window.innerWidth * 0.2795 + 'px'
        addEventToPositionCrp(id)
        break
      case 'cs-network-map-crp':
        thisMap.style.width = window.innerWidth * 0.34 + 'px'
        thisMap.style.top = window.innerWidth * 0.289 + 'px'
        thisMap.style.left = window.innerWidth * 0.336 + 'px'
        addEventToPositionCrp(id)
        break
      case 'cs-is-map-crp':
        thisMap.style.width = window.innerWidth * 0.45 + 'px'
        thisMap.style.top = window.innerWidth * 0.29 + 'px'
        thisMap.style.left = window.innerWidth * 0.279 + 'px'
        addEventToPositionCrp(id)
        break
      default:
        break
    }
  }
}

export const drawMapCrpDetail = (id) => {
  if (id) {
    // const elWidth = screen.width
    const thisMap = document.getElementById(id)
    switch (id) {
      case 'ba-map-crp':
        thisMap.style.width = window.innerWidth * 0.382 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.213 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.24 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'id-map-crp':
        thisMap.style.width = window.innerWidth * 0.356 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.2164 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.307 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'se-map-crp':
        thisMap.style.width = window.innerWidth * 0.5 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.222 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.237 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'sqc-map-crp':
        thisMap.style.width = window.innerWidth * 0.42087 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.2296 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.238 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'cs-si-map-crp':
        thisMap.style.width = window.innerWidth * 0.321 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.2695 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.344 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'cs-se-map-crp':
        thisMap.style.width = window.innerWidth * 0.42 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.27 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.293 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'cs-sd-map-crp':
        thisMap.style.width = window.innerWidth * 0.42 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.27 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.292 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'cs-network-map-crp':
        thisMap.style.width = window.innerWidth * 0.3202 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.27 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.344 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      case 'cs-is-map-crp':
        thisMap.style.width = window.innerWidth * 0.42 * 0.7 + 'px'
        thisMap.style.top = window.innerWidth * 0.27 * 0.7 + 'px'
        thisMap.style.left = window.innerWidth * 0.293 * 0.7 + 'px'
        addEventToPositionCrpDetail(id)
        break
      default:
        break
    }
  }
}
