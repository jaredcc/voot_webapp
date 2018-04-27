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
console.log('Beginning Signup Page Tests...');

testPageLoad(driver_ff);
testPageLoad(driver_ch);

checkSignupForm(driver_ff);
checkSignupForm(driver_ch);

testCreateNewUser(driver_ff);
testCreateNewUser(driver_ch);


console.log('End Test: Failures = ' + failures + ' Successes = ' + successes);

// Define Test Functions Here
function testPageLoad(driver) {
  driver.get('localhost:3000/users/signup');

  driver.sleep(2000).then(function() {
    var headerTxt = driver.findElement(By.id('header')).getText();
    console.log(headerTxt);
    if (headerTxt == 'Create a New Account') {
      successes++;
      console.log('Page Load | SUCCESS');
    }
    else {
      failures++;
      console.log('Page Load | FAILED');
    }
  });
}

// Checks that the form loads correctly
function checkSignupForm(driver) {
  driver.get('http://localhost:3000/users/signup');
  var form = driver.findElement(By.id('signupForm'));
  if (form == null) {
    failures++;
    console.log('Signup Form Load | FAILED');
  }
  else {
    successes++;
    console.log('Signup Form Load | SUCCESS');
  }
}

function testCreateNewUser(driver) {
  driver.get('localhost:3000/users/signup');
  var emailInput = driver.findElement(By.id('email'));
  var passwordInput = driver.findElement(By.id('password'));
  emailInput.sendKeys('mockuser@test.com');
  passwordInput.sendKeys('testpassword');

  var submitBtn = driver.findElement(By.id('submitBtn'));
  submitBtn.click();

  driver.sleep(8000).then(function() {
    var headerTxt = driver.findElement(By.id('header')).getText();
    console.log(headerTxt);
    if (headerTxt == 'Login to your Account') {
      successes++;
      console.log('Create New User | SUCCESS');
    }
    else {
      failures++;
      console.log('Create New User | FAILED');
    }
  });
}