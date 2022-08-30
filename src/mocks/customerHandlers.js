import "@testing-library/jest-dom";
import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

export const customers = [{ Id: uuidv4(), Name: "Mayank", Phone: 9876543210, Email: "mayank@gmail.com", Address: "home 5" }
  , { Id: uuidv4(), Name: "Pulkit", Phone: "9876556789", Email: "pulkit@gmail.com", Address: "home 6" }]

export const newCustomer = {
  id: uuidv4(),
  name: "star",
  email: "star@gmail.com",
  phone: "9876543219",
  // address: "Street 5 House 466",
};


export const data = {
  customers: [{ Id: uuidv4(), Name: "Mayank", PhoneNumber: 9876543210, Email: "mayank@gmail.com", Address: "home 5" }
    , { Id: uuidv4(), Name: "Pulkit", PhoneNumber: 9876556789, Email: "pulkit@gmail.com", Address: "home 6" }]
};

export const fetchCustomers = rest.get(
  "http://localhost:8080/v1/customer/customers",
  async (req, res, ctx) => {
    console.log("Data Requested", data);
    return res(ctx.status(200), ctx.json(data));
  }
)

// const postCustomer = rest.post(
//   "http://localhost:8080/Home/customer",
//   async (req, res, ctx) => {
//     return res(
//       ctx.json({
//         "Saved CustomerEntity Successfully": {
//           customer1,
//         },
//       })
//     );
//   }
// );

export const customerHandler = [/*postCustomer,*/ fetchCustomers];