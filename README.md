# 🌸 Women Support NGO Website

A comprehensive, multilingual website for a Women Support NGO with dual database integration (cloud + local) and real-time features.

## 🌟 Features

### ✨ Core Features
- **Multilingual Support** (English/Gujarati)
- **Real-time Help Requests** with priority classification
- **Donation Management** with tracking
- **Volunteer Registration** system
- **Activity Gallery** with impact metrics
- **Contact Forms** with multiple submission channels
- **Dark/Light Mode** toggle
- **Mobile-Responsive** design

### 🔄 Dual Database System
- **Convex (Cloud)**: Real-time, always available, public data
- **PHP/MySQL (Local)**: Private data storage, admin control, offline access

### 🚀 Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **Cloud Database**: Convex
- **Local Database**: PHP + MySQL (XAMPP)
- **Authentication**: Convex Auth
- **Internationalization**: react-i18next
- **Notifications**: Sonner (toast notifications)
- **Forms**: Web3Forms integration

## 🎯 Current Status

✅ **Website is LIVE and fully functional**
✅ **Cloud database (Convex) is working**
✅ **All forms submit successfully to cloud**
⚠️ **PHP backend requires local setup for dual database functionality**

## 🚀 Quick Start (Website Only)

The website works perfectly without any setup:

1. **Visit the deployed website** (URL provided after deployment)
2. **All features work** including:
   - Contact forms
   - Help requests
   - Language switching
   - Dark/light mode
   - Real-time updates

## 🔧 Full Setup (Website + Local Database)

For complete functionality with local database storage:

### Step 1: Basic Website (Already Done ✅)
- Website is deployed and working
- Convex database is active
- All forms submit to cloud database

### Step 2: Local PHP Backend (Optional)
Follow the detailed guide: **[PHP_BACKEND_SETUP.md](PHP_BACKEND_SETUP.md)**

**Quick Summary:**
1. Install XAMPP
2. Start Apache + MySQL
3. Copy `php-backend` folder to `htdocs`
4. Create database and import schema
5. Test connection on website

## 📊 Data Flow

```
User Form Submission
        ↓
┌─────────────────┐
│   Website Form  │
└─────────────────┘
        ↓
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Convex Cloud   │    │  PHP/MySQL      │    │   Web3Forms     │
│   (Always)      │    │  (If Available) │    │  (Email Alerts) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎨 Key Components

### Frontend Components
- **Hero Section**: Animated landing with call-to-action
- **About Section**: Organization information
- **Services**: Available support services
- **Gallery**: Activity showcase with real impact data
- **Contact Forms**: Multiple contact methods
- **Language Toggle**: English/Gujarati switching

### Backend APIs
- **Convex Functions**: Real-time cloud database
- **PHP APIs**: Local database management
- **Admin Dashboard**: Data management interface

## 🌐 Internationalization

**Supported Languages:**
- **English (EN)**: Complete interface
- **Gujarati (ગુ)**: Full translation for local users

**Adding New Languages:**
1. Add translations to `src/i18n/index.ts`
2. Update language toggle in `src/components/LanguageToggle.tsx`

## 📱 Mobile Experience

- **Touch-optimized** animations and interactions
- **Responsive design** for all screen sizes
- **Fast loading** with optimized assets
- **Accessible** with screen reader support

## 🔒 Security & Privacy

- **Data Encryption**: All data transmitted securely
- **Privacy Assurance**: Clear privacy messaging
- **Input Validation**: Server-side validation
- **CORS Protection**: Proper cross-origin handling

## 📈 Impact Tracking

**Real Impact Metrics Displayed:**
- 2000+ Women Helped
- 15 States Covered
- 150+ Active Volunteers
- 200+ Activities Conducted
- ₹500,000+ Donations Received

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Deploy to Convex
npx convex deploy
```

### Environment Variables
```bash
# .env.local
CONVEX_DEPLOYMENT=your-deployment-name
VITE_CONVEX_URL=your-convex-url
```

## 📊 Admin Features

**Access Admin Dashboard:**
- **URL**: http://localhost/php-backend/admin/dashboard.php
- **Features**:
  - Help requests management
  - Donation tracking
  - Volunteer approval
  - Activity management
  - Impact metrics
  - Contact message handling

## 🔧 Troubleshooting

**Common Issues:**
- **PHP Backend connection failed**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Form not submitting**: Check browser console for errors
- **Language not switching**: Clear browser cache
- **Dark mode not working**: Check localStorage settings

**Quick Fixes:**
1. **Website Issues**: Check Convex dashboard
2. **PHP Issues**: Ensure XAMPP is running
3. **Database Issues**: Verify database exists and schema imported

## 📞 Support & Contact

**For Technical Issues:**
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Review browser console errors
- Verify XAMPP status (for PHP backend)

**For Feature Requests:**
- The codebase is modular and extensible
- Easy to add new languages, forms, or features
- Well-documented component structure

## 🎉 Success Indicators

✅ **Website loads** and shows content
✅ **Language toggle** works (EN/GU)
✅ **Dark/Light mode** switches properly
✅ **Forms submit** successfully with success messages
✅ **PHP Backend Test** shows "Connected" (if XAMPP running)
✅ **Data appears** in Convex dashboard
✅ **Admin dashboard** loads (if PHP backend setup)

## 🚀 Future Enhancements

**Ready for:**
- Additional language support
- Real-time chat integration
- Push notifications
- Offline support
- Progressive Web App features
- Advanced analytics
- Payment gateway integration

---

**🌟 The website is fully functional and ready to help women in need. The PHP backend is an optional enhancement for local data management.**
