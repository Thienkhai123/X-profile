import XProfileIcon from 'common/presentation/Icons'

const CertificateSelect = (props) => {
  const { title, status } = props
  return (
    <div
      className={`border border-stoke rounded-lg overflow-hidden${
        status ? ' opacity-60' : 'opacity-100'
      }`}
    >
      <div
        className={`px-5 py-3  cursor-pointer flex items-center justify-between bg-stoke ${
          !status ? 'hover:bg-yellow-bg' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          <XProfileIcon name="career" fill="#294F9B" />
          <p className="uppercase text-p18-bold text-blue-light">{title}</p>
        </div>
        {status && (
          <XProfileIcon
            name="check"
            fill="#F6BB3A"
            width={'20'}
            height={'20'}
          />
        )}
      </div>
      <div className="w-full py-[24px] px-[28px]">
        <p className="text-black text-p16-bold mb-[8px]">
          Truyền thông Media-HIU
        </p>
        <p className="text-semantic text-p14 underline">
          Bằng Thạc sĩ Media - HIU
        </p>
      </div>
    </div>
  )
}

CertificateSelect.propTypes = {}
CertificateSelect.defaultProps = {
  title: '',
  status: true,
  templateOptionName: ''
}

export default CertificateSelect
