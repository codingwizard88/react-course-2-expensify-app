import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

//in class-based compoentns, we use 'this.props' instead of props.
export class EditExpensePage extends React.Component {


  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
      {/* when the expense props is specified as show below, then the Expense form fill the fields of the form with the parameters..
      ..of the expense */}
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />

        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => {
      return expense.id === props.match.params.id;
    })
  };
};


  //dispatch the action to edit the expense
  //we need to find the expense by ID even though we already already selected it and gotten to the edit page. This is because
  //we need to know the id of the array to edit in the store, as this is how the edit action identifies the array that needs editing...
  //the editing action:
  // export const editExpense = (id, updates) => ({
  //   type: 'EDIT_EXPENSE',
  //   id,
  //   updates
  //})

  //?why are we passing props here (own props)?
  //? can we write 'id' instead of 'data' so that it's more indicative of whatt that data is?
const mapDispatchToProps = (dispatch,props) => ({
  editExpense: (id,expense) => dispatch(editExpense(id,expense)),
  removeExpense: (data) => dispatch(removeExpense(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);
