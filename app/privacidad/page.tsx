import Link from "next/link";
import { privacy } from "../../lib/privacy";
export default function Privacy() {
  return (
    <main className="privacy">
      <Link href="/">← Volver a la academia</Link>
      <h1>Aviso de privacidad</h1>
      <p>
        Este aviso describe el formulario de interés de {privacy.responsible}.
      </p>
      <h2>Qué información solicitamos</h2>
      <p>
        Tu nombre, WhatsApp, correo, programa elegido y, según el formulario, destinatario del programa, nivel de inglés,
        intereses de formación, disponibilidad, preferencias de modalidad,
        disposición de inversión y autorización de contacto.
      </p>
      <h2>Para qué se usa</h2>
      <p>
        Para conocer la demanda de formación y permitir que la academia te
        contacte por WhatsApp o correo acerca de los programas que te interesan.
        El registro no constituye una matrícula ni una solicitud de empleo. Este
        sitio no envía mensajes automáticos.
      </p>
      <h2>Dónde se guarda</h2>
      <p>
        Los registros se guardan en una base de datos Cloudflare D1, mediante el
        alojamiento Sites de OpenAI y Cloudflare. No guardamos tus datos de
        contacto en el almacenamiento local de tu navegador. Mientras completás
        el formulario, las respuestas permanecen en la memoria de la página.
      </p>
      <p>
        Para limitar intentos automatizados, el servidor mantiene un
        identificador derivado de la dirección IP y una ventana de tiempo, con
        contadores que vencen tras una hora y se eliminan durante solicitudes
        posteriores. No se incluyen datos de contacto en los registros de
        errores. No hay proveedores de analítica ni píxeles publicitarios
        activos. Las tipografías se solicitan a Google Fonts, que recibe los
        datos de conexión necesarios para servirlas.
      </p>
      <h2>Tu autorización</h2>
      <p>
        La autorización de contacto es voluntaria, no se preselecciona y se
        limita a la formación de tu interés. Podés salir sin enviar el
        formulario; las respuestas parciales no se transmiten.
      </p>
      <h2>Información pendiente antes del lanzamiento público</h2>
      <p>
        La identidad jurídica del responsable, el canal verificado para
        consultas, retiro de autorización y solicitudes sobre datos, y el plazo
        de conservación de registros deben ser proporcionados por la academia.
        Esta versión de revisión no está lista para captar datos del público.
      </p>
    </main>
  );
}

