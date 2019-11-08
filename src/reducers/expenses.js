

//Expenses Reducer

// create a variable that holds the default state
const expensesReducerDefaultState = [];

export default  (state = expensesReducerDefaultState, action) => {
switch (action.type) {
    case 'ADD_EXPENSE':
       // return state.concat(action.expense)
       //a better way is to use the spread operator as shown below
       return [
        ...state,
        action.expense
       ]
       case 'REMOVE_EXPENSE':
           //we filter for 'not equal to the id we want to remove', so we end up with everything..
           //other than the id we want to remove. 
           //looks at all expenses arrays in the state and filters them
           // ? why is id written as an object ? I am guessing it's because it's a single value inside an array 
           return state.filter(({ id }) => id !== action.id)

           case 'EDIT_EXPENSE':
               //looks at all state objects and maps them
               // expense here is just some name we give to each array in state
               return state.map((expense) => {
                   if (expense.id === action.id){
                    return {
                        ...expense,
                    //merge expense with the updates, anything that was updated will fill in place of the old values.
                        ...action.updates,
                    }
                   } else {
                       return expense
                   }
               })
    default:
        return state;
}
}

