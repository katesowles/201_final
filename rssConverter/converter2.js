/*******************************************************
           rss-converter function
(Google Feed API >>>  <<<)

*******************************************************/


google.load("feeds", "1");

function initialize() {

  var feed = new google.feeds.Feed("http://www.fpc.org/rss/rssAdultCounts.aspx");
  var data = [];

  feed.load(function(result) {   // creates "result" object
    if (!result.error) {

      for (var i = 0; i < result.feed.entries.length; i++) {
        data.push(result.feed.entries[i]);
      }
    }
  });

  return data;

} // initialize() close

google.setOnLoadCallback(initialize);


/*******************************************************
        make Data for Dats-set in JSON
*******************************************************/

/*****************************************
Data-set format:

Array [
    {
    "project":"BON",
    "year": 2001,
    "date": 04/03/2016,
    "Chinook": 99,
    "Coho": 0
    }
];

*****************************************/


var rssData = initialize();  // should make an array with 4 objects [{Willamette Falls}, {Bonneville Dam}, {The Dalles Dam}, {John Day Dam}]

console.log("rssData: ", rssData);

var rawData = [];
var damsArray = [];
var chinookCohoData =[];


// pull title and fish data for each dam:
var makeStripData = function () {

        for (var i = 1; i < 4; i++) {   // this uses only [1] Bonneville Dam and [2] The Dalles Dam
            var stripData = [];

            stripData.push(rssData[i].title);
            stripData.push(rssData[i].content);
            rawData.push(stripData);
        }

};

console.log('chinookCohoData:', rawData);

// split title into BON or TDA and a date, push those into chinookCohoData[] and then to damsArray[]
