import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../components/Header'

/* Shallow rendering lets you render a component “one level deep” and assert facts about what its render method returns, without..
.. worrying about the behavior of child components, which are not instantiated or rendered. This does not require a DOM. */


test('should render Header correctly', () => {
    const wrapper = shallow(<Header />)

    //toJSON will take the wrapper and extract the rendered output
expect(wrapper).toMatchSnapshot();
})



/*     const renderer = new ReactShallowRenderer();
    renderer.render(<Header />)
expect(renderer.getRenderOutput()).toMatchSnapshot(); */
//we pass the jsx that we're trying to render into shallow()
// const wrapper = shallow(<Header />)
//wrapper.find will find every node on the DOM that has the specified tag
//the following means that we're looking for 1 and only 1 h1 tag in our rendered component
// expect(wrapper.find('h1').length).toBe(1);

