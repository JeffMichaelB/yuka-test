import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "historique";

const Load = async () => {
  const datas = await AsyncStorage.getItem(key);

  return datas === null ? [] : JSON.parse(datas);
};

const Save = async (datas) => {
  await AsyncStorage.setItem(key, JSON.stringify(datas));
};

const DeleteData = async (data, datas) => {
  if (!datas) {
    datas = await Load();
  }

  const index = datas.indexOf(data);
  if (index !== -1) {
    datas.splice(index, 1);
    await Save(datas);
  }
};

const AddData = async (data) => {
  const datas = await Load();

  datas.push(data);
  await Save(datas);
};

export { Load, Save, DeleteData, AddData };
