// Instantiate Selenium Driver
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

// Create Drivers for the browsers we want
// to test our site on
// var driver_ff = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver_ch = new webdriver.Builder().forBrowser('chrome').build();

// Instantiate Other Variables
var failures = 0;
var successes = 0;

// Call Test Functions Here
console.log('Beginning Signup Page Tests...');

// testPageLoad(driver_ff);
testPageLoad(driver_ch);

// checkSignupForm(driver_ff);
checkSignupForm(driver_ch);

// testCreateNewUser(driver_ff);
// testCreateNewUser(driver_ch);

// console.log('End Test: Failures = ' + failures + ' Successes = ' + successes);

// Define Test Functions Here
function testPageLoad(driver) {
  driver.get('localhost:3000/users/signup').then(function() {
    driver.findElement(By.id('header')).getText().then(function(text) {
      if (text == 'Create a New Account') {
        successes++;
        console.log('Page Load | SUCCESS');
      } else {
        failures++;
        console.log('Page Load | FAILED');
      }
    });
  });
}

// Checks that the form loads correctly
function checkSignupForm(driver) {
  driver.get('http://localhost:3000/users/signup');
  driver.findElement(By.id('signupForm')).then(function(form) {
    if (form == null) {
      failures++;
      console.log('Signup Form Load | FAILED');
    } else {
      successes++;
      console.log('Signup Form Load | SUCCESS');
    }
  });
}

function testCreateNewUser(driver) {
  driver.get('localhost:3000/users/signup').then(function() {
    driver.findElement(By.id('email')).click().sendKeys('mockvootuser324@test.com');
    driver.findElement(By.id('password')).click().sendKeys('testpassword979');

    driver.findElement(By.id('submitBtn')).click().then(function() {
      driver.findElement(By.id('header')).getText().then(function(text) {
        if (text == 'Login to your Account') {
          successes++;
          console.log('Create New User | SUCCESS');
        } else {
          failures++;
          console.log('Create New User | FAILED');
        }
      });
    });

  });

}
