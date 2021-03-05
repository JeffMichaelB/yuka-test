import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "favorite";

const LoadFavorite = async () => {
  const datas = await AsyncStorage.getItem(key);

  console.log(datas);
  // Lecture de la valeur en string
  return datas === null ? [] : JSON.parse(datas);
};

const SaveFavorite = async (datas) => {
  // Stockage de la valeur transformée en JSON
  await AsyncStorage.setItem(key, JSON.stringify(datas));
};

const DeleteDataFavorite = async (data, datas) => {
  if (!datas) {
    datas = await LoadFavorite();
  }

  const index = datas.indexOf(data);
  if (index !== -1) {
    datas.splice(index, 1);
    await SaveFavorite(datas);
  }
};

const AddDataFavorite = async (data) => {
  const datas = await LoadFavorite();
  //console.log(data);
  // data est intégré au tableau datas
  datas.push(data);
  await SaveFavorite(datas);
};

export { LoadFavorite, SaveFavorite, DeleteDataFavorite, AddDataFavorite };
