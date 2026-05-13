import { Skeleton } from '../feedback/Skeleton';

export const ParcelTableSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="px-6 py-4">
                <Skeleton className="h-4 w-32" />
              </th>
              <th className="px-6 py-4">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="px-6 py-4">
                <Skeleton className="h-4 w-40" />
              </th>
              <th className="px-6 py-4">
                <Skeleton className="h-4 w-16" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <Skeleton className="h-5 w-32" />
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-36" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
