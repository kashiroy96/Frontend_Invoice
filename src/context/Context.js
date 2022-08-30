import React, { createContext, useReducer } from 'react';
import { PAGES, initialState } from "../constant"


export const AppReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case PAGES.ADD_CUSTOMER: {
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    }
    case PAGES.ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case PAGES.ADD_INVOICE: {
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    }

    case PAGES.SET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };
    case PAGES.SET_CUSTOMER:
      return {
        ...state,
        customers: [...action.payload],
      };
    case PAGES.SET_INVOICES:
      return {
        ...state,
        invoices: [...action.payload],
      };
    default:
      console.log("default case for context")
      return state;
  }
};



export const AppContext = createContext();

export const AppProvider = (props) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        customers: state.customers,
        items: state.items,
        invoices: state.invoices,
        dispatch,
      }}>

      {props.children}

    </AppContext.Provider>
  );
};