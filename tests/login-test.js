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
console.log('Beginning Login Page Tests...');

testPageLoad(driver_ff);
testPageLoad(driver_ch);

testLoginRedirectLoad(driver_ff);
testLoginRedirectLoad(driver_ch);

console.log('End Test: Failures = ' + failures + ' Successes = ' + successes);

// Define Test Functions Here
function testPageLoad(driver) {
  driver.get('localhost:3000/users/login');

  driver.sleep(2000).then(function() {
    var headerTxt = driver.findElement(By.id('header')).getText();
    console.log(headerTxt);
    if (headerTxt == 'Login to your Account') {
      successes++;
      console.log('Page Load | SUCCESS');
    }
    else {
      failures++;
      console.log('Page Load | FAILED');
    }
  });
}

function testLoginRedirectLoad(driver) {
  driver.get('localhost:3000/users/login');
  var redirectBtn = driver.findElement(By.id('signupLink'));
  redirectBtn.click();

  driver.sleep(8000).then(function() {
    var headerTxt = driver.findElement(By.id('header')).getText();
    console.log(headerTxt);
    if (headerTxt == 'Create a New Account') {
      successes++;
      console.log('Redirect Load | SUCCESS');
    }
    else {
      failures++;
      console.log('Redirect Load | FAILED');
    }
  });
}