import QNanEnumerator from "qnan-enumerator";

export default class StringNaN {

    /**
     * Converts a string to a NaN array.
     * 
     * @param str a string to convert to a NaN array
     * @example
     * StringNaN.toNaNs("meg");  // [ NaN, NaN, NaN ]
     */
    public static toNaNs(str: string): typeof NaN[] {
        const qne = new QNanEnumerator();

        return str.split("").map(chr => qne.getNan(chr.charCodeAt(0)));
    }

    /**
     * Converts a NaN array to a string.
     * 
     * @param nans a NaN or a NaN Array to convert to a string
     * @example
     * const meg = StringNaN.toNaNs("meg");
     * StringNaN.toString(meg.reverse());  // "gem"
     */
    public static toString(nans: typeof NaN | typeof NaN[]): string {
        const qne = new QNanEnumerator();

        const charCodes: number[] = (typeof nans === "number" ? [nans] : nans)
            .map(nan => qne.getId(nan));

        return String.fromCharCode(...charCodes);
    }
}
