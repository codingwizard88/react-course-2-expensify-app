import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });

    // when expecting objects, we need to use .toEqual
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})


test('should setup edit expense action object', () => {
    const action = editExpense('123abc',{note:'New note value'});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    })
})

test('should setup add expense action object with provided values', () => {
const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'this was last months rent'
}
const action = addExpense(expenseData);
expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
        ...expenseData,
        //use expect.any(data type) in order to say that i expect any value of the type i specify.
        id: expect.any(String)
    }
})
})

test('should setup add expense action object with default values', () => {
const action = addExpense();
expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense:{
        id: expect.any(String),
        description: '',
        note: '',
        amount: 0,
        createdAt:0
    }
})

})