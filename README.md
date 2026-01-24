# myTasbih 🕌

A beautiful, Islamic-themed digital tasbih (prayer bead) counter built with React and Vite. Perfect for tracking your daily dhikr and tasbeeh.

## ✨ Features

- **Multiple Dhikr Options**: SubhanAllah, Alhamdulillah, Allahu Akbar, and Custom
- **Automatic Target Counting**: Each dhikr has its recommended count (33/34/100)
- **Persistent Storage**: Your progress is saved automatically using localStorage
- **Haptic Feedback**: Vibration feedback on mobile devices
- **Completion Celebration**: Beautiful animation when you reach your target
- **Islamic Design**: Elegant gradient backgrounds with gold accents and Arabic typography
- **Fully Responsive**: Works perfectly on mobile and desktop

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

### Build

```bash
npm run build
```

## 📦 Deployment to GitHub Pages

1. **Create a GitHub repository** named `myTasbih`

2. **Initialize git and push your code**:
```bash
git init
git add .
git commit -m "Initial commit: Islamic tasbih counter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/myTasbih.git
git push -u origin main
```

3. **Deploy to GitHub Pages**:
```bash
npm run deploy
```

4. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the sidebar
   - Select `gh-pages` branch as the source
   - Your site will be live at: `https://YOUR_USERNAME.github.io/myTasbih/`

## 🎨 Design Features

- **Color Scheme**: Deep teals and greens with gold accents
- **Typography**: Amiri font for Arabic text, Poppins for Latin
- **Animations**: Smooth transitions and hover effects
- **Glassmorphism**: Frosted glass effect on cards
- **Islamic Patterns**: Subtle geometric patterns in the background

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients, animations, and glassmorphism
- **LocalStorage API** - Persistent data storage
- **Vibration API** - Haptic feedback

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤲 Usage

1. Select your desired dhikr from the options
2. Tap the large circular button to increment the counter
3. The app will vibrate (on supported devices) with each tap
4. When you reach the target count, a celebration message appears
5. Use the Reset button to start over
6. Your progress is automatically saved

---

**May this app help you in your daily remembrance of Allah (SWT). Barakallahu feek! 🤲**
