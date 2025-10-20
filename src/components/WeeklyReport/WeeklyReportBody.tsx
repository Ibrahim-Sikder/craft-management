// WeeklyReportBody.tsx
'use client'

import {
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import CraftInput from "../Forms/Input";

interface ReportRowData {
    label: string;
    values: string[];
}

interface WeeklyReportBodyProps {
    rows?: ReportRowData[];
    onDataChange?: (rowData: ReportRowData[]) => void;
    readOnly?: boolean;
}

const WeeklyReportBody = ({
    rows = [
        { label: "একনজরে এই সপ্তাহের টার্গেট", values: ["", "", "", ""] },
        { label: "একনজরে এই সপ্তাহের রিপোর্ট", values: ["", "", "", ""] },
        { label: "একনজরে ভুলের সংখ্যা", values: ["", "", "", ""] }
    ],
    onDataChange,
    readOnly = false
}: WeeklyReportBodyProps) => {

    // Generate a unique name for each input field
    const getInputName = (rowIndex: number, colIndex: number) => {
        return `rows[${rowIndex}].values[${colIndex}]`;
    };

    const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
        const newRows = [...rows];
        newRows[rowIndex].values[colIndex] = value;
        if (onDataChange) {
            onDataChange(newRows);
        }
    };

    return (
        <TableBody>
            {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                    <TableCell
                        sx={{
                            border: "1px solid #ccc",
                            fontWeight: "bold",
                            background: "#e3f2fd",
                            minWidth: "200px"
                        }}
                    >
                        <Typography variant="body2">
                            {row.label}
                        </Typography>
                    </TableCell>
                    {row.values.map((value, colIndex) => (
                        <TableCell
                            key={colIndex}
                            sx={{ border: "1px solid #ccc", p: 0.5 }}
                        >
                            <CraftInput
                                name={getInputName(rowIndex, colIndex)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={value}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                disabled={readOnly}
                                InputProps={{
                                    sx: {
                                        borderRadius: 0,
                                        background: readOnly ? "#f5f5f5" : "#fff"
                                    },
                                }}
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    )
}

export default WeeklyReportBody;