import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//this is a simple setup we need to do just once to get enzyme working in our project.
//this will add support for v16 react
Enzyme.configure({
    adapter: new Adapter()
})

//setup a jest configuration, a json file, which will allow us to specify where the configuration files exist..
//these files will run first before our test files
