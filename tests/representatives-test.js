// Instantiate Selenium Driver
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// Create Drivers for the browsers we want
// to test our site on
// var driver_ff = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver_ch = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// Instantiate Other Variables
var failures = 0;
var successes = 0;

// Call Test Functions Here
console.log('Beginning Representative Page Tests...');

testPageLoad(driver_ch);
testRepresentativeLoad(driver_ch);

// console.log('End Test: Failures = ' + failures + ' Successes = ' + successes);

// Define Test Functions Here
function testPageLoad(driver) {
  driver.get('localhost:3000/representatives');
  driver.findElement(By.id('header')).getText().then(function(text) {
    if (text == 'Find Your Representatives') {
      successes++;
      console.log('Page Load | SUCCESS');
    }
    else {
      failures++;
      console.log('Page Load | FAILED');
    }
  });
}

function testRepresentativeLoad(driver) {
  driver.get('localhost:3000/representatives');
  driver.findElement(By.id('repBtn')).then(function(btn) {
    btn.click().then(function() {

      driver.findElement(By.id('header')).getText().then(function(text) {
        console.log(text);
        if (text == 'Your Representatives') {
          successes++;
          console.log('Representative Table Load | SUCCESS');
        }
        else {
          failures++;
          console.log('Representative Table Load | FAILED');
        }
      });

    })
  });


}
