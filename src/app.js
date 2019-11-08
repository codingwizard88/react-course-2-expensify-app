import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import {addExpense} from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'react-dates/lib/css/_datepicker.css'


//this creates a store and include the 2 reducers in it.
//once the store exists, all the default store methods become available.    
const store = configureStore()

//we implement addExpense on an object, so we need to use curly braces and paired key and value
store.dispatch(addExpense({description:'Water Bill', amount:4500}))
store.dispatch(addExpense({description:'Gas Bill', createdAt: 1000}))
store.dispatch(addExpense({description:'Rent', amount:1095}))
store.dispatch(setTextFilter(''))

//once the setTextFilter sets the 'text' value, this value is passed to the Get visible expenses method, which has these..
//..parameters :(expenses, { text, sortBy, startDate, endDate })
const state = store.getState()
const visibleExpenses =  getVisibleExpenses(state.expenses,state.filters)
//the state.filters is passed in where the above 4 parameters are expected, and they so happen to be the..
//..4 parameters of the filter state, and who says so? the filter reducer!

const jsx = (
    <Provider store = {store}>
<AppRouter />
    </Provider>
    
)

ReactDOM.render(jsx, document.getElementById("app"));
