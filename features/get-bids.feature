Feature: Get all bids
  As an administrator
  I want to get all bids made for a particular item
  So that I can see the status of the bidding on that item

  Scenario: Require credentials
    Given I am not authenticated
    When I get the bids for an item
    Then I should get an error indicating that I am not authorized

  Scenario: Get all bids
    Given I am authenticated
    And there are some bids for item '19032'
    When I get the bids for an item
    Then I should see all associated bids