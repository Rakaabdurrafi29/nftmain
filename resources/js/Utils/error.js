export function getFirstLine(text) {
    var index = text.indexOf("\n");
    if (index === -1) index = undefined;
    return text.substring(0, index);
}
