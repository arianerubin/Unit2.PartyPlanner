// USER STORY
// A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.
// Next to each party in the list is a delete button.
// If the user clicks the delete button for one of the parties, that party is then removed from the list.
// There is also a form that allows the user to enter information about a new party that they want to schedule.
// After filling out the form and submitting it, the user observes their party added to the list of parties.

//so I need a list:
//names, dates, times, locations, and descriptions of all the parties
//delete button in front of each party < what should remove the party from the list when clicked
//A form:
//to add new parties with all the same information:  names, dates, times, locations, and descriptions of all the parties
//a submitting button, that send the information to the list

//I have to use API documentation... https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events
//Fetch= Fetch is used correctly to GET party data from the API, Fetch is used correctly to POST a new party to the API, Fetch is used correctly to DELETE a party from the API.
//

const init = () => {
  parties();
};

const parties = async () => {
  try {
    const data = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events"
    );
    const response = await data.json();
    const displayed = response.results;
    return displayed;
  } catch (error) {
    console.log(error.message);
  }
};

const addParty = async (event) => {
  event.preventDefault();
  const name = document.getElementById("name");
  const date = document.getElementById("date");
  const time = document.getElementById("time");
  const location = document.getElementById("location");
  const description = document.getElementById("description");
};

init();
