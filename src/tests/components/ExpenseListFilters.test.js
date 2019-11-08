import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters'
import moment from 'moment'
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
     />)
})

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
})

//simulate a change in the text and ensure that the correct prop got called. This would be the text prop that..
//gets passed from the store's state to the component. We simulate the prop by setting it to some value here.
test('should handle text change',() => {
    const value = 'rent'
wrapper.find('input').simulate('change',{
    target: { value }
})
expect(setTextFilter).toHaveBeenCalledWith(value);
})


test('should sort by date', () => {
    const value = 'date'
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByDate).toHaveBeenCalled();
})

test('should sort by amount', () => {
    const value = 'amount'
 
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenCalled();
})

//we want to to test that when the date picker fires that event it works as expected
//we expect it to get called with an object with startDate and endDate, and then we pass those up through the props
test('should handle date changes', () => {
//first we need to create a couple of dates to test with
const startDate = moment(0).add(4,'years');
const endDate = moment(0).add(8,'years');

//now we call the thing that will trigger the spies. The spies are thos functions that pretend to be the real functions
//but first we need to find DateRangePicker so we can access its prop that should trigger the function (and it the test case..
//..will trigger the spy, this prop is onDatesChange)
//call it with the stuff it would expect..
/* onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  } */

// ? when do we use toHaveBeenLastCalledWith vs toHaveBeenCalledWith

wrapper.find('DateRangePicker').prop('onDatesChange')({startDate,endDate})
expect(setStartDate).toHaveBeenLastCalledWith(startDate);
expect(setEndDate).toHaveBeenLastCalledWith(endDate)

})

test('should handle date focus  changes', () => {
    const calenderFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
    
    // ?why are we specifying the state property name in this way ?
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused)
})