
export default function LoadingSkeleton() {
    return (
      <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
        <div role="status" className="w-full max-w-4xl p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between pt-4 first:pt-0">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
