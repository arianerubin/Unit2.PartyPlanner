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
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  party: [],
};

const partyList = document.querySelector("#party-list");
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
    partyList.innerHTML = "<li>No Parties to display</li>";
    return;
  }

  const partyCards = state.party.map((party) => {
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
          <h2>${party.name}</h2>
          <p>${party.date}</p>
          <p>${party.time}</p>
          <p>${party.location}</p>
          <p>${party.description}</p>
          <button class="btn btn-danger" onclick="deleteParty('${party.id}')">Delete</button>
        </div>
    `;
    return card;
  });

  partyList.replaceChildren(...partyCards);
}

/**
 * Ask the API to create a new party based on form data
 * @param {Event} event
 */

async function addParty(event) {
  event.preventDefault();
  console.log("Adding party...");

  const partyData = {
    name: document.getElementById("name").value,
    date: new Date(
      document.getElementById("date").value +
        "T" +
        document.getElementById("time").value
    ).toISOString(),
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    cohortId: 219, // Assuming cohortId is required and fixed for this example
  };

  console.log("Formatted party data:", partyData);

  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partyData),
      }
    );

    const responseData = await response.json();
    console.log("Response data:", responseData);

    if (!response.ok) {
      throw new Error(
        responseData.error ? responseData.error.message : "Failed to add party"
      );
    }

    console.log("Party added successfully!");
  } catch (error) {
    console.error("Error adding party:", error);
  }
}

async function deleteParty(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete party");
    }

    console.log("Party deleted successfully!");
    render();
  } catch (error) {
    console.error("Error deleting party:", error);
  }
}
