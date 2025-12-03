import React, { useState, useEffect, useCallback } from 'react';
import ChartSection from './ChartSection';
import SummaryPanel from './SummaryPanel';

// Debounce helper
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const MortgageCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(5.0);
    const [amortization, setAmortization] = useState(25);
    const [chartData, setChartData] = useState([]);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPrincipal, setTotalPrincipal] = useState(0);

    const debouncedLoanAmount = useDebounce(loanAmount, 500);
    const debouncedInterestRate = useDebounce(interestRate, 500);
    const debouncedAmortization = useDebounce(amortization, 500);

    const calculateMortgage = useCallback(() => {
        const principal = parseFloat(debouncedLoanAmount);
        const rate = parseFloat(debouncedInterestRate) / 100 / 12;
        const years = parseInt(debouncedAmortization);
        const numberOfPayments = years * 12;

        if (principal <= 0 || rate <= 0 || years <= 0) {
            setChartData([]);
            return;
        }

        // Monthly Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        const monthlyPayment = (principal * rate * Math.pow(1 + rate, numberOfPayments)) / (Math.pow(1 + rate, numberOfPayments) - 1);

        let balance = principal;
        const yearlyData = [];
        let currentYearInterest = 0;
        let currentYearPrincipal = 0;

        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = balance * rate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;
            currentYearInterest += interestPayment;
            currentYearPrincipal += principalPayment;

            if (i % 12 === 0) {
                yearlyData.push({
                    year: i / 12,
                    interest: currentYearInterest / 12,
                    principal: currentYearPrincipal / 12
                });
                currentYearInterest = 0;
                currentYearPrincipal = 0;
            }
        }

        setChartData(yearlyData);
        setTotalInterest(yearlyData.reduce((acc, curr) => acc + (curr.interest * 12), 0));
        setTotalPrincipal(yearlyData.reduce((acc, curr) => acc + (curr.principal * 12), 0));
    }, [debouncedLoanAmount, debouncedInterestRate, debouncedAmortization]);

    useEffect(() => {
        calculateMortgage();
    }, [calculateMortgage]);

    return (
        <div className="layout-container">
            {/* Left Panel: Vertical Slider for Loan Amount */}
            <div className="left-panel">
                <div className="vertical-slider-container">
                    <span className="value-display">${(loanAmount / 1000).toFixed(0)}k</span>
                    <input
                        type="range"
                        orient="vertical"
                        min="0"
                        max="1000000"
                        step="10000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        aria-label="Loan Amount"
                    />
                    <span className="slider-label">Loan Amount</span>
                </div>
            </div>

            {/* Center Panel */}
            <div className="center-panel">
                {/* Top: Interest Rate Input */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    <label htmlFor="interest-rate" className="slider-label" style={{ fontSize: '1.2rem' }}>Interest Rate (%):</label>
                    <input
                        id="interest-rate"
                        type="number"
                        min="0.1"
                        max="20"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        style={{ width: '100px', textAlign: 'center' }}
                    />
                </div>

                {/* Middle: Chart */}
                <div className="chart-container">
                    <ChartSection data={chartData} />
                </div>

                {/* Bottom: Horizontal Slider for Amortization */}
                <div style={{ padding: '0 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span className="slider-label">Amortization Period</span>
                        <span className="value-display">{amortization} Years</span>
                    </div>
                    <input
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={amortization}
                        onChange={(e) => setAmortization(Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            {/* Right Panel: Summary */}
            <div className="right-panel" style={{ width: '300px', marginLeft: '1rem' }}>
                <SummaryPanel totalInterest={totalInterest} totalPrincipal={totalPrincipal} />
            </div>
        </div>

    );
};

export default MortgageCalculator;
