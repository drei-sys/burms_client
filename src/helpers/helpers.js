export function sortObjectArray(array, sortBy, type = "string", order = "asc") {
    if (order === "asc") {
        if (type === "string") {
            return array.sort((a, b) => a[sortBy]?.localeCompare(b[sortBy]));
        } else {
            return array.sort((a, b) => a[sortBy] - b[sortBy]);
        }
    }

    if (order === "desc") {
        if (type === "string") {
            return array.sort((a, b) => b[sortBy]?.localeCompare(a[sortBy]));
        } else {
            return array.sort((a, b) => b[sortBy] - a[sortBy]);
        }
    }
}

export function generateString(length, prefix = null, charSet) {
    charSet =
        charSet ||
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randomString = "";
    for (var i = 0; i < length; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return prefix ? prefix + randomString : randomString;
}
