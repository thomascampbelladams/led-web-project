export module Utils {
    export async function wait(time: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    /**
     * generates N-dimensional where all values are `undefined`
     * @param {function|any} value that will supply the default value in each array or the value to be put as each member of the arrays
     * @param {...number} varargs of sizes for each level of the array
     */
    export function make2DArray(value, matrix) {
        let valueProducer;

        if (typeof value === "function") {
            valueProducer = value;
        } else { //make into a producer function
            valueProducer = () => value;
        }

        return new Uint8Array(matrix.width() * matrix.height() * 3);
    }
}