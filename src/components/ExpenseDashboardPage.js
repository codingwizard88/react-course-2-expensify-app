//This is the homescreen component
//this component applies 

import React from 'react'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
const ExpenseDashboardPage = () => (
    <div>
    
   {/* this is the component that renders the text filter and date filter on the homescreen */}
    <ExpenseListFilters />

    {/* this is the component that displays the expenses on the homescreen, and it is influenced by filters applied..
    ..by ExpenseListFilters.
    ExpenseListFilters --> changes the filters state in the store --> ExpenseList get filtered according to the store filters */}
    <ExpenseList />
    
    </div>
  );
  

  export default ExpenseDashboardPage