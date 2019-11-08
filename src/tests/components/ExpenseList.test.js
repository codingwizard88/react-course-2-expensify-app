//When we're testing, we want to test the 'un-connected' version of the component, because we want to be able to provide a set of dynamic..
//..props. So we don't want the props to come from the store, instead, we will provide them directly.

import React from 'react'
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses'

test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses = {expenses} />)
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseList with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
})