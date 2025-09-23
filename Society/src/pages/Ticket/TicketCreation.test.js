// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import TicketCreation from "./TicketCreation";

// test("Checking Component Loaded", () => {
//   render(<TicketCreation />);
//   expect(screen.queryByText(/Ticket Creation/i)).toBeInTheDocument();
// });

// test("All input fields are empty initially", () => {
//   render(<TicketCreation />);

//   // Use null for number type input
//   expect(screen.getByPlaceholderText("Ticket ID")).toHaveValue(null);

//   // String inputs can be checked with empty string
//   expect(screen.getByPlaceholderText("Ticket Name")).toHaveValue("");
//   expect(screen.getByPlaceholderText("Category")).toHaveValue("");
//   expect(screen.getByPlaceholderText("Block")).toHaveValue("");
//   expect(screen.getByPlaceholderText("Flat")).toHaveValue("");
//   expect(screen.getByPlaceholderText("Attachment")).toHaveValue("");
// });
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TicketCreation from "./TicketCreation";

describe("🧪 TicketCreation Component", () => {
  test("renders component heading", () => {
    render(<TicketCreation />);
    expect(screen.getByText(/Ticket Creation/i)).toBeInTheDocument();
  });

  test("all inputs are empty on initial load", () => {
    render(<TicketCreation />);
    expect(screen.getByPlaceholderText("Ticket ID")).toHaveValue(null); // type="number"
    expect(screen.getByPlaceholderText("Ticket Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Category")).toHaveValue("");
    expect(screen.getByPlaceholderText("Block")).toHaveValue("");
    expect(screen.getByPlaceholderText("Flat")).toHaveValue("");
    expect(screen.getByPlaceholderText("Attachment")).toHaveValue("");
  });

  test("typing in form inputs updates their values", () => {
    render(<TicketCreation />);

    fireEvent.change(screen.getByPlaceholderText("Ticket ID"), {
      target: { value: "101" },
    });
    expect(screen.getByPlaceholderText("Ticket ID")).toHaveValue(101);

    fireEvent.change(screen.getByPlaceholderText("Ticket Name"), {
      target: { value: "Leaky Faucet" },
    });
    expect(screen.getByPlaceholderText("Ticket Name")).toHaveValue(
      "Leaky Faucet"
    );

    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Plumbing" },
    });
    expect(screen.getByPlaceholderText("Category")).toHaveValue("Plumbing");

    fireEvent.change(screen.getByPlaceholderText("Block"), {
      target: { value: "B" },
    });
    expect(screen.getByPlaceholderText("Block")).toHaveValue("B");

    fireEvent.change(screen.getByPlaceholderText("Flat"), {
      target: { value: "203" },
    });
    expect(screen.getByPlaceholderText("Flat")).toHaveValue("203");

    fireEvent.change(screen.getByPlaceholderText("Attachment"), {
      target: { value: "image.jpg" },
    });
    expect(screen.getByPlaceholderText("Attachment")).toHaveValue("image.jpg");
  });

  test("submitting the form displays submitted ticket and resets form", () => {
    render(<TicketCreation />);

    fireEvent.change(screen.getByPlaceholderText("Ticket ID"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ticket Name"), {
      target: { value: "Power Failure" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Electric" },
    });
    fireEvent.change(screen.getByPlaceholderText("Block"), {
      target: { value: "A" },
    });
    fireEvent.change(screen.getByPlaceholderText("Flat"), {
      target: { value: "101" },
    });
    fireEvent.change(screen.getByPlaceholderText("Attachment"), {
      target: { value: "proof.pdf" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check ticket is rendered in list
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText(/Power Failure/i)).toBeInTheDocument();
    expect(screen.getByText(/Electric/i)).toBeInTheDocument();
    expect(screen.getByText(/A\/101/i)).toBeInTheDocument();
    expect(screen.getByText(/proof\.pdf/i)).toBeInTheDocument();

    // Inputs should be reset
    expect(screen.getByPlaceholderText("Ticket ID")).toHaveValue(null);
    expect(screen.getByPlaceholderText("Ticket Name")).toHaveValue("");
  });
});
