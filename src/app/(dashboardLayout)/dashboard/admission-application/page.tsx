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
    Download,
    Print,
    Add,
    Refresh,
    PictureAsPdf,
    Phone,
} from '@mui/icons-material'
import {
    Box,
    Chip,
    Tooltip,
    Avatar,
    Typography,
    useTheme,
    useMediaQuery,
    Badge,
    Snackbar,
    Alert,
} from '@mui/material'
import { format } from 'date-fns'
import { bn } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import CraftTable, { Column, RowAction, BulkAction } from '@/components/Table'
import { AdmissionDetailModal } from './__components/AdmissionDetailModal'


const StatusChip = ({ status }: { status: string }) => {
    const statusConfig: Record<string, { color: 'success' | 'warning' | 'error' | 'info' | 'default'; icon: JSX.Element; label: string }> = {
        pending: {
            color: 'warning',
            icon: <Pending sx={{ fontSize: 16 }} />,
            label: 'বিচারাধীন',
        },
        approved: {
            color: 'success',
            icon: <CheckCircle sx={{ fontSize: 16 }} />,
            label: 'অনুমোদিত',
        },
        rejected: {
            color: 'error',
            icon: <Cancel sx={{ fontSize: 16 }} />,
            label: 'বাতিল',
        },
        enrolled: {
            color: 'info',
            icon: <CheckCircle sx={{ fontSize: 16 }} />,
            label: 'ভর্তিকৃত',
        },
    }

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending

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
                '& .MuiChip-icon': {
                    fontSize: 16,
                },
                '& .MuiChip-label': {
                    px: { xs: 1, sm: 2 },
                },
            }}
        />
    )
}

// Department chip
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
                '& .MuiChip-label': {
                    px: { xs: 1, sm: 1.5 },
                },
            }}
        />
    )
}

// Student avatar component
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

// Date formatter
const formatDate = (date: string | Date) => {
    try {
        return format(new Date(date), 'dd MMM yyyy', { locale: bn })
    } catch {
        return 'Invalid date'
    }
}

// Document status component
const DocumentStatus = ({ documents }: { documents: any }) => {
    const docs = documents || {}
    const submittedCount = Object.values(docs).filter(Boolean).length
    const totalCount = 5 // photographs, birthCertificate, markSheet, transferCertificate, characterCertificate

    return (
        <Tooltip title={`${submittedCount}/${totalCount} documents submitted`}>
            <Badge
                badgeContent={submittedCount}
                color={submittedCount === totalCount ? 'success' : 'warning'}
                sx={{
                    '& .MuiBadge-badge': {
                        fontSize: { xs: '0.6rem', sm: '0.75rem' },
                        height: { xs: 18, sm: 20 },
                        minWidth: { xs: 18, sm: 20 },
                    }
                }}
            >
                <Chip
                    label={`${submittedCount}/${totalCount}`}
                    size="small"
                    color={submittedCount === totalCount ? 'success' : 'warning'}
                    sx={{
                        fontWeight: 600,
                        '& .MuiChip-label': {
                            px: { xs: 1, sm: 1.5 },
                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }
                    }}
                />
            </Badge>
        </Tooltip>
    )
}

// Mobile number component
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

    // --- UPDATED: Initialize Update and Delete Mutation Hooks ---
    const [updateApplication, { isLoading: isUpdating }] = useUpdateAdmissionApplicationMutation()
    const [deleteAdmissionApplication, { isLoading: isDeleting }] = useDeleteAdmissionApplicationMutation()

    // Snackbar state for feedback
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

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

    // Update rows per page based on screen size
    useEffect(() => {
        setRowsPerPage(isMobile ? 5 : isTablet ? 8 : 10)
    }, [isMobile, isTablet])

    // Build query params
    const queryParams = useMemo(() => ({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm || undefined,
        sortBy: sortColumn,
        sortOrder: sortDirection,
        ...filters,
    }), [page, rowsPerPage, searchTerm, sortColumn, sortDirection, filters])

    // Fetch applications with filters
    const { data, isLoading, error, refetch } = useGetAllAdmissionApplicationsQuery(queryParams)

    // Handle refresh
    const handleRefresh = () => {
        refetch()
    }

    // Handle add new application
    const handleAddNew = () => {
        router.push('/dashboard/admission-application/new')
    }

    // Handle view application - opens modal
    const handleView = (row: any) => {
        setModalLoading(true)
        setSelectedApplication(row)
        setModalOpen(true)
        setTimeout(() => {
            setModalLoading(false)
        }, 500)
    }

    // Handle close modal
    const handleCloseModal = () => {
        setModalOpen(false)
        setTimeout(() => {
            setSelectedApplication(null)
        }, 300)
    }

    // Handle edit application - CORRECTED VERSION WITH ID
    const handleEdit = (row: any) => {
        const applicationId = row._id || row.id || row.applicationId;
        if (!applicationId) {
            console.error('No ID found for application:', row);
            alert('Application ID not found');
            return;
        }
        router.push(`/dashboard/admission-application/edit?id=${applicationId}`);
    }

    // --- UPDATED: Handle delete application ---
    const handleDelete = async (row: any) => {
        const applicationId = row._id || row.id || row.applicationId;
        if (!applicationId) return;

        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await deleteAdmissionApplication(applicationId).unwrap();
                setSnackbar({ open: true, message: 'Application deleted successfully', severity: 'success' });
                // The API invalidates tags, but explicit refetch ensures immediate UI update
                refetch();
            } catch (error: any) {
                console.error('Delete failed:', error);
                setSnackbar({ open: true, message: error?.data?.message || 'Failed to delete application', severity: 'error' });
            }
        }
    }

    // --- UPDATED: Handle approve application ---
    const handleApprove = async (row: any) => {
        const applicationId = row._id || row.id || row.applicationId;
        if (!applicationId) return;

        try {
            await updateApplication({
                id: applicationId,
                data: { status: 'approved' }
            }).unwrap();

            setSnackbar({ open: true, message: 'Application approved successfully', severity: 'success' });
            refetch();
        } catch (error: any) {
            console.error('Approve failed:', error);
            setSnackbar({ open: true, message: error?.data?.message || 'Failed to approve application', severity: 'error' });
        }
    }

    // --- UPDATED: Handle reject application ---
    const handleReject = async (row: any) => {
        const applicationId = row._id || row.id || row.applicationId;
        if (!applicationId) return;

        if (!window.confirm('Are you sure you want to reject this application?')) return;

        try {
            await updateApplication({
                id: applicationId,
                data: { status: 'rejected' }
            }).unwrap();

            setSnackbar({ open: true, message: 'Application rejected', severity: 'success' });
            refetch();
        } catch (error: any) {
            console.error('Reject failed:', error);
            setSnackbar({ open: true, message: error?.data?.message || 'Failed to reject application', severity: 'error' });
        }
    }

    // Handle print application
    const handlePrint = (row: any) => {
        const applicationId = row._id || row.id || row.applicationId;
        window.open(`/dashboard/admission-application/print?id=${applicationId}`, '_blank')
    }

    // Handle download PDF
    const handleDownloadPDF = (row: any) => {
        const applicationId = row._id || row.id || row.applicationId;
        console.log('Download PDF for application with ID:', applicationId);
    }

    // --- UPDATED: Handle bulk approve ---
    const handleBulkApprove = async (selectedRows: any[]) => {
        const ids = selectedRows.map(r => r._id || r.id || r.applicationId).filter(Boolean);
        if (ids.length === 0) return;

        if (!window.confirm(`Are you sure you want to approve ${ids.length} applications?`)) return;

        try {
            await Promise.all(ids.map(id =>
                updateApplication({ id, data: { status: 'approved' } }).unwrap()
            ));

            setSnackbar({ open: true, message: `${ids.length} applications approved`, severity: 'success' });
            refetch();
        } catch (error: any) {
            console.error('Bulk approve failed:', error);
            setSnackbar({ open: true, message: 'Some applications failed to update', severity: 'error' });
        }
    }

    // --- UPDATED: Handle bulk delete ---
    const handleBulkDelete = async (selectedRows: any[]) => {
        const ids = selectedRows.map(r => r._id || r.id || r.applicationId).filter(Boolean);
        if (ids.length === 0) return;

        if (window.confirm(`Are you sure you want to delete ${ids.length} applications?`)) {
            try {
                // Since API takes single ID, we map over all IDs
                await Promise.all(ids.map(id => deleteAdmissionApplication(id).unwrap()));

                setSnackbar({ open: true, message: `${ids.length} applications deleted successfully`, severity: 'success' });
                refetch();
            } catch (error: any) {
                console.error('Bulk delete failed:', error);
                setSnackbar({ open: true, message: 'Some applications failed to delete', severity: 'error' });
            }
        }
    }

    const handleBulkExport = (selectedRows: any[]) => {
        const ids = selectedRows.map(r => r._id || r.id || r.applicationId).filter(Boolean);
        console.log('Bulk export applications with IDs:', ids);
    }

    // Handle export all
    const handleExport = () => {
        console.log('Export all data')
    }

    // Define columns for the table
    const columns: Column[] = useMemo(() => {
        const baseColumns: Column[] = [
            {
                id: 'studentInfo',
                label: 'শিক্ষার্থী',
                minWidth: isMobile ? 150 : 250,
                sortable: true,
                filterable: true,
                render: (row: any) => (
                    <StudentAvatar
                        name={row.studentInfo?.nameBangla || row.studentInfo?.nameEnglish}
                        photo={row.studentInfo?.studentPhoto}
                    />
                ),
            },
            {
                id: 'applicationId',
                label: 'আইডি',
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
                id: 'studentDepartment',
                label: 'বিভাগ',
                minWidth: isMobile ? 80 : 120,
                sortable: true,
                filterable: true,
                filterOptions: [
                    { label: 'হিফজ', value: 'hifz' },
                    { label: 'একাডেমিক', value: 'academic' },
                    { label: 'নাজেরা', value: 'nazera' },
                    { label: 'তাজবীদ', value: 'tajbid' },
                ],
                render: (row: any) => <DepartmentChip department={row.studentInfo?.department || row.studentInfo?.studentDepartment} />,
            },
            {
                id: 'class',
                label: 'শ্রেণি',
                minWidth: isMobile ? 70 : 100,
                sortable: true,
                filterable: true,
                render: (row: any) => (
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                        {row.studentInfo?.Class || row.studentInfo?.class || 'N/A'}
                    </Typography>
                ),
            },
            {
                id: 'status',
                label: 'অবস্থা',
                minWidth: isMobile ? 90 : 120,
                sortable: true,
                filterable: true,
                filterOptions: [
                    { label: 'বিচারাধীন', value: 'pending' },
                    { label: 'অনুমোদিত', value: 'approved' },
                    { label: 'বাতিল', value: 'rejected' },
                    { label: 'ভর্তিকৃত', value: 'enrolled' },
                ],
                render: (row: any) => <StatusChip status={row.status} />,
            },
        ];

        if (!isMobile) {
            baseColumns.push(
                {
                    id: 'fatherName',
                    label: 'পিতার নাম',
                    minWidth: isTablet ? 140 : 180,
                    sortable: true,
                    filterable: true,
                    render: (row: any) => (
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {row.parentInfo?.father?.nameBangla || row.parentInfo?.father?.nameEnglish || 'N/A'}
                        </Typography>
                    ),
                },
                {
                    id: 'mobile',
                    label: 'মোবাইল',
                    minWidth: isTablet ? 120 : 140,
                    sortable: true,
                    render: (row: any) => <MobileNumber number={row.parentInfo?.father?.mobile} />,
                }
            );
        }

        baseColumns.push(
            {
                id: 'academicYear',
                label: 'সেশন',
                minWidth: isMobile ? 70 : 100,
                sortable: true,
                filterable: true,
                render: (row: any) => (
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                        {row.academicYear || new Date().getFullYear().toString()}
                    </Typography>
                ),
            }
        );

        if (!isMobile) {
            baseColumns.push({
                id: 'createdAt',
                label: 'আবেদনের তারিখ',
                minWidth: isTablet ? 110 : 140,
                sortable: true,
                type: 'date',
                render: (row: any) => (
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                        {formatDate(row.createdAt)}
                    </Typography>
                ),
            });
        }

        baseColumns.push({
            id: 'documents',
            label: 'ডকুমেন্টস',
            minWidth: isMobile ? 80 : 120,
            align: 'center',
            render: (row: any) => <DocumentStatus documents={row.documents} />,
        });

        return baseColumns;
    }, [isMobile, isTablet]);

    // Define row actions
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
            disabled: (row) => row.status === 'approved' || row.status === 'rejected' || row.status === 'enrolled',
        },
        {
            label: 'Delete',
            icon: <Delete fontSize="small" />,
            onClick: handleDelete,
            tooltip: 'Delete application',
            color: 'error',
            inMenu: false,
            alwaysShow: true,
            disabled: () => isDeleting || isUpdating, // Disable if any global operation is happening
        },
        {
            label: 'Approve',
            icon: <CheckCircle fontSize="small" />,
            onClick: handleApprove,
            tooltip: 'Approve application',
            color: 'success',
            inMenu: true,
            disabled: (row) => row.status === 'approved' || row.status === 'rejected' || row.status === 'enrolled' || isUpdating || isDeleting,
        },
        {
            label: 'Reject',
            icon: <Cancel fontSize="small" />,
            onClick: handleReject,
            tooltip: 'Reject application',
            color: 'error',
            inMenu: true,
            disabled: (row) => row.status === 'approved' || row.status === 'rejected' || row.status === 'enrolled' || isUpdating || isDeleting,
        },
        {
            label: 'Print',
            icon: <Print fontSize="small" />,
            onClick: handlePrint,
            tooltip: 'Print application',
            color: 'info',
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
    ], [isMobile, isUpdating, isDeleting]);

    // Define bulk actions
    const bulkActions: BulkAction[] = useMemo(() => [
        {
            label: 'Approve',
            icon: <CheckCircle fontSize="small" />,
            onClick: handleBulkApprove,
            color: 'success',
            disabled: (selectedRows: any[]) =>
                selectedRows.some(row => row.status === 'approved' || row.status === 'rejected' || row.status === 'enrolled') || isUpdating || isDeleting,
        },
        {
            label: 'Delete',
            icon: <Delete fontSize="small" />,
            onClick: handleBulkDelete,
            color: 'error',
            disabled: () => isDeleting || isUpdating,
        },
        {
            label: 'Export',
            icon: <Download fontSize="small" />,
            onClick: handleBulkExport,
            color: 'info',
        },
    ], [isUpdating, isDeleting]);

    // Transform API data to match table structure
    const tableData = useMemo(() => {
        return data?.data?.map((item: any) => ({
            ...item,
            ...item.studentInfo,
            ...item.parentInfo,
            ...item.academicInfo,
        })) || []
    }, [data])

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
                    onExport={handleExport}
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

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}