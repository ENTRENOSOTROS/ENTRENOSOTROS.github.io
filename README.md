# Entre Nosotros

Pequeña web estática para compartir información y contacto.

## Contenido
Archivos esperados: `index.html`, `css/`, `js/`, `assets/`

## Ejecutar local
1. Abrir terminal en la carpeta del proyecto.
2. `python -m http.server 8080`
3. Abrir `http://localhost:8080`

## Despliegue (GitHub Pages)
- Para un sitio de usuario: nombra el repo `ENTRENOSOTROS.github.io` (esto publica en https://ENTRENOSOTROS.github.io).
- Para un repo normal: habilita Pages desde Settings → Pages → Branch: `main` → Folder: `/ (root)`.

## Notas de accesibilidad
- Añadir `alt` en imágenes y `lang="es"` en `<html>`.
- Añadir meta viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Revisar contraste, etiquetas ARIA y navegación por teclado.
- Ejecutar Lighthouse para auditorías automáticas.

## Licencia
MIT — ver LICENSE

---

Generado automáticamente por Copilot CLI para facilitar el despliegue en GitHub Pages.
