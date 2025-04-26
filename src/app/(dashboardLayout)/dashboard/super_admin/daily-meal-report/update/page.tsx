// 'use client'

// import React from 'react';
// import MealReportForm from '../_components/MealReportForm';
// import { useSearchParams } from 'next/navigation';

// const UpdateMeal = () => {
//         const searchParams = useSearchParams();
//         const id = searchParams.get('id') || '';
//     return <MealReportForm id={id}/>;
// };

// export default UpdateMeal;


// 'use client';

// import React, { Suspense } from 'react';
// import MealReportForm from '../_components/MealReportForm';

// const UpdateMeal = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <MealReportForm />
//     </Suspense>
//   );
// };

// export default UpdateMeal;




'use client';

import React, { Suspense } from 'react';
import MealReportForm from '../_components/MealReportForm';
import { useSearchParams } from 'next/navigation';

const UpdateMealWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateMeal />
    </Suspense>
  );
};

const UpdateMeal = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  
  return <MealReportForm id={id} />;
};

export default UpdateMealWrapper;
