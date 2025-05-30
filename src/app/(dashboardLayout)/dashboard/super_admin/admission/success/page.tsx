"use client"

import Link from "next/link"

export default function SuccessPageClient() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl transform transition-all animate-fadeIn">
          <div className="mb-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Application Submitted Successfully!</h1>
            <p className="text-gray-600 text-lg">
              Thank you for applying to our Madrasa. Your application has been received and is being processed.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">What happens next?</h2>
            <ol className="text-left text-gray-700 space-y-3 list-decimal list-inside">
              <li className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                Our admissions team will review your application
              </li>
              <li className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                You will receive an email confirmation with your application number
              </li>
              <li className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                You may be contacted for an entrance test or interview
              </li>
              <li className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                Final admission results will be communicated within 2 weeks
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <div className="text-center p-4 border border-gray-200 rounded-xl">
              <p className="text-gray-600 mb-2">If you have any questions, please contact our admissions office at:</p>
              <p className="font-medium text-blue-800">admissions@madrasaschool.edu</p>
              <p className="font-medium text-blue-800">+1 234 567 8900</p>
            </div>

            <div className="flex justify-center space-x-6 mt-8">
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors font-medium"
              >
                Return to Home
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  )
}
