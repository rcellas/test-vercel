# Guía de Despliegue - TestVercel

Este documento detalla el proceso para desplgar la aplicación Angular en Vercel, incluyendo la configuración de variables de entorno crítica para el funcionamiento de la aplicación.

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com/).
- El código fuente alojado en un repositorio remoto (GitHub, GitLab, Bitbucket).
- Node.js instalado (para ejecución local).

## 📦 Configuraciones en package.json

Para que el flujo de trabajo funcione, se han realizado las siguientes modificaciones en el archivo `package.json`. Si estás configurando esto desde cero, asegúrate de incluir:

### 1. Scripts

Se han añadido/modificado los siguientes scripts para manejar la generación de entornos y el build en Vercel:

```json
"scripts": {
  "config": "node config-env.js",
  "build-vercel": "npm run config -- --environment=prod && ng build",
  ...
}
```

- **`config`**: Ejecuta el script `config-env.js` para generar el archivo de entorno.
- **`build-vercel`**: Script específico para Vercel. Primero ejecuta `config` pasando el argumento `--environment=prod` y luego lanza el build normal de Angular (`ng build`).

### 2. Dependencias de Desarrollo

El script `config-env.js` requiere las siguientes librerías para leer variables `.env` y procesar argumentos:

```json
"devDependencies": {
  "dotenv": "^17.2.3",
  "yargs": "^18.0.0",
  ...
}
```

Puedes instalarlas con:

```bash
npm install -D dotenv yargs
```

## ⚙️ Configuración del Script de Entorno (`config-env.js`)

Para manejar las variables de entorno de forma segura, este proyecto utiliza un script personalizado (`config-env.js`) que genera los archivos `environment.ts` antes de construir la aplicación.

### Dependencias Necesarias

Para que este script funcione, el proyecto necesita las siguientes librerías instaladas (ya incluidas en `package.json`):

- **`dotenv`**: Para leer variables de entorno.
- **`yargs`**: Para procesar argumentos en la línea de comandos.

> **Nota:** Al ejecutar `npm install` en Vercel (comando predeterminado), estas dependencias se instalan automáticamente.

### Funcionamiento

El script se ejecuta como parte del comando de build (`npm run build-vercel`).

1.  Lee la variable `API_URL` del entorno de Vercel.
2.  Crea el archivo `src/environments/environment.prod.ts` con esa URL.
3.  La aplicación de Angular usa ese archivo para saber a qué backend conectarse.

## � Configuración Paso a Paso en Vercel

Sigue estos pasos detallados para configurar y desplegar correctamente:

### 1. Importar el Proyecto

1.  En el dashboard de Vercel, haz clic en **"Add New..."** -> **"Project"**.
2.  Selecciona tu repositorio (GitHub/GitLab/Bitbucket) y haz clic en **"Import"**.

### 2. Configurar Build y Salida

En la pantalla de configuración (**Configure Project**), asegúrate de que los ajustes coincidan con lo siguiente:

- **Framework Preset:** `Angular` (Debería detectarse automáticamente).
- **Root Directory:** Déjalo en `./` (raíz).
- **Build Command:** `npm run build-vercel`
  - ⚠️ **CRÍTICO:** Debes activar la opción "Override" y escribir este comando exacto. Esto asegura que se ejecute el script `config-env.js` antes del build de Angular.
- **Output Directory:** `dist/test-vercel/browser`
  - (O el que corresponda a tu versión de Angular, verifícalo en `angular.json` si tienes dudas).

### 3. Configurar Variables de Entorno

En la sección **"Environment Variables"**:

1.  Añade una nueva variable:
    - **Key:** `API_URL`
    - **Value:** La URL de tu backend (ej. `https://mi-api-backend.com`)
2.  Asegúrate de que esté marcada para el entorno de **Production**.
3.  Haz clic en **"Add"**.

> **Nota IMPORTANTE:** Si esta variable no está configurada, el archivo `environment.prod.ts` no tendrá la URL correcta y la app fallará al conectar con el backend.

### 4. Desplegar

Haz clic en el botón **"Deploy"**.

- Vercel instalará dependencias (incluyendo `dotenv` y `yargs`).
- Ejecutará `npm run build-vercel`.
- El script generará el archivo de entorno con tu `API_URL`.
- Angular compilará la aplicación usando esa configuración.

---

## 💻 Desarrollo Local

Si necesitas ejecutar la aplicación en tu máquina local:

1.  Instala las dependencias:
    ```bash
    npm install
    ```
2.  Crea un archivo `.env` en la raíz del proyecto (opcional para local, pero recomendado):
    ```env
    API_URL=http://localhost:3000
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm start
    ```
    (Esto ejecuta `ng serve`).
