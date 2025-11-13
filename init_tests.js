// init_tests.js - Initialize test data
// This file initializes the test system after all modules are loaded

console.log('Test initialization module loaded');

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('OAT Prep Application initialized');
    
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
});
