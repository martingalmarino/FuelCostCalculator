/**
 * Convierte nombres de ciudades en slugs para URLs
 * @param from - Ciudad de origen
 * @param to - Ciudad de destino
 * @returns Slug formateado para la URL
 */
export const slugify = (from: string, to: string): string => {
  const fromSlug = from.toLowerCase().replace(/\s+/g, '-');
  const toSlug = to.toLowerCase().replace(/\s+/g, '-');
  return `${fromSlug}-to-${toSlug}`;
};

/**
 * Convierte un slug de vuelta a nombres de ciudades
 * @param slug - Slug de la URL
 * @returns Objeto con from y to ciudades
 */
export const deslugify = (slug: string): { from: string; to: string } => {
  const parts = slug.split('-to-');
  if (parts.length !== 2) {
    throw new Error('Invalid slug format');
  }
  
  const from = parts[0].split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const to = parts[1].split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return { from, to };
};
