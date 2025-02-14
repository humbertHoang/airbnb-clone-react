# Airbnb Clone React

## Tech Stack

- **Frontend Framework:** React
- **Build Tool:** Vite 6
- **State Management:**
  - Redux Toolkit 2.5
  - React Redux 9.2
- **UI Components:**
  - Ant Design 5.24
  - Tailwind CSS 3.4
  - React Icons 5.4
- **Maps:**
  - Leaflet 1.9
  - React Leaflet 5.0
- **Forms & Validation:**
  - Formik 2.4
  - Yup 1.6
- **Routing:** React Router 7.1
- **HTTP Client:** Axios 1.7
- **Development Tools:**
  - TypeScript support
  - ESLint 9.20
  - Prettier 3.5
  - PostCSS 8.5

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/humbertHoang/airbnb-clone-react.git
cd airbnb-clone-react
```

2. **Install dependencies:**

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with necessary environment variables.

4. **Start the development server:**

```bash
npm run dev
# or
pnpm dev
```

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── redux/         # Redux store and slices
├── utils/         # Utility functions
├── theme/         # Theme configuration
├── App.jsx        # Main application component
└── main.jsx      # Application entry point
```

## Configuration

The project uses several configuration files:

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `postcss.config.js` - PostCSS configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is [MIT](LICENSE) licensed.
