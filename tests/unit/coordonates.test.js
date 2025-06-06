const { convertDMSToDecimal, extractCoordinates } = require("../../static/functions.js")
const { exifExemple } = require("./exif_exemple.js");

describe("exifExemple", () => {
    test("exifExemple returns an object", () => {
        expect(exifExemple).toBeInstanceOf(Object);
    });
})

describe("convertDMSToDecimal", () => {
    it("[HAPPY PATH] converts DMS to decimal degrees for Northern latitude", () => {
        expect(convertDMSToDecimal([12, 34, 56], "N")).toBeCloseTo(12.582222);
    });

    it("[HAPPY PATH] converts DMS to decimal degrees for Southern latitude", () => {
        expect(convertDMSToDecimal([12, 34, 56], "S")).toBeCloseTo(-12.582222);
    });

    it("[HAPPY PATH] converts DMS to decimal degrees for Eastern longitude", () => {
        expect(convertDMSToDecimal([12, 34, 56], "E")).toBeCloseTo(12.582222);
    });

    it("[HAPPY PATH] converts DMS to decimal degrees for Western longitude", () => {
        expect(convertDMSToDecimal([12, 34, 56], "W")).toBeCloseTo(-12.582222);
    });

    it("[HAPPY PATH] handles edge cases", () => {
        expect(convertDMSToDecimal([0, 0, 0], "N")).toBe(0);
        expect(convertDMSToDecimal([90, 0, 0], "N")).toBe(90);
        expect(convertDMSToDecimal([0, 60, 0], "N")).toBe(1);
    });

    it("[WEIRD PATH] handles invalid reference values", () => {
        expect(convertDMSToDecimal([12, 34, 56], "X")).toBeCloseTo(12.582222); // no effect
        expect(convertDMSToDecimal([12, 34, 56], "")).toBeCloseTo(12.582222); // no effect
    });

    it("[BAD PATH] throws error for non-array input", () => {
        expect(() => convertDMSToDecimal("123", "N")).toThrow(TypeError);
        expect(() => convertDMSToDecimal({}, "N")).toThrow(TypeError);
        expect(() => convertDMSToDecimal(undefined, "N")).toThrow(TypeError);
    });
});

describe("extractCoordinates", () => {
    it("[HAPPY PATH] handles edge cases", () => {
        const exifData = {
            GPSLatitude: [0, 0, 0],
            GPSLatitudeRef: "N",
            GPSLongitude: [0, 0, 0],
            GPSLongitudeRef: "E",
        };
        expect(extractCoordinates(exifData)).toEqual({ latitude: 0, longitude: 0 });
    });

    it("[HAPPY PATH] extracts coordinates from GPSLatitude and GPSLatitudeRef", () => {
        const exifData = {
            GPSLatitude: [12, 34, 56],
            GPSLatitudeRef: "N",
            GPSLongitude: [78, 90, 12],
            GPSLongitudeRef: "E",
        };
        const coo = extractCoordinates(exifData)
        expect(coo["latitude"]).toBeCloseTo(12.582222);
        expect(coo["longitude"]).toBeCloseTo(79.5033333);
    });

    it("[HAPPY PATH] extracts coordinates from Latitude and LatitudeRef", () => {
        const exifData = {
            Latitude: [12, 34, 56],
            LatitudeRef: "N",
            Longitude: [78, 90, 12],
            LongitudeRef: "E",
        };
        const coo = extractCoordinates(exifData)
        expect(coo["latitude"]).toBeCloseTo(12.582222);
        expect(coo["longitude"]).toBeCloseTo(79.503333);
    });

    it("[HAPPY PATH] extracts coordinates from lat/latitude/Lat and lon/longitude/Lng/Long", () => {
        const exifData = {
            lat: 12.582222,
            lon: 78.903333,
        };
        
        expect(extractCoordinates(exifData)).toEqual({ latitude: 12.582222, longitude: 78.903333 });
    });

    it("[HAPPY PATH] extracts coordinates from Location string", () => {
        const exifData = {
            Location: "43.467448, 11.885126",
        };
        expect(extractCoordinates(exifData)).toEqual({ latitude: 43.467448, longitude: 11.885126 });
    });

    it("[BAD PATH] returns null coordinates when Location string is malformed", () => {
        const exifData = {
            Location: " invalid string ",
        };
        expect(extractCoordinates(exifData)).toEqual({ latitude: -1, longitude: -1 });
    });
    
    it("[BAD PATH] returns null coordinates when only one coordinate is present", () => {
        const exifData = {
            GPSLatitude: [12, 34, 56],
            GPSLatitudeRef: "N",
        };
        expect(extractCoordinates(exifData)).toEqual({ latitude: -1, longitude: -1 });
    });
    
    it("[BAD PATH] returns -1 coordinates when exifData is empty", () => {
        expect(extractCoordinates({})).toEqual({ latitude: -1, longitude: -1 });
    });
});