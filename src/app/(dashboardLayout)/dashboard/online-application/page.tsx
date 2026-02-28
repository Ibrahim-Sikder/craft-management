/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { JSX, useState, useMemo, useEffect } from 'react'
import { useDeleteAdmissionApplicationMutation, useGetAllAdmissionApplicationsQuery, useUpdateAdmissionApplicationMutation } from '@/redux/api/admissionApplication'
import {
    Visibility,
    Edit,
    Delete,
    CheckCircle,
    Cancel,
    Pending,
    PictureAsPdf,
    Phone,
} from '@mui/icons-material'
import {
    Box,
    Chip,
    Avatar,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import CraftTable, { Column, RowAction, BulkAction } from '@/components/Table'
import { AdmissionDetailModal } from './__components/AdmissionDetailModal'
import Swal from 'sweetalert2'

// --- BACKEND INTERFACES ---
export type TAdmissionStatus = 'pending' | 'approved' | 'rejected';

export interface TAdmissionApplication {
    applicationId: string;
    academicYear: string;
    _id: string;
    studentInfo: {
        nameBangla: string;
        nameEnglish: string;
        dateOfBirth: Date;
        age: number;
        gender?: 'male' | 'female' | 'other';
        department: string;
        class: string;
        session: string;
        nidBirth?: string;
        bloodGroup?: string;
        nationality?: string;
        studentPhoto?: string;
    };
    academicInfo?: {
        previousSchool?: string;
        previousClass?: string;
        gpa?: string;
    };
    parentInfo: {
        father: {
            nameBangla: string;
            nameEnglish: string;
            profession?: string;
            education?: string;
            mobile: string;
            whatsapp?: string;
        };
        mother: {
            nameBangla: string;
            nameEnglish: string;
            profession?: string;
            education?: string;
            mobile?: string;
            whatsapp?: string;
        };
        guardian?: {
            nameBangla?: string;
            nameEnglish?: string;
            relation?: string;
            mobile?: string;
            whatsapp?: string;
            profession?: string;
            address?: string;
        };
    };
    address: {
        present: {
            village?: string;
            postOffice?: string;
            postCode?: string;
            policeStation?: string;
            district?: string;
        };
        permanent: {
            village: string;
            postOffice: string;
            postCode?: string;
            policeStation: string;
            district: string;
        };
    };
    termsAccepted: boolean;
    status: TAdmissionStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

const StatusChip = ({ status }: { status: TAdmissionStatus }) => {
    const statusConfig: Record<TAdmissionStatus, { color: 'success' | 'warning' | 'error'; icon: JSX.Element; label: string }> = {
        pending: {
            color: 'warning',
            icon: <Pending sx={{ fontSize: 16 }} />,
            label: 'Pending',
        },
        approved: {
            color: 'success',
            icon: <CheckCircle sx={{ fontSize: 16 }} />,
            label: 'Approved',
        },
        rejected: {
            color: 'error',
            icon: <Cancel sx={{ fontSize: 16 }} />,
            label: 'Rejected',
        },
    }

    const config = statusConfig[status] || statusConfig.pending

    return (
        <Chip
            icon={config.icon}
            label={config.label}
            color={config.color}
            size="small"
            sx={{
                fontWeight: 600,
                borderRadius: '8px',
                minWidth: { xs: 80, sm: 100 },
                '& .MuiChip-icon': { fontSize: 16 },
                '& .MuiChip-label': { px: { xs: 1, sm: 2 } },
            }}
        />
    )
}

const DepartmentChip = ({ department }: { department: string }) => {
    const departmentColors: Record<string, string> = {
        hifz: '#8B5CF6',
        academic: '#3B82F6',
        nazera: '#10B981',
        tajbid: '#F59E0B',
    }
    const departmentLabels: Record<string, string> = {
        hifz: 'হিফজ',
        academic: 'একাডেমিক',
        nazera: 'নাজেরা',
        tajbid: 'তাজবীদ',
    }

    return (
        <Chip
            label={departmentLabels[department] || department}
            size="small"
            sx={{
                backgroundColor: `${departmentColors[department] || '#6B7280'}20`,
                color: departmentColors[department] || '#6B7280',
                fontWeight: 600,
                borderRadius: '8px',
                border: `1px solid ${departmentColors[department] || '#6B7280'}30`,
                minWidth: { xs: 70, sm: 90 },
                '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } },
            }}
        />
    )
}

const StudentAvatar = ({ name, photo }: { name: string; photo?: string }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            flexWrap: 'wrap'
        }}>
            <Avatar
                src={photo}
                sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    bgcolor: (theme) => theme.palette.primary.main,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 600,
                }}
            >
                {name?.charAt(0) || 'S'}
            </Avatar>
            <Typography
                variant="body2"
                fontWeight={500}
                noWrap
                sx={{
                    maxWidth: { xs: 100, sm: 150, md: 200 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
            >
                {name}
            </Typography>
        </Box>
    )
}

const MobileNumber = ({ number }: { number: string }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Phone sx={{ fontSize: { xs: 14, sm: 16 }, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                {number || 'N/A'}
            </Typography>
        </Box>
    )
}

export default function AdmissionApplications() {
    const router = useRouter()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

    // Mutation Hooks
    const [updateApplication, { isLoading: isUpdating }] = useUpdateAdmissionApplicationMutation()
    const [deleteAdmissionApplication, { isLoading: isDeleting }] = useDeleteAdmissionApplicationMutation()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState('createdAt')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [filters, setFilters] = useState<Record<string, string>>({})

    // Modal state
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState<any>(null)
    const [modalLoading, setModalLoading] = useState(false)

    useEffect(() => {
        setRowsPerPage(isMobile ? 5 : isTablet ? 8 : 10)
    }, [isMobile, isTablet])

    const queryParams = useMemo(() => ({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm || undefined,
        sortBy: sortColumn,
        sortOrder: sortDirection,
        ...filters,
    }), [page, rowsPerPage, searchTerm, sortColumn, sortDirection, filters])

    const { data, isLoading, refetch } = useGetAllAdmissionApplicationsQuery(queryParams)

    const handleRefresh = () => refetch()
    const handleAddNew = () => router.push('/dashboard/online-application/new')

    const handleView = (row: any) => {
        setModalLoading(true)
        setSelectedApplication(row)
        setModalOpen(true)
        setTimeout(() => setModalLoading(false), 500)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setTimeout(() => setSelectedApplication(null), 300)
    }

    // Helper to safely get ID
    const getId = (row: any) => row?._id;

    const handleEdit = (row: any) => {
        const id = getId(row);
        if (!id) {
            Swal.fire('Error', 'Application ID not found', 'error');
            return;
        }
        router.push(`/dashboard/online-application/edit?id=${id}`);
    }

    const handleDelete = async (row: any) => {
        const id = getId(row);
        if (!id) return;

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        });

        if (result.isConfirmed) {
            try {
                await deleteAdmissionApplication(id).unwrap();
                Swal.fire('Deleted!', 'Application has been deleted.', 'success');
                refetch();
            } catch (error: any) {
                console.error('Delete failed:', error);
                Swal.fire('Failed!', error?.data?.message || 'Failed to delete application', 'error');
            }
        }
    }

    const handleUpdateStatus = async (row: any, newStatus: 'approved' | 'rejected') => {
        const id = getId(row);
        if (!id) return;

        const isApproval = newStatus === 'approved';
        const result = await Swal.fire({
            title: `${isApproval ? 'Approve' : 'Reject'} Application?`,
            text: `Are you sure you want to ${isApproval ? 'approve' : 'reject'} this application?`,
            icon: isApproval ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: isApproval ? '#10B981' : '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Yes, ${isApproval ? 'Approve' : 'Reject'}!`,
        });

        if (result.isConfirmed) {
            try {
                await updateApplication({
                    id: id,
                    data: { status: newStatus }
                }).unwrap();

                Swal.fire({
                    icon: 'success',
                    title: `${isApproval ? 'Approved!' : 'Rejected!'}`,
                    text: `Application has been ${isApproval ? 'approved' : 'rejected'}.`,
                    timer: 2000,
                    showConfirmButton: false
                });

                refetch();
            } catch (error: any) {
                console.error('Update failed:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: error?.data?.message || `Failed to ${isApproval ? 'approve' : 'reject'} application`,
                });
            }
        }
    }

    const handleApprove = (row: any) => handleUpdateStatus(row, 'approved');
    const handleReject = (row: any) => handleUpdateStatus(row, 'rejected');

    const handleDownloadPDF = (row: any) => {
        const id = getId(row);
        console.log('Download PDF for application with ID:', id);
        // Implement PDF download logic here
    }

    // --- Bulk Actions ---
    const handleBulkAction = async (selectedRows: any[], actionType: 'approve' | 'delete') => {
        const ids = selectedRows.map(r => r._id).filter(Boolean);
        if (ids.length === 0) return;

        const isDelete = actionType === 'delete';
        const title = isDelete ? `Delete ${ids.length} Applications?` : `Approve ${ids.length} Applications?`;
        const text = isDelete
            ? `You are about to delete ${ids.length} applications.`
            : "This action cannot be undone.";
        const confirmBtnText = isDelete ? 'Yes, delete all!' : 'Yes, Approve All!';
        const confirmColor = isDelete ? '#d33' : '#10B981';

        const result = await Swal.fire({
            title,
            text,
            icon: isDelete ? 'warning' : 'question',
            showCancelButton: true,
            confirmButtonColor: confirmColor,
            confirmButtonText: confirmBtnText
        });

        if (result.isConfirmed) {
            try {
                // Use Promise.allSettled to handle partial failures
                const promises = ids.map(id =>
                    isDelete
                        ? deleteAdmissionApplication(id).unwrap()
                        : updateApplication({ id, data: { status: 'approved' } }).unwrap()
                );

                const results = await Promise.allSettled(promises);
                const succeeded = results.filter(r => r.status === 'fulfilled').length;
                const failed = results.filter(r => r.status === 'rejected').length;

                if (failed === 0) {
                    Swal.fire('Success!', `${succeeded} applications ${isDelete ? 'deleted' : 'approved'}.`, 'success');
                } else {
                    Swal.fire('Partial Success', `${succeeded} ${isDelete ? 'deleted' : 'approved'}, ${failed} failed.`, 'warning');
                }

                refetch();
            } catch (error: any) {
                Swal.fire('Error', 'Operation failed partially or completely.', 'error');
            }
        }
    }

    const handleBulkApprove = (selectedRows: any[]) => handleBulkAction(selectedRows, 'approve');
    const handleBulkDelete = (selectedRows: any[]) => handleBulkAction(selectedRows, 'delete');


    const columns: Column[] = useMemo(() => {
        const baseColumns: Column[] = [
            {
                id: 'nameBangla',
                label: 'Student',
                minWidth: isMobile ? 150 : 250,
                sortable: true,
                filterable: true,
                render: (row: any) => (
                    <StudentAvatar
                        name={row.nameBangla || row.nameEnglish}
                        photo={row.studentPhoto}
                    />
                ),
            },
            {
                id: 'applicationId',
                label: 'ID',
                minWidth: isMobile ? 80 : 120,
                sortable: true,
                render: (row: any) => (
                    <Typography
                        variant="body2"
                        fontWeight={500}
                        color="primary"
                        sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                    >
                        {row.applicationId || row._id?.slice(-6).toUpperCase()}
                    </Typography>
                ),
            },
            {
                id: 'department',
                label: 'Department',
                minWidth: isMobile ? 80 : 120,
                sortable: true,
                filterable: true,
                filterOptions: [
                    { label: 'হিফজ', value: 'hifz' },
                    { label: 'একাডেমিক', value: 'academic' },
                    { label: 'নাজেরা', value: 'nazera' },
                    { label: 'তাজবীদ', value: 'tajbid' },
                ],
                render: (row: any) => <DepartmentChip department={row.department} />,
            },
            {
                id: 'class',
                label: 'Class',
                minWidth: isMobile ? 70 : 100,
                sortable: true,
                filterable: true,
                render: (row: any) => (
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                        {row.class || 'N/A'}
                    </Typography>
                ),
            },
            {
                id: 'status',
                label: 'Status',
                minWidth: isMobile ? 90 : 120,
                sortable: true,
                filterable: true,
                filterOptions: [
                    { label: 'Pending', value: 'pending' },
                    { label: 'Approved', value: 'approved' },
                    { label: 'Rejected', value: 'rejected' },
                ],
                render: (row: any) => <StatusChip status={row.status} />,
            },
        ];

        if (!isMobile) {
            baseColumns.push({
                id: 'mobile',
                label: 'Mobile',
                minWidth: isTablet ? 120 : 140,
                sortable: true,
                render: (row: any) => <MobileNumber number={row.mobile || row.fatherMobile} />,
            });
        }

        baseColumns.push({
            id: 'academicYear',
            label: 'Session',
            minWidth: isMobile ? 70 : 100,
            sortable: true,
            filterable: true,
            render: (row: any) => (
                <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    {row.academicYear || new Date().getFullYear().toString()}
                </Typography>
            ),
        });

        return baseColumns;
    }, [isMobile, isTablet]);

    const rowActions: RowAction[] = useMemo(() => [
        {
            label: 'View',
            icon: <Visibility fontSize="small" />,
            onClick: handleView,
            tooltip: 'View details',
            color: 'info',
            inMenu: isMobile,
            alwaysShow: !isMobile,
        },
        {
            label: 'Edit',
            icon: <Edit fontSize="small" />,
            onClick: handleEdit,
            tooltip: 'Edit application',
            color: 'primary',
            inMenu: isMobile,
            alwaysShow: !isMobile,
        },
        {
            label: 'Approve',
            icon: <CheckCircle fontSize="small" />,
            onClick: handleApprove,
            tooltip: 'Approve application',
            color: 'success',
            inMenu: true,
        },
        {
            label: 'Reject',
            icon: <Cancel fontSize="small" />,
            onClick: handleReject,
            tooltip: 'Reject application',
            color: 'error',
            inMenu: true,
        },
        {
            label: 'Download PDF',
            icon: <PictureAsPdf fontSize="small" />,
            onClick: handleDownloadPDF,
            tooltip: 'Download as PDF',
            color: 'secondary',
            inMenu: true,
        },
        {
            label: 'Delete',
            icon: <Delete fontSize="small" />,
            onClick: handleDelete,
            tooltip: 'Delete application',
            color: 'error',
            inMenu: false,
            alwaysShow: true,
            disabled: () => isDeleting || isUpdating,
        },
    ], [isMobile, isUpdating, isDeleting]);

    const bulkActions: BulkAction[] = useMemo(() => [
        {
            label: 'Approve',
            icon: <CheckCircle fontSize="small" />,
            onClick: handleBulkApprove,
            color: 'success',
            disabled: (selectedRows: any[]) =>
                selectedRows.some(row => row.status !== 'pending') || isUpdating || isDeleting,
        },
        {
            label: 'Delete',
            icon: <Delete fontSize="small" />,
            onClick: handleBulkDelete,
            color: 'error',
            disabled: () => isDeleting || isUpdating,
        },
    ], [isUpdating, isDeleting]);

    const tableData = useMemo(() => {
        if (!data?.data) return [];
        return data.data.map((item: any) => {
            return {
                _id: item._id,
                applicationId: item.applicationId,
                status: item.status,
                academicYear: item.academicYear,
                nameBangla: item.studentInfo?.nameBangla,
                nameEnglish: item.studentInfo?.nameEnglish,
                studentPhoto: item.studentInfo?.studentPhoto,
                department: item.studentInfo?.department,
                class: item.studentInfo?.class,
                mobile: item.parentInfo?.father?.mobile, // Flattening for easier access in table
                fatherMobile: item.parentInfo?.father?.mobile,
                // Keep original objects for modal
                studentInfo: item.studentInfo,
                parentInfo: item.parentInfo,
                academicInfo: item.academicInfo,
                address: item.address,
            };
        }) || []
    }, [data]);

    return (
        <>
            <Box sx={{
                p: { xs: 1, sm: 2, md: 3 },
                height: '100%',
                width: '100%',
            }}>
                <CraftTable
                    title="ভর্তি আবেদনসমূহ"
                    subtitle={`মোট ${data?.meta?.total || 0} টি আবেদন`}
                    columns={columns}
                    data={tableData}
                    loading={isLoading}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
                    onRefresh={handleRefresh}
                    onAdd={handleAddNew}
                    onSearchChange={setSearchTerm}
                    onSortChange={(column, direction) => {
                        setSortColumn(column)
                        setSortDirection(direction)
                    }}
                    rowActions={rowActions}
                    bulkActions={bulkActions}
                    selectable={true}
                    searchable={true}
                    filterable={true}
                    sortable={true}
                    pagination={true}
                    serverSideSorting={true}
                    idField="_id"
                    defaultSortColumn="createdAt"
                    defaultSortDirection="desc"
                    maxHeight="calc(100vh - 200px)"
                    dense={isMobile}
                    striped={true}
                    hover={true}
                    showRowNumbers={!isMobile}
                    showToolbar={true}
                    emptyStateMessage="কোনো আবেদন পাওয়া যায়নি"
                    actionColumnWidth={isMobile ? 80 : 120}
                    actionMenuLabel={isMobile ? "" : "Actions"}
                    elevation={2}
                    borderRadius={3}
                />
            </Box>

            <AdmissionDetailModal
                open={modalOpen}
                onClose={handleCloseModal}
                application={selectedApplication}
                loading={modalLoading}
            />
        </>
    )
}