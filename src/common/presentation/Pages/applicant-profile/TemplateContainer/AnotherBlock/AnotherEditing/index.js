const AnotherEditing = ({
  title = '',
  description = '',
  group = 0,
  handleChangeValueItem = () => {}
}) => {
  const handleChange = (key, val) => {
    handleChangeValueItem(group, key, val)
  }
  return (
    <form key={group}>
      <div className="w-full">
        <p className="text-grey-2 sm:text-p16 text-p14 sm:mb-4 mb-3">
          Những trải nghiệm khác như các dự án cá nhân, hoạt động ngoại
          khóa,...sẽ giúp bạn nổi bật hơn và tạo điểm cộng trước nhà tuyển dụng
          đấy!
        </p>
        <input
          autoFocus
          defaultValue={title}
          className="sm:text-p16-bold text-p14-bold p-2 rounded-lg text-black sm:mb-2 mb-1 outline-0 border border-button w-full"
          placeholder="Tên trải nghiệm."
          maxLength={100}
          onChange={(e) => handleChange('OtherTitle', e.target.value)}
        />
        <textarea
          defaultValue={description}
          className="custom-scrollbar rounded-lg p-[8px] w-full sm:text-p16 text-p14 text-grey-1 resize-none outline-0 border border-button"
          rows={3}
          onChange={(e) => handleChange('OtherDescription', e.target.value)}
          placeholder="Mô tả trải nghiệm"
        />
      </div>
    </form>
  )
}

export default AnotherEditing
