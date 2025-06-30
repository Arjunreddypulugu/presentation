# Modern Presentation Website

A modern, minimal presentation website with a nested structure for internship presentations. Built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Smooth slide transitions and animations
- Keyboard navigation support
- Fullscreen presentation mode
- URL-based navigation
- Modern, clean UI with hover effects
- Easy to customize and extend

## Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── assets/            # Directory for images and other assets
│   ├── logo.png       # Company logo
│   └── profile.jpg    # Profile photo
└── README.md          # This file
```

## Setup

1. Clone this repository
2. Add your assets:
   - Place your company logo in `assets/logo.png`
   - Add your profile photo as `assets/profile.jpg`
3. Customize the content:
   - Update the introduction text in `index.html`
   - Modify the presentation slides in `script.js`
   - Adjust colors and styling in `styles.css`

## Customization

### Adding Slides

To add new slides, modify the `presentations` object in `script.js`. Each section (finished, progress, future) can have its own set of slides:

```javascript
const presentations = {
    finished: {
        title: "Finished Projects",
        slides: [
            {
                title: "Your Slide Title",
                content: "Your slide content here"
            }
        ]
    }
    // ... other sections
};
```

### Styling

The website uses CSS variables for easy customization. You can modify the color scheme and other properties in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --background-color: #ffffff;
    --text-color: #1f2937;
    --transition-speed: 0.3s;
}
```

## Navigation

- Use arrow keys to navigate between slides
- Press ESC to return to the main menu
- Click the fullscreen button for presentation mode
- Use the navigation cards on the landing page to access different sections

## Browser Support

The website works best in modern browsers that support:
- CSS Grid
- CSS Variables
- CSS Transitions
- Fullscreen API
- ES6+ JavaScript features

## License

MIT License - feel free to use and modify for your needs. 