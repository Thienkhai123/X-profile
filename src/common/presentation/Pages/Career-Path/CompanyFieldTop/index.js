import React from 'react'
import PropTypes from 'prop-types'
import { OrgCard } from 'common/presentation/Card'

const CompanyFieldTop = (props) => {
  const { ORGS } = props
  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-h2">Khám phá top doanh nghiệp trong lĩnh vực</p>
      </div>
      <div className="w-auto xl:w-[1260px]">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[20px]">
          {ORGS.map((org, ind) => (
            <OrgCard org={org} key={ind} />
          ))}
        </div>
      </div>
    </div>
  )
}

CompanyFieldTop.propTypes = {}

export default CompanyFieldTop
