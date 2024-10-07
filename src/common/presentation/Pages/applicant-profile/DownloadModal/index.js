import ATS_PDF from 'common/presentation/ATS_PDF'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import generatePDF, { Resolution, Margin, usePDF } from 'react-to-pdf'
import { getAllContent, selectATSContent } from 'store/app/portfolioSlice'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'

const options_English = {
  filename: 'CV_English.pdf',
  resolution: Resolution.MEDIUM,
  page: {
    margin: Margin.MEDIUM,
    format: 'A4'
  }
}
const options_Vietnamese = {
  filename: 'CV_Vietnamese.pdf',
  resolution: Resolution.MEDIUM,
  page: {
    margin: Margin.MEDIUM,
    format: 'A4'
  }
}

const DownloadModal = (props) => {
  const {
    closeModal,
    downloadPdfBeautyVer,
    downloadPdfAtsVer,
    downloadPdfBeautyVietnamVer
  } = props

  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.PORTFOLIO.GETALLCONTENT)
  )
  const dispatch = useDispatch()

  const ATSContent = useSelector(selectATSContent)

  const getEnglishTargetElement = () => document.getElementById('ATS_ENGLISH')
  const getVietNameseTargetElement = () =>
    document.getElementById('ATS_VIETNAMESE')

  const downloadEnglishPdf = () =>
    generatePDF(getEnglishTargetElement, options_English)
  const downloadVietnamesePdf = () =>
    generatePDF(getVietNameseTargetElement, options_Vietnamese)

  useEffect(() => {
    dispatch(getAllContent())
  }, [dispatch])

  return (
    <div className={`xl:py-2 ${loading && 'relative'}`}>
      {/* <div className="flex justify-end">
        <div className="cursor-pointer" onClick={closeModal}>
          <XProfileIcon name="cross" stroke="#333333" />
        </div>
      </div> */}
      {loading && <LoadingRoleBlock />}

      <p className="hidden xl:block text-center sm:text-p28-bold text-p18-bold  mb-2">
        Tải về hồ sơ
      </p>
      <p className="text-center sm:mb-4 mb-[32px] sm:text-p18 text-p14 text-grey-1 xl:block hidden">
        Tải về hồ sơ chuẩn ATS. Hãy chọn phiên bản hồ sơ bạn muốn tải về
      </p>
      <p className=" text-p14 text-grey-1 xl:hidden mt-2 mb-10">
        Hãy chọn phiên bản CV bạn muốn tải về
      </p>
      <div>
        <div className="flex justify-center items-center xl:gap-[16px] gap-3 ">
          <Button
            width="sm:w-[200px] w-full"
            height="sm:h-[48px] h-[44px]"
            rounded="rounded-[8px]"
            title="Tiếng Anh"
            background="bg-blue-light"
            textWeight="xl:text-p18-bold text-p14-bold  text-white whitespace-nowrap"
            padding="xl:px-3 xl:py-0 px-8 py-4 "
            onClick={() => {
              // downloadEnglishPdf()
              downloadPdfBeautyVer()
            }}
          />
          <Button
            width="sm:w-[200px] w-full "
            height="sm:h-[48px] h-[44px]"
            rounded="rounded-[8px]"
            title="Tiếng Việt"
            background="bg-button"
            textWeight="xl:text-p18-bold text-p14-bold whitespace-nowrap"
            padding="xl:px-3 xl:py-0 px-8 py-4"
            onClick={() => {
              // downloadVietnamesePdf()
              // downloadPdfAtsVer()
              downloadPdfBeautyVietnamVer()
            }}
          />
        </div>
        <div className="w-full absolute">
          <ATS_PDF
            id="ATS_ENGLISH"
            isLanguageVietnamese={false}
            information={ATSContent}
          />
          <ATS_PDF
            id="ATS_VIETNAMESE"
            isLanguageVietnamese={true}
            information={ATSContent}
          />
        </div>
      </div>
    </div>
  )
}

DownloadModal.defaultProps = {
  closeModal: () => {},
  downloadPdfBeautyVer: () => {},
  downloadPdfAtsVer: () => {}
}

export default DownloadModal
