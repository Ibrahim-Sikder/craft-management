/* eslint-disable @typescript-eslint/no-explicit-any */
import CraftIntAutoCompleteWithIcon from "@/components/Forms/AutocompleteWithIcon";
import CraftForm from "@/components/Forms/Form";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";
import CraftModal from "@/components/Shared/Modal";
import { useAcademicOption } from "@/hooks/useAcademicOption";
import { Class, Money } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";

const AddFeeModal = ({ open, setOpen }: any) => {
  const { feeCategoryOptions, classOptions } = useAcademicOption();
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <CraftModal open={open} setOpen={setOpen} title="Add Fee" size="md">
      <CraftForm onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <CraftIntAutoCompleteWithIcon
              name="className"
              label="Class"
              placeholder="Select Class"
              options={classOptions}
              fullWidth
              multiple
              icon={<Class color="primary" />}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CraftIntAutoCompleteWithIcon
              name="feetype"
              label="Select Fee"
              placeholder="Select Fee Type"
              options={feeCategoryOptions}
              fullWidth
              multiple
              icon={<Money color="primary" />}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CraftInputWithIcon
              name="feeAmount"
              label="Fee Amount"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <Money sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
              // disabled
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CraftInputWithIcon
              name="paidAmount"
              label="Paid Amount"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <Money sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
          </Grid>
        </Grid>
      </CraftForm>
    </CraftModal>
  );
};

export default AddFeeModal;
