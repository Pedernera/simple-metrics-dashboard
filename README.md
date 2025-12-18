# Simple Metrics Dashboard

Dashboard web construido con **React + TypeScript** para visualizar métricas, filtrar datos y exportarlos a Excel de forma simple y rápida.

👉 Pensado para reemplazar Excel/Sheets en casos donde solo necesitás ver, filtrar y descargar datos sin sistemas complejos.

---

## 🚀 Demo
🔗 https://simple-metrics-dashboard.vercel.app/

---

## ✨ Features
- KPIs automáticos:
  - Total
  - Promedio
  - Máximo
  - Cantidad de registros
- Tabla de datos
- Búsqueda por texto
- Filtro por categoría
- Exportación a CSV (compatible con Excel ES)
- Persistencia de filtros (LocalStorage)
- Sin backend
- Deploy automático con Vercel

---

## 🧩 Use cases
- Freelancers que manejan reportes
- Pequeños negocios
- Creadores de contenido
- Equipos chicos
- Traders retail
- Cualquier persona que hoy usa Excel solo para filtrar datos

---

## 🛠️ Tech Stack
- React
- TypeScript
- Vite
- LocalStorage
- CSV export
- Vercel

---

## 📸 Screenshots
![Dashboard](screenshots/dashboard.png)
![Filters](screenshots/filters.png)

---

## 🧠 Arquitectura
- Hooks personalizados (`useMetrics`, `useFilters`, `useLocalStorage`)
- Componentes reutilizables
- Datos desacoplados (mock / API ready)
- Sin dependencias innecesarias

---

## 📦 Instalación local

```bash
npm install
npm run dev
