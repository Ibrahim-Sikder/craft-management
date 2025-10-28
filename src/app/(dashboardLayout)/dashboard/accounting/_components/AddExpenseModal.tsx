/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material"
import { Close, Add, Delete } from "@mui/icons-material"
import CraftForm from "@/components/Forms/Form"
import CraftSelect from "@/components/Forms/Select"
import { paymentOptions } from "@/options"
import CraftInput from "@/components/Forms/Input"
import CraftTextArea from "@/components/Forms/TextArea"
import CraftDatePicker from "@/components/Forms/DatePicker"
import toast from "react-hot-toast"
import { useEffect, useMemo, useState } from "react"
import { cardStyle } from "@/style/customeStyle"
import CategoryAutoComplete from "@/utils/CategoryAutoComplete"
import { useCreateExpenseMutation, useGetSingleExpenseQuery, useUpdateExpenseMutation } from "@/redux/api/expenseApi"
import { useGetAllExpenseCategoriesQuery } from "@/redux/api/expenseCategoryApi"
import { LoadingState } from "@/components/common/LoadingState"

interface TExpenseItem {
  id: number
  source: string
  amount: string
}

interface AddExpenseDialogProps {
  open: boolean
  onClose: () => void
  id?: string
}

export default function AddExpenseModal({ id, open, onClose }: AddExpenseDialogProps) {
  const [createExpense] = useCreateExpenseMutation()
  const [updateExpense] = useUpdateExpenseMutation()
  const { data: singleExpense, isLoading: singleExpenseLoading } = useGetSingleExpenseQuery(id)
  console.log("this is single expense ", singleExpense)
  const { data: expenseCategories } = useGetAllExpenseCategoriesQuery({})

  const expenseCategoryOption = useMemo(() => {
    if (!expenseCategories?.data?.data) return []
    return expenseCategories.data.data.map((cat: any) => ({
      title: cat.name,
      value: cat._id,
    }))
  }, [expenseCategories?.data?.data])

  const [expenseItems, setExpenseItems] = useState<TExpenseItem[]>([{ id: 1, source: "", amount: "" }])

  const handleAddExpenseItem = () => {
    const newId = Math.max(...expenseItems.map((item) => item.id)) + 1
    setExpenseItems((prev) => [...prev, { id: newId, source: "", amount: "" }])
  }

  const handleRemoveExpenseItem = (id: number) => {
    if (expenseItems.length > 1) {
      setExpenseItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleExpneseItemChange = (id: number, field: keyof TExpenseItem, value: string) => {
    setExpenseItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleSubmit = async (data: any) => {
    const cleanedExpenseItems = expenseItems.map((item) => ({
      source: item.source,
      amount: Number(item.amount),
    }))

    const totalAmount = cleanedExpenseItems.reduce((sum, item) => sum + Number(item.amount || 0), 0)

    const payload = {
      ...data,
      expenseItems: cleanedExpenseItems,
      totalAmount,
      // Fix: Extract the first category from the array
      category: data.category && data.category.length > 0 ? data.category[0].value : null,
    }

    try {
      if (id) {
        const res = await updateExpense({ id, data: payload }).unwrap()
        if (res.success) {
          toast.success(res.message || "Expense update successfully")
          onClose()
        }
      } else {
        const res = await createExpense(payload).unwrap()
        if (res.success) {
          toast.success(res.message || "Expense created successfully")
          onClose()
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create Expense")
    }
  }

  // Fix: Wrap category in an array since CategoryAutoComplete expects multiple values
  const defaultValues =
    id && singleExpense?.data
      ? {
        category: singleExpense?.data?.category
          ? [
            {
              title: singleExpense.data.category.name,
              value: singleExpense.data.category._id,
            },
          ]
          : [],
        paymentMethod: singleExpense.data.paymentMethod,
        expenseDate: singleExpense.data.expenseDate,
        note: singleExpense.data.note,
        expenseItems: singleExpense.data.expenseItems.map((item: any, index: number) => ({
          id: index + 1,
          source: item.source,
          amount: item.amount.toString(),
        })),
      }
      : {
        category: [],
        paymentMethod: "",
        expenseDate: new Date(),
        note: "",
        expenseItems: [{ id: 1, source: "", amount: "" }],
      }

  useEffect(() => {
    if (id && singleExpense?.data) {
      setExpenseItems(
        singleExpense.data.expenseItems.map((item: any, index: number) => ({
          id: index + 1,
          source: item.source,
          amount: item.amount.toString(),
        })),
      )
    }
  }, [id, singleExpense])

  return (
    <>
      {singleExpenseLoading ? (
        <LoadingState />
      ) : (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="bold">
                {id ? "Edit Expense" : "Add New Expense"}
              </Typography>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CategoryAutoComplete name="category" label="Category" options={expenseCategoryOption} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftSelect margin="none" name="paymentMethod" label="Payment Method" items={paymentOptions} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CraftDatePicker name="expenseDate" label="Expense Date" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInput name="status" label="Buyer" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CraftInput name="status" label="Payer" fullWidth />
                </Grid>

                <Grid item xs={12}>
                  {expenseItems.map((item, index) => (
                    <Card key={item.id} sx={cardStyle}>
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" mb={2}>
                          <Typography fontWeight={600}>Expense Item #{index + 1}</Typography>
                          {expenseItems.length > 1 && (
                            <IconButton onClick={() => handleRemoveExpenseItem(item.id)} color="error">
                              <Delete />
                            </IconButton>
                          )}
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <CraftInput
                              fullWidth
                              name={`expenseItems[${index}].source`}
                              label="Expense Source"
                              value={item.source}
                              onChange={(e) => handleExpneseItemChange(item.id, "source", e.target.value)}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <CraftInput
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                },
                              }}
                              fullWidth
                              name={`expenseItems[${index}].amount`}
                              label="Amount (৳)"
                              type="number"
                              value={item.amount}
                              onChange={(e) => handleExpneseItemChange(item.id, "amount", e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Button
                      onClick={handleAddExpenseItem}
                      variant="contained"
                      startIcon={<Add />}
                      sx={{
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                        boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                        "&:hover": {
                          boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                        },
                      }}
                    >
                      Add Item
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <CraftTextArea name="note" label="Note" />
                </Grid>
              </Grid>
              <DialogActions sx={{ mt: 3 }}>
                <Button onClick={onClose} variant="outlined">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={expenseItems.length === 0}
                  sx={{
                    background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                    color: "#fff",
                  }}
                >
                  {id ? "Update Expense" : "Add Expense"}
                </Button>
              </DialogActions>
            </CraftForm>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
