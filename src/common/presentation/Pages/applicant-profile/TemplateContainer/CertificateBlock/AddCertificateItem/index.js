import PropTypes from 'prop-types'
import { uploadFile } from 'store/helper/serviceHelper'
import { useState } from 'react'
import { toast } from 'react-toastify'
import LoadingView from 'common/presentation/Loading/LoadingView'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const AddCertificateItem = (props) => {
  const { setName, setIPdfUrl, pdfUrl, name, error, setError, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [errorHttp, setErrorHttp] = useState('')

  const handleUploadImage = async (file) => {
    if (file[0].size / 1024 > 5000) {
      toast(
        AlertError({
          title: 'Chưa hỗ trợ upload file kích thước lớn'
        }),
        {
          toastId: 'upload-certificate-error',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      setError('Kích thước File quá lớn')
    } else {
      setLoading(true)
      const { successMessage } = await uploadFile(file[0])
      setIPdfUrl(successMessage)
      setLoading(false)
      setError('')
    }
  }

  const handleChangePdfUrl = (val = '') => {
    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)

    setIPdfUrl(val)
    if (error !== '') {
      setError('')
    }
    if (!val.match(regex)) {
      setErrorHttp('Đường dẫn không hợp lệ')
    } else {
      setErrorHttp('')
    }
  }

  const handleChangeName = (val) => {
    setName(val)
    if (error !== '') {
      setError('')
    }
  }

  return (
    <div className="">
      <div>
        <label className="text-p18-bold ">Tên chứng chỉ</label>
        <input
          value={name}
          className="w-full p-2 mt-2 outline-0"
          onChange={(e) => handleChangeName(e.target.value)}
          placeholder="Tên chứng chỉ - Lĩnh vực. VD: Q Grade - Coffee Industry"
          style={{
            border: error && !name ? '2px solid red' : '1px dashed #ECEEF0'
          }}
        />
        <p className="text-p16 text-red-500 mt-[4px] h-[22px]">{error}</p>
      </div>
      <div className="my-1">
        <label className="text-p18-bold ">Đăng tải chứng chỉ</label>
        <p className="text-p14 text-grey-1 mt-2">
          Bạn có thể chèn trực tiếp liên kết dẫn đến chứng chỉ của bạn hoặc tải
          lên file PDF tại đây:
        </p>

        <input
          id="input-file"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleUploadImage(e.target.files)}
        />
        <div
          className="min-h-[250px] w-full flex flex-col items-center mt-2 justify-center bg-grey-4"
          style={{
            border: error && !pdfUrl ? '2px solid red' : '1px dashed #CCCCCC'
          }}
        >
          <div className="flex sm:flex-row flex-col sm:items-center gap-[8px] mb-2">
            <p className="text-grey-2 text-p14">Chèn liên kết</p>
            <div>
              <input
                value={pdfUrl}
                className="py-1 px-2 rounded-[8px] text-grey-1 md:min-w-[320px] bg-white"
                placeholder="http://picture.com"
                onChange={(e) => handleChangePdfUrl(e.target.value)}
              />
            </div>
            <div className="sm:py-1">
              <div className="sm:border-l sm:border-grey-3 sm:pl-2">
                <button className="text-blue-light text-p14" onClick={onCancel}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
          <p className="mb-2 text-semantic-red h-[24px]">{errorHttp}</p>

          <p className="text-p14 text-grey-2 mb-4">Hoặc</p>
          <label
            htmlFor="input-file"
            className="cursor-pointer bg-button rounded-[8px] text-neutral py-[8px] px-[12px] h-auto w-auto mx-auto text-p18 font-bold flex items-center gap-[8px]"
          >
            {loading && <LoadingView width={20} height={20} />}
            Upload PDF
          </label>
          <p className="text-grey-2 text-p14 mt-6 sm:p-0 px-3">
            Định dạng hỗ trợ : PDF, dung lượng 10MB
          </p>
        </div>
        {/* <p className="text-p16 text-red-500 mt-[4px] h-[22px]">{error}</p> */}
      </div>
    </div>
  )
}

AddCertificateItem.propTypes = {
  setIPdfUrl: PropTypes.func,
  setName: PropTypes.func,
  setError: PropTypes.func,
  onCancel: PropTypes.func,
  pdfUrl: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string
}

AddCertificateItem.defaultProps = {
  setIPdfUrl: () => {},
  setName: () => {},
  setError: () => {},
  onCancel: () => {},
  pdfUrl: '',
  name: '',
  error: ''
}

export default AddCertificateItem
