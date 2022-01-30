import {User} from './db';

export const setProfile = async (doc: string, data: unknown) => {
  return await User.doc(doc).set(data);
};
