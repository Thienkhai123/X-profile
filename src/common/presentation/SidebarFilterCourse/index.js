import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import GroupFilter from './GroupFilter'
import { useSelector } from 'react-redux'
import {
  selectFilterPayloadCategories,
  updateCategoriesFilter
} from 'store/app/courseSlice'
import { useDispatch } from 'react-redux'
import useProductFilter from 'common/hooks/useProductFilter'

const SidebarFilterCourse = (props) => {
  const dispatch = useDispatch()
  const payloadFilter = useSelector(selectFilterPayloadCategories)
  const {
    handleCheckPriceFree,
    handleCheckPricePaid,
    handleCheckCourseIsFormCompany,
    handleCheckCourseIsFormPartner,
    handleCheckLevelCourse
  } = useProductFilter()

  const handleChangeFilter = (e) => {
    switch (e.target.value) {
      case 'free':
        handleCheckPriceFree()
        break
      case 'paid':
        handleCheckPricePaid()
        break
      case 'company':
        handleCheckCourseIsFormCompany(e.target.checked)
        break
      case 'partner':
        handleCheckCourseIsFormPartner(e.target.checked)
        break
      case '0':
      case '1':
      case '2':
        handleCheckLevelCourse(e.target.value)
        break
      default:
        break
    }
  }

  const data = [
    {
      title: 'Giá khoá học',
      filterGroups: [
        {
          id: 'paidCourse',
          value: 'paid',
          content: 'Có phí',
          nameField: 'courseValue',
          isChecked: payloadFilter?.isPaidCourseChecked
        },
        {
          id: 'freeCourse',
          value: 'free',
          content: 'Miễn phí',
          nameField: 'courseValue',
          isChecked: payloadFilter?.isFreeCourseChecked
        }
      ]
    },
    {
      title: 'Khoá học từ',
      filterGroups: [
        {
          id: 1,
          value: 'company',
          content: 'X-Profile',
          nameField: 'isCompanyOwner'
        },
        {
          id: 2,
          value: 'partner',
          content: 'Đối tác',
          nameField: 'isCompanyOwner'
        }
      ]
    },
    {
      title: 'Trình độ',
      filterGroups: [
        {
          id: 1,
          value: '0',
          content: 'Cơ bản',
          nameField: 'levelCourse'
        },
        {
          id: 2,
          value: '1',
          content: 'Trung bình',
          nameField: 'levelCourse'
        },
        {
          id: 3,
          value: '2',
          content: 'Nâng cao',
          nameField: 'levelCourse'
        }
      ]
    }
  ]
  return (
    <div>
      {data?.map((item, idx) => {
        const { filterGroups, title } = item
        return (
          <div className="border-b last:border-b-0 my-6" key={idx}>
            <GroupFilter
              filterGroups={filterGroups}
              title={title}
              handleChangeFilter={handleChangeFilter}
            />
          </div>
        )
      })}
    </div>
  )
}

SidebarFilterCourse.propTypes = {
  data: PropTypes.array.isRequired
}
SidebarFilterCourse.defaultProps = {
  data: [
    {
      title: 'Giá khoá học',
      filterGroups: [
        {
          id: 'paidCourse',
          value: 'paid',
          content: 'Có phí',
          nameField: 'courseValue'
        },
        {
          id: 'freeCourse',
          value: 'free',
          content: 'Miễn phí',
          nameField: 'courseValue'
        }
      ]
    },
    {
      title: 'Khoá học từ',
      filterGroups: [
        {
          id: 1,
          value: 'owner',
          content: 'X-Profile',
          nameField: 'isCompanyOwner'
        },
        {
          id: 2,
          value: 'partner',
          content: 'Đối tác',
          nameField: 'isCompanyOwner'
        }
      ]
    },
    {
      title: 'Trình độ',
      filterGroups: [
        {
          id: 1,
          value: '1',
          content: 'Cơ bản',
          nameField: 'levelCourse'
        },
        {
          id: 2,
          value: '2',
          content: 'Trung bình',
          nameField: 'levelCourse'
        },
        {
          id: 3,
          value: '3',
          content: 'Nâng cao',
          nameField: 'levelCourse'
        }
      ]
    }
  ]
}

export default SidebarFilterCourse
