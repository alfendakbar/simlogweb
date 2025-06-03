// SIMLOG Dashboard Management
class SimlogDashboard {
    constructor() {
        this.isAdmin = document.querySelector('.sidebar h5 .fa-user-shield') !== null;
        this.refreshInterval = null;
        this.notificationTimeout = null;
        
        this.init();
    }
    
    init() {
        this.setupSidebarToggle();
        this.setupDataRefresh();
        this.setupNotifications();
        this.setupTableEnhancements();
        this.setupFormValidation();
        this.setupModalHandlers();
        this.loadDashboardData();
        
        console.log(`SIMLOG Dashboard initialized - ${this.isAdmin ? 'Admin' : 'User'} mode`);
    }
    
    setupSidebarToggle() {
        // Create mobile sidebar toggle if it doesn't exist
        if (window.innerWidth <= 768 && !document.querySelector('.sidebar-toggle')) {
            this.createMobileSidebarToggle();
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.createMobileSidebarToggle();
            } else {
                this.removeMobileSidebarToggle();
            }
        });
    }
    
    createMobileSidebarToggle() {
        if (document.querySelector('.sidebar-toggle')) return;
        
        const toggle = document.createElement('button');
        toggle.className = 'btn btn-primary sidebar-toggle d-md-none';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        toggle.style.cssText = 'position: fixed; top: 80px; left: 15px; z-index: 1050;';
        
        toggle.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
                sidebar.style.position = 'fixed';
                sidebar.style.top = '70px';
                sidebar.style.left = '0';
                sidebar.style.zIndex = '1040';
                sidebar.style.width = '250px';
            }
        });
        
        document.body.appendChild(toggle);
    }
    
    removeMobileSidebarToggle() {
        const toggle = document.querySelector('.sidebar-toggle');
        if (toggle) {
            toggle.remove();
        }
        
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.cssText = '';
        }
    }
    
    setupDataRefresh() {
        // Auto-refresh data every 30 seconds for admin dashboard
        if (this.isAdmin) {
            this.refreshInterval = setInterval(() => {
                this.refreshDashboardStats();
            }, 30000);
        }
        
        // Manual refresh button
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'btn btn-outline-secondary btn-sm';
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
        refreshBtn.title = 'Refresh Data';
        refreshBtn.addEventListener('click', () => {
            this.refreshDashboardStats();
        });
        
        const headerActions = document.querySelector('.d-flex.justify-content-between');
        if (headerActions) {
            headerActions.querySelector('div:last-child').appendChild(refreshBtn);
        }
    }
    
    refreshDashboardStats() {
        // Show loading indicator
        const spinner = document.createElement('div');
        spinner.className = 'position-fixed top-0 end-0 p-3';
        spinner.style.zIndex = '9999';
        spinner.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-body">
                    <i class="fas fa-sync-alt fa-spin me-2"></i>
                    Refreshing data...
                </div>
            </div>
        `;
        document.body.appendChild(spinner);
        
        // Simulate API call (in real implementation, this would be an actual AJAX call)
        setTimeout(() => {
            spinner.remove();
            this.showNotification('Data refreshed successfully', 'success');
            
            // Animate updated values
            this.animateStatCards();
        }, 1000);
    }
    
    animateStatCards() {
        const statCards = document.querySelectorAll('.card .h4');
        statCards.forEach(card => {
            card.style.transform = 'scale(1.1)';
            card.style.color = '#28a745';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
                card.style.color = '';
            }, 300);
        });
    }
    
    setupNotifications() {
        // Check for low stock alerts
        this.checkLowStockAlerts();
        
        // Check for pending orders (admin only)
        if (this.isAdmin) {
            this.checkPendingOrders();
        }
        
        // Setup notification system
        this.createNotificationContainer();
    }
    
    createNotificationContainer() {
        if (document.querySelector('.notification-container')) return;
        
        const container = document.createElement('div');
        container.className = 'notification-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
    showNotification(message, type = 'info', duration = 5000) {
        const container = document.querySelector('.notification-container');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `toast show mb-2`;
        notification.innerHTML = `
            <div class="toast-header">
                <i class="fas fa-${this.getNotificationIcon(type)} text-${type} me-2"></i>
                <strong class="me-auto">SIMLOG</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;
        
        container.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
        
        // Manual close
        const closeBtn = notification.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            warning: 'exclamation-triangle',
            danger: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    checkLowStockAlerts() {
        const lowStockAlert = document.querySelector('.alert-warning');
        if (lowStockAlert && this.isAdmin) {
            const productCount = lowStockAlert.querySelectorAll('li').length;
            if (productCount > 0) {
                this.showNotification(
                    `${productCount} product(s) are running low on stock`,
                    'warning'
                );
            }
        }
    }
    
    checkPendingOrders() {
        const pendingCard = document.querySelector('.card.bg-warning .h4');
        if (pendingCard) {
            const pendingCount = parseInt(pendingCard.textContent);
            if (pendingCount > 0) {
                this.showNotification(
                    `You have ${pendingCount} pending order(s) to review`,
                    'warning'
                );
            }
        }
    }
    
    setupTableEnhancements() {
        // Add search functionality to tables
        this.addTableSearch();
        
        // Add sorting functionality
        this.addTableSorting();
        
        // Add row highlighting
        this.addRowHighlighting();
        
        // Add export functionality
        this.addExportOptions();
    }
    
    addTableSearch() {
        const tables = document.querySelectorAll('.table-responsive table');
        tables.forEach(table => {
            if (table.querySelector('thead')) {
                this.createSearchInput(table);
            }
        });
    }
    
    createSearchInput(table) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'mb-3';
        searchContainer.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text" class="form-control table-search" 
                               placeholder="Search table..." autocomplete="off">
                    </div>
                </div>
            </div>
        `;
        
        table.parentNode.insertBefore(searchContainer, table);
        
        const searchInput = searchContainer.querySelector('.table-search');
        searchInput.addEventListener('input', (e) => {
            this.filterTableRows(table, e.target.value);
        });
    }
    
    filterTableRows(table, searchTerm) {
        const rows = table.querySelectorAll('tbody tr');
        const term = searchTerm.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
        
        // Show "no results" message if needed
        this.toggleNoResultsMessage(table, rows, searchTerm);
    }
    
    toggleNoResultsMessage(table, rows, searchTerm) {
        const visibleRows = Array.from(rows).filter(row => 
            row.style.display !== 'none'
        );
        
        let noResultsRow = table.querySelector('.no-results-row');
        
        if (visibleRows.length === 0 && searchTerm.trim() !== '') {
            if (!noResultsRow) {
                noResultsRow = document.createElement('tr');
                noResultsRow.className = 'no-results-row';
                const colCount = table.querySelector('thead tr').children.length;
                noResultsRow.innerHTML = `
                    <td colspan="${colCount}" class="text-center py-4 text-muted">
                        <i class="fas fa-search-minus fa-2x mb-2"></i><br>
                        No results found for "${searchTerm}"
                    </td>
                `;
                table.querySelector('tbody').appendChild(noResultsRow);
            }
        } else if (noResultsRow) {
            noResultsRow.remove();
        }
    }
    
    addTableSorting() {
        const tables = document.querySelectorAll('table thead th');
        tables.forEach(th => {
            if (!th.querySelector('.sort-icon')) {
                th.style.cursor = 'pointer';
                th.innerHTML += ' <i class="fas fa-sort sort-icon text-muted"></i>';
                th.addEventListener('click', () => {
                    this.sortTable(th);
                });
            }
        });
    }
    
    sortTable(header) {
        const table = header.closest('table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)'));
        const index = Array.from(header.parentNode.children).indexOf(header);
        
        // Determine sort direction
        const isAsc = header.classList.contains('sort-asc');
        
        // Reset all sort icons
        table.querySelectorAll('.sort-icon').forEach(icon => {
            icon.className = 'fas fa-sort sort-icon text-muted';
        });
        header.classList.remove('sort-asc', 'sort-desc');
        
        // Sort rows
        rows.sort((a, b) => {
            const aVal = a.children[index].textContent.trim();
            const bVal = b.children[index].textContent.trim();
            
            // Try to parse as numbers
            const aNum = parseFloat(aVal.replace(/[^\d.-]/g, ''));
            const bNum = parseFloat(bVal.replace(/[^\d.-]/g, ''));
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return isAsc ? bNum - aNum : aNum - bNum;
            } else {
                return isAsc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
            }
        });
        
        // Update header and icon
        if (isAsc) {
            header.classList.add('sort-desc');
            header.querySelector('.sort-icon').className = 'fas fa-sort-down sort-icon text-primary';
        } else {
            header.classList.add('sort-asc');
            header.querySelector('.sort-icon').className = 'fas fa-sort-up sort-icon text-primary';
        }
        
        // Reorder rows
        rows.forEach(row => tbody.appendChild(row));
    }
    
    addRowHighlighting() {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });
        });
    }
    
    addExportOptions() {
        // Add export button to tables with data
        const tables = document.querySelectorAll('.table-responsive');
        tables.forEach(tableContainer => {
            const table = tableContainer.querySelector('table');
            if (table && table.querySelector('tbody tr')) {
                this.createExportButton(tableContainer, table);
            }
        });
    }
    
    createExportButton(container, table) {
        const exportBtn = document.createElement('button');
        exportBtn.className = 'btn btn-outline-success btn-sm';
        exportBtn.innerHTML = '<i class="fas fa-download me-1"></i>Export';
        exportBtn.style.cssText = 'position: absolute; top: -50px; right: 0;';
        
        container.style.position = 'relative';
        container.appendChild(exportBtn);
        
        exportBtn.addEventListener('click', () => {
            this.exportTableToCSV(table);
        });
    }
    
    exportTableToCSV(table) {
        const rows = [];
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => 
            th.textContent.trim().replace(/\s+/g, ' ')
        );
        rows.push(headers.join(','));
        
        table.querySelectorAll('tbody tr:not(.no-results-row)').forEach(row => {
            if (row.style.display !== 'none') {
                const cells = Array.from(row.children).map(cell => 
                    `"${cell.textContent.trim().replace(/"/g, '""')}"`
                );
                rows.push(cells.join(','));
            }
        });
        
        const csv = rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `simlog-data-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully', 'success');
    }
    
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    this.showNotification('Please fill in all required fields correctly', 'warning');
                }
            });
            
            // Real-time validation
            form.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
        });
    }
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        // Check email fields
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }
        
        // Check number fields
        if (field.type === 'number' && value) {
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');
            const numValue = parseFloat(value);
            
            if (min && numValue < parseFloat(min)) {
                isValid = false;
            }
            if (max && numValue > parseFloat(max)) {
                isValid = false;
            }
        }
        
        // Apply validation classes
        field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        
        return isValid;
    }
    
    setupModalHandlers() {
        // Auto-focus first input in modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', () => {
                const firstInput = modal.querySelector('input, select, textarea');
                if (firstInput) {
                    firstInput.focus();
                }
            });
            
            // Reset form when modal is hidden
            modal.addEventListener('hidden.bs.modal', () => {
                const form = modal.querySelector('form');
                if (form) {
                    form.reset();
                    form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                        field.classList.remove('is-valid', 'is-invalid');
                    });
                }
            });
        });
    }
    
    loadDashboardData() {
        // Simulate loading dashboard data
        const loadingElements = document.querySelectorAll('.card .h4');
        loadingElements.forEach(element => {
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.style.opacity = '1';
                element.classList.add('fade-in');
            }, Math.random() * 1000);
        });
    }
    
    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a dashboard page
    if (document.querySelector('.sidebar')) {
        window.simlogDashboard = new SimlogDashboard();
        
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add loading animation to charts placeholder
        const chartPlaceholders = document.querySelectorAll('.fa-chart-area, .fa-chart-line');
        chartPlaceholders.forEach(chart => {
            chart.style.animation = 'pulse 2s infinite';
        });
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.simlogDashboard) {
        window.simlogDashboard.destroy();
    }
});

// Handle print requests
window.addEventListener('beforeprint', () => {
    // Hide interactive elements for printing
    document.querySelectorAll('.btn, .modal, .toast').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    // Restore interactive elements after printing
    document.querySelectorAll('.btn, .modal, .toast').forEach(el => {
        el.style.display = '';
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimlogDashboard;
}
