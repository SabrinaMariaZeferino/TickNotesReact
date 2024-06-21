import React, { useCallback, useEffect, useState } from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import AddItem from '../AddItem/AddItem';
import Item from '../Item/Item';
import axios from 'axios';


type NoteProps = {
  list: any,
  handleDeleteList: any,
};

const Note = ({ list, handleDeleteList }: NoteProps) => {
  const [notas, setNotas] = useState([]);

  if (!list) {
    return (
      <Text>Carregando...</Text>
    );
  }

  const getNotas = useCallback(async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/notas/${list.id}`);
      setNotas(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getNotas();
  }, [getNotas]);

  const handleDeleteNote = async (id: number, listId: number) => {
    try {
      // enviar a requisição para o backend - Deletando nota
      await axios.delete(`http://10.0.2.2:3000/nota/${id}`);
      // atualizar a lista de notas
      setNotas((currentNotas) => currentNotas.filter((nota) => nota.id !== id));
    } catch (error) {
      console.error(error);
    }
  } 



  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={styles.view}>
          <Text style={styles.header}>{list && list.title}</Text>
          <TouchableOpacity style={styles.viewButton} onPress={() => { handleDeleteList(list.id) }}>
            <Icon
              name="delete"
              type="material"
              color="white"
              size={17}
              style={{ marginTop: 7 }}
            />
          </TouchableOpacity>
        </View>
        <AddItem key={list.id} idList={list.id} setState={setNotas} notas={notas} />
      </>
      <SectionList
        sections={[{ data: notas }]}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({ item }) => (
          <Item key={item.id} item={item.text} isChecked={item.checked} id={item.id} listId={list.id} handleDeleteNote={handleDeleteNote} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 1,
    borderWidth: 1,
    borderColor: '#dceaf7',
  },
  header: {
    flex: 7,
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    marginLeft: 15,
  },
  view: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 14,
    borderWidth: 10,
    borderColor: '#E3F2FD',
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
  },
  viewButton: {
    flex: 1,
    textAlign: 'center',
  },
  viewCheck: {
    flex: 6,
    justifyContent: 'space-between',
    textAlign: 'center',
  },
});

export default Note;
