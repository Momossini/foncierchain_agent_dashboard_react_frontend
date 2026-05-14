/**
 * City code mapping for parcel UID generation.
 */
const CITY_CODES: Record<string, string> = {
  'Brazzaville': 'BZV',
  'Pointe-Noire': 'PNR',
  'Dolisie': 'DLS',
  'Nkayi': 'NKY',
  'Ouésso': 'OSS',
};

/**
 * Returns a 3-letter code for a given city.
 * Defaults to the first 3 uppercase letters of the city name if not mapped.
 */
export const getCityCode = (city: string): string => {
  if (CITY_CODES[city]) return CITY_CODES[city];
  return city.substring(0, 3).toUpperCase();
};

/**
 * Extracts the increment index from a parcel UID (format: CODE-XXX-YEAR)
 */
export const extractIndex = (uid: string): number => {
  const parts = uid.split('-');
  if (parts.length < 2) return 0;
  const index = parseInt(parts[1], 10);
  return isNaN(index) ? 0 : index;
};

/**
 * Generates a unique parcel identifier based on city and existing parcels.
 * Format: <CITY_CODE>-<INCREMENT>-<YEAR>
 */
export const generateParcelUID = (city: string, existingParcels: any[] = []): string => {
  const year = new Date().getFullYear();
  const cityCode = getCityCode(city);

  // Filter parcels from the same city and same year
  const filtered = existingParcels.filter(p =>
    p.city === city &&
    p.parcelUid?.startsWith(cityCode) &&
    p.parcelUid?.endsWith(year.toString())
  );

  // Find the highest increment
  const lastIndex = filtered.length
    ? Math.max(...filtered.map(p => extractIndex(p.parcelUid)))
    : 0;

  const newIndex = String(lastIndex + 1).padStart(3, '0');

  return `${cityCode}-${newIndex}-${year}`;
};

/**
 * Formats an owner identifier with its type.
 * Format: <TYPE>-<NUMBER>
 */
export const formatOwnerId = (type: string, number: string): string => {
  if (!type || !number) return number || '';
  return `${type}-${number}`;
};

/**
 * Parses a structured owner identifier.
 */
export const parseOwnerId = (formattedId: string): { type: string; number: string } => {
  if (!formattedId || !formattedId.includes('-')) {
    return { type: 'CNI', number: formattedId || '' };
  }
  const [type, ...numberParts] = formattedId.split('-');
  return { type, number: numberParts.join('-') };
};
