
import {

    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
const WeeklyReportHeader = () => {
    return (
        <>
            <TableHead>
                <TableRow
                    sx={{
                        background:
                            "linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)",
                    }}
                >
                    <TableCell
                        align="center"
                        sx={{
                            border: "1px solid #fff",
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "1.1rem",
                        }}
                    >
                        একনজরে এই সপ্তাহের টার্গেট
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            border: "1px solid #fff",
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "1.1rem",
                        }}
                    >
                        হাদিস নম্বর / সূরার নাম
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            border: "1px solid #fff",
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "1.1rem",
                        }}
                    >
                        দোয়ার নম্বর
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            border: "1px solid #fff",
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "1.1rem",
                        }}
                    >
                        তাজবীদের বিষয়
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            border: "1px solid #fff",
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "1.1rem",
                        }}
                    >
                        মোট পড়ার পরিমাণ
                    </TableCell>
                </TableRow>
            </TableHead>
        </>
    )
}

export default WeeklyReportHeader