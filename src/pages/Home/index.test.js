import { fireEvent, render, screen } from "@testing-library/react";
import Page from "./index";
import EventCard from "./../../components/EventCard";


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Page />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Page />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !", {}, { timeout: 3000 })
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  
  it("an event card, with the last event, is displayed", () => {
    render(<Page />);

    const title = screen.getByText("Notre dernière prestation");
    expect(title).toBeInTheDocument();

    const container = screen.getByTestId("last-card-testid");
    expect(container).toBeInTheDocument();


  });
});


describe("When footer is created ", () => {
  it("Display the contact section", async () => {
    render (<Page />);
    await screen.findByText("Contactez-nous");
    await screen.findByText("45 avenue de la République, 75000 Paris");
    await screen.findByText("01 23 45 67 89");
    await screen.findByText("contact@77events.com");
    
  })
})