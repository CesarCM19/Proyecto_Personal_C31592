# Referencias Bibliográficas

Este documento contiene las fuentes académicas y técnicas utilizadas como base teórica y práctica para el diseño, desarrollo e implementación de la landing page **Jose Santana - Fotografía de Bodas**. La estructura sigue las normas **APA 7.ª edición** para el cumplimiento de requisitos en proyectos universitarios.

---

## 1. Tecnologías de Desarrollo Frontend

*   **React (Librería Core):**
    *   *Referencia:* Facebook Open Source. (2023). *React - A JavaScript library for building user interfaces*. Meta Platforms, Inc. Recuperado de [https://react.dev](https://react.dev)
    *   *Descripción:* Utilizado para la creación de componentes modulares y la gestión reactiva del DOM a través de estados virtuales.

*   **Vite (Entorno de Desarrollo):**
    *   *Referencia:* Evan You. (2024). *Vite - Next Generation Frontend Tooling*. Recuperado de [https://vite.dev](https://vite.dev)
    *   *Descripción:* Entorno de desarrollo rápido y empaquetador utilizado para compilar la aplicación React y optimizar los recursos para producción.

---

## 2. Programación de Interfaz Interactiva y Lightbox desde Cero

*   **Lightbox Nativo con React (Gestión de Teclado y Eventos):**
    *   *Referencia:* React Community. (2023). *Synchronizing with Effects (useEffect)*. React Docs. Recuperado de [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)
    *   *Descripción:* Guía técnica para implementar escuchadores de teclado a nivel global (`keydown`) para permitir el control de las imágenes en el Lightbox usando las teclas `Escape` y las flechas de navegación sin generar fugas de memoria.

*   **Control del Audio mediante Referencias (useRef):**
    *   *Referencia:* Mozilla Developer Network (MDN). (2023). *Web Audio API & HTMLMediaElement*. MDN Web Docs. Recuperado de [https://developer.mozilla.org/es/docs/Web/API/HTMLMediaElement](https://developer.mozilla.org/es/docs/Web/API/HTMLMediaElement)
    *   *Descripción:* Patrón de manipulación directa del nodo multimedia de audio HTML5 usando referencias (`useRef`) para el control dinámico de reproducción.

---

## 3. Validación de Formularios y Seguridad Básica

*   **Validación de Entradas mediante Expresiones Regulares:**
    *   *Referencia:* Goyvaerts, J. (2021). *Regular Expressions Cookbook* (2.ª ed.). O'Reilly Media.
    *   *Descripción:* Patrones RegEx aplicados para validar la estructura sintáctica de correos electrónicos y restringir entradas vacías o caracteres inválidos en el formulario de reservas.

*   **Manejo de Estados Controlados en Formularios de React:**
    *   *Referencia:* React Community. (2022). *Controlled Components in Forms*. React Docs. Recuperado de [https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
    *   *Descripción:* Enfoque de estados de React para centralizar los inputs de reserva.

---

## 4. Diseño de Interfaz de Usuario (UI) y CSS Responsivo

*   **Diseño de Cuadrículas Adaptativas (CSS Grid y Flexbox):**
    *   *Referencia:* Coyier, C. (2023). *A Complete Guide to Flexbox & Grid*. CSS-Tricks. Recuperado de [https://css-tricks.com](https://css-tricks.com)
    *   *Descripción:* Técnicas aplicadas en `index.css` para el posicionamiento responsivo del formulario de dos columnas y las tarjetas de testimonios.

*   **Estilos y Paletas de Colores de Lujo en Diseño Web:**
    *   *Referencia:* W3C. (2023). *CSS Color Module Level 3*. World Wide Web Consortium. Recuperado de [https://www.w3.org/TR/css-color-3/](https://www.w3.org/TR/css-color-3/)
    *   *Descripción:* Guía técnica para la correcta implementación de colores HSL y RGBA traslúcidos para crear interfaces de tipo minimalista y lujoso en fotografía social.

---

## 5. Licencias de Recursos Multimedia Utilizados

Este apartado detalla el origen y las licencias libres de uso de los recursos interactivos de la aplicación:

### A. Video de Fondo (Sección Hero)
*   **Recurso:** Video de novios caminando de la mano a cámara lenta.
*   **Ruta de Origen:** `/video-boda.mp4` (Archivo de video local en la carpeta `public/`).
*   **Licencia:** *Mixkit Free Video License* (Permite el uso en proyectos académicos, comerciales y personales sin necesidad de atribución obligatoria).
*   **Sitio Oficial:** [Mixkit License](https://mixkit.co/license/)

### B. Clips de Audio de Testimonios
*   **Recurso:** 3 archivos de audio instrumental simulando notas de voz de parejas casadas.
*   **Rutas de Origen:**
    *   *Clip 1:* `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`
    *   *Clip 2:* `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3`
    *   *Clip 3:* `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3`
*   **Licencia:** *SoundHelix Audio - Free Test Audio Clips* (Bajo licencia libre de dominio público / Creative Commons para fines de testeo y desarrollo).
*   **Sitio Oficial:** [SoundHelix](https://www.soundhelix.com)

### C. Fotografías (Galería y Avatares de Parejas)
*   **Recurso:** 8 fotos artísticas de bodas y 3 retratos de avatares en `datos.json`.
*   **Ruta de Origen:** Fotografías cargadas desde el dominio oficial de Unsplash (e.g. IDs: `1511285560929`, `1519741497674`, `1515934751635`, `1465495976277`, `1507504038482`, `1522673607200`, `1543157145`, `1519225495810`).
*   **Licencia:** *Unsplash License* (Imágenes de uso gratuito para fines comerciales y no comerciales; no requiere permiso ni atribución obligatoria).
*   **Sitio Oficial:** [Unsplash License](https://unsplash.com/license)
