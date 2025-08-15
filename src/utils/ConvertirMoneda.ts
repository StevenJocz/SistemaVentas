export const formatMoneda = (valor: string) => {
  // Quita puntos de miles y cambia coma por punto para decimales
  const numero = Number(valor);

  if (isNaN(numero)) return valor;

  return numero.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};