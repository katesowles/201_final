/*******************************************************
           rss-converter function
(Google RSS Feed API >>>  <<<)

*******************************************************/

/*==============================
      Global variables:
===============================*/
var fishDate = new Date(); // sets a timestamp to first loading of pagge, then triggers a rss-update every 4 hours

var rssData = [];  // should make an array with 4 objects [{Willamette Falls}, {Bonneville Dam}, {The Dalles Dam}, {John Day Dam}]

var rssFishCount = 0;

var rawData = [];
var damsArray = [];
var chinookCohoData =[
                {                       // Object[0] = Bonneville Dam
                    Project: "empty",
                    Year: 2016,
                    Date: "empty",
                    Chinook: 0,
                    Coho: 0,
                    Steelhead: 0
                },
                {                       // Object[1] = The Dalles Dam
                    Project: "empty",
                    Year: 2016,
                    Date: "empty",
                    Chinook: 0,
                    Coho: 0,
                    Steelhead: 0
                }
                ];


/*==============================================
        Function for RSS-Feed:
===============================================*/


google.load("feeds", "1");


//****** Function returns an Array with objects from the RSS-Feed:

function initialize() {
      console.log("RSS-Feed first updated at: ", fishDate);

      var feed = new google.feeds.Feed("http://www.fpc.org/rss/rssAdultCounts.aspx");


      feed.load(function(result) {   // creates "result" object

        if (!result.error) {

          for (var i = 0; i < result.feed.entries.length; i++) {
            rssData.push(result.feed.entries[i]);
          }


          //***  rssData-manipulation function call here:
          makeStripData(rssData, rawData);
          makeProjectDate(rawData, chinookCohoData);
          makeChinookCoho(rawData, chinookCohoData);

          console.log('Current RSS-Feed Data --- chinookCohoData:  ', chinookCohoData);

          // calc total fish passed Bonneville Dam:
          rssFishCount = parseInt(chinookCohoData[0].Chinook) + parseInt(chinookCohoData[0].Coho) + parseInt(chinookCohoData[0].Steelhead);

          // display rssFishCount:
          var fishCountId = document.getElementById('rssFishCount');  // to display rssFishCount in the html
          fishCountId.textContent = 'Yesterday ' + rssFishCount + ' Chinook, Coho, and Steelhead passed the Bonneville dam';

          } // if close

       }); // feed.load close



} // initialize() close



// RSS-data is TIMESENSITIVE: will run when rss-data is ready:
google.setOnLoadCallback(initialize);



/*==============================================
      Functions for processing Rss-data:
    (called inside of initialize-function)
===============================================*/

//****** STEP 1 --- pull title and fish data for each dam pushes selected data into rawData-Array

function makeStripData (array1, array2) {

        for (var i = 1; i < 3; i++) {  // array1 = rssData, array2 = rawData // i = 1 and i < 3 is because we only need the 2nd and 3rd item,
            var stripData = [];

            stripData.push(array1[i].title);
            stripData.push(array1[i].content);
            array2.push(stripData);
        }

};

//****** STEP 2 --- turn title-property from rawData into new project- and date-properties in chinookCohoData-Objects:
function makeProjectDate(array1, array2) {   // array1 = rawData, array2 = chinookCohoData

    for (var i = 0; i < array2.length; i++) {

        var titleSplit = array1[i][0].split(" ");  // this accesses the title info in rawData at index [0]

        if (titleSplit[0] == "BONNEVILLE") {
            array2[i].Project = "BON";
        } else {
            array2[i].Project = "TDA";
        }

        array2[i].Date = titleSplit.pop();  // pops off last item (which should be date string "mm/dd/yyy")
    }  // for-loop close

} // makeProjectDate() close




//****** STEP 3 --- turn content property from rawData into new Chinook and Coho properties...
function makeChinookCoho(array1, array2) {    // array1 = rawData, array2 = chinookCohoData

    for (var i = 0; i < array1.length; i++) {


        var contentSplit = array1[i][1].split("; ");    // this accesses the content info in rawData at index [1],
                                                       // contentSplit is now an array ["Chinook Adult 90", "Chinook Jack 2"....]

        for (var k = 0; k < contentSplit.length; k++) {     // lops through contentSplit-Array
            var x = contentSplit[k].split(" ");     // creates array with ["Chinook", "Adult", "90"]

                if (x[0] == "Chinook" && x[1] == "Adult") {     // if x[0] is either ("Chinook" && "Adult") or ("Coho" && "Adult") pop off the number...
                    array2[i].Chinook = parseInt(x.pop());
                } else if (x[0] == "Coho" && x[1] == "Adult") {
                    array2[i].Coho = parseInt(x.pop());
                } else if (x[0] == "Steelhead") {
                    array2[i].Steelhead = parseInt(x.pop());
                }
        } // inner for-loop close

    }  // for-loop close

} // makeChinookCoho() close



/*==============================================================
     Function to run initialize() each day at 1200 hours
===============================================================*/


function updateRSS () {
    setInterval(initialize, 1000 * 60 * 60 * 4);  // runs Initialize ever 4 hours from first load
}

updateRSS();


//
