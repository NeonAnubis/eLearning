import { useEffect, useRef } from 'react'
import * as QRCode from 'qrcode'
import type { Certificate as CertificateType } from '../types'
import { formatDate } from '../lib/utils'
import { Award } from 'lucide-react'
import { Button } from './ui/button'

interface CertificateProps {
  certificate: CertificateType
}

export function Certificate({ certificate }: CertificateProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (qrCanvasRef.current) {
      const verificationUrl = `https://eduverse.com/verify/${certificate.certificateNumber}`
      QRCode.toCanvas(qrCanvasRef.current, verificationUrl, {
        width: 150,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
    }
  }, [certificate.certificateNumber])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 print:hidden">
        <Button onClick={handlePrint}>Print Certificate</Button>
      </div>

      <div
        className="bg-white p-12 border-8 border-double border-primary relative"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #f0f9ff, #ffffff, #fef3c7)'
        }}
      >
        {/* Decorative Corners */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary/30" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-primary/30" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary/30" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary/30" />

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
              <Award className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              Certificate of Completion
            </h1>
            <div className="h-1 w-64 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          {/* Presented To */}
          <div>
            <p className="text-xl text-gray-600 mb-2">This is to certify that</p>
            <h2 className="text-4xl font-bold text-primary mb-4">
              {certificate.studentName}
            </h2>
            <p className="text-lg text-gray-600 mb-2">has successfully completed the course</p>
            <h3 className="text-2xl font-semibold text-gray-800">
              {certificate.courseName}
            </h3>
          </div>

          {/* Date and Certificate Number */}
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto pt-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completion Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatDate(certificate.completionDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Certificate Number</p>
              <p className="text-lg font-semibold text-gray-800">
                {certificate.certificateNumber}
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center pt-8">
            <p className="text-sm text-gray-600 mb-3">Verify this certificate</p>
            <canvas ref={qrCanvasRef} className="border-4 border-gray-200 rounded" />
            <p className="text-xs text-gray-500 mt-2">
              Scan QR code to verify authenticity
            </p>
          </div>

          {/* Signature Line */}
          <div className="flex justify-center gap-16 pt-8">
            <div className="text-center">
              <div className="border-t-2 border-gray-400 w-48 mb-2" />
              <p className="text-sm text-gray-600">Authorized Signature</p>
            </div>
            <div className="text-center">
              <div className="border-t-2 border-gray-400 w-48 mb-2" />
              <p className="text-sm text-gray-600">Date of Issue</p>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Award className="h-96 w-96 text-primary" />
        </div>
      </div>
    </div>
  )
}
