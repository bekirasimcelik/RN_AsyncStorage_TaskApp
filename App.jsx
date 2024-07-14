import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

LogBox.ignoreAllLogs(true);

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log('error', error);
    }
  };

  const addTodo = () => {
    if (todo) {
      const updatedTodos = [...todos, {id: uuid.v4(), text: todo}];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
    }
  };

  const loadTodos = async () => {
    // try {
    //   await AsyncStorage.removeItem('todos');
    // } catch (error) {}
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {}
  };

  const deleteTodo = async id => {
    const updatedTodo = todos?.filter(x => x.id !== id);
    setTodos(updatedTodo);
    saveTodos(updatedTodo);
  };

  const updateTodos = id => {
    const exitingTodo = todos?.find(x => x.id === id);
    if (!exitingTodo) return;

    Alert.prompt('Edit Todo', 'Update', newUpdateText => {
      if (newUpdateText) {
        const updatedTodos = todos.map(item =>
          item?.id === id ? {...item, text: newUpdateText} : item,
        );
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
      }
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>React Native AsyncStorage</Text>
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <TextInput
              onChangeText={text => setTodo(text)}
              placeholder="Type a ToDo"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={addTodo}
              style={[styles.button, styles.addButton]}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          keyExtractor={item => item.id?.toString()}
          data={todos}
          renderItem={({item}) => (
            <View style={styles.todoitem}>
              <Text style={{color: '#000000'}}>{item?.text}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
                    style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: 'gray',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  inputContainer: {},
  button: {
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  addButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    color: 'white',
  },
  buttonText: {
    color: '#fff',
  },
  todoitem: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
  },
  deleteButton: {
    padding: 10,
  },
});
