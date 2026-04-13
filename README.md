# ShopHub - Modern E-Commerce Platform

Un e-commerce moderno construido con el stack MERN (MongoDB, Express, React, Node.js) con enfoque en frontend, demostrando habilidades full-stack avanzadas para aplicaciones profesionales.

## 🚀 Stack Técnico

### Frontend
- **React 18** con TypeScript (strict mode)
- **Vite** - Build tool moderno y rápido
- **TailwindCSS** - Utilidades CSS
- **React Router v6** - Enrutamiento
- **React Query (@tanstack/react-query)** - State management del servidor
- **Zustand** - Global state management (carrito)
- **Axios** - HTTP client
- **Lucide React** - Iconos

### Backend
- **Node.js + Express** - Servidor REST
- **MongoDB + Mongoose** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **CORS** - Cross-origin requests
- **dotenv** - Variables de entorno

### Deploy
- **Frontend**: Vercel
- **Backend**: Railway

## 📁 Estructura del Proyecto

```
shophub/
├── frontend/              # Aplicación React con Vite
│   ├── src/
│   │   ├── api/          # Llamadas HTTP con Axios
│   │   ├── components/   # Componentes reutilizables
│   │   ├── features/     # Módulos por feature (auth, products, etc)
│   │   ├── hooks/        # Custom hooks
│   │   ├── router/       # Configuración de rutas
│   │   ├── store/        # Zustand stores
│   │   ├── types/        # TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/               # Servidor Express + MongoDB
│   ├── src/
│   │   ├── config/       # Configuración (BD, etc)
│   │   ├── controllers/  # Controladores (lógica)
│   │   ├── middleware/   # Middleware (auth, etc)
│   │   ├── models/       # Esquemas Mongoose
│   │   ├── routes/       # Rutas REST
│   │   └── utils/        # Funciones auxiliares
│   ├── server.js         # Punto de entrada
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## ✨ Features Principales

1. **Catálogo de Productos**
   - Listado dinámico
   - Filtros avanzados
   - Búsqueda

2. **Carrito de Compras**
   - Persistencia en localStorage
   - Actualización en tiempo real

3. **Autenticación**
   - Registro e inicio de sesión
   - JWT tokens
   - Protección de rutas

4. **Checkout**
   - Flujo completo de compra
   - Validación de formularios

5. **Admin Panel**
   - CRUD de productos
   - Gestión de categorías

6. **Dashboard de Usuario**
   - Historial de órdenes
   - Perfil de usuario

## 🛠️ Instalación

### Requisitos
- Node.js 18+
- npm o yarn
- MongoDB local o Atlas

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Configura las variables de entorno en .env
npm run dev
```

## 📝 Convenciones de Código

- **TypeScript Strict Mode** en frontend
- **Nombres de archivos**: PascalCase para componentes, camelCase para utils
- **Componentes funcionales** con hooks
- **TailwindCSS** para estilos (no CSS modules)
- **Error/Loading states** en todo componente
- **Validación** frontend y backend

## 🚢 Deploy

### Frontend (Vercel)
```bash
npm run build
vercel
```

### Backend (Railway)
```bash
git push origin main
# Railway conectará automáticamente
```

## 📄 Licencia

Proyecto de portafolio personal.
