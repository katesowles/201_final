rssData = [
        {
        categories: Array[0],
        content: "Chinook Adult 90; Chinook Jack 2; Steelhead 54; Wild Steelhead 17",
        publishedDate: "Mon, 04 Apr 2016 13:15:26 -0700",
        title: "BONNEVILLE DAM 04/03/2016"
        },

        {
        categories: Array[0],
        content: "Chinook Adult 51; Chinook Jack 1; Steelhead 15; Wild Steelhead 10",
        publishedDate: "Mon, 04 Apr 2016 13:15:26 -0700",
        title: "THE DALLES DAM 04/03/2016"
        }
        ];

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

        var rawData = [];
        var damsArray = [];
        var chinookCohoData =[
                        {                       // Object[0] = Bonneville Dam
                            project: "",
                            year: 2016,
                            date: "",
                            Chinook: 0,
                            Coho: 0
                        },
                        {                       // Object[1] = The Dalles Dam
                            project: "",
                            year: 2016,
                            date: "",
                            Chinook: 0,
                            Coho: 0
                        }
                        ];


//****** STEP 1 --- pull title and fish data for each dam pushes selected data into rawData-Array

var makeStripData = function () {

        for (var i = 0; i < rssData.length; i++) {
            var stripData = [];

            stripData.push(rssData[i].title);
            stripData.push(rssData[i].content);
            rawData.push(stripData);
        }

};

//****** STEP 2 --- turn title-property from rawData into new project- and date-properties in chinookCohoData-Objects:
var makeProjectDate = function() {

    for (var i = 0; i < rawData.length; i++) {

        var titleSplit = rawData[i][0].split(" ");  // this accesses the title info in rawData at index [0]

        if (titleSplit[0] == "BONNEVILLE") {
            chinookCohoData[i].project = "BON";
        } else {
            chinookCohoData[i].project = "TDA";
        }

        chinookCohoData[i].date = titleSplit.pop();  // pops off last item (which should be date string "mm/dd/yyy")
    }  // for-loop close

} // makeProjectDate() close




//****** STEP 3 --- turn content property from rawData into new Chinook and Coho properties...
var makeChinookCoho = function() {

    for (var i = 0; i < rawData.length; i++) {


        var contentSplit = rawData[i][1].split("; ");    // this accesses the content info in rawData at index [1],
                                                        // contentSplit is now an array ["Chinook Adult 90", "Chinook Jack 2"....]

        for (var k = 0; k < contentSplit.length; k++) {     // lops through contentSplit-Array
            var x = contentSplit[k].split(" ");     // creates array with ["Chinook", "Adult", "90"]

                if (x[0] == "Chinook" && x[1] == "Adult") {     // if x[0] is either ("Chinook" && "Adult") or ("Coho" && "Adult") pop off the number...
                    chinookCohoData[i].Chinook = x.pop();
                } else if (x[0] == "Coho" && x[1] == "Adult") {
                    chinookCohoData[i].Coho = x.pop();
                }
        } // inner for-loop close

    }  // for-loop close

} // makeChinookCoho() close


/*==============================================================
                           TEST AREA:
===============================================================*/

        makeStripData();
        console.log('Step 1 --- rawData:', rawData);

        makeProjectDate();
        console.log('Step 2 --- chinookCohoData: ', chinookCohoData);

        makeChinookCoho();
        console.log('Step 3 --- chinookCohoData: ', chinookCohoData);
