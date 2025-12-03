import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartSection = ({ data }) => {
    const options = {
        indexAxis: 'x', // Vertical bar chart
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff'
                }
            },
            title: {
                display: true,
                text: 'Monthly Payments (Interest + Principal)',
                color: '#ffffff'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                stacked: true,
                ticks: {
                    color: '#a1a1aa',
                    callback: function (value) {
                        return '$' + value / 1000 + 'k';
                    }
                },
                grid: {
                    color: '#444'
                },
                title: {
                    display: true,
                    text: 'Monthly Payment ($)',
                    color: '#a1a1aa'
                }
            },
            x: {
                stacked: true,
                ticks: {
                    color: '#a1a1aa'
                },
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Year',
                    color: '#a1a1aa'
                }
            }
        }
    };

    const chartData = {
        labels: data.map(d => `Year ${d.year}`),
        datasets: [
            {
                label: 'Interest',
                data: data.map(d => d.interest),
                borderColor: '#ff4d4d',
                backgroundColor: 'rgba(255, 77, 77, 0.8)', // Red
            },
            {
                label: 'Fund (Principal)',
                data: data.map(d => d.principal),
                borderColor: '#4d79ff',
                backgroundColor: 'rgba(77, 121, 255, 0.8)', // Blue
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};

export default ChartSection;
