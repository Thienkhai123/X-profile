import Button from 'common/presentation/Button'

const SocialAdd = ({ onClick = () => {} }) => {
  return (
    <div className="py-2 border border-stoke">
      <Button
        margin="mx-auto"
        title="Thêm tài khoản"
        width="w-fit"
        textWeight="text-p14-bold text-black"
        padding="px-[8px] py-[4px]"
        height="h-[24px]"
        type="button"
        rounded="rounded-[4px]"
        onClick={onClick}
      />
    </div>
  )
}

export default SocialAdd
