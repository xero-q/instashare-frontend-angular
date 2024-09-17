Feature: Login Component

  Scenario: Checking the general elements of the Login form
    Given I open the login page
    Then I see "Login" in the header of the form
    And The form contains the username input field
    And The form contains the password input field
    And The form contains the submit button
   
