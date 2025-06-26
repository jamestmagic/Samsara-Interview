from flask import Flask, render_template_string

app = Flask(__name__)

financial_data = [
    {
        'company': 'Acme Corp',
        'years': [
            {'year': 2019, 'revenue': 2500000, 'expenses': 1800000, 'net_income': 700000},
            {'year': 2020, 'revenue': 2700000, 'expenses': 1900000, 'net_income': 800000},
        ]
    },
    {
        'company': 'Beta Industries',
        'years': [
            {'year': 2019, 'revenue': 1200000, 'expenses': 950000, 'net_income': 250000},
            {'year': 2020, 'revenue': 1350000, 'expenses': 1000000, 'net_income': 350000},
        ]
    },
    {
        'company': 'Classic Textiles',
        'years': [
            {'year': 2019, 'revenue': 3100000, 'expenses': 2400000, 'net_income': 700000},
            {'year': 2020, 'revenue': 3300000, 'expenses': 2500000, 'net_income': 800000},
        ]
    },
    {
        'company': 'OldTown Hardware',
        'years': [
            {'year': 2019, 'revenue': 850000, 'expenses': 600000, 'net_income': 250000},
            {'year': 2020, 'revenue': 900000, 'expenses': 650000, 'net_income': 250000},
        ]
    },
]

TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Legacy Financial Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: Arial, sans-serif; background: #f7f7f7; margin: 0; padding: 0; }
        .container { max-width: 1000px; margin: 2rem auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 2rem; }
        h1 { text-align: center; }
        .tab-content { margin-top: 2rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { border: 1px solid #e0e0e0; padding: 0.5rem 0.75rem; text-align: right; }
        th { background: #2a4d69; color: #fff; }
        tr:nth-child(even) { background: #f0f4f8; }
        tr:hover { background: #e6f7ff; }
        td:first-child, th:first-child { text-align: center; }
        .chart-container { width: 100%; height: 350px; margin: 2rem 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Legacy Business Financial Data</h1>
        <ul class="nav nav-tabs" id="companyTabs" role="tablist">
            {% for company in financial_data %}
            <li class="nav-item" role="presentation">
                <button class="nav-link {% if loop.first %}active{% endif %}" id="tab-{{ loop.index0 }}" data-bs-toggle="tab" data-bs-target="#content-{{ loop.index0 }}" type="button" role="tab" aria-controls="content-{{ loop.index0 }}" aria-selected="{{ 'true' if loop.first else 'false' }}">{{ company.company }}</button>
            </li>
            {% endfor %}
        </ul>
        <div class="tab-content" id="companyTabsContent">
            {% for company in financial_data %}
            <div class="tab-pane fade {% if loop.first %}show active{% endif %}" id="content-{{ loop.index0 }}" role="tabpanel" aria-labelledby="tab-{{ loop.index0 }}">
                <div class="chart-container">
                    <canvas id="bar-{{ loop.index0 }}"></canvas>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Revenue</th>
                            <th>Expenses</th>
                            <th>Net Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for year in company.years %}
                        <tr>
                            <td>{{ year.year }}</td>
                            <td>${{ "{:,}".format(year.revenue) }}</td>
                            <td>${{ "{:,}".format(year.expenses) }}</td>
                            <td>${{ "{:,}".format(year.net_income) }}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </div>
            {% endfor %}
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const data = {{ financial_data|tojson }};
        data.forEach((company, idx) => {
            const ctx = document.getElementById('bar-' + idx).getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: company.years.map(y => y.year),
                    datasets: [
                        {
                            label: 'Revenue',
                            data: company.years.map(y => y.revenue),
                            backgroundColor: '#0088FE',
                        },
                        {
                            label: 'Expenses',
                            data: company.years.map(y => y.expenses),
                            backgroundColor: '#FF8042',
                        },
                        {
                            label: 'Net Income',
                            data: company.years.map(y => y.net_income),
                            backgroundColor: '#00C49F',
                        },
                    ]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'top' } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        });
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(TEMPLATE, financial_data=financial_data)

if __name__ == '__main__':
    app.run(debug=True) 