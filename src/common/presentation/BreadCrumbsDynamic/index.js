const BreadCrumbsDynamic = ({ list = [] }) => {
  return (
    <div className="flex items-center">
      {list?.map((el, ind) => {
        const { link, name } = el || {}
        if (link) {
          return (
            <a key={ind} href={link}>
              <p className="text-grey-1 sm:text-p20 text-p14">{name}/</p>
            </a>
          )
        } else {
          return (
            <p key={ind} className="text-grey-1 sm:text-p20 text-p14">
              {name}
            </p>
          )
        }
      })}
    </div>
  )
}

export default BreadCrumbsDynamic
