// // app/components/LoadingSkeleton.tsx

// export const QuizCardSkeleton = () => {
//   return (
//     <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-5 animate-pulse">
//       <div className="h-6 bg-[#1a1a23] rounded w-3/4 mb-3"></div>
//       <div className="h-4 bg-[#1a1a23] rounded w-full mb-2"></div>
//       <div className="h-4 bg-[#1a1a23] rounded w-5/6 mb-4"></div>
//       <div className="flex gap-2">
//         <div className="h-8 bg-[#1a1a23] rounded w-20"></div>
//         <div className="h-8 bg-[#1a1a23] rounded w-20"></div>
//       </div>
//     </div>
//   );
// };

// export const QuizDetailsSkeleton = () => {
//   return (
//     <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8 animate-pulse">
//       <div className="h-10 bg-[#1a1a23] rounded w-3/4 mb-4"></div>
//       <div className="h-6 bg-[#1a1a23] rounded w-full mb-3"></div>
//       <div className="h-6 bg-[#1a1a23] rounded w-5/6 mb-6"></div>
      
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div className="bg-[#1a1a23] rounded-lg p-4">
//           <div className="h-5 bg-[#2a2a35] rounded w-20 mb-2"></div>
//           <div className="h-8 bg-[#2a2a35] rounded w-16"></div>
//         </div>
//         <div className="bg-[#1a1a23] rounded-lg p-4">
//           <div className="h-5 bg-[#2a2a35] rounded w-20 mb-2"></div>
//           <div className="h-8 bg-[#2a2a35] rounded w-16"></div>
//         </div>
//       </div>

//       <div className="space-y-3">
//         <div className="h-12 bg-[#1a1a23] rounded"></div>
//         <div className="h-12 bg-[#1a1a23] rounded"></div>
//         <div className="h-12 bg-[#1a1a23] rounded"></div>
//       </div>
//     </div>
//   );
// };

// export const QuestionSkeleton = () => {
//   return (
//     <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6 animate-pulse">
//       <div className="h-8 bg-[#1a1a23] rounded w-3/4 mb-6"></div>
//       <div className="space-y-3 mb-6">
//         <div className="h-14 bg-[#1a1a23] rounded"></div>
//         <div className="h-14 bg-[#1a1a23] rounded"></div>
//         <div className="h-14 bg-[#1a1a23] rounded"></div>
//         <div className="h-14 bg-[#1a1a23] rounded"></div>
//       </div>
//       <div className="flex justify-between">
//         <div className="h-10 bg-[#1a1a23] rounded w-24"></div>
//         <div className="h-10 bg-[#1a1a23] rounded w-24"></div>
//       </div>
//     </div>
//   );
// }; 





// app/components/LoadingSkeleton.tsx

export const QuizCardSkeleton = () => {
  return (
    <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-5 animate-pulse">
      <div className="h-6 bg-[#1a1a23] rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-[#1a1a23] rounded w-full mb-2"></div>
      <div className="h-4 bg-[#1a1a23] rounded w-5/6 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-8 bg-[#1a1a23] rounded w-20"></div>
        <div className="h-8 bg-[#1a1a23] rounded w-20"></div>
      </div>
    </div>
  );
};

// ✅ ADD THIS - StatsSkeleton export
export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {[1,2,3,4].map((i) => (
        <div key={i} className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 animate-pulse">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="w-10 h-10 bg-[#1a1a23] rounded-lg"></div>
            <div className="w-16 h-4 bg-[#1a1a23] rounded"></div>
          </div>
          <div className="w-20 h-4 bg-[#1a1a23] rounded mb-2"></div>
          <div className="w-16 h-6 bg-[#1a1a23] rounded"></div>
        </div>
      ))}
    </div>
  );
};

export const QuizDetailsSkeleton = () => {
  return (
    <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8 animate-pulse">
      <div className="h-10 bg-[#1a1a23] rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-[#1a1a23] rounded w-full mb-3"></div>
      <div className="h-6 bg-[#1a1a23] rounded w-5/6 mb-6"></div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1a1a23] rounded-lg p-4">
          <div className="h-5 bg-[#2a2a35] rounded w-20 mb-2"></div>
          <div className="h-8 bg-[#2a2a35] rounded w-16"></div>
        </div>
        <div className="bg-[#1a1a23] rounded-lg p-4">
          <div className="h-5 bg-[#2a2a35] rounded w-20 mb-2"></div>
          <div className="h-8 bg-[#2a2a35] rounded w-16"></div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-12 bg-[#1a1a23] rounded"></div>
        <div className="h-12 bg-[#1a1a23] rounded"></div>
        <div className="h-12 bg-[#1a1a23] rounded"></div>
      </div>
    </div>
  );
};

export const QuestionSkeleton = () => {
  return (
    <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6 animate-pulse">
      <div className="h-8 bg-[#1a1a23] rounded w-3/4 mb-6"></div>
      <div className="space-y-3 mb-6">
        <div className="h-14 bg-[#1a1a23] rounded"></div>
        <div className="h-14 bg-[#1a1a23] rounded"></div>
        <div className="h-14 bg-[#1a1a23] rounded"></div>
        <div className="h-14 bg-[#1a1a23] rounded"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-10 bg-[#1a1a23] rounded w-24"></div>
        <div className="h-10 bg-[#1a1a23] rounded w-24"></div>
      </div>
    </div>
  );
};