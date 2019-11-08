//this file is a prime example for using mapDispatchToProps

import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component {

    //expenses here is whatever onSubmit gets called with
    //expenses here coming from the child ExpenseForm
  onSubmit = (expenses) => {
        // props.dispatch(addExpense(expense))

        //this code works because we define addExpense below (inside mapDispatchToProps)
        //this props (addExpense) will be specified in the test file as well
        this.props.addExpense(expenses);

        //use push to get redirected automatically to a specific path
        this.props.history.push("/");
      }

render() {
    return (
<div> 
    <h1>Add Expense</h1>

{/* we display the expense form on the add expense page */}
    <ExpenseForm
      onSubmit={this.onSubmit}
    />
  </div>

    )
}

}

//!need to think about this block of code again! check out the connect documentation in react-redux
//this is a way to return your dispatcher functions, allowing you to abstract them away from the component itself
const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense))
});

//connect(mapStateToProps, mapDispatchToProps)
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
