// Dashboard JavaScript

// Check authentication on load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in and is an official using localStorage
    const userAuth = localStorage.getItem('userAuth');
    let userData = null;
    
    if (userAuth) {
        try {
            userData = JSON.parse(userAuth);
        } catch (e) {
            console.error('Invalid auth data');
        }
    }
    
    // Check if user is logged in and is an official
    if (!userData || !userData.isLoggedIn || userData.role !== 'official') {
        // Show alert and redirect
        alert('Access denied: Login as an official to continue.');
        window.location.href = 'index.html';
        return;
    }
    
    // Set username in navigation
    const userName = userData.userName || 'Official User';
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    // Initialize dashboard features
    initializeDashboard();
});

// Initialize dashboard functionality
function initializeDashboard() {
    // Add animation to stats cards
    animateStats();
    
    // Initialize tooltips
    initTooltips();
    
    // Setup export functionality
    setupExportButton();
    
    // Setup filter change handlers
    setupFilters();
    
    // Future API integration point
    console.log('Dashboard ready for API integration');
    
    // Log data attributes for future backend integration
    logAPIEndpoints();
}

// Animate stat values on load
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                stat.textContent = Math.floor(currentValue) + '%';
            } else {
                stat.textContent = Math.floor(currentValue).toLocaleString();
            }
        }, 20);
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = (rect.top - 30) + 'px';
            tooltip.style.left = rect.left + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltips = document.querySelectorAll('.tooltip');
            tooltips.forEach(t => t.remove());
        });
    });
}

// Setup export button functionality
function setupExportButton() {
    const exportBtn = document.querySelector('.btn-export');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Placeholder for export functionality
            const exportData = gatherExportData();
            console.log('Export data ready for API:', exportData);
            
            // Show notification
            showNotification('Export feature will be available once backend is connected');
        });
    }
}

// Gather data for export (placeholder)
function gatherExportData() {
    const data = {
        timestamp: new Date().toISOString(),
        drafts: [],
        statistics: {},
        keywords: []
    };
    
    // Collect draft data
    document.querySelectorAll('[data-draft-id]').forEach(row => {
        data.drafts.push({
            id: row.dataset.draftId,
            // Additional data would be collected here
        });
    });
    
    // Collect statistics
    document.querySelectorAll('[data-api]').forEach(stat => {
        data.statistics[stat.dataset.api] = stat.textContent;
    });
    
    // Collect keywords
    document.querySelectorAll('[data-keyword]').forEach(keyword => {
        data.keywords.push({
            word: keyword.dataset.keyword,
            count: keyword.dataset.count
        });
    });
    
    return data;
}

// Setup filter change handlers
function setupFilters() {
    const filters = document.querySelectorAll('[data-api-filter]');
    
    filters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            const filterType = e.target.dataset.apiFilter;
            const filterValue = e.target.value;
            
            console.log(`Filter changed: ${filterType} = ${filterValue}`);
            // This would trigger an API call in production
            showNotification(`Filter applied: ${filterType} = ${filterValue}`);
        });
    });
}

// View draft details
function viewDetails(draftId) {
    window.location.href = `draft-details.html?draft=${draftId}`;
}

// Generate AI Report (placeholder)
function generateAIReport() {
    const draftSelect = document.getElementById('ai-draft-select');
    const reportType = document.getElementById('ai-report-type');
    
    const requestData = {
        draftId: draftSelect.value,
        reportType: reportType.value,
        timestamp: new Date().toISOString()
    };
    
    console.log('AI Report Request:', requestData);
    
    // Show modal
    const modal = document.getElementById('ai-report-modal');
    modal.classList.add('active');
    
    // Simulate API call
    setTimeout(() => {
        console.log('AI report would be generated here via Google Gemini API');
    }, 1000);
}

// Close AI modal
function closeAIModal() {
    const modal = document.getElementById('ai-report-modal');
    modal.classList.remove('active');
}

// Logout function
function logout() {
    // Clear localStorage
    localStorage.removeItem('userAuth');
    
    // Clear any session storage as well
    sessionStorage.clear();
    
    // Redirect to homepage
    window.location.href = 'index.html';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6366F1;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Log API endpoints for documentation
function logAPIEndpoints() {
    console.group('API Endpoints Ready for Integration');
    console.log('Data Sources:', document.querySelectorAll('[data-api-source]'));
    console.log('API Actions:', document.querySelectorAll('[data-api-action]'));
    console.log('API Parameters:', document.querySelectorAll('[data-api-param]'));
    console.log('API Filters:', document.querySelectorAll('[data-api-filter]'));
    console.log('API Charts:', document.querySelectorAll('[data-api-chart]'));
    console.log('API Keywords:', document.querySelectorAll('[data-api-keywords]'));
    console.groupEnd();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
    
    .tooltip {
        background: #1a1a1a;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 9999;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.viewDetails = viewDetails;
window.generateAIReport = generateAIReport;
window.closeAIModal = closeAIModal;
window.logout = logout;