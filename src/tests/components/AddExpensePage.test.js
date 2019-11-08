import React from 'react'
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

//we will setup lifecycle actions so that we don't have to repeat code
let addExpense, history, wrapper;
//we want to define a fresh copy before each test case for each of the 3 variables. We will use 'beforeEach'
//check if AddExpensePage expect any props, and indeed it does (onSubmit and history)
//we will use spies to pass values as props
//history is an object not a function so we adjust our code a bit to make it equal to an object which contains the spy function
    
beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() }
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>)
    
})


test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

//now we want to test that when the form gets submitted, both our spies get called with the correct information

test('should handle onSubmit', () => {
    //call the function that gets passed into ExpenseForm
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])

    //now we expect the spies getting called and submitted with the correct information
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1])
})