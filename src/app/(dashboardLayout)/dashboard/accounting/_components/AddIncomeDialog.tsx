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
import { categoryStatusOptions, paymentOptions } from "@/options"
import CraftInput from "@/components/Forms/Input"
import CraftTextArea from "@/components/Forms/TextArea"
import CraftDatePicker from "@/components/Forms/DatePicker"
import toast from "react-hot-toast"
import { useCreateIncomeMutation, useGetSingleIncomeQuery, useUpdateIncomeMutation } from "@/redux/api/incomeApi"
import { useEffect, useMemo, useState } from "react"
import { useGetAllIncomeCategoriesQuery } from "@/redux/api/incomeCategoryApi"
import { cardStyle } from "@/style/customeStyle"
import CategoryAutoComplete from "@/utils/CategoryAutoComplete"
import { LoadingState } from "@/components/common/LoadingState"
interface IncomeItem {
  id: number
  source: string
  description: string
  amount: string

}

interface AddIncomeDialogProps {
  open: boolean;
  onClose: () => void;
  id?: string;
}

export default function AddIncomeModal({ id, open, onClose }: AddIncomeDialogProps) {

  const [createIncome] = useCreateIncomeMutation()
  const [updateIncome] = useUpdateIncomeMutation()
  const { data: singleIncome, isLoading: singleIncomeLoading } = useGetSingleIncomeQuery(id)
  const { data: incomeCategories } = useGetAllIncomeCategoriesQuery({})

  const incomeCategoryOption = useMemo(() => {
    if (!incomeCategories?.data?.data) return [];
    return incomeCategories.data.data.map((cat: any) => ({
      title: cat.name,
      value: cat._id,
    }));
  }, [incomeCategories?.data?.data]);

  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([
    { id: 1, source: "", description: "", amount: "" },
  ])

  const handleAddIncomeItem = () => {
    const newId = Math.max(...incomeItems.map((item) => item.id)) + 1
    setIncomeItems((prev) => [...prev, { id: newId, source: "", description: "", amount: "" }])
  }

  const handleRemoveIncomeItem = (id: number) => {
    if (incomeItems.length > 1) {
      setIncomeItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleIncomeItemChange = (id: number, field: keyof IncomeItem, value: string) => {
    setIncomeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleSubmit = async (data: any) => {
    const cleanedIncomeItems = incomeItems.map((item) => ({
      source: item.source,
      description: item.description,
      amount: Number(item.amount),
    }))

    const totalAmount = cleanedIncomeItems.reduce((sum, item) => sum + Number(item.amount || 0), 0)

    const payload = {
      ...data,
      incomeItems: cleanedIncomeItems,
      totalAmount,
      category: data.category?.[0]?.value || null,
    }
 
    try {
      if (id) {
        const res = await updateIncome({ id, data: payload }).unwrap();

        if (res.success) {
          toast.success(res.message || "Income update successfully")
          onClose()
        }
      } else {
        const res = await createIncome(payload).unwrap()
        if (res.success) {
          toast.success(res.message || "Income created successfully")
          onClose()
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create income")
    }
  }

  const defaultValues = id && singleIncome?.data
    ? {
      category: singleIncome?.data?.category
        ? {
          label: singleIncome.data.category.name,
          value: singleIncome.data.category._id,
        }
        : null,
      paymentMethod: singleIncome.data.paymentMethod,
      incomeDate: singleIncome.data.incomeDate,
      note: singleIncome.data.note,
      incomeItems: singleIncome.data.incomeItems.map((item: any, index: number) => ({
        id: index + 1,
        source: item.source,
        description: item.description,
        amount: item.amount.toString(),
      })),
    }
    : {
      category: null,
      paymentMethod: "",
      incomeDate: new Date(),
      note: "",
      incomeItems: [{ id: 1, source: "", description: "", amount: "" }],
    }

  useEffect(() => {
    if (id && singleIncome?.data) {
      setIncomeItems(
        singleIncome.data.incomeItems.map((item: any, index: number) => ({
          id: index + 1,
          source: item.source,
          amount: item.amount.toString(),
        }))
      );
    }
  }, [id, singleIncome]);

  return (
    <>

      {
        singleIncomeLoading ? (
           <LoadingState/>
        ) : (
          <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                  Add New Income
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
                    <CategoryAutoComplete name="category" label="Category" options={incomeCategoryOption} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CraftSelect margin="none" name="paymentMethod" label="Payment Method" items={paymentOptions}  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CraftSelect name="status" label="Payment Method" items={categoryStatusOptions}  />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CraftDatePicker name="incomeDate" label="Income Date" />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <CraftTextArea name="note" label="Note" />
                  </Grid>

                  <Grid item xs={12}>


                    {incomeItems.map((item, index) => (
                      <Card key={item.id} sx={cardStyle}>
                        <CardContent sx={{ p: 2 }}>
                          <Box display="flex" justifyContent="space-between" mb={2}>
                            <Typography fontWeight={600}>Income Item #{index + 1}</Typography>
                            {incomeItems.length > 1 && (
                              <IconButton onClick={() => handleRemoveIncomeItem(item.id)} color="error">
                                <Delete />
                              </IconButton>
                            )}
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <CraftInput
                                fullWidth
                                name={`incomeItems[${index}].source`}
                                label="Income Source"
                                value={item.source}
                                onChange={(e) => handleIncomeItemChange(item.id, "source", e.target.value)}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                  },
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={3} md={6}>
                              <CraftInput
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                  },
                                }}
                                fullWidth
                                name={`incomeItems[${index}].amount`}
                                label="Amount (৳)"
                                type="number"
                                value={item.amount}
                                onChange={(e) => handleIncomeItemChange(item.id, "amount", e.target.value)}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}


                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Button
                        onClick={handleAddIncomeItem}
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

                  <Grid item xs={12}>
                    <Card sx={{ p: 2, backgroundColor: "#f1f8e9" }}>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between">
                          <Typography fontWeight={600}>Total Income:</Typography>
                          <Typography fontWeight={700} color="green">
                            ৳{" "}
                            {incomeItems.reduce(
                              (sum, item) => sum + (parseFloat(item.amount) || 0),
                              0
                            )}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <DialogActions sx={{ mt: 3 }}>
                  <Button onClick={onClose} variant="outlined">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={incomeItems.length === 0}
                    sx={{
                      background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                      color: "#fff",
                    }}
                  >
                    {id ? 'Update Income' : ' Add Income'}
                  </Button>
                </DialogActions>
              </CraftForm>
            </DialogContent>
          </Dialog>
        )
      }
    </>
  )
}
