// /* eslint-disable react-hooks/rules-of-hooks */

// 'use client'
// import React from 'react';
// import { useSearchParams } from 'next/navigation';
// import TeacherForm from '../_components/TeacherForm';

// const page = () => {
//     const searchParams = useSearchParams();
//     const id = searchParams.get('id') || '';
//     return <TeacherForm id={id} />
// };

// export default page;


'use client'
import React from 'react';
import TeacherForm from '../_components/TeacherForm';



const page = () => {
    return <TeacherForm id={""} />
};

export default page;