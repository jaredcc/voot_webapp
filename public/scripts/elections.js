
// When a user clicks on the Candidates
// row of a side table, it reveals all the
// candidates running in the race
function toggleCandidates(election) {
  $(election).nextUntil("table").children("td").slideToggle();
}

// Loads an empty calendar when the page is loaded
window.onload = function() {
  // TODO Use firebase user Information
  // to load elections
  $('#calendar').fullCalendar({defaultView: 'month'});

  // Send Request To Server For User's Address
  fillCalendar();
  addEvent();
}

function addEvent(event) {
  $('#calendar').fullCalendar('renderEvent', event, true);
}

function fillCalendar() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      if (xmlHttp.responseText == 'No User Found') {
        // Display You Must Login Error...
        getElections('No User State');
      } else {
        getElections(xmlHttp.responseText);
      }
    }
  }
  xmlHttp.open("GET", 'http://localhost:3000/elections/user-state', true); // true for asynchronous
  xmlHttp.send(null);
}

function getElections(state) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      var count = 0;
      var res = JSON.parse(xmlHttp.responseText);
      res.elections.forEach(function(election) {
          if (election.name.includes(state) || election.ocdDivisionId.includes(state)) {
            addEvent({
              title: election.name,
              start: election.electionDay,
              end: election.electionDay,
              stick: true,
              backgroundColor: "#FF3368"
            });
            addToSideBar(election);
            count++;
          }
      });

      console.log('COUNT: ' + count);

      if (count == 0) {
        document.getElementById('no-election-warning').style.display = "block";
        res.elections.forEach(function(election) {
          if (election.name != "VIP Test Election") {
            addEvent({
              title: election.name,
              start: election.electionDay,
              end: election.electionDay,
              stick: true,
              backgroundColor: "#FF3368"
            });
            addToSideBar(election);
          }
        });
      }

    }
  }
  var req = "https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyDavSOAQc_B7Gaaj8cnL6EmPG2g9vgwlVU";
  xmlHttp.open("GET", req, true); // true for asynchronous
  xmlHttp.send(null);
}

function addToSideBar(election) {
  var table = document.createElement('table');
  table.classList.add('table');
  table.classList.add('table-hover');

  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  tr.classList.add('table-primary');
  var title = document.createElement('th');
  title.innerHTML = election.name;

  // Nest the First Part of The table
  tr.appendChild(title);
  thead.appendChild(tr);
  table.appendChild(thead);
  document.getElementById('side-bar').appendChild(table);

}
