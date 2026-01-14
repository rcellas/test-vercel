# 🚀 Despliegue en Netlify

## 📋 Configuración

Esta rama está preparada para desplegar en **Netlify** usando variables de entorno.

### Paso 1: Conectar Repositorio

1. Ve a [netlify.com](https://netlify.com)
2. Click en "Add new site" → "Import an existing project"
3. Conecta con GitHub
4. Selecciona el repositorio `test-vercel`
5. **Importante**: Selecciona la rama `netlify`

### Paso 2: Configuración de Build

Netlify detectará automáticamente la configuración desde `netlify.toml`:

```toml
[build]
  command = "npm run build-vercel"
  publish = "dist/test-vercel/browser"
```

**No necesitas cambiar nada**, pero verifica que muestre:

- **Build command**: `npm run build-vercel`
- **Publish directory**: `dist/test-vercel/browser`

### Paso 3: Variables de Entorno

Antes de hacer deploy, configura las variables:

1. Ve a **Site settings** → **Environment variables**
2. Click en "Add a variable"
3. Añade:
   - **Key**: `API_URL`
   - **Value**: `https://rickandmortyapi.com/api`
   - **Scopes**: Todas (Production, Deploy previews, Branch deploys)

### Paso 4: Deploy

Click en **"Deploy site"** y espera a que termine.

## 🔄 Cómo Funciona

El proceso es idéntico a Vercel:

1. Netlify ejecuta `npm install`
2. Ejecuta `npm run build-vercel`
   - `npm run config -- --environment=prod`
   - Lee `process.env.API_URL` de Netlify
   - Crea `src/environments/`
   - Genera `environment.prod.ts`
   - Ejecuta `ng build`
3. Publica `dist/test-vercel/browser`

## ✅ Ventajas de Netlify

- ✅ Deploy automático en cada push
- ✅ Deploy previews para cada PR
- ✅ Rollback fácil a versiones anteriores
- ✅ CDN global automático
- ✅ HTTPS automático

## 🔀 Diferencias con Vercel

| Característica | Vercel        | Netlify        |
| -------------- | ------------- | -------------- |
| Configuración  | `vercel.json` | `netlify.toml` |
| Variables      | Dashboard     | Dashboard      |
| Build command  | Igual         | Igual          |
| Deploy         | Automático    | Automático     |

## 📝 Archivos Específicos de Netlify

- `netlify.toml` - Configuración de build
- `NETLIFY.md` - Esta documentación

## 🎓 Para Estudiantes

Esta rama demuestra que la **misma estrategia de variables de entorno** funciona en diferentes plataformas:

- ✅ Mismo código
- ✅ Mismo script `config-env.js`
- ✅ Solo cambia el archivo de configuración

## 🔗 Recursos

- [Netlify Docs](https://docs.netlify.com/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)
