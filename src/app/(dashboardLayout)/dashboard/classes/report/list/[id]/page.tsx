// app/(dashboardLayout)/dashboard/classes/report/list/[id]/page.tsx

import ClassReportForm from '../../new/_components/ClassReportForm';

// Define the structure for PageProps
interface PageProps {
  params: {
    id: string;
  };
}


// Page Component that receives `params` as prop
export default function Page({ params }: PageProps) {
  return <ClassReportForm id={params.id} />;
}
