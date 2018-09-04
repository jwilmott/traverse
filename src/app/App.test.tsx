import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'; // Smart components

import * as React from 'react';
import { SET_FREQUENCY } from '../infrastructure/redux/actions/SetFrequency.action';
import { RepositoryEntity } from '../models/Repository.entity';

import App from './App';

const mockStore = configureStore();
const INITIAL_STATE = {
  frequency: 'weekly',
  repositoryList: {
    abc: new RepositoryEntity('abc'),
  },
};
const store = mockStore(INITIAL_STATE);

describe('<App />', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('renders viewport content correctly', () => {
    const app = mount(<App store={store}/>);
    expect(app.find('#app-viewport').text()).toBe('No Name');
  });

  it('updates the store when selecting a new frequency', () => {
    const app = mount(<App store={store}/>);
    store.clearActions();

    app.find('#select-monthly').simulate('click');

    expect(store.getActions()).toEqual([{
      type: SET_FREQUENCY,
      payload: 'monthly',
    }]);
  });
});
