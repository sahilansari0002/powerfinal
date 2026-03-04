<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Women Support NGO - Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-100">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-purple-600 text-white p-4">
            <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold">Women Support NGO - Admin Dashboard</h1>
                <div class="flex items-center space-x-4">
                    <span>Welcome, Admin</span>
                    <button class="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800">Logout</button>
                </div>
            </div>
        </header>

        <!-- Navigation -->
        <nav class="bg-purple-700 text-white p-4">
            <div class="container mx-auto">
                <ul class="flex space-x-6">
                    <li><a href="#dashboard" class="hover:text-purple-200 active-tab" onclick="showTab('dashboard')">Dashboard</a></li>
                    <li><a href="#help-requests" class="hover:text-purple-200" onclick="showTab('help-requests')">Help Requests</a></li>
                    <li><a href="#donations" class="hover:text-purple-200" onclick="showTab('donations')">Donations</a></li>
                    <li><a href="#volunteers" class="hover:text-purple-200" onclick="showTab('volunteers')">Volunteers</a></li>
                    <li><a href="#activities" class="hover:text-purple-200" onclick="showTab('activities')">Activities</a></li>
                    <li><a href="#contact-messages" class="hover:text-purple-200" onclick="showTab('contact-messages')">Messages</a></li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="container mx-auto p-6">
            <!-- Dashboard Tab -->
            <div id="dashboard-tab" class="tab-content">
                <h2 class="text-3xl font-bold mb-6">Dashboard Overview</h2>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-semibold text-gray-600">Total Help Requests</h3>
                        <p class="text-3xl font-bold text-purple-600" id="total-help-requests">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-semibold text-gray-600">Total Donations</h3>
                        <p class="text-3xl font-bold text-green-600" id="total-donations">₹0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-semibold text-gray-600">Active Volunteers</h3>
                        <p class="text-3xl font-bold text-blue-600" id="active-volunteers">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-semibold text-gray-600">Women Helped</h3>
                        <p class="text-3xl font-bold text-rose-600" id="women-helped">0</p>
                    </div>
                </div>

                <!-- Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-xl font-semibold mb-4">Help Requests by Priority</h3>
                        <canvas id="priorityChart"></canvas>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-xl font-semibold mb-4">Monthly Activities</h3>
                        <canvas id="activitiesChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Help Requests Tab -->
            <div id="help-requests-tab" class="tab-content hidden">
                <h2 class="text-3xl font-bold mb-6">Help Requests Management</h2>
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <table class="min-w-full">
                        <thead class="bg-purple-600 text-white">
                            <tr>
                                <th class="px-6 py-3 text-left">ID</th>
                                <th class="px-6 py-3 text-left">Name</th>
                                <th class="px-6 py-3 text-left">City</th>
                                <th class="px-6 py-3 text-left">Priority</th>
                                <th class="px-6 py-3 text-left">Status</th>
                                <th class="px-6 py-3 text-left">Date</th>
                                <th class="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="help-requests-table">
                            <!-- Data will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Other tabs would be similar... -->
            <div id="donations-tab" class="tab-content hidden">
                <h2 class="text-3xl font-bold mb-6">Donations Management</h2>
                <div class="bg-white rounded-lg shadow p-6">
                    <p>Donations management interface will be loaded here...</p>
                </div>
            </div>

            <div id="volunteers-tab" class="tab-content hidden">
                <h2 class="text-3xl font-bold mb-6">Volunteers Management</h2>
                <div class="bg-white rounded-lg shadow p-6">
                    <p>Volunteers management interface will be loaded here...</p>
                </div>
            </div>

            <div id="activities-tab" class="tab-content hidden">
                <h2 class="text-3xl font-bold mb-6">Activities Management</h2>
                <div class="bg-white rounded-lg shadow p-6">
                    <p>Activities management interface will be loaded here...</p>
                </div>
            </div>

            <div id="contact-messages-tab" class="tab-content hidden">
                <h2 class="text-3xl font-bold mb-6">Contact Messages</h2>
                <div class="bg-white rounded-lg shadow p-6">
                    <p>Contact messages interface will be loaded here...</p>
                </div>
            </div>
        </main>
    </div>

    <script>
        // API Base URL
        const API_BASE = '../api';

        // Tab Management
        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Remove active class from all nav links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active-tab');
            });
            
            // Show selected tab
            document.getElementById(tabName + '-tab').classList.remove('hidden');
            
            // Add active class to clicked nav link
            event.target.classList.add('active-tab');
            
            // Load data for the tab
            loadTabData(tabName);
        }

        // Load Dashboard Data
        async function loadDashboardData() {
            try {
                const response = await fetch(`${API_BASE}/impact.php?dashboard=1`);
                const data = await response.json();
                
                // Update stats cards
                document.getElementById('total-help-requests').textContent = data.help_requests?.total_requests || 0;
                document.getElementById('total-donations').textContent = '₹' + (data.donations?.total_amount || 0);
                document.getElementById('active-volunteers').textContent = data.volunteers?.active_volunteers || 0;
                document.getElementById('women-helped').textContent = data.impact?.WOMEN_HELPED || 0;
                
                // Create charts
                createPriorityChart(data.help_requests);
                createActivitiesChart(data.activities);
                
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            }
        }

        // Load Help Requests
        async function loadHelpRequests() {
            try {
                const response = await fetch(`${API_BASE}/help_request.php`);
                const data = await response.json();
                
                const tableBody = document.getElementById('help-requests-table');
                tableBody.innerHTML = '';
                
                data.forEach(request => {
                    const row = document.createElement('tr');
                    row.className = 'border-b hover:bg-gray-50';
                    
                    const priorityColor = {
                        'EMERGENCY': 'bg-red-100 text-red-800',
                        'HIGH': 'bg-orange-100 text-orange-800',
                        'MEDIUM': 'bg-yellow-100 text-yellow-800'
                    };
                    
                    row.innerHTML = `
                        <td class="px-6 py-4">${request.id}</td>
                        <td class="px-6 py-4">${request.name}</td>
                        <td class="px-6 py-4">${request.city}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 rounded-full text-xs ${priorityColor[request.priority] || 'bg-gray-100 text-gray-800'}">
                                ${request.priority}
                            </span>
                        </td>
                        <td class="px-6 py-4">${request.status}</td>
                        <td class="px-6 py-4">${new Date(request.created_at).toLocaleDateString()}</td>
                        <td class="px-6 py-4">
                            <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600" onclick="viewRequest(${request.id})">
                                View
                            </button>
                        </td>
                    `;
                    
                    tableBody.appendChild(row);
                });
                
            } catch (error) {
                console.error('Error loading help requests:', error);
            }
        }

        // Create Priority Chart
        function createPriorityChart(helpRequestsData) {
            const ctx = document.getElementById('priorityChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Emergency', 'High', 'Medium'],
                    datasets: [{
                        data: [
                            helpRequestsData?.emergency_requests || 0,
                            helpRequestsData?.high_requests || 0,
                            helpRequestsData?.medium_requests || 0
                        ],
                        backgroundColor: ['#ef4444', '#f97316', '#eab308']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Create Activities Chart
        function createActivitiesChart(activitiesData) {
            const ctx = document.getElementById('activitiesChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Activities',
                        data: [12, 19, 15, 25, 22, 18], // Sample data
                        backgroundColor: '#8b5cf6'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Load Tab Data
        function loadTabData(tabName) {
            switch(tabName) {
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'help-requests':
                    loadHelpRequests();
                    break;
                // Add other cases as needed
            }
        }

        // View Request Details
        function viewRequest(id) {
            // Implement view request functionality
            alert(`View request details for ID: ${id}`);
        }

        // Initialize dashboard on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadDashboardData();
        });
    </script>

    <style>
        .active-tab {
            color: #e879f9 !important;
            font-weight: bold;
        }
    </style>
</body>
</html>
