import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

 /* the big picture here is to use local component state to track the changes to all of these inputs, and only
 utilize that information in adding or editing when the user clicks the submit button on the form. */

//this is a very valuable class construction because it's applicable whenever we want to construct a user entry form page.

export default class ExpenseForm extends React.Component {

constructor(props){

    // There is only one reason when one needs to pass props to super(): When you want to access this.props in constructor.
    //we can see that we do indeed need to access the props that was passed into constructor.
    super(props)
    this.state =  {

/* using this pattern allows us to have the state initially filled with the expense array that we want to editing if..
..there is an expense array specified, otherwise we set the field to empty */

        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : '',
        amount:props.expense ? (props.expense.amount/100).toString() : '',
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        calenderFocused:false,
        error: ''
    }
}

//with every change, we update the local state.
//e is the value that was entered in the description area, and we set the attribute 'description' that is in the..
//..state of this class to that change that just happened.
onDescriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({ description }))
} 

onNoteChange = (e) => {
    const note = e.target.value
    this.setState(() => ({ note }))
}

onAmountChange = (e) => {
    const amount =e.target.value
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
        this.setState(() => ({amount}))
    }
}

onDateChange = (createdAt) => {
    if (createdAt){
        this.setState(() => ({ createdAt }))
    }

}

onFocusChange = ({ focused }) => {
 this.setState (() => ({calenderFocused: focused }))
}

onSubmit =(e) =>{
    e.preventDefault()

    if(!this.state.description || !this.state.amount){
    this.setState(() => ({error: 'Please provide description and amount.'}))
} else {
    this.setState(() => ({error:''}))

    // AddExpensePage has a prop named onSubmit for the ExpenseForm child..
    //data is passing from the onSubmit on the AddExpensePage to here (this.props.onSubmit)....
    //..BUT!!!!!! all the values right infront of us here are being read from the state of this class..
    //..
    //onSubmit in the AddExpensePage gets these values!!!
    //This is where the values entered get recognized as submitted values, and transformed if needed.

    //this pattern is used to send data to the parent (AddExpensePage), onSubmit here is considered the parent's callback function
    //this.props.callback(dataToParent)
    this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount,10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note:this.state.note
    })
}
}

    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                    type = "text"   
                    placeholder = "Description"
                    autoFocus
                    // value is what is shown on the text box itself, and it comes from the class's state
                    value = {this.state.description}
                    onChange = {this.onDescriptionChange}
                    />

                    <input
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    /> 

                    <SingleDatePicker
                    date = {this.state.createdAt}
                    onDateChange = {this.onDateChange}
                    focused = {this.state.calenderFocused}
                    onFocusChange = {this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    />

                    <br/>
                    <textarea
                    placeholder="Add a note for your expense (optional)"
                    value = {this.state.note}
                    onChange = {this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}


