# Latino Hustlers Academy

Landing en español de Costa Rica, implementada con React, TypeScript y Vinext. El endpoint `POST /api/leads` guarda en Cloudflare D1; no hay CRM, envíos de correo ni mensajes de WhatsApp automáticos conectados.

## Ejecución local

1. Node 22.13 o superior: `npm ci`.
2. `npm run build` genera la configuración local de Wrangler.
3. Aplicá la migración una sola vez por base local:
   `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_amusing_tusk.sql`
4. `npm run dev -- --hostname 127.0.0.1` abre el sitio en `http://127.0.0.1:5173`.

Los registros locales permanecen en `.wrangler/state`, excluida de Git. La base alojada es independiente y Sites aplica las migraciones al publicar. El binding `DB` se declara en `.openai/hosting.json`. No hacen falta claves públicas ni servicios externos para guardar. `.env.example` documenta esta configuración.

## Contenido y mantenimiento

- `lib/content.json`: contenido, precios, estados, preguntas y opciones del formulario.
- `app/page.tsx` y `app/globals.css`: composición editorial y estilos responsive.
- `components/lead-form.tsx`: pasos, mensajes, conservación en memoria y envío.
- `lib/validation.ts`: reglas compartidas, enums, exclusividad y teléfono internacional.
- `app/api/leads/route.ts`: validación, normalización E.164, almacenamiento, idempotencia y límite de frecuencia.
- `lib/privacy.ts`: datos del responsable pendientes de verificación.
- `lib/analytics.ts`: adaptador desactivado; solo habilitar un proveedor después del consentimiento correspondiente. Eventos sin datos personales ni respuestas completas.

El servidor guarda únicamente campos permitidos, una clasificación (`english_from_zero` para cero inglés), fecha e identificador de reintento. Los datos de contacto no se escriben en logs ni localStorage. Los errores conservan las respuestas. La validación de formación también se aplica en servidor.

Protecciones: honeypot, tiempo mínimo, verificación de origen, límite de longitud, diez envíos válidos por hora e IP y claves idempotentes únicas. Los contadores usan un hash de IP y ventana temporal y caducan tras una hora. En local se comparte el contador `local`; en Cloudflare se usa la IP de conexión. Son protecciones básicas, no sustituyen un CAPTCHA gestionado si el volumen de spam requiere uno.

## Verificación

`npx tsc --noEmit`, `npm run lint`, `npm run build`.

Con el servidor local activo: `node scripts/test-api.mjs`. El script crea registros **ficticios en la base local**, prueba aceptación con cero inglés, opciones de presupuesto y modalidad, reintento, conflicto, rechazo de empleo, aceptación ausente, enums, consentimiento, teléfonos, correo, nombres vacíos, exclusividad, honeypot, velocidad y origen.

## Antes del lanzamiento público

Completar identidad jurídica, canal verificado para consultas/retiro de consentimiento y política de conservación en `lib/privacy.ts` y el aviso. Confirmar condiciones, fechas y horarios; no se inventaron. El sitio de revisión se mantiene privado. Configurar el dominio definitivo y metadatos canonical/sitemap al abrir al público. Facilitar el logo original si se desea reemplazar la marca tipográfica provisional.

No hay exportador público de leads. La consulta debe hacerse con acceso autorizado a D1 o con las herramientas de base de datos de Sites; no publicar endpoints de lectura sin autenticación.

Fotografía ilustrativa: Anthony Shkraba, Pexels, recurso 5244025. No representa alumnado real. Tipografías: Manrope e Inter servidas por Google Fonts.

## Actualización: programas independientes
Rutas: `/ingles` y `/carreras-remotas`. `/` permite elegir la ruta sin formulario.
Contenido y trayectoria suministrada por el cliente: `lib/programs.json`.
Validación discriminada por `program_type`; almacenamiento en el payload existente con `program_type` y `form_id`, sin reclasificar registros históricos. No se requieren migraciones nuevas.
Las pruebas actuales son `node scripts/test-programs.mjs` con servidor local activo. Sustituyen al script anterior.
No se publicó automáticamente esta actualización. La versión alojada conserva la publicación previa hasta un despliegue explícito.
