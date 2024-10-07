import BadgeTestsSkill from 'common/presentation/BadgeTestsSkill'
import BadgeSheepSkillTippy from '../BadgeSheepSkillTippy'
import BadgeMoueseSkillTippy from '../BadgeMoueseSkillTippy'
import BadgeBearSkillTippy from '../BadgeBearSkillTippy'
import BadgeTestSkillTippy from '../BadgeTestSkillTippy'

const WrapperSkillItemTippy = ({
  percent = 0,
  skillName = '',
  showIcon = 'true',
  redirectToExam = () => {},
  isShowTooltip = true,
  showSuccessIcon = false,
  iconWidth = '24',
  iconHeight = '24',
  classNameButton = 'h-14 w-14 rounded-full bg-white hover:bg-grey-4 duration-200 cursor-pointer flex items-center justify-center'
}) => {
  if (percent === 0) {
    return (
      <BadgeTestSkillTippy
        title={skillName}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        hiddenIcon={isShowTooltip}
        disableCursor={isShowTooltip}
        showIcon={showIcon}
        nameIcon="notes"
        classNameButton={classNameButton}
        iconWidth={iconWidth}
        iconHeight={iconHeight}
      />
    )
  }
  if (percent > 0 && percent <= 30) {
    return (
      <BadgeSheepSkillTippy
        titlePopup="Làm kiểm tra để nâng cao cấp độ !"
        classNameButton={classNameButton}
        description={`(Bạn đang đạt ${percent}% ở cấp độ cơ bản)`}
        percent={percent}
        title={skillName}
        showIcon={showIcon}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        disableCursor={isShowTooltip}
        nameIcon={showSuccessIcon ? 'notesSuccess' : 'notes'}
        iconWidth={iconWidth}
        iconHeight={iconHeight}
      />
    )
  }
  if (percent > 30 && percent <= 60) {
    return (
      <BadgeMoueseSkillTippy
        titlePopup="Làm kiểm tra để nâng cao cấp độ !"
        classNameButton={classNameButton}
        description={`(Bạn đang đạt ${percent}% ở cấp độ trung bình)`}
        percent={percent}
        title={skillName}
        showIcon={showIcon}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        disableCursor={isShowTooltip}
        nameIcon={showSuccessIcon ? 'notesSuccess' : 'notes'}
        iconWidth={iconWidth}
        iconHeight={iconHeight}
      />
    )
  }
  if (percent > 60) {
    return (
      <BadgeBearSkillTippy
        titlePopup="Làm kiểm tra để nâng cao cấp độ !"
        classNameButton={classNameButton}
        description={`(Bạn đang đạt ${percent}% ở cấp độ trung bình)`}
        percent={percent}
        title={skillName}
        showIcon={showIcon}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        disableCursor={isShowTooltip}
        nameIcon={showSuccessIcon ? 'notesSuccess' : 'notes'}
        iconWidth={iconWidth}
        iconHeight={iconHeight}
      />
    )
  }
}

export default WrapperSkillItemTippy
