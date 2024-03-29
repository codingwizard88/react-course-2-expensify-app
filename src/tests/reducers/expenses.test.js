import expensesReducer from  '../../reducers/expenses'
import expenses from '../fixtures/expenses'


test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'})
    expect(state).toEqual([])
})


test('should remove expense by ID',() => {
    const action = {

        //we specify a certain id to remove by selecting one of the expense arrays and getting its id. This is the expense array we will..
        //..be expecting to not be returned after this action is performed.
        type : 'REMOVE_EXPENSE',
        id: expenses[1].id
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual([
        expenses[0],
        expenses[2]
    ])
})

test('should remove expense by ID',() => {
    const action = {

        //we specify a certain id to remove by selecting one of the expense arrays and getting its id. This is the expense array we will..
        //..be expecting to not be returned after this action is performed.
        type : 'REMOVE_EXPENSE',
        //use -1 when you want to say that something was not found
        id: -1
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

//test add expense
test('should add expense', () => {
    const expense = {
        id: '109',
        description: 'Laptop',
        note: '',
        createdAt: 20000,
        amount: 10000
    }

const action = {
    type: 'ADD_EXPENSE',
    expense
}

const state = expensesReducer(expenses, action)
expect(state).toEqual([...expenses, expense])
})

test('should edit an expense', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates:  {
            amount
        }
    }

    const state = expensesReducer(expenses, action)
    expect(state[1].amount).toBe(amount)
})

test('should not edit an expense if id is not found', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates:  {
            amount
        }
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})