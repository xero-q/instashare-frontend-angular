Feature: Signup Component

  Scenario: Checking the general elements of the Signup form
    Given I open the signup page
    Then I see "Sign Up" in the header of the form
    And The form contains the "username" input field
    And The form contains the "password" password field
    And The form contains the "passwordConfirm" password field
    And The form contains the "email" input field
    And The form contains the submit button
   
