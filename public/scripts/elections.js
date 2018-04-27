
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
}
