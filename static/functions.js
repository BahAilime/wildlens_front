module.exports = { convertDMSToDecimal, extractExifDate, extractCoordinates, formatExifDate };

/**
 * Convertit un tableau [degrés, minutes, secondes] en une latitude/longitude décimale.
 * Si le référence (ref) est 'S' (Sud) ou 'W' (Ouest), la valeur retournée sera n gative.
 * @param {Array<number>} dms Tableau [degr s, minutes, secondes]
 * @param {String} ref Référence (N, S, E, W)
 * @returns {number} Latitude/longitude en décimale
 */
function convertDMSToDecimal(dms, ref) {
    if (!Array.isArray(dms)) return null;
    const [deg, min, sec] = dms;
    let decimal = deg + min / 60 + sec / 3600;
    if (ref === 'S' || ref === 'W') decimal *= -1;
    return decimal;
}

/**
 * Renvoie la date de prise de vue enregistrée dans les métadonnées EXIF.
 * Si plusieurs champs de date sont présents, la priorité est donnée à
 * DateTimeOriginal, puis DateTimeDigitized, etc.
 * Si aucune date n'est trouvée, renvoie la date actuelle.
 * @param {Object} exifData Données EXIF
 * @returns {String} Date en format ISO (YYYY-MM-DDTHH:MM:SSZ)
 */
function extractExifDate(exifData) {
    const dateFields = [
        'DateTimeOriginal',
        'DateTimeDigitized',
        'DateTime',
        'CreateDate',
        'CreationDate',
        'ModifyDate'
    ];

    for (const field of dateFields) {
        if (exifData[field]) {
            return formatExifDate(exifData[field]);
        }
    }
    const date = new Date();
    return date.toISOString();
}

/**
 * Convertit une date au format EXIF en un objet Date.
 * @param {String|Date|Number} rawDate Date brute au format EXIF ("2023:07:14 10:45:30")
 * @returns {Date} Objet Date correspondant, ou null si la conversion a échouée
 * @throws {TypeError} Si l'argument n'est pas de type string ou number
 */
function formatExifDate(rawDate) {
    // Exemple EXIF : "2023:07:14 10:45:30"
    if (typeof rawDate !== "string" && typeof rawDate !== "number") {
        throw new TypeError("Invalid input type for formatExifDate. Expected string or number.");
      }

    if (typeof rawDate === 'string') {
        const parts = rawDate.split(' ');
        const datePart = parts[0].replace(/:/g, '-');
        const timePart = parts[1];
        const formattedDate = `${datePart}T${timePart}`;
        const isoString = formattedDate.length >= 19 ? formattedDate : formattedDate + ':00Z';
        return new Date(isoString);
    } else if (typeof rawDate === 'number') {
        return new Date(rawDate)
    }
}

/**
 * Tente d'extraire les coordonnées GPS (latitude et longitude) d'un objet EXIF.
 * Recherche les champs suivants, dans cet ordre :
 * - GPSLatitude et GPSLatitudeRef
 * - Latitude et LatitudeRef
 * - lat, latitude, Lat
 * - GPSLongitude et GPSLongitudeRef
 * - Longitude et LongitudeRef
 * - lon, longitude, Lng, Long
 * - Location (format "Latitude, Longitude")
 * Si aucune coordonnée n'est trouvée, renvoie { latitude: -1, longitude: -1 }.
 * @param {Object} exifData Donn es EXIF
 * @returns {Object|null} Objet contenant les coordonnées GPS, ou null si la
 * coordonnée n'a pas pu être trouvée
 */
function extractCoordinates(exifData) {
    let lat = null;
    let lon = null;

    // Latitude
    if (exifData.GPSLatitude && exifData.GPSLatitudeRef) {
        lat = convertDMSToDecimal(exifData.GPSLatitude, exifData.GPSLatitudeRef);
    } else if (exifData.Latitude && exifData.LatitudeRef) {
        lat = convertDMSToDecimal(exifData.Latitude, exifData.LatitudeRef);
    } else if (exifData.lat || exifData.latitude || exifData.Lat) {
        lat = exifData.lat || exifData.latitude || exifData.Lat;
    }

    // Longitude
    if (exifData.GPSLongitude && exifData.GPSLongitudeRef) {
        lon = convertDMSToDecimal(exifData.GPSLongitude, exifData.GPSLongitudeRef);
    } else if (exifData.Longitude && exifData.LongitudeRef) {
        lon = convertDMSToDecimal(exifData.Longitude, exifData.LongitudeRef);
    } else if (exifData.lon || exifData.longitude || exifData.Lng || exifData.Long) {
        lon = exifData.lon || exifData.longitude || exifData.Lng || exifData.Long;
    }

    // Alternative string format genre "Location": "43.467448, 11.885126"
    if ((!lat || !lon) && exifData.Location) {
        const match = exifData.Location.match(/(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/);
        if (match) {
            lat = parseFloat(match[1]);
            lon = parseFloat(match[3]);
        }
    }

    if (lat !== null && lon !== null) {
        return { latitude: lat, longitude: lon };
    } else {
        return { latitude: -1, longitude: -1 };
    }
}
