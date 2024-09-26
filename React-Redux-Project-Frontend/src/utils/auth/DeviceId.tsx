import * as Device from 'expo-device';

const getDeviceId = async (): Promise<string> => {
  return Device.osInternalBuildId || Device.osBuildId || '';
};

export default getDeviceId;