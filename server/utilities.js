function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) - min)
}

function sortingInputs(entries, randomRoundNumber) {
    return entries.sort((a, b) => {
        // comparison with absolute values to handle negative numbers
        const distanceA = Math.abs(a[1] - randomRoundNumber);
        const distanceB = Math.abs(b[1] - randomRoundNumber);

        // sort by nearest user
        return distanceA - distanceB;
    });
}


module.exports = { randomIntFromInterval, sortingInputs };