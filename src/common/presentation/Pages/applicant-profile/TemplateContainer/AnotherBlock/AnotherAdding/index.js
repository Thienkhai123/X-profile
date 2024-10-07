const { default: Image } = require('next/image')

const AnotherAdding = ({ handleUpload = () => {} }) => {
  return (
    <div>
      <div className="relative bg-grey-4 w-[114px] h-[114px] rounded-xl cursor-pointer flex items-center justify-center">
        <input
          id="input-file-another"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleUpload(e.target.files)
            e.target.value = ''
          }}
        />
        <label htmlFor="input-file-another">
          <Image
            placeholder="blur"
            blurDataURL="/images/imageUpload.png"
            src="/images/imageUpload.png"
            width={45.6}
            height={45.6}
            alt=""
          />
        </label>
      </div>
    </div>
  )
}

export default AnotherAdding
