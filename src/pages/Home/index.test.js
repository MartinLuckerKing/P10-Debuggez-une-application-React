const mockData = {
  events: [
    {
      id: 1,
      type: "conférence",
      date: "2022-04-29T20:28:45.744Z",
      title: "User&product MixUsers",
      cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
    },
    {
      id: 2,
      type: "expérience digitale",
      date: "2022-01-29T20:28:45.744Z",
      title: "#DigitonPARIS",
      cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
    },
  ],
};

import { fireEvent, render, screen } from "@testing-library/react";
import Page from "./index";
import DataContext from "./../../contexts/DataContext";
import { within } from "@testing-library/react";

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
      await screen.findByText("Message envoyé !", {}, { timeout: 3000 });
    });
  });
});

describe("When a page is created", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("a list a people is displayed", () => {
    render(<Page />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(2);
    expect(screen.getByText("Christine")).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    render(<Page />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  it("a list of events is displayed", async () => {
    render(
      <DataContext.Provider value={{ data: mockData, error: null }}>
        <Page />
      </DataContext.Provider>
    );

    const allEventCards = screen.getAllByTestId("card-testid");
    const firstEventCard = allEventCards[0];
    const secondEventCard = allEventCards[1];

    const firstTitle = within(firstEventCard).getByText(
      "User&product MixUsers"
    );
    const firstLabel = within(firstEventCard).getByText("conférence");

    const secondTitle = within(secondEventCard).getByText("#DigitonPARIS");
    const secondLabel = within(secondEventCard).getByText(
      "expérience digitale"
    );

    expect(firstTitle).toBeInTheDocument();
    expect(firstLabel).toBeInTheDocument();
    expect(secondTitle).toBeInTheDocument();
    expect(secondLabel).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {});
});

describe("When footer is created ", () => {
  it("Display the contact section", async () => {
    render(<Page />);
    await screen.findByText("Contactez-nous");
    await screen.findByText("45 avenue de la République, 75000 Paris");
    await screen.findByText("01 23 45 67 89");
    await screen.findByText("contact@77events.com");
  });
});
