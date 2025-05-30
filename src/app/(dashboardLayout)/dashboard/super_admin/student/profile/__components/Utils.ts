
    export const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "success"
            case "Inactive":
                return "error"
            case "Graduated":
                return "info"
            default:
                return "default"
        }
    }
    
   export const getHomeworkStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "success"
            case "Pending":
                return "warning"
            case "Late":
                return "error"
            default:
                return "default"
        }
    }
