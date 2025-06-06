const { formatExifDate, extractExifDate } = require("../../static/functions.js")
const { exifExemple } = require("./exif_exemple.js");

describe("formatExifDate", () => {

    test("[HAPPY PATH] formatExifDate returns Date", () => {
        expect(formatExifDate("2023:07:14 10:45:30")).toBeInstanceOf(Date);
    });

    test("[HAPPY PATH] formatExifDate returns the correct date", () => {
        expect(formatExifDate("2023:07:14 10:45:30")).toBeInstanceOf(Date);
        expect(formatExifDate("2023:07:14 10:45:30")).toEqual(new Date("2023-07-14T10:45:30"));
    });

    test("[HAPPY PATH] formatExifDate returns the correct date when the input is a number", () => {
        expect(formatExifDate(628021800000)).toBeInstanceOf(Date);
        expect(formatExifDate(628021800000)).toEqual(new Date("1989-11-25T18:30:00.000Z"));
    });

    test("[BAD PATH] formatExifDate with no argument throws type error", () => {
        expect(() => formatExifDate()).toThrowError(TypeError);
    });

    test("[BAD PATH] formatExifDate with an array argument throws type error", () => {
        expect(() => formatExifDate(["test"])).toThrowError(TypeError);
    });

});

describe("exifExemple", () => {
    test("exifExemple returns an object", () => {
        expect(exifExemple).toBeInstanceOf(Object);
    });
})

describe("extractExifDate", () => {
    test("[HAPPY PATH] extractExifDate returns a date", () => {
        expect(extractExifDate(exifExemple)).toBeInstanceOf(Date);
    });

    test("[HAPPY PATH] extractExifDate returns current date if no date is found", () => {
        expect(extractExifDate({})).toBeInstanceOf(Date);
        expect(extractExifDate({})).toEqual(new Date());
    });

    test("[HAPPY PATH] extractExifDate returns ", () => {
        expect(() => extractExifDate()).toThrowError(TypeError);
    });
})

