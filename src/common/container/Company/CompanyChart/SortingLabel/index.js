import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'

const SortingLabel = (props) => {
  const { select, setSelect, action } = props
  return (
    <div className="flex  items-center bg-blue-main py-[5px] sm:px-[30px] px-[10px] justify-around rounded-[9px]">
      <Button
        title="Day"
        rounded="rounded-[13px]"
        background={select === 0 ? 'bg-button' : 'bg-transparent'}
        color={select === 0 ? 'text-neutral' : 'text-white'}
        padding="py-[2.8px] px-[14px]"
        height="h-auto"
        margin=""
        textWeight={select === 0 ? 'text-p14 font-bold' : 'text-p14'}
        onClick={() => setSelect(0)}
      />
      <Button
        title="Week"
        rounded="rounded-[13px]"
        background={select === 1 ? 'bg-button' : 'bg-transparent'}
        color={select === 1 ? 'text-neutral' : 'text-white'}
        padding="py-[2.8px] px-[14px]"
        height="h-auto"
        margin=""
        textWeight={select === 1 ? 'text-p14 font-bold' : 'text-p14'}
        onClick={() => setSelect(1)}
      />
      <Button
        title="Month"
        rounded="rounded-[13px]"
        background={select === 2 ? 'bg-button' : 'bg-transparent'}
        color={select === 2 ? 'text-neutral' : 'text-white'}
        padding="py-[2.8px] px-[14px]"
        height="h-auto"
        margin=""
        textWeight={select === 2 ? 'text-p14 font-bold' : 'text-p14'}
        onClick={() => setSelect(2)}
      />
      <Button
        title="Year"
        rounded="rounded-[13px]"
        background={select === 3 ? 'bg-button' : 'bg-transparent'}
        color={select === 3 ? 'text-neutral' : 'text-white'}
        padding="py-[2.8px] px-[14px]"
        height="h-auto"
        margin=""
        textWeight={select === 3 ? 'text-p14 font-bold' : 'text-p14'}
        onClick={() => setSelect(3)}
      />
    </div>
  )
}

SortingLabel.propTypes = {
  select: PropTypes.number,
  setSelect: PropTypes.func,
  action: PropTypes.func
}
SortingLabel.defaultProps = {
  select: 0,
  setSelect: () => {},
  action: () => {}
}

export default SortingLabel
