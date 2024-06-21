import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const AddItem = ({ idList, setState, notas }: { idList: string, setState: any, notas: any }) => {

  const [text, setText] = useState('');

  const handleAddItemClicked = async (event: any) => {
    
    // validar se o texto não está vazio
    if (text === '') {
      return;
    }

    try {
      // enviar a requisição para o backend - Cadastrando nota na lista
      const response = await axios.post('http://10.0.2.2:3000/nota', {
        listId: idList,
        text,
        checked: false
      });
      // limpar o campo de texto
      setText(''); 
      // atualizar a lista de notas
      setState([...notas, response.data]); 

    } catch (error) {

      console.error(error);
    }

  }

  return (
    <View style={styles.containerView}>
      <TextInput style={styles.viewInput} placeholder="Adicione um item a lista" value={text} onChangeText={setText} />
      <TouchableOpacity style={styles.viewButton} onPress={(e) => { handleAddItemClicked(e) }}>
        <Icon
          name="add"
          type="material"
          color="black"
          size={30}
          style={{ margin: 10 }}
        />
      </TouchableOpacity >
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    marginTop: 10,
  },
  viewButton: {
    flex: 1,
    borderRadius: 100,
    textAlign: 'center'
  },
  viewInput: {
    flex: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 19,
    textAlign: 'center'
  },
});

export default AddItem;