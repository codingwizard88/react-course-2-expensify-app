
import React from 'react'
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses'

test('should render ExpenseListItem with expenses[0]', () => {

    //we don't say expense = {...expenses[0]} because we're mapping all the props of ExpenseListItem and not just one
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />)
    expect(wrapper).toMatchSnapshot();
})