import { NameSpace, AuthorizationStatus } from './../../../consts';
import { State } from './../../../types/state.model';

export const getAuthStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
