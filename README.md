# Creative Studio - Image & Video Editing Tutorials

A modern, elegant, and fully responsive website dedicated to providing comprehensive tutorials on image editing, video editing, and motion graphics. Built with vanilla HTML, CSS, and JavaScript for optimal performance and ease of customization.

## 🎨 Features

### Content Sections
- **Image Editing Tutorials**: Comprehensive guides for Adobe Photoshop, GIMP, and Canva
- **Video Editing Tutorials**: Professional techniques for Adobe Premiere Pro, DaVinci Resolve, and Shotcut
- **Motion Graphics Tutorials**: Creative animations with Adobe After Effects and Blender
- **Resources Hub**: Curated links to download software, plugins, and stock assets
- **Tips & Tricks**: Productivity shortcuts, workflow optimizations, and best practices
- **Contact Form**: User-friendly form for feedback and inquiries

### Design Features
- ✨ Modern and elegant UI with a calming color palette
- 📱 Fully responsive design (desktop, tablet, and mobile)
- 🎯 Intuitive navigation with smooth scrolling
- 🖼️ High-quality images from Unsplash
- ⚡ Fast loading with optimized assets
- ♿ Accessibility-focused with keyboard navigation support
- 🎭 Smooth animations and transitions

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. That's it! No build process or dependencies required.

## 📁 Project Structure

```
creative-studio/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive features and functionality
└── README.md           # Project documentation
```

## 🎯 Key Sections

### 1. Hero Section
Eye-catching gradient background with:
- Compelling headline and subtitle
- Call-to-action buttons
- Statistics showcase (tutorials, software, free content)

### 2. Tutorial Sections
Three comprehensive sections covering:
- **Image Editing**: Photoshop, GIMP, Canva
- **Video Editing**: Premiere Pro, DaVinci Resolve, Shotcut
- **Motion Graphics**: After Effects, Blender

Each tutorial card includes:
- High-quality preview image
- Software description
- Topic tags
- Lesson breakdown
- Action button

### 3. Resources Section
Organized categories for:
- Software downloads (official links)
- Plugins & extensions
- Stock assets (photos, videos, audio)

### 4. Tips & Tricks
Interactive cards featuring:
- Keyboard shortcuts (clickable to copy)
- Performance optimization tips
- Workflow best practices
- Color grading techniques
- Quick editing tips

### 5. Contact Section
Professional contact form with:
- Name, email, subject, and message fields
- Form validation
- Success/error messaging
- Features showcase

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css` (lines 13-35):

```css
:root {
    --primary-color: #667eea;      /* Main brand color */
    --secondary-color: #764ba2;     /* Accent color */
    --accent-color: #f093fb;        /* Highlight color */
    /* ... more variables ... */
}
```

### Content
Modify `index.html` to update:
- Tutorial information
- Software descriptions
- Resource links
- Tips and shortcuts
- Contact information

### Fonts
Current fonts from Google Fonts:
- **Display**: Playfair Display (headings)
- **Body**: Inter (paragraphs and UI)

Change in the `<head>` section of `index.html`.

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ✨ Interactive Features

### Navigation
- Fixed navbar with scroll effects
- Mobile hamburger menu
- Smooth scrolling to sections
- Active link highlighting

### Forms
- Contact form with validation
- Newsletter subscription
- Success/error messaging
- Email format validation

### Animations
- Scroll-triggered card animations
- Hover effects on interactive elements
- Smooth transitions throughout
- Reduced motion support for accessibility

### User Experience
- Clickable shortcuts (copy to clipboard)
- Keyboard navigation support (Escape to close menu)
- Loading animations
- Debounced scroll events for performance

## 🔧 Customization Tips

### Adding New Tutorials
1. Copy an existing tutorial card structure from `index.html`
2. Update the image URL (use Unsplash or your own)
3. Modify the title, description, and lesson list
4. Adjust the badge if needed

### Adding New Resources
1. Locate the resources section in `index.html`
2. Add a new resource item within the appropriate category
3. Include title, description, and external link

### Modifying the Color Scheme
1. Update CSS variables in `styles.css`
2. Adjust gradient values for hero and buttons
3. Test contrast for accessibility

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Form Integration

The contact form currently uses a simulated submission. To integrate with a backend:

1. **Option 1: Email Service (Formspree, EmailJS)**
   ```javascript
   // In script.js, replace the setTimeout in form submission
   fetch('https://formspree.io/f/your-form-id', {
       method: 'POST',
       body: JSON.stringify(formData),
       headers: { 'Content-Type': 'application/json' }
   })
   ```

2. **Option 2: Custom Backend**
   - Create an API endpoint
   - Update the fetch URL in `script.js`
   - Handle CORS if needed

3. **Option 3: Static Form Services**
   - Netlify Forms
   - Getform
   - Basin

## 🎓 Learning Resources

This website demonstrates:
- Semantic HTML5
- Modern CSS (Flexbox, Grid, Custom Properties)
- Vanilla JavaScript (ES6+)
- Responsive design principles
- Accessibility best practices
- Performance optimization

## 📄 License

This project is open source and available for personal and commercial use. Feel free to customize and adapt it for your needs.

## 🤝 Contributing

Suggestions and improvements are welcome! Feel free to:
- Report issues
- Suggest new features
- Submit pull requests
- Share your customizations

## 📧 Support

For questions or support, use the contact form on the website or reach out through your preferred channel.

---

**Built with ❤️ for creators and learners**

Professional video editing, image editing, and motion graphics tutorials hub.
