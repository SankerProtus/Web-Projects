# TechEdu Academy - Professional School Website

A modern, responsive website for TechEdu Academy, designed to showcase academic programs, facilitate student and admin portal access, and provide comprehensive information about computer science education.

## 🎯 Project Overview

TechEdu Academy is a professional educational institution website that serves as the digital front door for prospective students, current students, faculty, and administrators. The site emphasizes modern design principles, accessibility, and user experience.

## ✨ Features

### 🎨 Design & User Experience
- **Modern Professional Design**: Clean, sophisticated layout with professional color scheme
- **Responsive Layout**: Fully responsive design that works seamlessly on desktop, tablet, and mobile
- **Glass-morphism Effects**: Modern backdrop blur effects and transparent elements
- **Parallax Background**: Engaging showcase image with fixed attachment
- **Smooth Animations**: Subtle hover effects and transitions throughout

### 🔐 Authentication System
- **Dual Modal System**: Clean, simple login/signup forms
- **Role-based Access**: Separate portals for Students, Faculty, and Administrators
- **Professional Form Design**: Streamlined forms with proper validation states
- **Accessible Interface**: Keyboard navigation and screen reader friendly

### 📚 Academic Programs
- **Program Showcase**: Detailed information about 4 core programs:
  - Software Engineering
  - Artificial Intelligence
  - Cybersecurity
  - Data Science
- **Visual Program Cards**: Interactive cards with hover effects
- **Program Details**: Duration, degree type, and descriptions

### 🏛️ Portal Systems
- **Student Portal**: Access to academic resources, grades, schedules, and campus services
- **Admin Portal**: Dashboard for managing students, faculty, courses, and analytics
- **Faculty Portal**: Course management, student grading, and academic resources

### 👥 Faculty Section
- **Faculty Profiles**: Showcase of expert faculty members
- **Credentials Display**: Academic backgrounds and specializations
- **Professional Photos**: High-quality faculty imagery

### 📋 Admissions Information
- **Admission Requirements**: Clear program requirements
- **Application Process**: Step-by-step application guidance
- **Contact Information**: Easy access to admissions support

## 🛠️ Technical Stack

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript**: Interactive functionality and form validation
- **Font Awesome**: Professional icon library
- **Google Fonts**: Typography with Inter font family

### CSS Architecture
- **CSS Custom Properties**: Centralized color and spacing system
- **Component-based Styling**: Modular CSS organization
- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern CSS Features**: Grid, Flexbox, backdrop-filter, and animations

### Performance Optimizations
- **Optimized Images**: Properly sized and compressed images
- **CSS Minification Ready**: Clean, organized code structure
- **Fast Loading**: Minimal dependencies and efficient code

## 🎨 Design System

### Color Palette
```css
Primary Colors:
- Primary: #2c3e50 (Professional Slate)
- Secondary: #34495e (Lighter Slate)
- Accent: #27ae60 (Success Green)
- Highlight: #e74c3c (Error Red)

Gradients:
- Hero Background: Linear gradient with showcase image overlay
- Card Backgrounds: Glass-morphism with backdrop blur

Typography:
- Font Family: Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Heading Sizes: 3.5rem (Hero) down to 1rem (Body)
- Line Heights: Optimized for readability
```

### Component Library
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Program cards, portal cards, faculty cards
- **Forms**: Login, signup, and contact forms
- **Navigation**: Fixed header with smooth scrolling
- **Modals**: Authentication and information modals

## 📱 Responsive Breakpoints

```css
Mobile: 320px - 768px
Tablet: 768px - 1024px
Desktop: 1024px+
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript for modifications

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SankerProtus/Web-Projects.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Web-Projects/Edge-Ledger-project
   ```

3. Open `index.html` in your preferred web browser or serve with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   live-server
   ```

### File Structure
```
Edge-Ledger-project/
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── script.js           # JavaScript functionality
├── images/             # Image assets
│   ├── showcase.jpg    # Hero background image
│   ├── author2.jpg     # Faculty photos
│   ├── author3.jpg
│   └── ...
└── README.md           # Project documentation
```

## 🔧 Customization

### Updating Colors
Modify the CSS custom properties in `:root` to change the color scheme:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #34495e;
    --accent-color: #27ae60;
    /* Add your custom colors */
}
```

### Adding Content
- **Programs**: Add new program cards in the programs section
- **Faculty**: Update faculty information in the faculty section
- **Images**: Replace images in the `/images` folder

### Modifying Layout
- **Grid Systems**: Adjust CSS Grid properties for different layouts
- **Responsive Design**: Modify media queries for custom breakpoints
- **Typography**: Update font sizes and families in the CSS

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions, suggestions, or support:
- **Project Repository**: [Web-Projects](https://github.com/SankerProtus/Web-Projects)
- **Issues**: [Report Issues](https://github.com/SankerProtus/Web-Projects/issues)

## 🙏 Acknowledgments

- Font Awesome for the comprehensive icon library
- Google Fonts for the Inter font family
- The web development community for inspiration and best practices

---

**TechEdu Academy** - Shaping Tomorrow's Technology Leaders Through Excellence in Computer Science Education
