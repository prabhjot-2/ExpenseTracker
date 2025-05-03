// Import necessary modules
const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const{ icon,source,amount, date } = req.body;
        // validation : check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newIncome= new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date), // Convert date string to Date object
        });
        await newIncome.save();
        res.status(200).json(newIncome)

    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// getA;;income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomeData = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomeData);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
// delete income source
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;
    const incomeId = req.params.id;
    try {
        const incomeData = await Income.findByIdAndDelete({ _id: incomeId, userId });
        if (!incomeData) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}
// download income source in excel format
exports.downloadIncomeExcel = async (req, res) => {
    const userId=req.user.id;
    try {
        const incomeData = await Income.find({ user: userId }).sort({ date: -1 });
        // if (!incomeData || incomeData.length === 0) {
        //     return res.status(404).json({ message: "No income data found" });
        // }
        // Format the data for Excel
        const formattedData = incomeData.map((income) => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        }));
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(formattedData);
        xlsx.utils.book_append_sheet(wb,ws,"Income Data");
        xlsx.writeFile(wb,"income_details.xlsx");
        res.download("income_details.xlsx");
    
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