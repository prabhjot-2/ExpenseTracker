import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
const COLORS=["#875CF5","#FA2C37","#FF6900"]

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData=[
        { name: "total Balance", amount:totalBalance},
        { name: "total Expense", amount:totalExpense},
        { name: "total Income", amount:totalIncome},
        
    ]
  return (
    <div className=''>
      <div className=''>
        <h5> Financial Overview</h5>
      </div>

      <CustomPieChart
      data={balanceData}
      label="Total Balance"
      totalAmount={`$${totalBalance}`}
      colors={COLORS}
      showTextAnchor={true}
      />
    </div>
  )
}

export default FinanceOverview
