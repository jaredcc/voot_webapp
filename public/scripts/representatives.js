api = {
    "URL" : "https://www.googleapis.com/civicinfo/v2/representatives?key=",
    "API_Key" : "AIzaSyDavSOAQc_B7Gaaj8cnL6EmPG2g9vgwlVU",
    "address" : "2900 Hawks Swoop Trail",
    "city" : "Pflugerville",
    "state" : "TX",
    "zipCode" : "78660"
};

window.onload = function() {
  var adr = document.getElementById('address').value.split('%20').join(' ');
  console.log(adr);
  document.getElementById('address').value = adr;
}

function getRequestString() {

    return api.URL + api.API_Key
     + "&address=" + document.getElementById('address').value + " "
     + document.getElementById('city').value + " "
     + document.getElementById('state').value + " "
     + document.getElementById('zipCode').value;

}

function addressEmpty() {
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var zip = document.getElementById('zipCode').value;

  document.getElementById('addressForm').style.display = "none";

  if ((!address.trim()) || (!city.trim()) || (!state.trim()) || (!zip.trim())) {
    return true;
  }
  else {
    return false;
  }
}

function sendRequest() {

    // Change the Page header and Hide Alert
    document.getElementById('header').innerHTML = "Your Representatives";
    document.getElementById('addressForm').style.display = "none";
    document.getElementById('form-msg').style.display = "none";

    // Clear the current list
    document.getElementById("repTable").innerHTML = "";

    var reqURL = getRequestString();
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            parseRepData(xml.responseText);
        }
    }
    xml.open("GET", reqURL, true); // true for asynchronous
    xml.send(null);
}

function parseRepData(apiData) {
    var repData = JSON.parse(apiData);

    // TODO Check if response is invalid

    // Loop through offices array
    // and pull the indices. Use
    // these indices to get rep data
    // repData.offices.forEach(function(office) {
    //     var officeName = office.name;
    //     office.officialIndices.forEach(function(index) {
    //         addRepToTable(index, repData, officeName);
    //     });
    // });

    for (let i = repData.offices.length - 1; i >= 0; i--) {
      var office = repData.offices[i];
      var officeName = office.name;
      console.log(office);
      for (let j = office.officialIndices.length - 1; j >= 0; j--) {
        addRepToTable(office.officialIndices[j], repData, officeName);
      }
    }
}

// Using the given index, finds the
// representative data in the apiResponse
// and adds a new element to the table
function addRepToTable(index, repData, officeName) {

    // Grab rep data from api response
    var newRep = generateRep(index, repData, officeName);
    var repTable = document.getElementById("repTable");
    var lastRow = repTable.lastElementChild;


    // If the table is empty or the
    // row is full make a new row
    if (lastRow == undefined || lastRow.cells.length == 4) {
        var newRow = document.createElement("tr");
        newRow.classList.add("row");
        newRow.appendChild(newRep);
        repTable.appendChild(newRow);
    }
    else {
        lastRow.appendChild(newRep);
    }
}

// Creates a cell for the representatives
// table that has all the attribute values
// for the representative
function generateRep(index, repData, officeName) {
    var rep = repData.officials[index];
    var repCell = document.createElement("td");
    var name = rep.name;
    repCell.classList.add("repCell");

    // Set Representative Name, Party, Address
    var repName = rep.name;
    repName = repName.replace(/\s/g, '');

    if (rep.phones == undefined) {
      rep.phones = [
        'No Number Listed'
      ]
    }

    $(repCell).data("data-info", {
      name: name,
      office: officeName,
      party: rep.party,
      address: rep.address,
      phone: rep.phones[0],
      urls: rep.urls,
      image: rep.photoUrl,
      channels: rep.channels
    });


    // Add name to table cell
    repCell.innerHTML = name + " <br> " + officeName;

    // Set onclick for popup window
    repCell.setAttribute("onclick", "showRepresentative(this)");

    return repCell;
}


// Get the modal
var repWindow = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function showRepresentative (repName) {

    // Clear the Previous card
    repWindow.innerHTML = "";


    // Construct Representative Card
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("repcard");

    // Add Representative Image
    var cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    if ($(repName).data("data-info").image != undefined) {
        cardImg.setAttribute("src", $(repName).data("data-info").image);
    }
    else {
        cardImg.setAttribute("src", "/resources/default_portrait.png");
    }
    card.appendChild(cardImg);

    // Add Representative Name and Title
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    var name = document.createElement("h5");
    name.classList.add("card-title");
    name.classList.add("repcard-title");
    name.innerHTML = $(repName).data("data-info").name;
    var title = document.createElement("p");
    title.classList.add("card-text");
    title.classList.add("repcard-position");
    title.innerHTML = $(repName).data("data-info").office;
    cardBody.appendChild(name);
    cardBody.appendChild(title);
    card.appendChild(cardBody);

    // Add Representative Party
    var listGroup = document.createElement("ul");
    listGroup.classList.add("list-group");
    listGroup.classList.add("list-group-flush");

    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("repcard-position");
    if ($(repName).data("data-info").party != undefined) {
        listItem.innerHTML = $(repName).data("data-info").party;
    }
    else {
        listItem.innerHTML = "No Party Information";
    }
    listGroup.appendChild(listItem);

    // Add Representative Website
    listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("repcard-position");
    if ($(repName).data("data-info").urls != undefined) {

        listItem.innerHTML = "<a href=\"" + $(repName).data("data-info").urls[0] + "\" target=\"_blank\" style=\"text-decoration: none;\"> " + $(repName).data("data-info").urls[0] + "</a>";
    }
    else {
        listItem.innerHTML = "No Website Listed";
    }
    listGroup.appendChild(listItem);

    listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("repcard-position");
    if ($(repName).data("data-info").phone != undefined) {
        listItem.innerHTML = $(repName).data("data-info").phone;
    }
    else {
        listItem.innerHTML = "No Phone Number Listed";
    }
    listGroup.appendChild(listItem);


    listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("repcard-position");
    if ($(repName).data("data-info").address != undefined) {

        var line2 = $(repName).data("data-info").address[0].line2;
        if (line2 == undefined) {line2 = "";}

        listItem.innerHTML = $(repName).data("data-info").address[0].line1
            + "<br>" + line2
            + "<br>" + $(repName).data("data-info").address[0].city + ", "
            + $(repName).data("data-info").address[0].state + " "
            + $(repName).data("data-info").address[0].zip;
    }
    else {
        listItem.innerHTML = "No Party Information";
    }
    listGroup.appendChild(listItem);


    card.appendChild(listGroup);
    // Add Card to the Window
    repWindow.appendChild(card);

    repWindow.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    repWindow.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == repWindow) {
        repWindow.style.display = "none";
    }
}
