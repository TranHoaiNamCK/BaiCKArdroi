import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import JobList from './src/components/JobList';
import { Text, SafeAreaView } from 'react-native';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text style={{fontSize:20,fontWeight:700,marginLeft:10,color:'red'}}>Job List App</Text>
        <JobList />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
