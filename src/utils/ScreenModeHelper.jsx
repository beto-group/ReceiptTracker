const { useState, useEffect, useRef, useCallback } = dc;


// =================================================================================
// SCREEN MODE HELPER (Unchanged)
// =================================================================================
const ScreenModeHelper = ({ helperRef, containerRef }) => {
  const [activeMode, setActiveMode] = useState("default");
  const originalParentRefForFullTab = useRef(null);
  const originalParentPositionRefForFullTab = useRef(null);
  const originalPositionPlaceholderRef = useRef(null);

  const findNearestAncestorWithClass = (element, className) => {
    if (!element) return null;
    let current = element.parentNode;
    while (current) {
      if (current.classList && current.classList.contains(className)) return current;
      current = current.parentNode;
    }
    return null;
  };

  const findDirectChildByClass = (parent, className) => {
    if (!parent) return null;
    for (const child of parent.children) {
      if (child.classList && child.classList.contains(className)) return child;
    }
    return null;
  };

  const applyFullTabStyle = (container) => {
    if (!container) return;
    const targetPaneContent = findNearestAncestorWithClass(container, 'workspace-leaf-content');
    if (!targetPaneContent) return;
    const currentParent = container.parentNode;
    if (!currentParent) return;
    const contentWrapper = findDirectChildByClass(targetPaneContent, 'view-content') || targetPaneContent;
    originalParentRefForFullTab.current = currentParent;
    const placeholder = document.createElement('div');
    placeholder.className = 'screen-mode-placeholder';
    placeholder.style.display = 'none';
    currentParent.insertBefore(placeholder, container.nextSibling || null);
    originalPositionPlaceholderRef.current = placeholder;
    currentParent.removeChild(container);
    contentWrapper.appendChild(container);
    const computedParentPosition = window.getComputedStyle(contentWrapper).position;
    originalParentPositionRefForFullTab.current = { element: contentWrapper, originalInlinePosition: contentWrapper.style.position };
    if (computedParentPosition === 'static') {
      contentWrapper.style.position = "relative";
    }
    Object.assign(container.style, { position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", margin: "0", border: "none", borderRadius: "0", zIndex: 100 });
    
    // Inject Chrome Suppression (Status bar, footers)
    if (!document.getElementById('rt-chrome-suppression')) {
        const style = document.createElement('style');
        style.id = 'rt-chrome-suppression';
        style.innerHTML = '.status-bar, .view-footer, .workspace-leaf-content-footer { display: none !important; }';
        document.head.appendChild(style);
    }
  };

  const revertFullTabStyle = useCallback(() => {
    const container = containerRef.current;
    if (!container || !originalParentRefForFullTab.current || !originalPositionPlaceholderRef.current) return;
    const originalParent = originalParentRefForFullTab.current;
    const placeholder = originalPositionPlaceholderRef.current;
    if (container.parentNode) container.parentNode.removeChild(container);
    originalParent.insertBefore(container, placeholder);
    originalParent.removeChild(placeholder);
    if (originalParentPositionRefForFullTab.current?.element) {
      originalParentPositionRefForFullTab.current.element.style.position = originalParentPositionRefForFullTab.current.originalInlinePosition;
    }
    Object.assign(container.style, { position: '', top: '', left: '', width: '', height: '', zIndex: '', margin: '', border: '', borderRadius: '' });
    originalParentRefForFullTab.current = null;
    originalPositionPlaceholderRef.current = null;
    originalParentPositionRefForFullTab.current = null;
    
    // Remove Chrome Suppression
    const style = document.getElementById('rt-chrome-suppression');
    if (style) style.remove();
  }, [containerRef]);

  const toggleMode = useCallback((requestedMode) => {
    const container = containerRef.current;
    if (!container || activeMode === requestedMode) return;
    if (activeMode === 'fullTab') revertFullTabStyle();
    if (requestedMode === 'fullTab') applyFullTabStyle(container);
    setActiveMode(requestedMode);
  }, [activeMode, containerRef, revertFullTabStyle]);

  const cycleMode = useCallback(() => {
    toggleMode(activeMode === 'fullTab' ? 'default' : 'fullTab');
  }, [activeMode, toggleMode]);

  useEffect(() => {
    if (helperRef) helperRef.current = { toggleMode, cycleMode };
  }, [helperRef, toggleMode, cycleMode]);

  // Cleanup Chrome Suppression on unmount
  useEffect(() => {
    return () => {
      const style = document.getElementById('rt-chrome-suppression');
      if (style) style.remove();
    };
  }, []);

  return null;
};

return { ScreenModeHelper}