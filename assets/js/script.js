// This ensures that the document is fully loaded first before anything else runs.
$(document).ready(function () {
  // Declaring variables and any arrays needed

  // Variables
  var currentDay = $("#currentDay");
  var dayTimeDisplay = moment().format("MMMM Do YYYY, h:mm:ss a");
  var currentHour = moment().format("H");

  // Arrays

  // Array to hold the days plans
  var userTextArray = [];
  // Array for the work day hours (might go a couple hours before and after for other scheduling fun)
  var hoursArray = [
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
  ];

  //Sets the currentDay variable to the text version of dayTimeDisplay
  currentDay.text(dayTimeDisplay);
  //Function call gets the saved data from local and puts it into the textarray
  savePage();

  // Function for saving the data to the local array so that the data stays upon reload
  function savePage() {
    //parsing the JSON into a string object
    var userData = JSON.parse(localStorage.getItem("savedInput"));
    //if the data was found, update the information in the array
    if (userData !== null) {
      userTextArray = userData;
    }
  }
  // Function for holding the text in an array
  function saveInputArray() {
    localStorage.setItem("savedInput", JSON.stringify(userTextArray));
  }

  // Loop, most likely a forEach type, to loop through and create the rows for every hour on the plan

  hoursArray.forEach(function (element, index) {
    //declare variables needed to set up the rows
    var timeRow = $("<tr>");
    var timeData = $("<td>");
    var textInfo = $("<input>");
    var saveInfo = $("<button>");

    //adding classes to each element of the row, also giving them some specific styling to go along with it
    timeRow.addClass("row");
    timeData.addClass("hour");
    textInfo.addClass("textarea");
    saveInfo.addClass("saveBtn fas fa-save");

    // We now want to convert the hours in our array into the 24hour format
    var hours = parseInt(currentHour);
    if (element.includes("PM")) {
      var elementHour = parseInt(element) + 12;
    } else {
      elementHour = parseInt(element);
    }
    // Assign colors to each box based off the time
    if (hours > elementHour) {
      textInfo.addClass("past");
    } else if (hours < elementHour) {
      textInfo.addClass("future");
    } else if (hours === elementHour) {
      textData.addClass("present");
    }

    // Render saved information on refresh
    textInfo.val(userTextArray[index]);

    timeRow.append(timeData, textInfo, saveInfo);
    $(".container").append(timeRow);

    // Save the information to the array and then to the local storage.
    saveInfo.on("click", function(event){
        event.preventDefault();

        var userText = textInfo.val();

        userTextArray[index] = userText;
        
        saveInputArray();
    })
  });
});
