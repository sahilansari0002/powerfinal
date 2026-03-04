# Women Support NGO - PHP Backend

This PHP backend provides a complete database solution for the Women Support NGO website, storing all details including help requests, contact messages, donations, volunteers, activities, and impact metrics.

## 🗄️ Database Structure

### Tables Created:
1. **help_requests** - Store help requests from "Get Help Now" form
2. **contact_messages** - Store general contact form submissions
3. **donations** - Track all donations and support contributions
4. **volunteers** - Manage volunteer registrations
5. **activities** - Store NGO activities and programs
6. **impact_metrics** - Track organizational impact and statistics
7. **support_cases** - Detailed case management
8. **newsletter_subscriptions** - Email newsletter subscribers
9. **events** - Event management
10. **event_registrations** - Event participant registrations

## 🚀 How to Run the PHP Backend

### Prerequisites:
- **XAMPP** (recommended) or **WAMP** or **LAMP**
- PHP 7.4 or higher
- MySQL 5.7 or higher

### Step-by-Step Setup:

#### 1. Install XAMPP
- Download XAMPP from: https://www.apachefriends.org/
- Install XAMPP on your computer
- Start Apache and MySQL services from XAMPP Control Panel

#### 2. Setup Database
```bash
# Open phpMyAdmin in browser
http://localhost/phpmyadmin

# Create new database named 'women_support_ngo'
# Import the schema.sql file or run the SQL commands manually
```

#### 3. Place PHP Files
```bash
# Copy the php-backend folder to XAMPP htdocs directory
# Path: C:\xampp\htdocs\php-backend (Windows)
# Path: /opt/lampp/htdocs/php-backend (Linux)
# Path: /Applications/XAMPP/htdocs/php-backend (Mac)
```

#### 4. Configure Database Connection
Edit `config/database.php` if needed:
```php
private $host = "localhost";
private $db_name = "women_support_ngo";
private $username = "root";
private $password = ""; // Default XAMPP MySQL password is empty
```

#### 5. Test the Setup
Open in browser:
```
http://localhost/php-backend/admin/dashboard.php
```

### 📡 API Endpoints

#### Help Requests API
```
POST   /php-backend/api/help_request.php    - Create help request
GET    /php-backend/api/help_request.php    - Get all help requests
GET    /php-backend/api/help_request.php?id=1 - Get specific help request
PUT    /php-backend/api/help_request.php    - Update help request
DELETE /php-backend/api/help_request.php    - Delete help request
```

#### Contact Messages API
```
POST   /php-backend/api/contact.php         - Create contact message
GET    /php-backend/api/contact.php         - Get all contact messages
```

#### Donations API
```
POST   /php-backend/api/donations.php       - Record donation
GET    /php-backend/api/donations.php       - Get all donations
GET    /php-backend/api/donations.php?stats=1 - Get donation statistics
```

#### Volunteers API
```
POST   /php-backend/api/volunteers.php      - Register volunteer
GET    /php-backend/api/volunteers.php      - Get all volunteers
GET    /php-backend/api/volunteers.php?stats=1 - Get volunteer statistics
```

#### Activities API
```
POST   /php-backend/api/activities.php      - Create activity
GET    /php-backend/api/activities.php      - Get all activities
GET    /php-backend/api/activities.php?category=AWARENESS - Get by category
```

#### Impact Metrics API
```
POST   /php-backend/api/impact.php          - Create impact metric
GET    /php-backend/api/impact.php          - Get all metrics
GET    /php-backend/api/impact.php?dashboard=1 - Get dashboard statistics
```

### 🔧 Integration with React Frontend

To integrate with your existing React app, update the contact form to also send data to PHP:

```javascript
// In src/components/Contact.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Submit to Convex (existing)
    await submitContact(formData);
    
    // Also submit to PHP backend
    const phpResponse = await fetch('http://localhost/php-backend/api/help_request.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        city: formData.city,
        phone: formData.phone,
        problemDescription: formData.problemDescription
      })
    });
    
    if (phpResponse.ok) {
      console.log('Data also saved to PHP database');
    }
    
    toast.success(t('common.messageSent'));
  } catch (error) {
    console.error('Error:', error);
    toast.error(t('common.messageFailed'));
  }
};
```

### 📊 Admin Dashboard Features

Access the admin dashboard at: `http://localhost/php-backend/admin/dashboard.php`

**Features:**
- **Dashboard Overview** - Key statistics and charts
- **Help Requests Management** - View and manage help requests by priority
- **Donations Tracking** - Monitor donations and generate reports
- **Volunteer Management** - Approve and manage volunteers
- **Activities Management** - Track NGO activities and impact
- **Contact Messages** - View and respond to contact form submissions

### 🔒 Security Features

- **SQL Injection Protection** - Using PDO prepared statements
- **CORS Headers** - Configured for cross-origin requests
- **Input Validation** - Server-side validation for all inputs
- **Priority Classification** - Automatic priority assignment for help requests
- **Status Tracking** - Comprehensive status management for all entities

### 📧 Email Integration

The system includes email notification functions:
- **Help Request Notifications** - Automatic alerts for new help requests
- **Donation Thank You** - Thank you emails for donors
- **Volunteer Welcome** - Welcome emails for new volunteers

To enable emails, uncomment the `mail()` functions in the respective API files and configure your server's mail settings.

### 🔄 Data Backup

Regular database backups are recommended:
```bash
# Export database
mysqldump -u root -p women_support_ngo > backup.sql

# Import database
mysql -u root -p women_support_ngo < backup.sql
```

### 📈 Performance Optimization

- **Database Indexes** - Optimized indexes for better query performance
- **Prepared Statements** - Efficient and secure database queries
- **JSON Responses** - Lightweight API responses
- **Error Handling** - Comprehensive error handling and logging

### 🛠️ Troubleshooting

**Common Issues:**

1. **Database Connection Error**
   - Check if MySQL is running in XAMPP
   - Verify database credentials in `config/database.php`

2. **CORS Errors**
   - Ensure CORS headers are properly set in API files
   - Check if Apache is running

3. **404 Errors**
   - Verify file paths are correct
   - Check if files are in the correct htdocs directory

4. **Permission Errors**
   - Ensure proper file permissions on Linux/Mac
   - Run XAMPP as administrator on Windows if needed

### 📞 Support

For technical support or questions about the PHP backend implementation, please refer to the documentation or contact the development team.

---

**Note:** This PHP backend is designed to work alongside your existing Convex setup, providing additional database functionality and admin management capabilities for the Women Support NGO website.
