// /* eslint-disable react-hooks/rules-of-hooks */

// 'use client'
// import React from 'react';
// import StudentForm from '../_components/StudentForm';
// import { useSearchParams } from 'next/navigation';

// const page = () => {
//     const searchParams = useSearchParams();
//     const id = searchParams.get('id') || '';
//     return <StudentForm id={id} />
// };

// export default page;

'use client'
import React from 'react';
import StudentForm from '../_components/StudentForm';


const page = () => {
    return <StudentForm id={""} />
};

export default page;