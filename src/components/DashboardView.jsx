const { useState, useMemo, useRef, useEffect } = dc;


// =================================================================================
// HELPER & ICONS
// =================================================================================

// A helper function to format currency using the browser's internationalization API
const formatCurrency = (amount, currencyCode) => {
    if (amount == null || !currencyCode) return 'N/A';
    try {
        return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(amount);
    } catch (e) {
        // Fallback for unrecognized currency codes
        return `${amount.toFixed(2)} ${currencyCode}`;
    }
};

const DollarSignIcon = () => <dc.Icon icon="dollar-sign" style={{ fontSize: '24px' }} />;
const ReceiptStatIcon = () => <dc.Icon icon="receipt" style={{ fontSize: '24px' }} />;
const HashIcon = () => <dc.Icon icon="hash" style={{ fontSize: '24px' }} />;

const StatCard = ({ title, value, icon }) => (
    <div className="stat-card">
        <div className="stat-card-icon">{icon}</div>
        <div className="stat-card-info">
            <div className="stat-card-title">{title}</div>
            <div className="stat-card-value">{value}</div>
        </div>
    </div>
);

const useD3 = () => {
    const [isD3Loaded, setIsD3Loaded] = useState(!!window.d3);
    useEffect(() => {
        if (isD3Loaded) return;
        const script = document.createElement("script");
        script.src = "https://d3js.org/d3.v7.min.js";
        script.async = true;
        script.onload = () => setIsD3Loaded(true);
        script.onerror = () => console.error("D3.js failed to load.");
        document.head.appendChild(script);
        return () => { if (document.head.contains(script)) document.head.removeChild(script); };
    }, [isD3Loaded]);
    return isD3Loaded;
};

const MonthlySpendingChart = ({ data, currency }) => {
    const chartRef = useRef(null);
    const isD3Loaded = useD3();
    useEffect(() => {
        if (!isD3Loaded || !data || !chartRef.current) return;
        const d3 = window.d3;
        const container = d3.select(chartRef.current);
        container.selectAll("*").remove();
        const { width } = chartRef.current.getBoundingClientRect();
        const height = 300, margin = { top: 40, right: 30, bottom: 40, left: 70 };
        const svg = container.append("svg").attr("viewBox", [0, 0, width, height]);
        const x = d3.scaleBand(data.map(d => d.month), [margin.left, width - margin.right]).padding(0.2);
        const y = d3.scaleLinear([0, d3.max(data, d => d.total)], [height - margin.bottom, margin.top]).nice();
        const currencyFormatter = (value) => { try { return new Intl.NumberFormat(undefined, { style: 'currency', currency, notation: 'compact' }).format(value); } catch { return d3.format("$,.0f")(value); }};
        svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickSizeOuter(0));
        svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickFormat(currencyFormatter));
        svg.selectAll(".domain, .tick line").style("stroke", "var(--background-modifier-border)");
        svg.selectAll("text").style("fill", "var(--text-muted)");
        const purpleGradient = svg.append("defs").append("linearGradient").attr("id", "purpleGradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
        purpleGradient.append("stop").attr("offset", "0%").style("stop-color", "rgba(155, 135, 245, 0.9)").style("stop-opacity", 1);
        purpleGradient.append("stop").attr("offset", "100%").style("stop-color", "rgba(236, 72, 153, 0.9)").style("stop-opacity", 1);
        svg.append("g").attr("fill", "url(#purpleGradient)").selectAll("rect").data(data).join("rect").attr("x", d => x(d.month)).attr("y", d => y(d.total)).attr("height", d => y(0) - y(d.total)).attr("width", x.bandwidth()).attr("rx", 4);
        svg.append("text").attr("x", width / 2).attr("y", margin.top / 2).attr("text-anchor", "middle").style("font-size", "14px").style("fill", "var(--text-normal)").text("Spending Over Time");
    }, [isD3Loaded, data, currency]);
    return <div ref={chartRef} className="chart-container"></div>;
};

const SpendingByMerchantChart = ({ data, currency }) => {
    const chartRef = useRef(null);
    const isD3Loaded = useD3();
    useEffect(() => {
        if (!isD3Loaded || !data || !chartRef.current) return;
        const d3 = window.d3;
        const container = d3.select(chartRef.current);
        container.selectAll("*").remove();
        const { width } = chartRef.current.getBoundingClientRect();
        const height = 300, radius = Math.min(width, height) / 2.5;
        const svg = container.append("svg").attr("viewBox", [-width / 2, -height / 2, width, height]);
        const customColors = ["rgba(155, 135, 245, 0.9)", "rgba(236, 72, 153, 0.9)", "rgba(255, 255, 255, 0.9)", "rgba(167, 139, 250, 0.8)", "rgba(244, 114, 182, 0.8)", "rgba(219, 39, 119, 0.8)", "rgba(139, 92, 246, 0.8)", "rgba(232, 121, 249, 0.8)", "rgba(192, 132, 252, 0.8)", "rgba(251, 207, 232, 0.8)"];
        const color = d3.scaleOrdinal(customColors);
        const pie = d3.pie().sort(null).value(d => d.total);
        const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);
        const arcs = pie(data);
        svg.append("g").attr("stroke", "var(--background-secondary)").attr("stroke-width", 2).selectAll("path").data(arcs).join("path").attr("fill", d => color(d.data.merchant)).attr("d", arc).append("title").text(d => `${d.data.merchant}: ${formatCurrency(d.data.total, currency)}`);
        svg.append("text").attr("text-anchor", "middle").style("font-size", "14px").style("fill", "var(--text-normal)").attr("y", -height/2 + 20).text("Top Spending by Merchant");
    }, [isD3Loaded, data, currency]);
    return <div ref={chartRef} className="chart-container"></div>;
};

const RecentTransactions = ({ receipts }) => (
    <div className="recent-transactions-card">
        <h4>Recent Transactions (All Currencies)</h4>
        <div className="recent-transactions-list">
            {receipts.length > 0 ? (
                receipts.map(r => (
                    <div key={r.path} className="transaction-item">
                        <div className="transaction-info">
                            <span className="transaction-merchant">{r.json.merchant_name || 'Unknown'}</span>
                            <span className="transaction-date">{r.json.transaction_date || 'N/A'}</span>
                        </div>
                        <div className="transaction-amount">{formatCurrency(r.json.total_amount, r.json.currency)}</div>
                    </div>
                ))
            ) : <p className="dashboard-placeholder-small">No transactions found.</p>}
        </div>
    </div>
);


const DashboardView = ({ dashboardData }) => {
    const [dateFilter, setDateFilter] = useState('this_year');
    const [selectedCurrency, setSelectedCurrency] = useState('ALL');
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState(null);
    const [ratesStatus, setRatesStatus] = useState('idle');

    useEffect(() => {
        const fetchRates = async () => {
            if (selectedCurrency !== 'ALL') return;
            setRatesStatus('loading');
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setExchangeRates({ ...data.rates, [baseCurrency]: 1 }); // Add base currency to rates
                setRatesStatus('success');
            } catch (error) {
                console.error("Failed to fetch exchange rates:", error);
                setRatesStatus('error');
                setExchangeRates(null);
            }
        };
        fetchRates();
    }, [baseCurrency, selectedCurrency]);

    const dateFilteredReceipts = useMemo(() => {
        const now = new Date();
        let startDate;
        if (dateFilter === 'this_month') startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        else if (dateFilter === 'last_30_days') { startDate = new Date(); startDate.setDate(now.getDate() - 30); }
        else if (dateFilter === 'this_year') startDate = new Date(now.getFullYear(), 0, 1);
        else startDate = new Date(0); // 'all_time'
        
        return dashboardData
            .filter(d => d.json && d.json.total_amount != null && d.json.total_amount !== "N/A" && d.json.currency)
            .filter(d => { 
                if (!d.json.transaction_date || d.json.transaction_date === "N/A") return true; // Include missing dates
                try { return new Date(d.json.transaction_date + "T00:00:00") >= startDate; } catch { return true; } 
            })
            .sort((a, b) => {
                const dateA = a.json.transaction_date && a.json.transaction_date !== "N/A" ? new Date(a.json.transaction_date) : new Date(0);
                const dateB = b.json.transaction_date && b.json.transaction_date !== "N/A" ? new Date(b.json.transaction_date) : new Date(0);
                return dateB - dateA;
            });
    }, [dashboardData, dateFilter]);
    
    const detectedCurrencies = useMemo(() => {
        const allCurrencies = new Set(dateFilteredReceipts.map(r => r.json.currency));
        return Array.from(allCurrencies).sort();
    }, [dateFilteredReceipts]);

    const dashboardStats = useMemo(() => {
        let receiptsToProcess;
        let currencyForDisplay = selectedCurrency;

        if (selectedCurrency === 'ALL') {
            if (ratesStatus !== 'success' || !exchangeRates) {
                 return { totalSpend: 0, receiptCount: 0, avgSpend: 0, topMerchants: [], monthlyData: [], currencyForDisplay: baseCurrency };
            }
            // Convert all amounts to the base currency
            receiptsToProcess = dateFilteredReceipts
                .map(r => {
                    const rate = exchangeRates[r.json.currency];
                    // Only include if we have a conversion rate
                    if (rate) {
                        return { ...r, convertedAmount: r.json.total_amount / rate };
                    }
                    return null;
                })
                .filter(Boolean); // Remove nulls
            currencyForDisplay = baseCurrency;

        } else {
            // Filter by a single currency
            receiptsToProcess = dateFilteredReceipts
                .filter(r => r.json.currency === selectedCurrency)
                .map(r => ({ ...r, convertedAmount: r.json.total_amount })); // Use original amount
        }

        const totalSpend = receiptsToProcess.reduce((sum, r) => sum + (r.convertedAmount || 0), 0);
        const receiptCount = receiptsToProcess.length;
        const avgSpend = receiptCount > 0 ? totalSpend / receiptCount : 0;
        
        const merchantSpending = receiptsToProcess.reduce((acc, r) => { 
            const merchant = r.json.merchant_name || 'Unknown'; 
            acc[merchant] = (acc[merchant] || 0) + (r.convertedAmount || 0); 
            return acc; 
        }, {});
        
        const topMerchants = Object.entries(merchantSpending).map(([merchant, total]) => ({merchant, total})).sort((a,b) => b.total - a.total).slice(0, 10);
        
        const monthlySpending = receiptsToProcess.reduce((acc, r) => { 
            try { 
                const monthKey = r.json.transaction_date.substring(0, 7); 
                acc[monthKey] = (acc[monthKey] || 0) + (r.convertedAmount || 0); 
            } catch {} return acc; 
        }, {});

        const monthlyData = Object.entries(monthlySpending).map(([month, total]) => ({month, total})).sort((a,b) => a.month.localeCompare(b.month));

        return { totalSpend, receiptCount, avgSpend, topMerchants, monthlyData, currencyForDisplay };
    }, [dateFilteredReceipts, selectedCurrency, exchangeRates, ratesStatus, baseCurrency]);

    const allTimeRecentReceipts = useMemo(() => {
        return dashboardData
            .filter(d => d.json?.transaction_date)
            .sort((a, b) => new Date(b.json.transaction_date) - new Date(a.json.transaction_date))
            .slice(0, 15);
    }, [dashboardData]);

    const statCards = [
        { title: "Total Spending", value: formatCurrency(dashboardStats.totalSpend, dashboardStats.currencyForDisplay), icon: <DollarSignIcon /> },
        { title: `Receipts Processed`, value: dashboardStats.receiptCount, icon: <ReceiptStatIcon /> },
        { title: "Average per Receipt", value: formatCurrency(dashboardStats.avgSpend, dashboardStats.currencyForDisplay), icon: <HashIcon /> },
    ];
    
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h3>Financial Overview</h3>
                <div className="dashboard-filters">
                    <div className="filter-group">
                        <span className="filter-label">Period:</span>
                        <div className="filter-controls">
                            <button onClick={() => setDateFilter('this_month')} className={dateFilter === 'this_month' ? 'active' : ''}>This Month</button>
                            <button onClick={() => setDateFilter('last_30_days')} className={dateFilter === 'last_30_days' ? 'active' : ''}>Last 30 Days</button>
                            <button onClick={() => setDateFilter('this_year')} className={dateFilter === 'this_year' ? 'active' : ''}>This Year</button>
                            <button onClick={() => setDateFilter('all_time')} className={dateFilter === 'all_time' ? 'active' : ''}>All Time</button>
                        </div>
                    </div>
                    {detectedCurrencies.length > 0 && (
                        <div className="filter-group">
                             <span className="filter-label">Currency:</span>
                            <div className="filter-controls">
                                 <button onClick={() => setSelectedCurrency('ALL')} className={selectedCurrency === 'ALL' ? 'active' : ''}>All</button>
                                {detectedCurrencies.map(currency => ( <button key={currency} onClick={() => setSelectedCurrency(currency)} className={selectedCurrency === currency ? 'active' : ''}> {currency} </button> ))}
                            </div>
                        </div>
                    )}
                    {selectedCurrency === 'ALL' && detectedCurrencies.length > 0 && (
                        <div className="filter-group">
                            <span className="filter-label">Convert to:</span>
                             <select className="base-currency-select" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                                {detectedCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {ratesStatus === 'loading' && <span className="rates-status">Loading rates...</span>}
                            {ratesStatus === 'error' && <span className="rates-status error">Failed to load rates.</span>}
                        </div>
                    )}
                </div>
            </div>
            {dashboardData.length === 0 ? <div className="dashboard-placeholder">No processed receipts found.</div> : 
             dashboardStats.receiptCount === 0 ? <div className="dashboard-placeholder">No data for the selected filters.</div> :
            (<>
                <div className="stats-grid">{statCards.map(s => <StatCard key={s.title} {...s} />)}</div>
                <div className="charts-grid">
                    <div className="dashboard-card"><MonthlySpendingChart data={dashboardStats.monthlyData} currency={dashboardStats.currencyForDisplay} /></div>
                    <div className="dashboard-card"><SpendingByMerchantChart data={dashboardStats.topMerchants} currency={dashboardStats.currencyForDisplay} /></div>
                </div>
                <RecentTransactions receipts={allTimeRecentReceipts} />
            </>)}
        </div>
    );
};

return { DashboardView }