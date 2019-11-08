//this is the component that allows us to filter on our main page for specific dates, descriptions, etc. and also to ..
//..to sort based on amount or date.

import React from "react";

//import connect to the store in order to know the current state or changes in the state
import { connect } from "react-redux"; 
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";
//import 'react-dates/lib/css/_datepicker.css'

export class ExpenseListFilters extends React.Component {
    //we need to track one thing only which is calenderFocused, it will start at null
    state = {
        calenderFocused: null
    }

    //onDatesChange should accept an object that has start date and end date, so we will destructure that object to that.
    //any code that uses dispatch will be able to use 'props' instead of 'this.props'
    onDatesChange = ({ startDate, endDate }) => {
      this.props.setStartDate(startDate)
      this.props.setEndDate(endDate)
    }

    onFocusChange = (calenderFocused) => {
      this.setState(() => ({ calenderFocused }))
    }

onTextChange = (e) => {
  this.props.setTextFilter(e.target.value);
}

onSortChange = e => {
  if (e.target.value === "date") {
    this.props.sortByDate();
  } else if (e.target.value === "amount") {
    this.props.sortByAmount();
  }
}

  render() {
    return (
      <div>
        {/* write in the text box--> dispatches setTextFilter with the value being written --> the filters state gets updated --> ..
    the mapStateToProps gets activated because of the {connect} from 'react-redux' and the filter state value gets passed into ..
    ..here, and props.filters.text gets the value of the text filter in particular and that becomes the value of the text box, thus,
    ensuring that at any given point, the value shown on the text box (meaning each letter we just typed), it typing directly into the..
    text filter of the filter state and because a change in the state has occured it gets passed back to right here to change the value..
    in the text box to the value of the filter, which is the value we were just writing.
    Meaning we don't write directly into the text box!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />

        <select
        //props.filters.sortBy is coming from using mapStateToProp. So this is the value of sortBy in the filter store.
        //the HTML select box has the value of the sortBy in the filter store.
          value={this.props.filters.sortBy}

          //When a change in the select box occures, it triggers a dispatch action to either sortByDate or sortByAmount.
         //the dispatching is possible because we're using connect()(ExpenseListFilters)
          onChange={this.onSortChange}
        >
          {/* // "value=something" is the value that gets submitted behind the scene when we're tracking the select for changes */}
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

<DateRangePicker

//we use props.filters when it's a stateless function and we use this.props.filters when it's a class component
//we're able to use props because of mapStateToProps.
//this start date is coming from the filters reducers 'moment().startOf('month')
//the following props need to be specified for DateRangePicker
startDate = {this.props.filters.startDate}
endDate = {this.props.filters.endDate}
onDatesChange = {this.onDatesChange}
// focusedInput is the currently selected date(s) and onFocusChange is what changes the state of focusedInput.
focusedInput = {this.state.calenderFocused}
onFocusChange = {this.onFocusChange}
numberOfMonths={1}
isOutsideRange={()=>false}
/>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  
    filters: state.filters
  })


  //we will create a mapDispatchToProps for each of the five things that we want to get into the component
  //we simply call the action generator and pass the required arguments in
const mapDispatchToProps = (dispatch) => ({
setTextFilter: (text) => dispatch(setTextFilter(text)),
sortByDate: () => dispatch(sortByDate()),
sortByAmount: () => dispatch(sortByAmount()),
setStartDate: (startDate) => dispatch(setStartDate(startDate)),
setStartDate: (endDate) => dispatch(setEndDate(endDate))
})

/* export the connected version of ExpenseListFilters
The connect() function connects a React component to a Redux store.
It provides its connected component with the pieces of the data it needs from the store, and the functions it can..
 use to dispatch actions to the store. */
export default connect(mapStateToProps)(ExpenseListFilters);



