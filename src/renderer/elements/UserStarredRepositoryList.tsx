import * as React from 'react';
import { Link, Redirect, Route, Router, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { RepositoryList } from '@/renderer/app/TrendingRepos/components/RepositoryList';
import { UserProfile } from '@/renderer/elements/UserProfile';
import { RepositoryEntity } from '@/renderer/infrastructure/model/Repository.entity';
import { UserEntity } from '@/renderer/infrastructure/model/User.entity';
import { themeConfig } from '@/renderer/infrastructure/styles/Theme';
import {
  FetchUserStarredRepositoryListActionType,
} from '@/renderer/store/Stargazer/actions/FetchUserStarredRepositoryListAction';

interface Props {
  user?: UserEntity;
  isLoading: boolean;
  repositoryList: RepositoryEntity[];
  handleStargazerClick(login: string): void;
  FetchUserStarredRepositoryListAction: FetchUserStarredRepositoryListActionType;
}

export class UserStarredRepositoryList extends React.Component<Props> {
  private get user() {
    return this.props.user;
  }

  private get login() {
    return this.user && this.user.attributes.login ? this.user.attributes.login : false;
  }

  componentDidMount(): void {
    if (this.login) {
      this.props.FetchUserStarredRepositoryListAction(this.login);
    }
  }

  private get repositoryList() {
    return this.props.repositoryList;
  }

  render() {
    return <>
      <Container>
        <UserContainer>
          {this.user ? <UserProfile user={this.user}/> : null}
        </UserContainer>
        <RepositoryList
          loading={this.props.isLoading}
          repositoryList={this.repositoryList}
          handleStargazerClick={this.props.handleStargazerClick}
          emptyRepositoryList={'EMPTY'}
        />
      </Container>
    </>;
  }
}

const UserContainer = styled.div`
  width: 100%;
  background-color: ${themeConfig.colors.greyLightest}
`;

const Container = styled.div`
  width: 100%;
  background-color: ${themeConfig.colors.greyLightest};
  overflow-y: auto;
  & ul {
    background-color: ${themeConfig.colors.greyLightest}
    border-top: 1px solid ${themeConfig.colors.black};
  }
`;
