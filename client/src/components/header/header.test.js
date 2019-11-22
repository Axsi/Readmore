// import React from 'react';
// import renderer from 'react-test-renderer';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
//
// import { mount, shallow } from 'enzyme';
//
// import Filter from '../filter/filter';
// import Header from './header';
//
// import { filterVisibility } from "../../redux/actions";
//
// const mockStore = configureStore([]);
//
// //describe groups several related _tests_ together
// describe('Filter', ()=>{
//     let store = mockStore({
//         filterBar: false
//     });
//     let component;
//
//     beforeEach(()=>{
//         store = mockStore({
//             filterBar: false
//         })
//     });
//
//     component = renderer.create(
//             <Provider store={store}>
//                 <Header />
//             </Provider>
//         );
//
//     it('renders Filter menu on click', () => {
//         renderer.act(()=>{
//             component.root.find('#Search-Filter').props.onClick();
//         });
//        expect(store.dispatch).toHaveBeenCalledTimes(1);
//        expect(store.dispatch).toHaveBeenCalledWith(
//            filterVisibility()
//        )
//     })
// });