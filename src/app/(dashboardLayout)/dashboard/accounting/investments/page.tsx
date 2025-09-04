/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/investment-dashboard.tsx
"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Button, Pagination } from "@mui/material"
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material"
import { useGetAllInvestmentsQuery, useDeleteInvestmentMutation } from "@/redux/api/investmentApi"
import Swal from "sweetalert2"
import PerformanceDialog from "./__components/PerformanceDialog"
import CloseInvestmentDialog from "./__components/CloseInvestmentDialog"
import AddReturnDialog from "./__components/AddReturnDialog"
import InvestmentForm from "./__components/InvestmentForm"
import InvestmentTable from "./__components/InvestmentTable"
import InvestmentFilters from "./__components/InvestmentFilters"
import InvestmentCharts from "./__components/InvestmentCharts"
import InvestmentMetrics from "./__components/InvestmentMetrics"

const InvestmentDashboard = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const { data: investmentResponse, isLoading, refetch } = useGetAllInvestmentsQuery({ page, limit })
  const [deleteInvestment] = useDeleteInvestmentMutation()
  const [investments, setInvestments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [investmentFormOpen, setInvestmentFormOpen] = useState(false)
  const [returnDialogOpen, setReturnDialogOpen] = useState(false)
  const [closeDialogOpen, setCloseDialogOpen] = useState(false)
  const [performanceDialogOpen, setPerformanceDialogOpen] = useState(false)
  const [editingInvestmentId, setEditingInvestmentId] = useState<string | null>(null)
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null)

  // Map API response to state
  useEffect(() => {
    if (investmentResponse?.data?.investments) {
      setInvestments(investmentResponse.data.investments)
    }
  }, [investmentResponse])

  // Calculate metrics for investments
  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
  const totalReturns = investments.reduce((sum, inv) => sum + (inv.totalReturns || 0), 0)
  const avgROI = totalInvestmentValue > 0 ? (totalReturns / totalInvestmentValue) * 100 : 0
  const activeInvestments = investments.filter((inv) => inv.status === "active").length

  // Prepare chart data
  const investmentTypeDistribution = investments.reduce(
    (acc, inv) => {
      const type = inv.investmentCategory === "outgoing" ? inv.investmentType : inv.incomingType
      acc[type] = (acc[type] || 0) + inv.investmentAmount
      return acc
    },
    {} as Record<string, number>,
  )

const investmentPieData: { name: string; value: number }[] =
  Object.entries(investmentTypeDistribution).map(([type, value]) => ({
    name: type,
    value: Number(value) || 0,
  }))


  

  const investmentPerformanceData = investments.map((inv) => {
    const currentValue = inv.currentValue || inv.investmentAmount
    const returns = inv.totalReturns || 0
    return {
      name: (inv.investmentCategory === "outgoing" ? inv.investmentTo : inv.investorName)?.substring(0, 15) +
        ((inv.investmentCategory === "outgoing" ? inv.investmentTo : inv.investorName)?.length > 15 ? "..." : ""),
      principal: inv.investmentAmount,
      current: currentValue,
      returns: returns,
    }
  })

  // Filter investments
  const filteredInvestments = investments.filter((investment) => {
    const name = investment.investmentCategory === "outgoing"
      ? investment.investmentTo
      : investment.investorName
    const matchesSearch = name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.investmentType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.incomingType?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || investment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this investment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

      if (result.isConfirmed) {
        await deleteInvestment(id).unwrap()
        refetch()

        Swal.fire({
          title: "Deleted!",
          text: "Investment has been deleted successfully.",
          icon: "success"
        })
      }
    } catch (err: any) {
      Swal.fire({
        title: "Error!",
        text: err.data?.message || "Failed to delete investment",
        icon: "error"
      })
    }
  }

  // Handlers for investments
  const handleAddInvestment = () => {
    setEditingInvestmentId(null)
    setInvestmentFormOpen(true)
  }

  const handleEditInvestment = (id: string) => {
    setEditingInvestmentId(id)
    setInvestmentFormOpen(true)
  }

  const handleAddReturn = (investment: any) => {
    setSelectedInvestment(investment)
    setReturnDialogOpen(true)
  }

  const handleCloseInvestment = (investment: any) => {
    setSelectedInvestment(investment)
    setCloseDialogOpen(true)
  }

  const handleViewPerformance = (investment: any) => {
    setSelectedInvestment(investment)
    setPerformanceDialogOpen(true)
  }

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: "#F9FAFB", minHeight: "100vh", width: '100%' }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontFamily: "Playfair Display", fontWeight: 700, color: "#1F2937", mb: 1 }}>
              Investment Portfolio
            </Typography>
            <Typography variant="body1" sx={{ color: "#6B7280" }}>
              Track and manage your investments
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<TrendingUpIcon />}
              onClick={handleAddInvestment}
              sx={{
                bgcolor: "#F59E0B",
                "&:hover": { bgcolor: "#D97706" },
              }}
            >
              New Investment
            </Button>
          </Box>
        </Box>

        <InvestmentMetrics
          totalInvestmentValue={totalInvestmentValue}
          totalReturns={totalReturns}
          avgROI={avgROI}
          activeInvestments={activeInvestments}
        />

        <InvestmentCharts
          investmentPieData={investmentPieData}
          investmentPerformanceData={investmentPerformanceData}
        />

        <InvestmentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <InvestmentTable
          investments={investments}
          isLoading={isLoading}
          filteredInvestments={filteredInvestments}
          onEdit={handleEditInvestment}
          onDelete={handleDelete}
          onAddReturn={handleAddReturn}
          onCloseInvestment={handleCloseInvestment}
          onViewPerformance={handleViewPerformance}
        />

        {/* Pagination */}
        {investmentResponse?.data?.meta && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={investmentResponse.data.meta.totalPage}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>

      <InvestmentForm
        open={investmentFormOpen}
        onClose={() => setInvestmentFormOpen(false)}
        investmentId={editingInvestmentId || undefined}
        refetch={refetch}
      />

      <AddReturnDialog
        open={returnDialogOpen}
        onClose={() => setReturnDialogOpen(false)}
        investmentId={selectedInvestment?._id}
        refetch={refetch}
      />

      <CloseInvestmentDialog
        open={closeDialogOpen}
        onClose={() => setCloseDialogOpen(false)}
        investmentId={selectedInvestment?._id}
        refetch={refetch}
      />

      <PerformanceDialog
        open={performanceDialogOpen}
        onClose={() => setPerformanceDialogOpen(false)}
        investmentId={selectedInvestment?._id}
      />
    </>
  )
}

export default InvestmentDashboard