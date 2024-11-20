# Portfolio

A modern, responsive portfolio website built with React and Tailwind CSS and ShadCN.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- [Git](https://git-scm.com/)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/) or others

### Installation

1. Clone the repository
```bash
git clone https://github.com/rakibul58/rakibul-portfolio.git
```

2. Navigate to the project directory
```bash
cd rakibul-portfolio
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173/`

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ShadCN](https://ui.shadcn.com/) - A collection of re-usable tailwind CSS components
- [Framer Motion](https://motion.dev/) - Motion uses hardware acceleration for smooth and eco-friendly animations.
- [Vite](https://vitejs.dev/) - Frontend build tool

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── components/    # React components
│   ├── assets/        # Images, fonts, etc.
│   ├── lib/           # Library.
│   ├── modules/       # Section of the project.
│   ├── pages/         # Pages of the project.
│   ├── utils/         # Utility functions.
│   ├── styles/        # Global styles
│   └── App.tsx        # Root component
├── public/            # Static files
├── index.html         # Entry point
└── tailwind.config.js # Tailwind configuration
```

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
```

## 📝 Development

### Making Changes

1. Create a new branch for your changes
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them
```bash
git add .
git commit -m "Add your commit message"
```

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build files will be in the `dist/` directory.

## 📦 Deployment

The project can be deployed to various platforms:

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React
- Tailwind
- ShadCN
- Framer Motion

## 📧 Contact

Muhammed Rakibul Hasan - [@rakibul_58](https://x.com/rakibul_58)
Live Link: [https://rakibul-developer-portfolio.vercel.app/](https://rakibul-developer-portfolio.vercel.app/)
Project Link: [https://github.com/rakibul58/rakibul-portfolio](https://github.com/rakibul58/rakibul-portfolio)