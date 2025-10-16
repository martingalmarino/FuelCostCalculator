# Fuel Cost Calculator NZ

Una calculadora SEO-friendly para estimar el costo de combustible entre ciudades de Nueva Zelanda, construida con Next.js y TypeScript.

## 🚀 Características

- **Calculadora Interactiva**: Calcula el costo de combustible entre ciudades de NZ
- **Páginas SEO Optimizadas**: Cada ruta tiene su propia página con metadatos optimizados
- **Responsive Design**: Funciona perfectamente en móviles y desktop
- **Static Generation**: Todas las páginas se generan estáticamente para mejor SEO

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Static JSON Data**

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🏗️ Estructura del Proyecto

```
FuelCostCalculator/
├── app/
│   ├── components/          # Componentes React
│   │   ├── FuelForm.tsx    # Formulario principal
│   │   └── ResultCard.tsx  # Tarjeta de resultados
│   ├── data/
│   │   └── distances.json  # Datos de distancias entre ciudades
│   ├── route/[slug]/       # Páginas dinámicas de rutas
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── lib/                    # Utilidades y funciones
│   ├── calculateFuelCost.ts
│   ├── slugify.ts
│   └── types.ts
└── tailwind.config.js      # Configuración de Tailwind
```

## 🧮 Fórmula de Cálculo

```
Costo = (Distancia × Consumo ÷ 100) × Precio
```

**Valores por defecto:**
- Consumo: 7 L/100 km
- Precio: NZD 2.90/L

## 🎯 Rutas Disponibles

El sitio incluye 33 rutas principales entre ciudades de Nueva Zelanda:

- Auckland ↔ Wellington (640 km)
- Auckland ↔ Christchurch (via ferry)
- Christchurch ↔ Queenstown (480 km)
- Y muchas más...

## 📈 SEO Features

- **Metadatos optimizados** para cada página de ruta
- **Schema JSON-LD** para preguntas frecuentes
- **Open Graph** y **Twitter Cards**
- **Sitemap automático** (generado por Next.js)
- **URLs amigables** con slugs


## 🚀 Deployment

El proyecto está optimizado para deploy en **Vercel**:

1. Conecta tu repositorio a Vercel
2. El build se ejecutará automáticamente
3. Todas las rutas se pre-renderizarán estáticamente


## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado para ayudar a los viajeros de Nueva Zelanda a planificar sus viajes por carretera.**
