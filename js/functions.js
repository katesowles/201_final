function addToYearArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]['Project'] == "BON") {
            yearArray.push(fishCount[dataIndex]['Year']);
        }
    }
}

function addToArray (project,array,species) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]['Project'] == project) {
            array.push(fishCount[dataIndex][species]);
        }
    }
}

function addToTotalArray (project,array) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]['Project'] == project) {
            array.push(fishCount[dataIndex]['Chinook'] + fishCount[dataIndex]['Coho']);
        }
    }
}

function lastXXYears (arraytretrieve,arraysend,numYears) {
    for (i = 0; i < numYears; i++) {
        arraysend[i] = arraytretrieve[i];
    }
}

addToYearArray();
addToArray("BON", bvilleChinookArray, "Chinook");
addToArray("BON", bvilleCohoArray, "Coho");
addToArray("TDA", dallesChinookArray, "Chinook");
addToArray("TDA", dallesCohoArray, "Coho");
addToTotalArray("BON", bvilleTotalArray);
addToTotalArray("TDA", dallesTotalArray);
lastXXYears(bvilleTotalArray,bvilleTotals,50);
lastXXYears(dallesTotalArray,dallesTotals,50);
