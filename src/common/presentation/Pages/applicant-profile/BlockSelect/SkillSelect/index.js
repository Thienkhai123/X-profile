import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import SkillRange from '../../TemplateContainer/SkillBlock/SkillRange'

const SkillSelect = (props) => {
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
        <div className="mb-8">
          <div className="flex items-center justify-between ">
            <div className="flex items-end gap-4 ">
              <p className="text-p18-bold ">HTML/CSS</p>
              <Button
                title="Làm bài test "
                rounded="rounded-[8px]"
                background={'bg-grey-4'}
                color="text-neutral"
                padding="px-[12px] py-0.5"
                height="h-auto"
                width="w-[116px]"
                textWeight={'sm:text-p14 font-bold'}
              />
            </div>
          </div>
          <SkillRange value={20} />
        </div>
      </div>
    </div>
  )
}

SkillSelect.propTypes = {}
SkillSelect.defaultProps = {
  title: '',
  status: true,
  templateOptionName: ''
}

export default SkillSelect
