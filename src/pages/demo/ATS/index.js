import React, { Fragment } from 'react'
import { Margin, usePDF } from 'react-to-pdf'
import jsPDF from 'jspdf'
import PropTypes from 'prop-types'
import ATS_PDF from 'common/presentation/ATS_PDF'
import html2canvas from 'html2canvas'

const ATS = (props) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('ATS')
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0)
      pdf.save('file.pdf')
    })
  }

  const { toPDF, targetRef } = usePDF({
    filename: 'usepdf-example.pdf',
    page: { margin: Margin.MEDIUM }
  })
  return (
    <div className="bg-white flex-col flex-1 h">
      <div
        className="cursor-pointer hover:text-red-500 duration-200"
        onClick={() => {
          handleDownloadPDF()
          // toPDF()
        }}
      >
        Tải file PDF
      </div>
      <ATS_PDF targetRef={targetRef} />
    </div>
  )
}

ATS.propTypes = {}

export default ATS
