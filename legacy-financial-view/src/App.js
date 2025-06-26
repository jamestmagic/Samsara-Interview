import React, { useState } from 'react';
import './App.css';
import { Tabs, Tab, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#2a4d69', '#8884d8'];

const financialData = [
  {
    company: 'Acme Corp',
    years: [
      {
        year: 2019,
        revenue: 2500000,
        expenses: 1800000,
        net_income: 700000,
        assets: 5000000,
        liabilities: 2000000,
        equity: 3000000,
        operating_cash_flow: 800000,
        investing_cash_flow: -200000,
        financing_cash_flow: 100000,
      },
      {
        year: 2020,
        revenue: 2700000,
        expenses: 1900000,
        net_income: 800000,
        assets: 5200000,
        liabilities: 2100000,
        equity: 3100000,
        operating_cash_flow: 850000,
        investing_cash_flow: -150000,
        financing_cash_flow: 120000,
      },
    ],
  },
  {
    company: 'Beta Industries',
    years: [
      {
        year: 2019,
        revenue: 1200000,
        expenses: 950000,
        net_income: 250000,
        assets: 2000000,
        liabilities: 1200000,
        equity: 800000,
        operating_cash_flow: 300000,
        investing_cash_flow: -50000,
        financing_cash_flow: 30000,
      },
      {
        year: 2020,
        revenue: 1350000,
        expenses: 1000000,
        net_income: 350000,
        assets: 2100000,
        liabilities: 1250000,
        equity: 850000,
        operating_cash_flow: 320000,
        investing_cash_flow: -40000,
        financing_cash_flow: 35000,
      },
    ],
  },
  {
    company: 'Classic Textiles',
    years: [
      {
        year: 2019,
        revenue: 3100000,
        expenses: 2400000,
        net_income: 700000,
        assets: 6000000,
        liabilities: 2500000,
        equity: 3500000,
        operating_cash_flow: 900000,
        investing_cash_flow: -300000,
        financing_cash_flow: 200000,
      },
      {
        year: 2020,
        revenue: 3300000,
        expenses: 2500000,
        net_income: 800000,
        assets: 6200000,
        liabilities: 2600000,
        equity: 3600000,
        operating_cash_flow: 950000,
        investing_cash_flow: -250000,
        financing_cash_flow: 220000,
      },
    ],
  },
  {
    company: 'OldTown Hardware',
    years: [
      {
        year: 2019,
        revenue: 850000,
        expenses: 600000,
        net_income: 250000,
        assets: 1500000,
        liabilities: 700000,
        equity: 800000,
        operating_cash_flow: 270000,
        investing_cash_flow: -30000,
        financing_cash_flow: 20000,
      },
      {
        year: 2020,
        revenue: 900000,
        expenses: 650000,
        net_income: 250000,
        assets: 1550000,
        liabilities: 720000,
        equity: 830000,
        operating_cash_flow: 280000,
        investing_cash_flow: -25000,
        financing_cash_flow: 22000,
      },
    ],
  },
];

function CompanyCharts({ years }) {
  // Bar chart for revenue, expenses, net income by year
  const barData = years.map((y) => ({
    year: y.year,
    Revenue: y.revenue,
    Expenses: y.expenses,
    'Net Income': y.net_income,
  }));

  // Pie chart for the latest year: revenue vs expenses vs net income
  const latest = years[years.length - 1];
  const pieData = [
    { name: 'Revenue', value: latest.revenue },
    { name: 'Expenses', value: latest.expenses },
    { name: 'Net Income', value: latest.net_income },
  ];

  return (
    <div className="charts-container">
      <div className="chart-block">
        <h4>Yearly Financial Overview</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="Revenue" fill="#0088FE" />
            <Bar dataKey="Expenses" fill="#FF8042" />
            <Bar dataKey="Net Income" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-block">
        <h4>Latest Year Breakdown ({latest.year})</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState(0);

  return (
    <div className="App">
      <h1>Legacy Business Financial Data</h1>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
          {financialData.map((company, idx) => (
            <Tab key={company.company} label={company.company} />
          ))}
        </Tabs>
      </Box>
      {financialData.map((company, idx) => (
        tab === idx && (
          <div key={company.company} className="company-block">
            <h2>{company.company}</h2>
            <CompanyCharts years={company.years} />
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Revenue</th>
                  <th>Expenses</th>
                  <th>Net Income</th>
                  <th>Assets</th>
                  <th>Liabilities</th>
                  <th>Equity</th>
                  <th>Operating Cash Flow</th>
                  <th>Investing Cash Flow</th>
                  <th>Financing Cash Flow</th>
                </tr>
              </thead>
              <tbody>
                {company.years.map((yearData) => (
                  <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>${yearData.revenue.toLocaleString()}</td>
                    <td>${yearData.expenses.toLocaleString()}</td>
                    <td>${yearData.net_income.toLocaleString()}</td>
                    <td>${yearData.assets.toLocaleString()}</td>
                    <td>${yearData.liabilities.toLocaleString()}</td>
                    <td>${yearData.equity.toLocaleString()}</td>
                    <td>${yearData.operating_cash_flow.toLocaleString()}</td>
                    <td>${yearData.investing_cash_flow.toLocaleString()}</td>
                    <td>${yearData.financing_cash_flow.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ))}
    </div>
  );
}

export default App;
