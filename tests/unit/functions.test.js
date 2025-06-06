const { formatExifDate } = require("../../static/functions.js")

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
    expect(() =>formatExifDate()).toThrowError(TypeError);
});

test("[BAD PATH] formatExifDate with an array argument throws type error", () => {
    expect(() =>formatExifDate(["test"])).toThrowError(TypeError);
});
