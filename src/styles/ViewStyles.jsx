function getStyles() {
  const globalCss = `
    .rt-container { 
      display: flex; flex-direction: column; gap: 16px; padding: 16px; 
      background-color: #0a0a0a; height: 100%; box-sizing: border-box;
      position: relative; color: #ffffff;
    }
    
    /* --- MODERN DASHBOARD STYLES --- */
    .dashboard-container { padding: 16px 0; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; flex-grow: 1; min-height: 0; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
    .dashboard-header h3 { margin: 0; font-size: 1.5em; color: #ffffff; }
    .dashboard-filters { display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center; }
    .filter-group { display: flex; align-items: center; gap: 8px; }
    .filter-label { color: #888888; font-size: 0.9em; font-weight: 500; }
    .filter-controls { display: flex; gap: 8px; background-color: #1a1a1a; border-radius: 6px; padding: 4px; }
    .filter-controls button { background: none; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; color: #888888; font-weight: 500; transition: all 0.2s ease; }
    .filter-controls button:hover { color: #ffffff; background-color: #2a2a2a; }
    .filter-controls button.active { color: #ffffff; background-color: rgba(155, 135, 245, 0.8); }
    .base-currency-select { 
      background-color: #1a1a1a; border: 1px solid #2a2a2a; 
      border-radius: 6px; padding: 6px 10px; color: #ffffff; font-weight: 500;
    }
    .rates-status { font-size: 0.85em; color: #666666; font-style: italic; }
    .rates-status.error { color: #ef4444; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .stat-card { background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px; display: flex; align-items: center; gap: 16px; }
    .stat-card-icon { color: rgba(155, 135, 245, 0.8); background-color: rgba(155, 135, 245, 0.1); border-radius: 50%; padding: 10px; display: flex; align-items: center; justify-content: center; }
    .stat-card-title { font-size: 0.9em; color: #888888; margin-bottom: 4px; }
    .stat-card-value { font-size: 1.4em; font-weight: 600; color: #ffffff; }
    .charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .dashboard-card { background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px; min-height: 340px; display: flex; flex-direction: column; }
    .chart-container { width: 100%; height: 100%; flex-grow: 1; }
    .recent-transactions-card { background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; }
    .recent-transactions-card h4 { margin: 0 0 12px 0; color: #ffffff; }
    .recent-transactions-list { overflow-y: auto; max-height: 250px; }
    .transaction-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 8px; border-top: 1px solid #2a2a2a; }
    .transaction-item:first-child { border-top: none; }
    .transaction-info { display: flex; flex-direction: column; gap: 2px; }
    .transaction-merchant { font-weight: 500; color: #ffffff; }
    .transaction-date { font-size: 0.85em; color: #888888; }
    .transaction-amount { font-weight: 600; font-family: var(--font-monospace); color: #ffffff; }
    .dashboard-placeholder { display: flex; align-items: center; justify-content: center; height: 300px; width: 100%; color: #666666; font-style: italic; background-color: #1a1a1a; border: 2px dashed #2a2a2a; border-radius: 8px; text-align: center; padding: 20px; }
    .dashboard-placeholder-small { text-align: center; padding: 20px; color: #666666; }
    
    /* --- CORE COMPONENT STYLES --- */
    input, button, select { font-family: var(--font-sans); font-size: var(--font-ui-small); }
    input[type="text"], input[type="password"] { background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 6px; padding: 8px 12px; color: #ffffff; }
    button { background-color: #1a1a1a; border: 1px solid #2a2a2a; color: #ffffff; border-radius: 6px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; }
    button:hover { background-color: #2a2a2a; }
    button.primary { background-color: rgba(155, 135, 245, 0.8); border-color: rgba(155, 135, 245, 0.8); }
    button.primary:hover { background-color: rgba(155, 135, 245, 1); }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .rt-header { display: flex; align-items: center; gap: 16px; flex-shrink: 0; justify-content: space-between; width: 100%; padding-bottom: 16px; border-bottom: 1px solid #2a2a2a; }
    .header-left { display: flex; align-items: center; gap: 24px; flex-grow: 1; overflow: hidden; }
    .header-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .main-view-tabs { display: flex; align-items: center; background-color: #1a1a1a; border-radius: 6px; padding: 4px; }
    .main-view-tab { background: none; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; color: #888888; font-weight: 500; }
    .main-view-tab.active { color: #ffffff; background-color: rgba(155, 135, 245, 0.8); }
    .image-modal-overlay, .receipt-edit-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; z-index: 10000; }
    .image-modal-content { max-width: 90vw; max-height: 90vh; width: auto; height: auto; object-fit: contain; }
    .image-modal-close, .receipt-edit-modal-close { position: absolute; top: 20px; right: 35px; color: #fff; font-size: 40px; cursor: pointer; }
    .receipt-edit-modal-content { background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 20px; width: 90%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; gap: 15px; overflow: hidden; position: relative; cursor: default; }
    .receipt-edit-modal-content h3 { color: #ffffff; margin: 0 0 10px 0; }
    .modal-form-group { display: flex; flex-direction: column; gap: 8px; flex-grow: 1; min-height: 0; }
    .modal-form-group label { color: #888888; font-weight: 500; }
    .modal-json-textarea { flex-grow: 1; min-height: 150px; background-color: #0a0a0a; font-family: var(--font-monospace); resize: vertical; overflow-y: auto; white-space: pre-wrap; border-radius: 4px; padding: 10px; border: 1px solid #2a2a2a; color: #ffffff; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
    
    /* --- API CONFIG STYLES --- */
    .api-config-toggle { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 6px; padding: 8px 12px; cursor: pointer; color: #ffffff; font-weight: 500; display: flex; align-items: center; gap: 8px; }
    .api-config-toggle:hover { background-color: #2a2a2a; }
    .api-key-content-wrapper { position: absolute; width: 350px; background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); z-index: 1000; }
    .api-key-content { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
    .api-key-content p { margin: 0; color: #888888; font-size: 0.9em; }
    .api-key-list { display: flex; flex-direction: column; gap: 6px; max-height: 150px; overflow-y: auto; background-color: #0a0a0a; border-radius: 4px; padding: 8px; }
    .api-key-item { display: flex; justify-content: space-between; align-items: center; background-color: #1a1a1a; padding: 6px 10px; border-radius: 4px; }
    .api-key-masked { font-family: var(--font-monospace); font-size: 0.9em; color: #ffffff; }
    .delete-key-btn { background: none; border: none; color: #888888; font-weight: bold; font-size: 1.2em; cursor: pointer; padding: 0 8px; border-radius: 4px; line-height: 1; }
    .delete-key-btn:hover { background-color: #ef4444; color: #ffffff; }
    .empty-state-small { padding: 12px; text-align: center; color: #666666; font-style: italic; font-size: 0.9em; }
    .add-key-form { display: flex; gap: 8px; }
    .add-key-form input { flex-grow: 1; }
    .api-key-actions { display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #2a2a2a; padding-top: 12px; margin-top: 4px; }
    
    /* --- PROCESSOR VIEW STYLES & FOCUS MODE --- */
    .rt-controls { display: flex; gap: 16px; align-items: center; flex-shrink: 0; }
    .rt-controls label { color: #888888; }
    .rt-controls input { flex-grow: 1; }
    
    .processor-content-wrapper {
      flex-grow: 1;
      min-height: 0;
      display: grid;
      gap: 16px;
      grid-template-rows: 1fr auto;
      transition: grid-template-rows 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .main-grid { 
      display: grid; 
      gap: 16px; 
      overflow: hidden; 
      min-height: 0;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .panel { 
      display: flex; flex-direction: column; 
      background-color: #1a1a1a; 
      border: 1px solid #2a2a2a; 
      border-radius: 8px; 
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .panel-header { 
      padding: 10px 15px; background-color: #0a0a0a; 
      border-bottom: 1px solid #2a2a2a; 
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
      transition: background-color 0.3s ease;
    }
    .panel-header.is-clickable { cursor: pointer; }
    .panel-header.is-clickable:hover { background-color: #2a2a2a; }
    .panel-header h4, .panel-header h3 { margin: 0; flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #ffffff; }
    .panel-header-actions { display: flex; align-items: center; gap: 8px; }
    .panel-focus-button { margin-left: auto; }
    .file-list { overflow-y: auto; padding: 8px; flex-grow: 1; }
    .file-list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 5px; cursor: pointer; white-space: nowrap; color: #ffffff; }
    .file-list-item:hover { background-color: #2a2a2a; }
    .file-list-item.is-active { background-color: rgba(155, 135, 245, 0.8); color: #ffffff; }
    .file-name { text-overflow: ellipsis; overflow: hidden; }
    .file-status { display: flex; align-items: center; }
    .panel-content-grid { padding: 15px; display: flex; flex-direction: column; gap: 15px; overflow-y: auto; flex-grow: 1; min-height: 0; opacity: 1; transition: opacity 0.4s ease; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
    .card { padding: 15px; background-color: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 6px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(155, 135, 245, 0.2); }
    .card h5 { margin: 0 0 10px 0; color: #ffffff; }
    .preview-image { width: 100%; height: 250px; object-fit: contain; cursor: zoom-in; background-color: #0a0a0a; }
    .data-pre { white-space: pre-wrap; word-break: break-word; background-color: #0a0a0a; max-height: 250px; overflow-y: auto; padding: 10px; border-radius: 4px; color: #ffffff; border: 1px solid #2a2a2a; }
    .notice { padding: 12px; border-radius: 6px; margin-bottom: 10px; white-space: pre-wrap; word-wrap: break-word; line-height: 1.5; }
    .notice.is-error { background-color: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #ff6b6b; }
    .notice.is-info { background-color: rgba(155, 135, 245, 0.1); border: 1px solid rgba(155, 135, 245, 0.5); color: rgba(155, 135, 245, 1); }
    .table-container { flex-grow: 1; overflow-y: auto; opacity: 1; transition: opacity 0.4s ease; }
    .summary-table { width: 100%; border-collapse: collapse; }
    .summary-table th { padding: 12px 15px; text-align: left; border-top: 1px solid #2a2a2a; background-color: #0a0a0a; color: #888888; font-weight: 600; }
    .summary-table td { padding: 12px 15px; text-align: left; border-top: 1px solid #2a2a2a; color: #ffffff; transition: background-color 0.2s ease; }
    .summary-table tbody tr:hover td { background-color: #1a1a1a; }
    .table-actions { display: flex; gap: 8px; }
    .icon-button { background: none; border: none; padding: 5px; border-radius: 4px; cursor: pointer; color: #888888; }
    .icon-button:hover { background-color: #2a2a2a; color: #ffffff; }
    .empty-state { padding: 20px; text-align: center; color: #666666; }
    .empty-state-placeholder { text-align: center; color: #666666; padding: 40px 20px; }
    .empty-state-placeholder h4 { color: #888888; margin: 16px 0 8px 0; }
    .empty-state-placeholder p { color: #666666; margin: 0; }
    .tab-bar { display: flex; border-bottom: 1px solid #2a2a2a; margin-bottom: 10px; }
    .tab-bar button { background: none; border: none; padding: 10px 15px; cursor: pointer; color: #888888; border-bottom: 2px solid transparent; }
    .tab-bar button.active { border-bottom-color: rgba(155, 135, 245, 0.8); color: #ffffff; font-weight: 500; }
    .tab-content { color: #ffffff; }
  `;

  return {
    headerTitle: { margin: 0, alignSelf: 'center', whiteSpace: 'nowrap', color: '#ffffff' },
    flexRow: { display: 'flex', gap: '8px' },
    panelHeaderSpaceBetween: { justifyContent: 'space-between' },
    tableCellRight: { textAlign: 'right' },
    tableCellRightBold: { textAlign: 'right', fontWeight: '500', color: '#ffffff' },
    tableCellCenter: { textAlign: 'center', padding: '20px', color: '#666666' },
    iconGreen: { color: "#10b981" },
    iconRed: { color: "#ef4444" },
    globalCss: globalCss,
  };
}

return { getStyles };