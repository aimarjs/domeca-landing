describe("Bus Booking Form", () => {
  it("should render the booking form", () => {
    cy.visit("/");
    cy.get("h1").contains("Plan Your Bus Trip");
    cy.get('input[placeholder="Enter a first location"]').should("exist");
    cy.get('input[name="startDateTime"]').should("exist");
    cy.get('input[name="endDateTime"]').should("exist");
    cy.get('input[type="number"]').should("exist");
    cy.get('button[type="submit"]').contains("Submit Booking");
  });

  it("should add and remove a location", () => {
    cy.visit("/");
    // Add a location
    cy.get("button").contains("+").click();
    cy.get('input[placeholder="Enter a second location"]').should(
      "have.length",
      1
    );

    // Remove the added location
    cy.get("button").contains("−").first().click();
    cy.get('input[placeholder="Enter a second location"]').should(
      "have.length",
      0
    );
  });

  it("should show validation errors if required fields are missing", () => {
    cy.visit("/");
    // Submit the form without filling in required fields
    cy.get('button[type="submit"]').click();

    // Check for validation error messages
    cy.get("p").contains("Start Date and Time is required").should("exist");
    cy.get("p").contains("End Date and Time is required").should("exist");
  });

  it("should calculate the estimated cost correctly", () => {
    cy.visit("/");
    // Fill out the location input
    cy.get('input[placeholder="Enter a first location"]')
      .first()
      .type("Tallinn");
    cy.get(".suggestion-list").first().click();

    cy.get("button").contains("+").click();

    cy.get('input[placeholder="Enter a second location"]')
      .first()
      .type("Tartu");
    cy.get(".suggestion-list").first().click();

    // Fill out start and end date
    cy.get('input[name="startDateTime"]').type("2025-10-10T09:00");
    cy.get('input[name="endDateTime"]').type("2025-10-00T21:00");

    // Set passengers
    cy.get('input[type="number"]').clear().type("3");

    // Verify the estimated cost shows up
    cy.get("p").contains("Estimated Cost:").should("exist");
    cy.get("p").contains("€").should("exist"); // Assuming the cost is shown with €
  });

  it.only("should calculate waiting time correctly", () => {
    cy.visit("/");

    // Fill out the location input
    cy.get('input[placeholder="Enter a first location"]').type(
      "Tallinn, Estonia"
    );

    cy.get(".suggestion-list")
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.get("button").contains("+").click();

    cy.get('input[placeholder="Enter a second location"]')
      .first()
      .type("Riga, Latvia");
    cy.get(".suggestion-list")
      .first()
      .should("be.visible") // Ensure it's visible
      .click({ force: true }); // Force the click

    // Fill out start and end date with waiting time
    cy.get('input[name="startDateTime"]').type("2024-10-10T10:00");
    cy.get('input[name="endDateTime"]').type("2024-10-10T23:00"); // Long trip time

    cy.scrollTo("bottom");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Check waiting time display
    cy.get("p").contains("Waiting Time:").should("exist");
  });
});
