import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ImageUploader = async (id: string) => {
  const path = `${id}/${Date.now()}`;
  const db = storage().ref(path);
  const result = await launchImageLibrary({
    mediaType: 'photo',
    maxWidth: 1000,
    maxHeight: 1000,
  });
  await db.putFile(result.assets[0].uri);
  const url = await db.getDownloadURL();
  return url;
};

export default ImageUploader;
