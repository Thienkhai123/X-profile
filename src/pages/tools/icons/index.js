import Head from 'next/head'
import { Fragment, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputFloat from 'common/presentation/Form/InputFloat'
import Button from 'common/presentation/Button'
import { generateFileContentFromString } from 'store/helper/generateIconFromString'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import Modal from 'common/presentation/Modal'
import XProfileIcon from 'common/presentation/Icons'
import { delay } from 'store/helper/functionHelper'
import { toast } from 'react-toastify'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

function firstLower(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toLowerCase()
  })
}

function firstUppercase(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })
}

const GenerateIconsPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [fileNameResult, setFileNameResult] = useState('')
  const [tooltip, setTooltip] = useState('Nhấn để sao chép')

  const copyTextKeyValue = () => {
    const copyText = `${firstLower(fileNameResult)}: ${firstUppercase(
      fileNameResult
    )}Icon`
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText)

    // Alert the copied text
    setTooltip('Đã sao chép')
  }

  const copyTextIconName = () => {
    const copyText = firstLower(fileNameResult)
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText)

    // Alert the copied text
    setTooltip('Đã sao chép')
  }

  const schema = yup.object().shape({
    fileName: yup.string().trim().required('Không được để trống'),
    content: yup.string().required('Không được để trống')
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const handleCloseModal = () => {
    setOpenModal(false)
    reset()
  }

  const onSubmit = (data) => {
    try {
      const { fileName } = data
      const fileAndContent = generateFileContentFromString(data)
      if (fileAndContent) {
        const zip = new JSZip()
        const folderStoreZip = zip.folder(fileName)
        folderStoreZip?.file('index.js', fileAndContent)
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          FileSaver.saveAs(content, fileName)
        })
        setFileNameResult(fileName)
        setOpenModal(true)
      } else {
        throw new Error('Cannot convert this file')
      }
    } catch (err) {
      toast(
        AlertWaring({
          title: 'Nội dung file không hợp lệ'
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

  return (
    <Fragment>
      <Head>
        <title>Generate Icon File</title>
      </Head>
      <div className="p-8">
        <div className="w-[40vw] mx-auto bg-white p-4 rounded-lg ">
          <p className="text-h3 mb-4">Generate Icon File</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <InputFloat
                label="Tên file"
                name="fileName"
                register={register}
                iconName="file"
                errorMessage={errors?.fileName?.message}
              />
            </div>
            <div>
              <div
                className="border border-grey-2 rounded-[8px] border border-grey-2 rounded-[8px]  px-[2rem] pb-2.5 pt-4 w-full text-p14 "
                style={{
                  borderColor: errors?.content?.message ? '#DB2E24' : '#999999'
                }}
              >
                <textarea
                  className={`custom-scrollbar border-0 outline-0 w-full resize-none ${
                    errors?.content?.message
                      ? 'placeholder:text-semantic-red'
                      : ''
                  }`}
                  placeholder="Nội dung file"
                  {...register('content')}
                  rows={10}
                />
              </div>
              <p className="text-semantic-red text-[14px] mt-1 h-[21px]">
                {errors?.content?.message}
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                title="Xác nhận"
                width="w-auto"
                padding="p-[13px_32px]"
                margin="mt-0"
                rounded="rounded-lg"
                height="h-[48px]"
                disabled={!isValid}
              />
            </div>
          </form>
        </div>
      </div>
      <Modal
        title="Tạo thành công"
        open={openModal}
        toggleModal={handleCloseModal}
      >
        <div className="flex gap-8 pt-8">
          <div className="flex items-center gap-4">
            <p>
              Key/Values:{' '}
              <span className="text-blue-light font-bold">{`${firstLower(
                fileNameResult
              )}: ${firstUppercase(fileNameResult)}Icon`}</span>
            </p>
            <div
              className="group relative cursor-pointer"
              onMouseLeave={async () => {
                await delay(200)
                if (tooltip !== null) {
                  setTooltip(null)
                }
              }}
            >
              <div onClick={copyTextKeyValue}>
                <XProfileIcon name="duplicate" />
              </div>
              <div
                className="group-hover:opacity-100 transition-opacity bg-gray-800  text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -top-[44px] opacity-0  mx-auto w-max	py-2 px-4"
              >
                {tooltip || 'Nhấn để sao chép'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p>
              Name String:{' '}
              <span className="text-blue-light font-bold">
                {firstLower(fileNameResult)}
              </span>
            </p>
            <div
              className="group relative cursor-pointer"
              onMouseLeave={async () => {
                await delay(200)
                if (tooltip !== null) {
                  setTooltip(null)
                }
              }}
            >
              <div onClick={copyTextIconName}>
                <XProfileIcon name="duplicate" />
              </div>
              <div
                className="group-hover:opacity-100 transition-opacity bg-gray-800  text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -top-[44px] opacity-0  mx-auto w-max	py-2 px-4"
              >
                {tooltip || 'Nhấn để sao chép'}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default GenerateIconsPage
