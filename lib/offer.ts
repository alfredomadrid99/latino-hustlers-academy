type EnrollmentSnapshot = {
  scope: "shared";
  confirmed: number;
};

export const regularPrice = { monthly: "₡34.900", enrollment: "₡19.000" };

export const launchOffer = {
  scope: "shared",
  limit: 50,
  monthly: "₡25.000",
  enrollment: "₡10.000",
  title: "Oferta para los primeros 50 en matricularse",
  note: "Registrarte nos permite contactarte. El cupo promocional se confirma con la matrícula.",
  formNote:
    "Este formulario registra tu interés. La tarifa promocional se confirma al matricularte, según la disponibilidad de la oferta para los primeros 50 estudiantes.",
};

export function getOffer(enrollments?: EnrollmentSnapshot) {
  // The caller must supply confirmed promotional enrollments for the authorized scope.
  const confirmed =
    enrollments?.scope === launchOffer.scope
      ? enrollments.confirmed
      : undefined;
  const remaining =
    confirmed === undefined || !Number.isSafeInteger(confirmed) || confirmed < 0
      ? undefined
      : Math.max(0, launchOffer.limit - confirmed);

  if (remaining === 0) {
    return {
      closed: true,
      title: "La promoción de los primeros 50 estudiantes ya se completó",
      price: regularPrice,
      note: "Registrá tu interés para recibir información sobre la matrícula.",
      cta: "Registrar mi interés en el programa",
    };
  }

  return {
    closed: false,
    title:
      remaining === undefined
        ? `${launchOffer.title}. Consultá disponibilidad.`
        : `Quedan ${remaining} cupos con precio promocional`,
    price: launchOffer,
    note: launchOffer.note,
    cta: "Quiero registrar mi interés en la oferta",
  };
}
