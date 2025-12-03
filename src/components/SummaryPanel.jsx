import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryPanel = ({ totalInterest, totalPrincipal }) => {
    const totalCost = totalInterest + totalPrincipal;

    const data = {
        labels: ['Total Interest', 'Total Principal'],
        datasets: [
            {
                data: [totalInterest, totalPrincipal],
                backgroundColor: [
                    'rgba(255, 77, 77, 0.8)', // Red
                    'rgba(77, 121, 255, 0.8)', // Blue
                ],
                borderColor: [
                    '#ff4d4d',
                    '#4d79ff',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#ffffff',
                },
            },
            title: {
                display: true,
                text: 'Total Cost Breakdown',
                color: '#ffffff',
            },
        },
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="summary-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
            <div style={{ flex: '1', minHeight: '200px' }}>
                <Pie data={data} options={options} />
            </div>
            <div style={{ marginTop: '1rem', color: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Total Principal:</span>
                    <span style={{ fontWeight: 'bold', color: '#4d79ff' }}>{formatCurrency(totalPrincipal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Total Interest:</span>
                    <span style={{ fontWeight: 'bold', color: '#ff4d4d' }}>{formatCurrency(totalInterest)}</span>
                </div>
                <div style={{ borderTop: '1px solid #4b5563', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Total Cost:</span>
                    <span style={{ fontWeight: 'bold' }}>{formatCurrency(totalCost)}</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryPanel;
