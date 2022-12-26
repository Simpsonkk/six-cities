import { NameSpace } from './../../../consts';
import { State } from './../../../types/state.model';

export const getCity = (state: State): string =>
  state[NameSpace.Cities].currrentCity;
