import moment from 'moment'
import filtersReducer from '../../reducers/filters';

//first, we make sure the default is good

test('should setup default filter values', () => {
    const state= filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should setup sortBy to amount', () => {
    //we're setting the state the gets inputted to undefined because we don't care what the state is when we sort by amount..
    //we only care that it will output a state that has a property 'sortBy' that is equal to 'amount'
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount')
})

test('should setup sortBy to date', () => {


    //here we set a current state because we want to see that the sortBy of the state will change
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }

    const state  = filtersReducer(currentState, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date');

})

test('should setup text filter', () => {

//this is te text we will test with
const text = 'this is my filter'
    
const action = {
    type: 'SET_TEXT_FILTER',
    text
}
    const state = filtersReducer(undefined, action);
expect(state.text).toBe(text);
})


test('should setup startDate filter', () => {
const startDate = moment()
    const action = {
        type: 'SET_START_DATE',
        startDate
    }
        const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
    })

    
test('should setup endDate filter', () => {
    const endDate = moment()
        const action = {
            type: 'SET_END_DATE',
            endDate
        }
            const state = filtersReducer(undefined, action);
        expect(state.endDate).toEqual(endDate);
        })