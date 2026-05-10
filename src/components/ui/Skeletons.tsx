export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col p-2 sm:p-3 relative animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl mb-2 sm:mb-3"></div>
      <div className="flex flex-col flex-1 px-1 gap-2">
        <div className="h-3 w-1/3 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-full bg-gray-200 rounded-full"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded-full mb-2"></div>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="h-5 w-1/4 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-12 sm:w-16 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col p-2 sm:p-3 relative animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl mb-2 sm:mb-3"></div>
      <div className="flex flex-col flex-1 px-1 gap-2">
        <div className="h-3 w-1/3 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-full bg-gray-200 rounded-full"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded-full mb-2"></div>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="h-5 w-1/4 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-12 sm:w-16 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
