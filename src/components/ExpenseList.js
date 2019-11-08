//This component takes in the array of expenses (state) and renders each expense using map() and the component ExpenseListItem

import React from "react";

//we use connect from react-redux library to connect the react components to the store
import { connect } from "react-redux";

import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";
//regular unconnected component that then gets connected at the bottom using connect(mapStateToProps)(ExpenseList)..
//..by having the state mapped to the props.
export const ExpenseList = props => (
  <div>
    {/* 'expenses' holds the list of expenses from the store after they have been..
    .. passed through the selector which filters them according to the stored filters state */}

    {/* ? why are we enclosing this block in curly braces? somehow this is what allows us to use the keyword 'return' ? */}
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
       // pass each expense to the ExpenseListItem child, which displays individual items on the ExpenseList
      props.expenses.map(expense => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}

    {/* The map() method creates a new array with the results of calling a function for every array element. 
        the function being called here is ExpenseList which has a return of ExpenseListItem arrays, which consist of ..
        ..the arrays stored as state, each array is an expense, expense arrays consist of objects such as description, amount, etc 
        expense here represents a single array as we cycle through each 'thing' inside expenses, which is the arrays of expenses. So..
        ..for each expense array, we return the result of calling ExpenseListItem with the current expense array's id as well as..
        ..the objects inside the expense array (by using the spread operator instead of listing all these objects such as description,..
        .. amount, etc), and over at the ExpenseListemItem, these objects get passed into a jsx that displays them inside html tags.
        Utilizing map() applies this logic to each array in expenses state, which is each submitted expense that currently exists..
        ..in the state. */}
  </div>
);

//state here is the state stored inside the store
//A function that maps state to props
// As the store changes, this function will run again, updating the state values that get ..
//..stored as props and passed to whatever react component
const mapStateToProps = state => {
  //this function will help us determine what information from the store do we want our component to access
  return {
    /*        now the ExpenseList component would have access to the name props, or any others that are in the state inside the store
        we store the expenses state inside a props that we call 'expenses', same with filters, now we can access..
        ..anything inside the expenses array (stored in state) by using props.expenses
        this function, combined with connect, gives us access to the state that's inside the store
        selectExpenses aceept argument of expense arrays and the various filter parameters, this way we're not just..
         ..getting the entire state, instead, we're getting the filtered state. */
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

// A call to CONNECT that combines the mapping of state to props with the component that gets the props passed into.
//this call effectively links the state (in the redux store) to the components (of react)
//in other words; our component can access whatever data it needs from the store.
export default connect(mapStateToProps)(ExpenseList);
