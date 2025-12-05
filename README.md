# cs.ai (May be give it a different name)

A chat UI built with React, TypeScript, and Vite.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Core Folders & Files](#core-folders--files)
- [Development Notes](#development-notes)
- [License](#license)

---

## Project Structure

```
cs.ai/
├── sdk/                # Local AI SDK (core logic, types, utils)
├── src/                # Main React application source
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layout/         # Layout components (sidebars, main layout)
│   ├── App.tsx         # App entry point
│   └── main.tsx        # Vite entry point
├── public/             # Static assets
├── vite.config.ts      # Vite configuration (with API proxy)
├── package.json        # Project dependencies and scripts
└── README.md           # This documentation
```

---

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build

---

## Core Folders & Files

### `/src`

- **App.tsx** – Main application component, wraps the UI in error boundaries and layout.
- **components/** – Contains UI elements such as chat containers, message lists, input fields, model selectors, and navigation.
- **hooks/** – Custom React hooks for chat and model logic.
- **layout/** – Layout components for sidebars and main content.

### `/sdk`

- **core/** – Core SDK logic for interacting with AI models.
- **types/** – TypeScript types for chat, models, and API responses.
- **utils/** – Utility functions and error handling for the SDK.

### `/vite.config.ts`

- Configures Vite, including a proxy for `/api` requests to the backend AI server.

---

## Development Notes

- **API Proxy:**  
  All `/api` requests are proxied to `http://ollama.cs.oberlin.edu:11434` (see `vite.config.ts`).

- **TypeScript:**  
  The project uses strict typing for safety and maintainability.

- **Component Structure:**  
  The UI is modular, with separate components for chat, models, navigation, and layout.

---

## License

MIT License. See [LICENSE](LICENSE) for details.