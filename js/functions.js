function addToProjectArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        projectArray[dataIndex] = fishCount[dataIndex]['Project'];
    }
}

function addToYearArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        yearArray[dataIndex] = fishCount[dataIndex]['Year'];
    }
}

function addToChinookArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        chinookArray[dataIndex] = fishCount[dataIndex]['Chinook'];
    }
}

function addToCohoArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        cohoArray[dataIndex] = fishCount[dataIndex]['Coho'];
    }
}




addToProjectArray();
addToYearArray();
addToChinookArray();
addToCohoArray();
