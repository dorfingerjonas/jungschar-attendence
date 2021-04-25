import Group from './Group';

export default interface Child {
  id: number;
  name: string;
  group: Group;
  absent?: boolean;
}
