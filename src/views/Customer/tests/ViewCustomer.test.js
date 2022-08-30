import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../../context/Context';
import { fireEvent, render, screen, waitFor, within, } from "@testing-library/react";
import ViewCustomer from "../ViewCustomer";
import AddCustomerForm from '../AddCustomer';
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { customerHandler, customers, newCustomer } from "../../../mocks/customerHandlers";
import { inputs } from "../AddCustomer";
import userEvent from "@testing-library/user-event";
// import timeConverter from "../../../components/utils/timeConverter";

const server = new setupServer(...customerHandler);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("static tests", () => {
  it("should Customers heading and New Customer button ", () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <ViewCustomer />
        </BrowserRouter>
      </AppProvider>);

    const headingElem = screen.queryByRole("heading");
    expect(headingElem).toHaveTextContent("Customers");

    // expect(screen.getByText("No Rows to show")).toBeInTheDocument();
    const newCustomerButton = screen.getAllByRole("button")[0];
    expect(newCustomerButton).toHaveTextContent(/^New Customer$/);
    // screen.getByRole("jkwvbhivbu");
  });


  it("should show empty add customer form", () => {
    render(<AppProvider>
      <BrowserRouter>
        <AddCustomerForm />
      </BrowserRouter>
    </AppProvider>);
    // const button = screen.getByRole("button");
    // fireEvent.click(button);
    const titleValue = screen.getByText("New Customer");
    expect(titleValue).toBeInTheDocument();
    // console.log("inputs", inputs);
    inputs.forEach((input) => {
      expect(screen.getByText(input.label)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(input.placeholder)
      ).toBeInTheDocument();
    });

    const [submitButton, closeButton] = screen.getAllByRole("button").slice(-2);
    expect(submitButton).toHaveTextContent(/^Save Customer$/);

  });
});

describe("HTTP tests", () => {
  // afterEach(() => jest.restoreAllMocks());

  it("should show customer table", async () => {
    render(<AppProvider>
      <BrowserRouter>
        <ViewCustomer />
      </BrowserRouter>
    </AppProvider>);
    // screen.getByRole("gfgfggf")
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
    const table = screen.getByRole("table");

    // const option = screen.getAllByRole("option");
    // console.log(option);
    // screen.getByRole("fdhhs");

    // fireEvent.click(screen.getByRole('combobox'));
    // fireEvent.click(screen.getByRole('option', {
    //   name: /name/i
    // }));


    const columnNames = within(table).getAllByRole("columnheader");
    const tableHeaders = [
      "NAME",
      "PHONE",
      "EMAIL",
      "CREATED ON",
    ];
    tableHeaders.forEach((header, idx) =>
      expect(columnNames[idx]).toHaveTextContent(header)
    );

    const cells = await screen.findAllByRole("cell")


    const listSize = 2;
    let currentIdx = 0;
    customers.forEach((customer) => {
      if (currentIdx === listSize) {
        currentIdx = 0;
        const nextPage = screen.getAllByRole("listitem")[3];
        fireEvent.click(nextPage);
      }
      const cells = within(table)
        .getAllByRole("cell")
        .splice(currentIdx * 4, 4);
      expect(cells[0]).toHaveTextContent(customer.Name);
      expect(cells[1]).toHaveTextContent(customer.Phone);
      expect(cells[2]).toHaveTextContent(customer.Email);

      // expect(cells[3]).toHaveTextContent(customer.CreatedOn);
      // expect(cells[4]).toHaveTextContent(timeConverter(customer.CreatedAt));
      currentIdx++;
    });
  });

  it("post customer test", async () => {
    render(<AppProvider>
      <BrowserRouter>
        <AddCustomerForm />
      </BrowserRouter>
    </AppProvider>);
    // const button = screen.getByRole("button");
    // fireEvent.click(button);
    // screen.getByRole("gfgfggf")
    const submitButton = screen.getAllByRole("button")[0];
    const [nameInput, emailInput, phoneInput] = screen
      .getAllByRole("textbox")
      .slice(-3);
    // const phoneNumberInput = screen.getByRole("spinbutton");

    // const inputFields = [nameInput, emailInput, phoneNumberInput, addressInput];
    const userData = newCustomer;

    const user = userEvent.setup();


    await user.type(nameInput, userData.name);
    expect(nameInput).toHaveValue(userData.name);
    await user.type(emailInput, userData.email);
    expect(emailInput).toHaveValue(userData.email);
    await user.type(phoneInput, userData.phone);
    expect(phoneInput).toHaveValue(userData.phone);
    fireEvent.click(submitButton);

  });
});