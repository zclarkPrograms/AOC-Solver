export const fromArrayBuffer = (buffer) => {
    let str = "";

    if (typeof buffer === "ArrayBuffer") {
        for (let c of buffer) {
            str += String.fromCharCode(c)
        }
    } else {
        str = buffer;
    }

    return str;
}