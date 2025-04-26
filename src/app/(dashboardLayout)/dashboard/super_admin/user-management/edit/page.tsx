// /* eslint-disable react-hooks/rules-of-hooks */

// 'use client'
// import React from 'react';;
// import { useSearchParams } from 'next/navigation';
// import UserForm from '../_components/UserForm';

// const page = () => {
//     const searchParams = useSearchParams();
//     const id = searchParams.get('id') || '';
//     return <UserForm id={id} />
// };

// export default page;


'use client'

import React, { Suspense } from 'react';
import UserForm from '../_components/UserForm';
import { useSearchParams } from 'next/navigation';

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
  return <UserForm id={id} />;
};

export default Page;