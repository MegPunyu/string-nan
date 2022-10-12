export default class StringNaN {

    // 8 bytes buffer (stores a double precision floating point number)
    private static readonly buf: DataView = new DataView(new ArrayBuffer(8));

    static {
        this.buf.setUint16(0, 0xFFF8, false);  // bit pattern for quiet NaN (IEEE 754)
    }

    /**
     * Converts a string to a NaN array.
     * 
     * @param str a string to convert to a NaN array
     * @example
     * StringNaN.toNaNs("meg");  // [ NaN, NaN, NaN ]
     */
    public static toNaNs(str: string): typeof NaN[] {
        return str.split("").map(char => {
            this.buf.setUint32(2, char.charCodeAt(0) + 1, false);
            return this.buf.getFloat64(0, false);
        });
    }

    /**
     * Converts a NaN array to a string.
     * 
     * @param nans a NaN or a NaN Array to convert to a string
     * @throws {TypeError} if nans is not a NaN or a NaN Array
     * @example
     * const meg = StringNaN.toNaNs("meg");
     * StringNaN.toString(meg.reverse());  // "gem"
     */
    public static toString(nans: typeof NaN | typeof NaN[]): string {

        const charCodes: number[] = (typeof nans === "number" ? [nans] : nans).map(nan => {

            if (!Number.isNaN(nan)) {
                throw new TypeError("Non NaN values found");
            }

            this.buf.setFloat64(0, nan, false);

            return this.buf.getUint32(2, false) - 1;
        });

        return String.fromCharCode(...charCodes);
    }
}
