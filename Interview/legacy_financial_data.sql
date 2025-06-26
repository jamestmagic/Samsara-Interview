-- Table for companies
CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Table for financial data
CREATE TABLE financials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    year INTEGER NOT NULL,
    revenue REAL,
    expenses REAL,
    net_income REAL,
    assets REAL,
    liabilities REAL,
    equity REAL,
    operating_cash_flow REAL,
    investing_cash_flow REAL,
    financing_cash_flow REAL,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Insert companies
INSERT INTO companies (name) VALUES ('Acme Corp');
INSERT INTO companies (name) VALUES ('Beta Industries');
INSERT INTO companies (name) VALUES ('Classic Textiles');
INSERT INTO companies (name) VALUES ('OldTown Hardware');

-- Insert financial data
INSERT INTO financials (company_id, year, revenue, expenses, net_income, assets, liabilities, equity, operating_cash_flow, investing_cash_flow, financing_cash_flow) VALUES
(1, 2019, 2500000, 1800000, 700000, 5000000, 2000000, 3000000, 800000, -200000, 100000),
(1, 2020, 2700000, 1900000, 800000, 5200000, 2100000, 3100000, 850000, -150000, 120000),
(2, 2019, 1200000, 950000, 250000, 2000000, 1200000, 800000, 300000, -50000, 30000),
(2, 2020, 1350000, 1000000, 350000, 2100000, 1250000, 850000, 320000, -40000, 35000),
(3, 2019, 3100000, 2400000, 700000, 6000000, 2500000, 3500000, 900000, -300000, 200000),
(3, 2020, 3300000, 2500000, 800000, 6200000, 2600000, 3600000, 950000, -250000, 220000),
(4, 2019, 850000, 600000, 250000, 1500000, 700000, 800000, 270000, -30000, 20000),
(4, 2020, 900000, 650000, 250000, 1550000, 720000, 830000, 280000, -25000, 22000); 