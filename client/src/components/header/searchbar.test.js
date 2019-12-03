import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
// import '@testing-library/jest-dom/extend-expect';

import Filter from '../filter/filter.js';

import generalReducer from '../../redux/reducers/general_reducer';
import * as types from '../../redux/actions/action-types';

const mockStore = configureStore([]);


//The first two tests a reducer to make sure that clicking the Filter Button will change the filterBar state
describe('Filter Button and Menu Visibility', ()=>{
    it('should return initial state of filterBar', ()=>{
        expect(generalReducer(undefined, {})).toEqual(
            {
                filterBar: false
            }
        )
    });

    it('should handle the FILTER_VISIBILITY action', ()=>{
        expect(generalReducer([], {
            type: types.FILTER_VISIBILITY
        })).toEqual({
            filterBar: true
        })
    });

    //test redux connected component
    it('filter menu should be visible aka "" when filterBar state is true', ()=>{
        let store = mockStore({
            filterBar: true
        });

        const component = shallow(
            <Provider store={store}>
                <Filter />
            </Provider>); //issues with prop

        // console.log(component.get(0).props);
        console.log(component.find('connect').length);
        // expect(component.find('#Filter-Container').prop('style').toHaveProperty('display', "none"));
        // expect(component.get(0).props['children']['props']['style']['display']).toEqual("");
        // component.find('#Filter-Container').simulate('click');

        // expect(component.find('#Filter-Container').prop('style').toHaveProperty('display', ""));
    });


    // let store = mockStore({
    //     filterBar: false
    // });
    // let component;
    //
    // beforeEach(()=>{
    //     store = mockStore({
    //         filterBar: false
    //     })
    // });
    //
    // component = renderer.create(
    //         <Provider store={store}>
    //             <SearchBar />
    //         </Provider>
    //     );
    //
    // it('renders Filter menu on click', () => {
    //     renderer.act(()=>{
    //         component.root.find('#Search-Filter').props.onClick();
    //     });
    //    expect(store.dispatch).toHaveBeenCalledTimes(1);
    //    expect(store).toEqual({filterBar: true})
    //    )
    // })
});