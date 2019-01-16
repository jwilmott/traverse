import { RepositoryList } from '@/app/elements/RepositoryList';
import { assert } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';

import { RepositoryEntity } from '@/models/Repository.entity';

describe('<RepositoryList />', () => {
  test('displays list items', () => {
    const list = { abc: new RepositoryEntity('abc'), def: new RepositoryEntity('def') };
    const component = mount(<RepositoryList
      repositoryList={list}
      emptyRepositoryList={'empty'}
    />);
    assert.lengthOf(component.find('li.repository-list-item'), 2);
  });
});
