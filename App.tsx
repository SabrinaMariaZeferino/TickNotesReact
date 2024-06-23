import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { Icon } from '@rneui/themed';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList
   } from 'react-native';

import Note from './AppComponents/Note/Note';
import axios from 'axios';

const App: React.FunctionComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#FFF',
  };

  const [text, setText] = useState('');
  const [lists, setLists] = useState<any[]>([]);
  const [crescente, setCrescente] = useState(true);

  const reordenar = (crescente: boolean) => {
    setCrescente(!crescente);
    if(crescente) { // se for true, ordena de forma crescente conforme o id da lista
      setLists(lists.sort((a, b) => a.id - b.id));
    } else {
      setLists(lists.sort((a, b) => b.id - a.id));
    }
  }

  const getLists = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/listas');
      setLists(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getLists();
  }, [getLists]);

  const handleAddListClicked = async (event: any) => {
    if (text === '') {
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3000/lista', {
        title: text,
      });
      setText('');
      setLists([response.data, ...lists]);


    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteList = async (id: number) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:3000/lista/${id}`);
      setLists((currentLists) => currentLists.filter((list) => list.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  if(!lists) {
    return (
      <Text>Carregando...</Text>
    );
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { reordenar(crescente) } }>
          <Icon
              name="filter-list"
              type="material"
              color="white"
              size={35}
              // ao clicar no icone, gira o icone conforme a ordem
              style={{ transform: [{ rotate: crescente ? '0deg' : '180deg' }]} }
          />
        </TouchableOpacity>
        <View style={styles.headerPlaceholder} />
      </View>
      <View style={styles.content}>
        <Text style={styles.textTitle}>Lista de Tarefas</Text>
        <View style={styles.containerView}>
          <TextInput style={styles.viewInput} placeholder="Adicionar uma nova Lista" value={text} onChangeText={setText} />
          <TouchableOpacity style={styles.viewButton} onPress={(e) => { handleAddListClicked(e)}}>
            <Icon
                name="add"
                type="material"
                color="white"
                size={30}
                style={{ margin: 10 }}
            />
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.scrollView}>
          <FlatList
            data={lists}
            renderItem={({  item }) => (
              <Note list={item} handleDeleteList={handleDeleteList}  />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={true}
            style={styles.scrollView}
            ListEmptyComponent={<Text>Nenhuma lista cadastrada...</Text>}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: '#90CAF9',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    flex: 1,
  },
  headerPlaceholder: {
    width: 35,
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
  },
  textTitle: {
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 25,
    color: 'black',
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,

  },
  viewInput: {
    flex: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 23,
    textAlign: 'left',
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#3a8ad6',
    borderRadius: 100,
    textAlign: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
});

export default App;
