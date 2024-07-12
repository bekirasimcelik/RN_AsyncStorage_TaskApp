import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(['']);

  const addTodo = () => {
    setTodos([...todos, {id: Date.now(), text: todo}]);
  };

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
          renderItem={item => (
            <View style={styles.todoitem}>
              <Text style={{color: '#000000'}}>text</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
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
