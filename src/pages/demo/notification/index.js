import useTrans from 'common/hooks/useTrans'
import { NotificationModal } from 'common/presentation/Notification/Modal'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import Head from 'next/head'
import { useState } from 'react'
import { toast } from 'react-toastify'

const DemoNotification = () => {
  const trans = useTrans()
  const [modals, setModals] = useState({
    login: {
      success: false,
      error: false
    },
    cv: {
      success: false,
      error: false
    },
    apply: {
      success: false,
      error: false
    },
    notification: false,
    message: false
  })
  const handleToastSuccess = () => {
    toast(
      ToastSuccess({
        title: 'Lưu thành công'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }

  const handleAlertSuccessCustom = () => {
    toast(
      AlertSuccess({
        title: 'Lưu thành công'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }
  const handleAlertErrorCustom = () => {
    toast(
      AlertError({
        title: 'Thất bại',
        background: 'error'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }
  const handleAlertWaringCustom = () => {
    toast(
      AlertWaring({
        title: 'Lưu không thành công'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }

  const handleAlertSuccessCustom2 = () => {
    toast(
      AlertSuccess({
        title:
          '(Thông báo thành công nhưng có 2 dòng) Pharetra penatibus montes nostra aenean eget.',
        description: 'Thông tin'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }
  const handleAlertErrorCustom2 = () => {
    toast(
      AlertError({
        title:
          '(Thông báo thành công nhưng có 2 dòng) Pharetra penatibus montes nostra aenean eget.'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }
  const handleAlertWaringCustom2 = () => {
    toast(
      AlertWaring({
        title:
          '(Thông báo thành công nhưng có 2 dòng) Pharetra penatibus montes nostra aenean eget.',
        description: 'Thông tin'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }

  return (
    <div className="flex-1">
      <Head>
        <title>Demo Notification</title>
      </Head>
      <div className="w-[80vw] mx-auto py-8">
        <p className="text-h1 mb-2">Modal Components</p>
        <div className="grid grid-cols-4 gap-4 ">
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({
                ...modals,
                login: { ...modals.login, success: true }
              })
            }
          >
            LoginSuccess
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({ ...modals, login: { ...modals.login, error: true } })
            }
          >
            LoginError
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({ ...modals, cv: { ...modals.cv, success: true } })
            }
          >
            CreateCVSuccess
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({ ...modals, cv: { ...modals.cv, error: true } })
            }
          >
            CreateCVError
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({
                ...modals,
                apply: { ...modals.apply, success: true }
              })
            }
          >
            ApplyCVSuccess
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({
                ...modals,
                apply: { ...modals.apply, error: true }
              })
            }
          >
            ApplyCVError
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({
                ...modals,
                notification: true
              })
            }
          >
            Notification
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={() =>
              setModals({
                ...modals,
                message: true
              })
            }
          >
            Message
          </button>
        </div>
      </div>

      <div>
        <NotificationModal
          icon="tick"
          title={trans.MESSAGE?.loginSuccess?.title}
          description={trans.MESSAGE?.loginSuccess?.description}
          btnClickTitle={trans.MESSAGE?.loginSuccess?.buttonClick}
          open={modals.login.success}
          onCloseModal={() =>
            setModals({
              ...modals,
              login: { ...modals.login, success: !modals.login.success }
            })
          }
        />
        <NotificationModal
          icon="cancelModal"
          title={trans.MESSAGE?.loginError?.title}
          description={trans.MESSAGE?.loginError?.description}
          btnClickTitle={trans.MESSAGE?.loginError?.buttonClick}
          open={modals.login.error}
          onCloseModal={() =>
            setModals({
              ...modals,
              login: { ...modals.login, error: !modals.login.error }
            })
          }
        />
        <NotificationModal
          icon="tick"
          title={trans.MESSAGE?.createPortfolioSuccess?.title}
          description={trans.MESSAGE?.createPortfolioSuccess?.description}
          btnClickTitle={trans.MESSAGE?.createPortfolioSuccess?.buttonClick}
          open={modals.cv.success}
          onCloseModal={() =>
            setModals({
              ...modals,
              cv: { ...modals.cv, success: !modals.cv.success }
            })
          }
        />
        <NotificationModal
          icon="cancelModal"
          title={trans.MESSAGE?.createPortfolioError?.title}
          description={trans.MESSAGE?.createPortfolioError?.description}
          btnClickTitle={trans.MESSAGE?.createPortfolioError?.buttonClick}
          open={modals.cv.error}
          onCloseModal={() =>
            setModals({
              ...modals,
              cv: { ...modals.cv, error: !modals.cv.error }
            })
          }
        />
        <NotificationModal
          icon="tick"
          title={trans.MESSAGE?.applyCVSuccess?.title}
          description={trans.MESSAGE?.applyCVSuccess?.description}
          btnClickTitle={trans.MESSAGE?.applyCVSuccess?.buttonClick}
          btnCancelTitle={trans.MESSAGE?.applyCVSuccess?.buttonCancel}
          open={modals.apply.success}
          onCloseModal={() =>
            setModals({
              ...modals,
              apply: { ...modals.apply, success: !modals.apply.success }
            })
          }
        />
        <NotificationModal
          icon="caution"
          title={trans.MESSAGE?.applyCVError?.title}
          description={trans.MESSAGE?.applyCVError?.description}
          btnClickTitle={trans.MESSAGE?.applyCVError?.buttonClick}
          btnCancelTitle={trans.MESSAGE?.applyCVError?.buttonCancel}
          open={modals.apply.error}
          onCloseModal={() =>
            setModals({
              ...modals,
              apply: { ...modals.apply, error: !modals.apply.error }
            })
          }
        />
        <NotificationModal
          icon="notification"
          title={trans.MESSAGE?.applyCVError?.title}
          description={trans.MESSAGE?.applyCVError?.description}
          btnClickTitle={trans.MESSAGE?.applyCVError?.buttonClick}
          btnCancelTitle={trans.MESSAGE?.applyCVError?.buttonCancel}
          open={modals.notification}
          onCloseModal={() =>
            setModals({
              ...modals,
              notification: !modals.notification
            })
          }
        />
        <NotificationModal
          icon="message"
          title={trans.MESSAGE?.message?.title}
          description={trans.MESSAGE?.message?.description}
          btnClickTitle={trans.MESSAGE?.message?.buttonClick}
          btnCancelTitle={trans.MESSAGE?.message?.buttonCancel}
          open={modals.message}
          onCloseModal={() =>
            setModals({
              ...modals,
              message: !modals.message
            })
          }
        />
      </div>
      <div className="w-[80vw] mx-auto pb-8">
        <p className="text-h1 mb-2">Toast Messages</p>
        <div className="grid grid-cols-4 gap-4 ">
          <button
            className="bg-button py-1 rounded-xl"
            onClick={handleToastSuccess}
          >
            Toast Success
          </button>
        </div>
      </div>
      <div className="w-[80vw] mx-auto  pb-8 ">
        <p className="text-h1 mb-2">Alert Messages</p>
        <div className="grid grid-cols-4 gap-4 ">
          <button
            className="bg-button py-1 rounded-xl"
            onClick={handleAlertSuccessCustom}
          >
            Toast Success title
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={handleAlertWaringCustom}
          >
            Toast Waring title
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={handleAlertErrorCustom}
          >
            Toast Error title
          </button>

          <button
            className="bg-button py-1 rounded-xl"
            onClick={handleAlertSuccessCustom2}
          >
            Toast Success title + description
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={handleAlertWaringCustom2}
          >
            Toast Waring title + description
          </button>
          <button
            className="bg-button py-1 rounded-xl"
            onClick={handleAlertErrorCustom2}
          >
            Toast Error title + description
          </button>
        </div>
      </div>
    </div>
  )
}

export default DemoNotification
