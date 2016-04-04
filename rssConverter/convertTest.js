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


        //****** pull title and fish data for each dam:

        var makeStripData = function () {

                for (var i = 0; i < rssData.length; i++) {   // STEP 1 pushes selected data into rawData-Array
                    var stripData = [];

                    stripData.push(rssData[i].title);
                    stripData.push(rssData[i].content);
                    rawData.push(stripData);
                }

        };

        //****** turn title-property into new project- and date-properties...
        var makeProjectDate = function() {

            for (var i = 0; i < rawData.length; i++) {

                var titleSplit = rawData[i][0].split(" ");

                if (titleSplit[0] == "BONNEVILLE") {
                    chinookCohoData[i].project = "BON";
                } else {
                    chinookCohoData[i].project = "TDA";
                }

                chinookCohoData[i].date = titleSplit.pop();  // pops off last item (which should be date string "mm/dd/yyy")
            }  // for-loop close

        } // makeProjectDate() close




        makeStripData();
        console.log('Step 1 rawData:', rawData);

        makeProjectDate();
        console.log('Step 2 chinookCohoData: ', chinookCohoData);
