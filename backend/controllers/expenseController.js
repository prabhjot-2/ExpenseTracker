// Import necessary modules
const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const{ icon,category,amount, date } = req.body;
        // validation : check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newExpense= new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date), // Convert date string to Date object
        });
        await newExpense.save();
        res.status(200).json(newExpense)

    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// getA;;Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const ExpenseData = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(ExpenseData);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
// delete Expense source
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
    const expenseId = req.params.id;
    try {
        const ExpenseData = await Expense.findByIdAndDelete({ _id: expenseId, userId });
        if (!ExpenseData) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}
// download Expense source in excel format
exports.downloadExpenseExcel = async (req, res) => {
    const userId=req.user.id;
    try {
        const ExpenseData = await Expense.find({ user: userId }).sort({ date: -1 });
        // if (!incomeData || incomeData.length === 0) {
        //     return res.status(404).json({ message: "No income data found" });
        // }
        // Format the data for Excel
        const formattedData = ExpenseData.map((expense) => ({
            category: expense.category,
            Amount: expense.amount,
            Date: expense.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        }));
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(formattedData);
        xlsx.utils.book_append_sheet(wb,ws,"expense Data");
        xlsx.writeFile(wb,"expense_details.xlsx");
        res.download("expense_details.xlsx");
    
        // const workbook = new ExcelJS.Workbook();
        // const worksheet = workbook.addWorksheet("Income Data");

        // worksheet.columns = [
        //     { header: "ID", key: "_id", width: 25 },
        //     { header: "Source", key: "source", width: 25 },
        //     { header: "Amount", key: "amount", width: 15 },
        //     { header: "Date", key: "date", width: 15 },
        // ];

        // incomeData.forEach((income) => {
        //     worksheet.addRow(income);
        // });

        // res.setHeader(
        //     "Content-Type",
        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        // );
        // res.setHeader(
        //     "Content-Disposition",
        //     `attachment; filename=income_data_${Date.now()}.xlsx`
        // );

        // await workbook.xlsx.write(res);
        // res.end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};