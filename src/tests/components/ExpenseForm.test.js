import React from 'react'
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import moment from 'moment'


test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

})

test('should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)

//.simulate(event[, mock]) => Self
// ? is 'submit' a reserved keyword or is it just a name we're using to name whatever the event is that ..
//can be activated on 'form'?
    wrapper.find('form').simulate('submit', {

        //A mock event object that will be merged with the event object passed to the handlers.
        preventDefault: () => { }
    })
    //we want to check that the error state is not empty, since we're submitting nothing in the expense form
    //so we get the length of the error string 
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
    const value = 'New description'
    const wrapper = shallow(<ExpenseForm />)
    //to access the wrapper, we use find.
    //we're looking at our inputs, we have 2; description and amount. Use '.at(index) to specify which one..
    //..we want to work with

    //we're trying to simulate the description change which should trigger this process;
  /*   onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }  */

    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    //we expect the state of the class ExpenseForm to have its description changed to the specified value.
    expect(wrapper.state('description')).toBe(value);
})


test('should set note on input change', () => {
    const value = 'New note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
})

test('should set amount if valid input', () => {
    const value = '23.50'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
})

test('should not set amount if invalid input', () => {
    const value = '12.122'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
})



//we need to verify that the props were formatted correctly, these props are what passes through to other components, and all..
//..the way up to the redux store itself, so it is the primary and most important result of the ExpenseForm component.
//to do this we use spies.

test('should call onSubmit prop for valid form submission', () =>{
//create spy
//spies (mocked functions) allow us to create a function that we can then pass into our component or anything else, and..
//..we can make sure that when an event happens (like form submission) that the spy is being called (a number of times or..
//..with specific data)
const onSubmitSpy = jest.fn();

//render expense form using shallow
//setup onSubmit prop because this is what we're testing
const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)

//simulate the form submission
wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
})

//expect the error state to be empty
expect(wrapper.state('error')).toBe('');

//we want to call it with everything in the first expense in fixtures but without the id..why?
expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
});
})

test('should set new data on date change', () => {
    const now = moment();
    //when we don't specify props, it means we're not passing any data in.
    const wrapper = shallow(<ExpenseForm />)

    //after rendering ExpenseForm, we want to trigger the prop from the child component (SingleDatePicker)
    //we use a method propr[key] provided by enzyme to specify a prop
    //I want to call it with whatever it's supposed to be called with, in this case, a moment instance
    
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);

})

//we want to test that onFocusChange sets up CalenderFocus

test('should set calender focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused })
    expect(wrapper.state('calenderFocused')).toBe(focused);
})