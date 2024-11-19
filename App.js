import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira uma tarefa.');
      return;
    }

    const newTask = {
      id: Math.random().toString(),
      title: taskInput,
      completed: false, // Adiciona um estado para a tarefa
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item }) => (
    <View style={styles.task}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.id)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ADD8E6', // Azul claro
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  task: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row', // Adiciona direção de linha para a tarefa
    alignItems: 'center', // Alinha os itens da tarefa ao centro
  },
  taskText: {
    fontSize: 16,
    flex: 1, // Faz o texto ocupar o espaço restante
  },
  completedTask: {
    textDecorationLine: 'line-through', // Adiciona um efeito de riscado para tarefas concluídas
    color: 'gray', // Muda a cor do texto riscado
  },
  deleteButton: {
    color: 'red', // Cor do texto do botão de exclusão
    marginLeft: 10,
  },
});