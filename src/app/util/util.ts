


export function utcToFrontDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}


export function localToUtc(localDateString: string): string {
  if (!localDateString) return '';

  const date = new Date(localDateString);
  if (isNaN(date.getTime())) return '';

  return date.toISOString(); // Devuelve en UTC
}
export function utcToLocal(utcDateString: string): string {
   if (!utcDateString) return '';

  const date = new Date(utcDateString);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  // Formato compatible con input datetime-local
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}