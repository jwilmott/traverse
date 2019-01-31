import { themeConfig } from '@/renderer/infrastructure/styles/Theme';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Router, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { UserEntity } from '@/renderer/model/User.entity';
import { formatRoute, Routes } from '@/renderer/Routes';
import { SettingsStore } from '@/renderer/store/Settings/Store';
import {
  RemoveUserFromStargazerListAction,
  RemoveUserFromStargazerListActionType,
} from '@/renderer/store/Stargazer/actions/RemoveUserFromStargazerListAction';
import { StargazerStore } from '@/renderer/store/Stargazer/Store';
import styled from 'styled-components';

interface Props {
  history: Router;
  match: Router;
  stargazer: StargazerStore;
  settings: SettingsStore;
  RemoveUserFromStargazerListAction: RemoveUserFromStargazerListActionType;
}

class StargazerAvatarList extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleSetStargazer = this.handleSetStargazer.bind(this);
    this.handleRemoveStargazer = this.handleRemoveStargazer.bind(this);
  }

  handleSetStargazer(user: UserEntity) {
    const login = user.attributes.login;
    this.props.history.push(formatRoute(Routes.STARGAZER_DETAIL, {login}));
  }

  handleRemoveStargazer(user: UserEntity) {
    this.props.RemoveUserFromStargazerListAction(user.attributes.login);
  }

  get stargazerList() {
    if (!this.props.stargazer.stargazerList) {
      return [];
    }

    const userList = Object.values(this.props.stargazer.stargazerList).map((stargazer) => stargazer.data);

    if (!userList) {
      return [];
    }

    return userList.map((user) => {
      const isCurrentUser = this.props.match.params && this.props.match.params.login === user.attributes.login;

      return <>
        <Avatar className={`avatar ${isCurrentUser ? 'selected' : null}`}
                key={user.id}
                onClick={() => this.handleSetStargazer(user)}
                src={user.attributes.avatarUrl}
                alt={`${user.attributes.login} avatar`}
        />
      </>;
    });
  }

  render() {
    return <>
      {this.stargazerList.length ? this.stargazerList : 'No stargazers'}
    </>;
  }
}

const borderWidth = 4;

const Avatar = styled.img`
  width: calc(100% + ${borderWidth}px);
  height: auto;
  border-left: ${borderWidth}px solid transparent;
  position: relative;
  left: -${borderWidth}px;
  &.selected {
    left: 0;
    border-left: 4px solid ${themeConfig.colors.green}
  }
`;

function mapStateToProps(state) {
  return {
    stargazer: state.stargazer,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      RemoveUserFromStargazerListAction,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StargazerAvatarList);