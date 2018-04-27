// Instantiate Selenium Driver
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// Create Drivers for the browsers we want
// to test our site on
var driver_ff = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_ch = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// Instantiate Other Variables
var failures = 0;
var successes = 0;

// Call Test Functions Here
console.log('Beginning Home Page Tests...');

// Navigation Bar Test
checkNavigationBar(driver_ff);
checkNavigationBar(driver_ch);

// Voting Location Test
checkVotingLocation(driver_ff);
checkVotingLocation(driver_ch);

// Voting Count Down Test
checkVotingCountDown(driver_ff);
checkVotingCountDown(driver_ch);

console.log('End Test: Failures = ' + failures + ' Successes = ' + successes);


// Define Test Functions Here

// Checks that the navigation bar loads correctly
function checkNavigationBar(driver) {
  driver.get('http://localhost:3000');
  var nav = driver.findElement(By.id('navbar'));
  if (nav == null) {
    failures++;
    console.log('Navigation Bar Load | FAILED');
  }
  else {
    successes++;
    console.log('Navigation Bar Load | SUCCESS');
  }
}

// Checks that the voting location loaded
function checkVotingLocation (driver) {
  driver.get('http://localhost:3000');
  var location = driver.findElement(By.id('votingLocation'));
  if (location == null) {
    failures++;
    console.log('Voting Location | FAILED');
  }
  else {
    successes++;
    console.log('Voting Location | SUCCESS');
  }
}

// Checks that the voting count down loaded
function checkVotingCountDown (driver) {
  driver.get('http://localhost:3000');
  var count = driver.findElement(By.id('votingCountDown'));
  if (count == null) {
    failures++;
    console.log('Voting Count Down | FAILED');
  }
  else {
    successes++;
    console.log('Voting Count Down | SUCCESS');
  }
}
