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
