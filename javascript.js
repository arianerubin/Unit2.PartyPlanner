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

const COHORT = "2405-FTB-ET-WEB-FT";
const apiUrL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events`;

const party = [];

const partyList = document.querySelector("#party");
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getParty();
  renderParty();
}
render();

/**
 * Update state with parties from API
 */
async function getParty() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.party = json.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Render parties from state
 */
function renderParty() {
  if (!state.party.length) {
    partyList.innerHTML = "<li>.</li>";
    return;
  }

  const partyCards = state.party.map((party) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h2>${party.name}</h2>
        <p>${party.date}</p>
        <p>${party.time}</p>
        <p>${party.location}</p>
        <p>${party.description}</p>
    `;
    return li;
  });

  partyList.replaceChildren(...partyCards);
}

/**
 * Ask the API to create a new party based on form data
 * @param {Event} event
 */

async function addParty(event) {
  event.preventDefault();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        date: addPartyForm.date.value,
        time: addPartyForm.time.value,
        location: addPartyForm.location.value,
        description: addPartyForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add party");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}
