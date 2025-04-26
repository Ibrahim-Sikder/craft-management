// /* eslint-disable react-hooks/rules-of-hooks */

// 'use client'
// import React from 'react';;
// import { useSearchParams } from 'next/navigation';
// import ClassForm from '../_components/ClassForm';

// const page = () => {
//     const searchParams = useSearchParams();
//     const id = searchParams.get('id') || '';
//     return <ClassForm id={id} />
// };

// export default page;



'use client'

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ClassForm from '../_components/ClassForm';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserFormWrapper />
    </Suspense>
  );
};

const UserFormWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  return <ClassForm id={id} />;
};

export default Page;