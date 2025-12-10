# Modern React 3D Resume (Yan Yuqi)

A high-performance, interactive personal resume website built with modern web technologies. Features a cyberpunk/glassmorphism aesthetic, 3D interactive elements, and privacy protection.

## ✨ Features

- **Tech Stack**: React 18, Vite, Tailwind CSS v4, Three.js (@react-three/fiber), Framer Motion.
- **Visuals**: Dark mode, glassmorphism cards, neon gradients, and ambient lighting.
- **3D Interaction**: Real-time 3D rendering of identity/name with mouse parallax effects.
- **Privacy Lock**: Sensitive information (Phone, Email) is encrypted behind a verification modal.
- **Bilingual**: Instant toggling between Chinese and English.
- **Animations**: Staggered content entry, typewriter effects, and hover interactions.

## 🛠️ Requirements

Before running this project, ensure you have the following installed:

- **Node.js**: Version 16.0.0 or higher (Recommended: v18+).
- **npm**: Usually comes with Node.js.

## 🚀 Installation

1.  **Unzip/Clone the repository** to your local machine.
2.  Open a terminal in the project root directory.
3.  **Install dependencies**:

    ```bash
    npm install
    ```

## 💻 Usage

### Development Mode
To start the local development server with hot-reload:

```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
To build the project for deployment:

```bash
npm run build
```
The optimized files will be generated in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## 🔒 Verification
The default password to unlock the private identity section is: **123456**

## 📄 Font Support
This project uses **Noto Sans SC** from Google Fonts to ensure Chinese characters render correctly on all devices. An internet connection is required on the first load to fetch these fonts.
