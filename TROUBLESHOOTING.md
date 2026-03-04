# 🔧 Quick Troubleshooting Guide

## 🚨 Most Common Issues & Solutions

### Issue 1: "PHP Backend connection failed" message
**What it means:** The website can't connect to your local PHP server.

**Quick Fix:**
1. ✅ **Check XAMPP is running**: Open XAMPP Control Panel
2. ✅ **Start Apache**: Click "Start" next to Apache (should show green "Running")
3. ✅ **Start MySQL**: Click "Start" next to MySQL (should show green "Running")
4. ✅ **Test directly**: Open http://localhost/php-backend/api/test.php in browser
5. ✅ **Refresh website**: Go back to your website and click "Test PHP Backend Connection"

### Issue 2: Form submits but no data in PHP database
**What it means:** Website works but data isn't reaching the PHP database.

**Quick Fix:**
1. ✅ **Check database exists**: Go to http://localhost/phpmyadmin
2. ✅ **Verify database name**: Look for `women_support_ngo` database
3. ✅ **Check tables**: Click on database, should see `help_requests` table
4. ✅ **Import schema**: If tables missing, import `php-backend/database/schema.sql`

### Issue 3: XAMPP won't start Apache (Port 80 busy)
**What it means:** Another program is using port 80.

**Quick Fix:**
1. ✅ **Stop IIS**: Windows → Services → Stop "World Wide Web Publishing Service"
2. ✅ **Or change port**: XAMPP → Apache Config → httpd.conf → Change `Listen 80` to `Listen 8080`
3. ✅ **Update URLs**: If using port 8080, test with http://localhost:8080/php-backend/api/test.php

### Issue 4: Files not found (404 error)
**What it means:** PHP files are in wrong location.

**Quick Fix:**
1. ✅ **Check file location**:
   - Windows: `C:\xampp\htdocs\php-backend\`
   - Mac: `/Applications/XAMPP/htdocs/php-backend/`
   - Linux: `/opt/lampp/htdocs/php-backend/`
2. ✅ **Copy files**: Move the entire `php-backend` folder to htdocs
3. ✅ **Test path**: http://localhost/php-backend/api/test.php should work

### Issue 5: Database connection error
**What it means:** PHP can't connect to MySQL.

**Quick Fix:**
1. ✅ **MySQL running**: Green "Running" status in XAMPP
2. ✅ **Check credentials**: Edit `php-backend/config/database.php`
   ```php
   private $host = "localhost";
   private $db_name = "women_support_ngo";
   private $username = "root";
   private $password = ""; // Usually empty for XAMPP
   ```

## 🎯 Quick Test Checklist

**Before reporting issues, verify:**

1. ✅ **XAMPP Status**: Apache and MySQL both show "Running" (green)
2. ✅ **Direct API Test**: http://localhost/php-backend/api/test.php returns JSON
3. ✅ **Database Exists**: http://localhost/phpmyadmin shows `women_support_ngo` database
4. ✅ **Tables Exist**: Database contains `help_requests` table
5. ✅ **Website Test**: "Test PHP Backend Connection" button shows success
6. ✅ **Form Submission**: Fill form and check both browser console and database

## 📱 Status Indicators on Website

**Green ✅**: PHP Backend Connected - Data saves to both cloud and local database
**Red ❌**: PHP Backend Disconnected - Data saves only to cloud database
**No indicator**: Haven't tested connection yet

## 🔍 Where to Check Data

1. **Cloud Database (Convex)**: Always works, check at https://dashboard.convex.dev
2. **Local Database (PHP)**: Only works if XAMPP running, check at:
   - Admin Dashboard: http://localhost/php-backend/admin/dashboard.php
   - phpMyAdmin: http://localhost/phpmyadmin → women_support_ngo → help_requests

## 🆘 Still Having Issues?

**Check these logs:**
1. **Browser Console**: Press F12 → Console tab (look for red errors)
2. **XAMPP Logs**: xampp/apache/logs/error.log
3. **PHP Errors**: xampp/php/logs/php_error_log

**Common Error Messages:**
- `CORS error`: XAMPP not running or wrong URL
- `404 Not Found`: Files in wrong location
- `Connection refused`: Apache not started
- `Access denied`: MySQL not started or wrong credentials
- `Database doesn't exist`: Need to create database and import schema

---

**💡 Pro Tip**: The website works perfectly with just Convex (cloud database) even if PHP backend is not set up. The PHP backend is an additional feature for local data storage and admin management.
