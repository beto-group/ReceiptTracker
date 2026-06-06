function getStyles() {
  const globalCss = `
    .rt-container { 
      display: flex; flex-direction: column; gap: 16px; padding: 16px; 
      background-color: var(--background-primary); height: 100%; box-sizing: border-box;
      position: relative; color: var(--text-normal);
    }
    
    /* --- MODERN DASHBOARD STYLES --- */
    .dashboard-container { padding: 16px 0; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; flex-grow: 1; min-height: 0; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
    .dashboard-header h3 { margin: 0; font-size: 1.5em; color: var(--text-normal); }
    .dashboard-filters { display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center; }
    .filter-group { display: flex; align-items: center; gap: 8px; }
    .filter-label { color: var(--text-muted); font-size: 0.9em; font-weight: 500; }
    .filter-controls { display: flex; gap: 8px; background-color: var(--background-secondary); border-radius: 6px; padding: 4px; }
    .filter-controls .rt-container button { background: none; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; color: var(--text-muted); font-weight: 500; transition: all 0.2s ease; }
    .filter-controls .rt-container button:hover { color: var(--text-normal); background-color: var(--background-modifier-border); }
    .filter-controls button.active { color: var(--text-normal); background-color: var(--interactive-accent); }
    .base-currency-select { 
      background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); 
      border-radius: 6px; padding: 6px 10px; color: var(--text-normal); font-weight: 500;
    }
    .rates-status { font-size: 0.85em; color: var(--text-faint); font-style: italic; }
    .rates-status.error { color: #ef4444; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .stat-card { background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 16px; display: flex; align-items: center; gap: 16px; }
    .stat-card-icon { color: var(--interactive-accent); background-color: var(--background-modifier-hover); border-radius: 50%; padding: 10px; display: flex; align-items: center; justify-content: center; }
    .stat-card-title { font-size: 0.9em; color: var(--text-muted); margin-bottom: 4px; }
    .stat-card-value { font-size: 1.4em; font-weight: 600; color: var(--text-normal); }
    .charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .dashboard-card { background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 16px; min-height: 340px; display: flex; flex-direction: column; }
    .chart-container { width: 100%; height: 100%; flex-grow: 1; }
    .recent-transactions-card { background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 16px; display: flex; flex-direction: column; }
    .recent-transactions-card h4 { margin: 0 0 12px 0; color: var(--text-normal); }
    .recent-transactions-list { overflow-y: auto; max-height: 250px; }
    .transaction-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 8px; border-top: 1px solid var(--background-modifier-border); }
    .transaction-item:first-child { border-top: none; }
    .transaction-info { display: flex; flex-direction: column; gap: 2px; }
    .transaction-merchant { font-weight: 500; color: var(--text-normal); }
    .transaction-date { font-size: 0.85em; color: var(--text-muted); }
    .transaction-amount { font-weight: 600; font-family: var(--font-monospace); color: var(--text-normal); }
    .dashboard-placeholder { display: flex; align-items: center; justify-content: center; height: 300px; width: 100%; color: var(--text-faint); font-style: italic; background-color: var(--background-secondary); border: 2px dashed var(--background-modifier-border); border-radius: 8px; text-align: center; padding: 20px; }
    .dashboard-placeholder-small { text-align: center; padding: 20px; color: var(--text-faint); }
    
    /* --- CORE COMPONENT STYLES --- */
    .rt-container input, .rt-container button, .rt-container select { font-family: var(--font-sans); font-size: var(--font-ui-small); }
    .rt-container input[type="text"], .rt-container input[type="password"] { background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 6px; padding: 8px 12px; color: var(--text-normal); }
    .rt-container button { background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); color: var(--text-normal); border-radius: 6px; padding: 8px 14px; cursor: pointer; transition: all 0.2s ease; }
    .rt-container button:hover { background-color: var(--background-modifier-border); }
    .rt-container button.primary { background-color: var(--interactive-accent); border-color: var(--interactive-accent); }
    .rt-container button.primary:hover { background-color: var(--interactive-accent-hover); }
    .rt-container button:disabled { opacity: 0.5; cursor: not-allowed; }
    .rt-header { display: flex; align-items: center; gap: 16px; flex-shrink: 0; justify-content: space-between; width: 100%; padding-bottom: 16px; border-bottom: 1px solid var(--background-modifier-border); }
    .header-left { display: flex; align-items: center; gap: 24px; flex-grow: 1; overflow: hidden; }
    .header-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .main-view-tabs { display: flex; align-items: center; background-color: var(--background-secondary); border-radius: 6px; padding: 4px; }
    .main-view-tab { background: none; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; color: var(--text-muted); font-weight: 500; }
    .main-view-tab.active { color: var(--text-normal); background-color: var(--interactive-accent); }
    .image-modal-overlay, .receipt-edit-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; z-index: 10000; }
    .image-modal-content { max-width: 90vw; max-height: 90vh; width: auto; height: auto; object-fit: contain; }
    .image-modal-close, .receipt-edit-modal-close { position: absolute; top: 20px; right: 35px; color: var(--text-normal); font-size: 40px; cursor: pointer; }
    .receipt-edit-modal-content { background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 20px; width: 90%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; gap: 15px; overflow: hidden; position: relative; cursor: default; }
    .receipt-edit-modal-content h3 { color: var(--text-normal); margin: 0 0 10px 0; }
    .modal-form-group { display: flex; flex-direction: column; gap: 8px; flex-grow: 1; min-height: 0; }
    .modal-form-group label { color: var(--text-muted); font-weight: 500; }
    .modal-json-textarea { flex-grow: 1; min-height: 150px; background-color: var(--background-primary); font-family: var(--font-monospace); resize: vertical; overflow-y: auto; white-space: pre-wrap; border-radius: 4px; padding: 10px; border: 1px solid var(--background-modifier-border); color: var(--text-normal); }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
    
    /* --- API CONFIG STYLES --- */
    .api-config-toggle { background: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 6px; padding: 8px 12px; cursor: pointer; color: var(--text-normal); font-weight: 500; display: flex; align-items: center; gap: 8px; }
    .api-config-toggle:hover { background-color: var(--background-modifier-border); }
    .api-key-content-wrapper { position: absolute; width: 350px; background-color: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); z-index: 1000; }
    .api-key-content { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
    .api-key-content p { margin: 0; color: var(--text-muted); font-size: 0.9em; }
    .api-key-list { display: flex; flex-direction: column; gap: 6px; max-height: 150px; overflow-y: auto; background-color: var(--background-primary); border-radius: 4px; padding: 8px; }
    .api-key-item { display: flex; justify-content: space-between; align-items: center; background-color: var(--background-secondary); padding: 6px 10px; border-radius: 4px; }
    .api-key-masked { font-family: var(--font-monospace); font-size: 0.9em; color: var(--text-normal); }
    .delete-key-btn { background: none; border: none; color: var(--text-muted); font-weight: bold; font-size: 1.2em; cursor: pointer; padding: 0 8px; border-radius: 4px; line-height: 1; }
    .delete-key-btn:hover { background-color: #ef4444; color: var(--text-normal); }
    .empty-state-small { padding: 12px; text-align: center; color: var(--text-faint); font-style: italic; font-size: 0.9em; }
    .add-key-form { display: flex; gap: 8px; }
    .add-key-form input { flex-grow: 1; }
    .api-key-actions { display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid var(--background-modifier-border); padding-top: 12px; margin-top: 4px; }
    
    /* --- PROCESSOR VIEW STYLES & FOCUS MODE --- */
    .rt-controls { display: flex; gap: 16px; align-items: center; flex-shrink: 0; }
    .rt-controls label { color: var(--text-muted); }
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
      background-color: var(--background-secondary); 
      border: 1px solid var(--background-modifier-border); 
      border-radius: 8px; 
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .panel-header { 
      padding: 10px 15px; background-color: var(--background-primary); 
      border-bottom: 1px solid var(--background-modifier-border); 
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
      transition: background-color 0.3s ease;
    }
    .panel-header.is-clickable { cursor: pointer; }
    .panel-header.is-clickable:hover { background-color: var(--background-modifier-border); }
    .panel-header h4, .panel-header h3 { margin: 0; flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-normal); }
    .panel-header-actions { display: flex; align-items: center; gap: 8px; }
    .panel-focus-button { margin-left: auto; }
    .file-list { overflow-y: auto; padding: 8px; flex-grow: 1; }
    .file-list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 5px; cursor: pointer; white-space: nowrap; color: var(--text-normal); }
    .file-list-item:hover { background-color: var(--background-modifier-border); }
    .file-list-item.is-active { background-color: var(--interactive-accent); color: var(--text-normal); }
    .file-name { text-overflow: ellipsis; overflow: hidden; }
    .file-status { display: flex; align-items: center; }
    .panel-content-grid { padding: 15px; display: flex; flex-direction: column; gap: 15px; overflow-y: auto; flex-grow: 1; min-height: 0; opacity: 1; transition: opacity 0.4s ease; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
    .card { padding: 15px; background-color: var(--background-primary); border: 1px solid var(--background-modifier-border); border-radius: 6px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(155, 135, 245, 0.2); }
    .card h5 { margin: 0 0 10px 0; color: var(--text-normal); }
    .preview-image { width: 100%; height: 250px; object-fit: contain; cursor: zoom-in; background-color: var(--background-primary); }
    .data-pre { white-space: pre-wrap; word-break: break-word; background-color: var(--background-primary); max-height: 250px; overflow-y: auto; padding: 10px; border-radius: 4px; color: var(--text-normal); border: 1px solid var(--background-modifier-border); }
    .notice { padding: 12px; border-radius: 6px; margin-bottom: 10px; white-space: pre-wrap; word-wrap: break-word; line-height: 1.5; }
    .notice.is-error { background-color: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #ff6b6b; }
    .notice.is-info { background-color: var(--background-modifier-hover); border: 1px solid var(--interactive-accent); color: var(--interactive-accent-hover); }
    .table-container { flex-grow: 1; overflow-y: auto; opacity: 1; transition: opacity 0.4s ease; }
    .summary-table { width: 100%; border-collapse: collapse; }
    .summary-table th { padding: 12px 15px; text-align: left; border-top: 1px solid var(--background-modifier-border); background-color: var(--background-primary); color: var(--text-muted); font-weight: 600; }
    .summary-table td { padding: 12px 15px; text-align: left; border-top: 1px solid var(--background-modifier-border); color: var(--text-normal); transition: background-color 0.2s ease; }
    .summary-table tbody tr:hover td { background-color: var(--background-secondary); }
    .table-actions { display: flex; gap: 8px; }
    .rt-icon-button { background: none; border: none; padding: 5px; border-radius: 4px; cursor: pointer; color: var(--text-muted); }
    .rt-icon-button:hover { background-color: var(--background-modifier-border); color: var(--text-normal); }
    .empty-state { padding: 20px; text-align: center; color: var(--text-faint); }
    .empty-state-placeholder { text-align: center; color: var(--text-faint); padding: 40px 20px; }
    .empty-state-placeholder h4 { color: var(--text-muted); margin: 16px 0 8px 0; }
    .empty-state-placeholder p { color: var(--text-faint); margin: 0; }
    .tab-bar { display: flex; border-bottom: 1px solid var(--background-modifier-border); margin-bottom: 10px; }
    .tab-bar button { background: none; border: none; padding: 10px 15px; cursor: pointer; color: var(--text-muted); border-bottom: 2px solid transparent; }
    .tab-bar button.active { border-bottom-color: var(--interactive-accent); color: var(--text-normal); font-weight: 500; }
    .tab-content { color: var(--text-normal); }
  `;

  return {
    headerTitle: { margin: 0, alignSelf: 'center', whiteSpace: 'nowrap', color: 'var(--text-normal)' },
    flexRow: { display: 'flex', gap: '8px' },
    panelHeaderSpaceBetween: { justifyContent: 'space-between' },
    tableCellRight: { textAlign: 'right' },
    tableCellRightBold: { textAlign: 'right', fontWeight: '500', color: 'var(--text-normal)' },
    tableCellCenter: { textAlign: 'center', padding: '20px', color: 'var(--text-faint)' },
    iconGreen: { color: "#10b981" },
    iconRed: { color: "#ef4444" },
    globalCss: globalCss,
  };
}

return { getStyles };