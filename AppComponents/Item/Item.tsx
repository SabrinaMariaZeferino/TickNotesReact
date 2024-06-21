import { CheckBox, Icon } from '@rneui/themed';
import axios from 'axios';
import { useState, useEffect } from 'react';


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


import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';


const Item = ({ item, isChecked, id, listId, handleDeleteNote, notas }: { item: string, isChecked: boolean, id: number, listId: number, handleDeleteNote: any, notas: any }) => {
  const [checkValue, setCheckValue] = useState(isChecked);

  

  const handleCheckNote = async () => {
    try {
      // enviar a requisição para o backend - Atualizando nota
      await axios.put(`http://10.0.2.2:3000/nota/${id}`, {
        text: item,
        checked: !checkValue,
        listId,
      });
      // atualizar a lista de notas
      setCheckValue(!checkValue);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.item}>
      <View style={styles.viewCheck}>
        <CheckBox
          checked={checkValue}
          onPress={() => { handleCheckNote() }}
          checkedColor="#0F0"
          size={30}
          textStyle={styles.title}
          title={<Text style={styles.title}>{item}</Text>}
          uncheckedColor="#3a8ad6"
        />
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={() => { handleDeleteNote(id, listId) } }  >
        <Icon
          name="clear"
          type="material"
          color="red"
          size={17}
          style={{ marginTop: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
}


export default Item;