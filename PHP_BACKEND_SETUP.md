# 🚀 Complete PHP Backend Setup Guide for Women Support NGO

## ⚠️ Important: You need to set up the PHP backend locally for the database integration to work!

The website is now configured to send data to both Convex (cloud) and a local PHP database. Follow these steps to set up the PHP backend:

## 📋 Prerequisites

- Windows, Mac, or Linux computer
- At least 1GB free disk space
- Internet connection for downloads

## 🔧 Step 1: Install XAMPP

### For Windows:
1. **Download XAMPP**: Go to https://www.apachefriends.org/
2. **Download** the latest version for Windows
3. **Run the installer** as Administrator
4. **Select components**: Make sure Apache, MySQL, and PHP are selected
5. **Install** to default location (C:\xampp)

### For Mac:
1. **Download XAMPP**: Go to https://www.apachefriends.org/
2. **Download** the latest version for macOS
3. **Open the .dmg file** and drag XAMPP to Applications
4. **Run XAMPP** from Applications folder

### For Linux (Ubuntu/Debian):
```bash
# Download XAMPP
wget https://www.apachefriends.org/xampp-files/8.2.12/xampp-linux-x64-8.2.12-0-installer.run

# Make it executable
chmod +x xampp-linux-x64-8.2.12-0-installer.run

# Run installer
sudo ./xampp-linux-x64-8.2.12-0-installer.run
```

## 🚀 Step 2: Start XAMPP Services

1. **Open XAMPP Control Panel**
2. **Start Apache** - Click "Start" button next to Apache
3. **Start MySQL** - Click "Start" button next to MySQL
4. **Verify**: Both should show "Running" status with green background

### Troubleshooting:
- **Port 80 busy**: Stop IIS or change Apache port to 8080
- **Port 3306 busy**: Stop other MySQL services
- **Permission issues**: Run XAMPP as Administrator (Windows) or with sudo (Linux)

## 📁 Step 3: Copy PHP Backend Files

### Windows:
```
Copy the 'php-backend' folder to: C:\xampp\htdocs\
Final path: C:\xampp\htdocs\php-backend\
```

### Mac:
```
Copy the 'php-backend' folder to: /Applications/XAMPP/htdocs/
Final path: /Applications/XAMPP/htdocs/php-backend/
```

### Linux:
```bash
sudo cp -r php-backend /opt/lampp/htdocs/
sudo chown -R daemon:daemon /opt/lampp/htdocs/php-backend
```

## 🗄️ Step 4: Setup Database

1. **Open phpMyAdmin**: Go to http://localhost/phpmyadmin in your browser
2. **Create Database**:
   - Click "New" in the left sidebar
   - Database name: `women_support_ngo`
   - Click "Create"

3. **Import Schema**:
   - Select the `women_support_ngo` database
   - Click "Import" tab
   - Choose file: `php-backend/database/schema.sql`
   - Click "Go"

### Alternative: Manual SQL Execution
If import fails, copy and paste the SQL from `schema.sql` into the SQL tab in phpMyAdmin.

## ✅ Step 5: Test the Setup

### Test 1: PHP Backend API
Open in browser: http://localhost/php-backend/api/test.php

**Expected Result:**
```json
{
  "status": "success",
  "message": "PHP backend is working!",
  "timestamp": "2024-01-15 10:30:45",
  "server_info": {
    "php_version": "8.2.12",
    "server_software": "Apache/2.4.58"
  }
}
```

### Test 2: Admin Dashboard
Open in browser: http://localhost/php-backend/admin/dashboard.php

**Expected Result:** Admin dashboard should load with statistics

### Test 3: Website Integration
1. Go to your deployed website
2. Scroll to the "Get Help Now" section
3. Click "Test PHP Backend Connection" button
4. Should show "PHP Backend is connected!" message

## 🔧 Step 6: Configure Database Connection (if needed)

If you have custom MySQL settings, edit `php-backend/config/database.php`:

```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "women_support_ngo";
    private $username = "root";
    private $password = ""; // Default XAMPP password is empty
    // ... rest of the code
}
?>
```

## 📊 Step 7: Verify Data Flow

1. **Fill out the contact form** on your website
2. **Submit the form**
3. **Check the data**:
   - **Convex Dashboard**: https://dashboard.convex.dev (cloud data)
   - **PHP Admin**: http://localhost/php-backend/admin/dashboard.php (local data)
   - **phpMyAdmin**: http://localhost/phpmyadmin → women_support_ngo → help_requests table

## 🛠️ Troubleshooting Common Issues

### Issue 1: "PHP Backend connection failed"
**Solutions:**
- Ensure XAMPP Apache and MySQL are running
- Check if files are in correct htdocs directory
- Verify database exists and has correct name
- Check browser console for detailed error messages

### Issue 2: Database connection error
**Solutions:**
- Verify MySQL is running in XAMPP
- Check database credentials in `config/database.php`
- Ensure database `women_support_ngo` exists
- Import schema.sql if tables are missing

### Issue 3: CORS errors
**Solutions:**
- Ensure Apache is running on port 80
- Check if CORS headers are properly set in PHP files
- Try accessing http://localhost/php-backend/api/test.php directly

### Issue 4: Permission denied (Linux/Mac)
**Solutions:**
```bash
# Fix file permissions
sudo chown -R daemon:daemon /opt/lampp/htdocs/php-backend
sudo chmod -R 755 /opt/lampp/htdocs/php-backend
```

### Issue 5: Port conflicts
**Solutions:**
- **Apache Port 80 busy**: Change to port 8080 in XAMPP config
- **MySQL Port 3306 busy**: Stop other MySQL services
- **Update URLs**: If using port 8080, update API URLs to http://localhost:8080/php-backend/...

## 📱 Step 8: Test Complete Integration

1. **Open your website**
2. **Go to "Get Help Now" section**
3. **Fill out the form** with test data:
   - Name: Test User
   - City: Test City
   - Phone: 1234567890
   - Problem: This is a test submission
4. **Submit the form**
5. **Verify data appears in**:
   - Website success message
   - Browser console logs
   - PHP admin dashboard
   - phpMyAdmin database

## 🎉 Success Indicators

✅ **XAMPP Control Panel**: Apache and MySQL show "Running"
✅ **Test API**: http://localhost/php-backend/api/test.php returns JSON
✅ **Admin Dashboard**: http://localhost/php-backend/admin/dashboard.php loads
✅ **Website Test Button**: Shows "PHP Backend is connected!"
✅ **Form Submission**: Data appears in both Convex and PHP database
✅ **Console Logs**: No error messages in browser console

## 📞 Need Help?

If you encounter issues:

1. **Check XAMPP logs**: Look in xampp/logs/ directory
2. **Browser Console**: Press F12 and check for error messages
3. **PHP Error Logs**: Check xampp/php/logs/php_error_log
4. **Test each component**: API → Database → Admin Dashboard → Website

## 🔄 Daily Usage

**To use the system daily:**
1. **Start XAMPP** (Apache + MySQL)
2. **Your website** automatically connects to both Convex and PHP
3. **View data** in admin dashboard: http://localhost/php-backend/admin/dashboard.php
4. **Stop XAMPP** when done (optional)

---

**Note**: The PHP backend runs locally on your computer and stores data in a local MySQL database. This provides you with complete control over sensitive data while still benefiting from Convex's real-time features for the public website.
