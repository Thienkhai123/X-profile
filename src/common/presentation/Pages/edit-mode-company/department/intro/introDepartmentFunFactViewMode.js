import FieldDetail from 'common/presentation/Pages/Profile-Company/FieldDetail'

const IntroDepartmentFunFactViewMode = ({ funfacts = [] }) => {
  return (
    <div className="bg-white rounded-lg p-8 md:w-1/2 w-full mt-10 mb-12">
      <FieldDetail FIELDETAIL={funfacts} />
    </div>
  )
}

export default IntroDepartmentFunFactViewMode
