import moment from 'moment'
//this is used to determine the expenses that will be visible (displayed)
// expenses: the complete list of stored arrays of expenses
//expenses contains the actual array of data we entered while the other parameters are the deconstruction of the..
//..filter array
//this function takes in the array of expenses and the various filter parameters and returns filtered and sorted array.
export default (expenses, { text, sortBy, startDate, endDate }) => {

    // this function will return a filtered arrays of expenses
    return expenses.filter((expense) => {

        //we're utilizing moment() to help us filter dates. We will use moment for anything related ot date or time.
        //convert createdAt to a moment so we can utilize moment with it moving forward.
        const createdAtMoment = moment(expense.createdAt)

        //is there a startDate specified through the props passed through from the parent component? if yes then..
        //..set the startDateMatch to true if it isSameOrBefore the createdAt moment of the expense array we're looking at..
        //and set it to false if it's not, this way it won't be appearing. If start date is not specified to begin with then ..
        //by default return true (how will this impact things?)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment,'day') : true
        const endDateMatch = endDate? endDate.isSameOrAfter(createdAtMoment,'day') : true
        
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch;
        //take the resulting array of filtering and apply sort to it.
    }).sort((a,b) => {
        if (sortBy === 'date') {
            //if the result is 1 then they get swapped
            //so we want to get the most recent first in order
            return a.createdAt < b.createdAt ? 1 :  -1
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}