/*
=======================================================
            localStorage for Spot-A-Salmon
=======================================================
*/

//**** constructor:

function makeStorageObject() {
  this.divDisplay = 1;
  this.chartNumber = 0;
  this.chartParameters = [];
}


/*
=======================================================
                START-UP function
    ( checks if localStorage has storageObject
and restores app to state stored in storageObject )
=======================================================

eventlistener function from map >>> updates storageObject

drop-down chart-menu listener >>> updates storageObject

=======================================================
*/

var storageObject;   // include global varible at top of ALL CODE

var checkStorage = function() {

    if (localStorage.getItem('storageObject')) {

            storageObject = new makeStorageObject();  // storageObjectOne HAS to exist in order to re-populate!!!

            var outOfStorage = storageOut();

            var div = outOfStorage.divDisplay;

            switch (div)
            {
                case 1:
                    divDisplayOne.className = "active";
                    divDisplayTwo.className = "inactive";
                    divDisplayThree.className = "inactive";
                    divDisplayFour.className = "inactive";
                    console.log("Div-1 restored");
                    break;

                case 2:
                    divDisplayOne.className = "inactive";
                    divDisplayTwo.className = "active";
                    divDisplayThree.className = "inactive";
                    divDisplayFour.className = "inactive";
                    console.log("Div-2 restored");
                    break;

                case 3:
                    divDisplayOne.className = "inactive";
                    divDisplayTwo.className = "inactive";
                    divDisplayThree.className = "active";
                    divDisplayFour.className = "inactive";
                    console.log("Div-3 restored");
                    break;

                case 4:
                    divDisplayOne.className = "inactive";
                    divDisplayTwo.className = "inactive";
                    divDisplayThree.className = "inactive";
                    divDisplayFour.className = "active";
                    console.log("Div-4 restored");
                    break;

                default:
                divDisplayOne.className = "active";
                divDisplayTwo.className = "inactive";
                divDisplayThree.className = "inactive";
                divDisplayFour.className = "inactive";
                console.log("Default-div restored");

            }



            // uses storageObject.chartNumber to re-call that chart and display it:
            // chartFunctionsArray[outOfStorage.chartNumber]();

    } else {
        // make a "fresh" storageObject
        storageObject = new makeStorageObject();

    }//Main if Close

} // checkStorage Close


/*
========================================================
         Functions for localStorage IN - OUT
  (to push the storageObject to and from localStorage)
========================================================
*/

// function that pushes storage Object into a local storage

var storageIn = function () {
  localStorage.setItem("storageObject", JSON.stringify(storageObject));
}

// function that gets storage object out of local storage

var storageOut = function () {
  var pullStorage = localStorage.getItem('storageObject');
  var parseData = JSON.parse(pullStorage);
  return parseData;

}

/*
========================================================
           Call checkStorage() at load:
========================================================
*/

checkStorage();
