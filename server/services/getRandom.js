function getRandom(arr, num) {
    const result = [];
    let len = arr.length;
    const taken = new Array(len);
    while (result.length < num) {
        const index = Math.floor(Math.random() * len);
        if (!taken[index]) {
            result.push(arr[index]);
            taken[index] = true;
        }
    }
    return result;
}

export default getRandom;
