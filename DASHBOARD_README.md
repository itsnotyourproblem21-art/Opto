# OAT Prep Dashboard - Quick Start Guide

## 🚀 Access Your Dashboard

**Local Development:**
Open in your browser: `http://localhost:8080/dashboard.html`

## ✨ Features

### 1. **Subject Navigation**
- 6 subjects with unique color themes:
  - 🧬 Biology (Blue)
  - 🧪 General Chemistry (Cyan)
  - 👩‍🔬 Organic Chemistry (Orange)
  - 📖 Reading Comprehension (Green)
  - 💡 Physics (Purple)
  - 📐 Quantitative Reasoning (Red)

### 2. **Practice Test Management**
- View all practice tests for each subject
- Track attempts (max 3 per test)
- See tagged questions count
- Expandable test items with attempt selection

### 3. **Performance Metrics**
- **Score Display**: 200-400 scale with color coding
  - 🟢 Green: >320 (Excellent)
  - 🔵 Indigo: 300-320 (Good)
  - 🔴 Red: <300 (Needs Improvement)
- **Accuracy**: Correct answers / Total questions
- **Duration**: Time taken for each attempt
- **Date**: When the attempt was completed

### 4. **Micro-Animations**
- Smooth page transitions
- Hover effects on cards and buttons
- Bouncing subject icons
- Slide-in animations for content

### 5. **Mock Screenshots**
- SVG-based preview of test results
- Dynamic progress bars
- Question-by-question breakdown

## 🏗️ Architecture

### Clean Separation of Concerns
```
js/
  ├── constants.js    - All data, colors, test structures
  ├── utils.js        - Scoring logic, calculations
  └── app.js          - Main application logic

css/
  └── dashboard.css   - All styles and animations
```

### Fixed Data Model
Each subject has its own test array, preventing data mixing:
```javascript
testData = {
  'Biology': [40Q tests],
  'General Chemistry': [30Q tests],
  'Organic Chemistry': [30Q tests],
  // etc.
}
```

## 🎨 Customization

### Change Subject Colors
Edit `js/constants.js` → `SUBJECT_COLOR_MAP`

### Modify Score Ranges
Edit `js/utils.js` → `SCORE_MAP_40`, `SCORE_MAP_30`, `SCORE_MAP_50`

### Add New Tests
Edit `js/constants.js` → `initialTestData`

## 📱 Responsive Design
- Desktop: Full sidebar + dashboard
- Tablet: Collapsible sidebar
- Mobile: Sticky sidebar overlay

## 🔧 Technology Stack
- **Pure HTML5** - No frameworks
- **Vanilla JavaScript** - ES6 modules
- **CSS3** - Modern flexbox/grid
- **SVG** - Dynamic graphics

## 🎯 Next Steps (Future Features)
- AI Tutor integration
- Full-length test mode
- Question tagging system
- Performance analytics
- Export/print results
- Dark mode toggle

## 📝 Notes
- No build process required
- No package installations needed
- Works in any modern browser
- Easy to customize and extend

---

Built with ❤️ for OAT preparation
