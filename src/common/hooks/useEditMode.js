import { useState } from 'react'

const useEditMode = () => {
  const [editmode, setEditMode] = useState(false)
  const handleShowEditMode = () => {
    setEditMode(true)
  }
  const handleShowViewMode = () => {
    setEditMode(false)
  }
  return {
    editmode,
    handleShowEditMode,
    handleShowViewMode
  }
}

export default useEditMode
