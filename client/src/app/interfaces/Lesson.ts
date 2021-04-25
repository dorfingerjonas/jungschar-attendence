import Group from './Group';
import Room from './Room';
import Tutor from './Tutor';
import Child from './Child';

export default interface Lesson {
  id: number;
  group: Group;
  room: Room;
  tutors: Tutor[];
  children: Child[];
  note: string;
}
