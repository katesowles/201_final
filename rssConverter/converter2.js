// from Google:

// google.load("feeds", "1");



function initialize() {

  var feed = new google.feeds.Feed("http://www.fpc.org/rss/rssAdultCounts.aspx");
  var data = [];

  feed.load(function(result) {
    if (!result.error) {

      for (var i = 0; i < result.feed.entries.length; i++) {
        data.push(result.feed.entries[i]);
      }

    } else {
      console.log('error', result.error);
    }
  }

  return data;
  console.log('hello');

} // initialize() close



// google.setOnLoadCallback(initialize);

var rssData = initialize();
console.log("rssData: " + rssData);
