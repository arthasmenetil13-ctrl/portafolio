# Portafolio · Carlos Llanos

Sitio personal de Carlos Andrés Llanos Arrieta, desarrollador full stack en Sincelejo, Colombia.
Español en `/` e inglés en `/en`.

Hecho con Next.js 16 (App Router), TypeScript y Tailwind CSS 4. Todas las páginas son estáticas.

## Correr en local

```bash
npm install
npm run dev -- -p 3200
```

Abre http://localhost:3200.

## Dónde está cada cosa

| Archivo | Qué contiene |
| --- | --- |
| `src/content/site.ts` | Todo el texto en español e inglés, el stack, la trayectoria y las certificaciones |
| `src/components/Portfolio.tsx` | La página completa |
| `src/components/Board.tsx` | El tablero «Hoy se vigila» y el aviso (datos de ejemplo) |
| `src/components/StackMap.tsx` | El mapa de cómo está armado Estados Judiciales |
| `src/app/globals.css` | Colores, placas, filete y animaciones del mundo de rótulo |
| `PRODUCT.md` | Qué es el sitio, para quién y qué no se puede afirmar |

## Agregar un proyecto nuevo

1. En `src/content/site.ts`, mueve el proyecto de `shop.items` (En el taller) a donde corresponda, o agrega uno nuevo, en `es` y en `en`.
2. Si el proyecto usa una tecnología nueva, agrégala a `stack`.
3. Corre `npm run build` para comprobar que compila.

## Publicar en Vercel

1. Sube el repositorio a GitHub.
2. En vercel.com, importa el repositorio. No hace falta configurar nada: Vercel detecta Next.js.
3. Cuando tengas la URL, ponla en la sección Destacado de tu LinkedIn.
