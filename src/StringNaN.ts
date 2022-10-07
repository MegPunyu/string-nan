export class StringNaN {

    // 8 bytes buffer (stores a double precision floating point number)
    private static readonly buf: DataView = new DataView(new ArrayBuffer(8));

    static {
        this.buf.setUint16(0, 0xFFF8, false);  // bit pattern for NaN (IEEE 754)
    }

    /* Converts a string to a NaN array. */
    public static toNaNs(str: string): typeof NaN[] {
        return str.split("").map(char => {
            this.buf.setUint32(2, char.charCodeAt(0) + 1, false);
            return this.buf.getFloat64(0, false);
        });
    }

    /* Converts a NaN array to a string. */
    public static toString(nans: typeof NaN | typeof NaN[]): string {
        const charCodes: number[] = (typeof nans === "number" ? [nans] : nans).map(nan => {
            this.buf.setFloat64(0, nan, false);
            return this.buf.getUint32(2, false) - 1;
        });
        return String.fromCharCode(...charCodes);
    }
}
