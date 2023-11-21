import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, addJob, removeJob, editJob } from '../features/jobSlice';
import { View, Text, Button, FlatList, SafeAreaView, TextInput } from 'react-native';

const JobList = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const status = useSelector((state) => state.jobs.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  const [newJobText, setNewJobText] = useState('');
  const [newNameText, setNewNameText] = useState('');
  const [editJobText, setEditJobText] = useState('');
  const [editNameText, setEditNameText] = useState('');
  const [editJobId, setEditJobId] = useState(null);

  const handleAddJob = () => {
    const newJob = {
      todojob: newJobText,
      name: newNameText,
    };
    dispatch(addJob(newJob));
    setNewJobText('');
  };

  const handleRemoveJob = (id) => {
    dispatch(removeJob(id));
  };

  const handleStartEditJob = (id, todojob, name) => {
    setEditJobId(id);
    setEditJobText(todojob);
    setEditNameText(name);
  };

  const handleCancelEditJob = () => {
    setEditJobId(null);
    setEditJobText('');
    setEditNameText('');
  };

  const handleSaveEditJob = (id) => {
    dispatch(editJob({ id, updatedJob: { todojob: editJobText , name: editNameText} }));
    setEditJobId(null);
    setEditJobText('');
    setEditNameText('');
    dispatch(fetchJobs());
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          width: '90%',
          height: 80,
          backgroundColor: '#bdd',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 1,
          borderRadius: 10,
        }}
      >
        {editJobId === item.id ? (
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 20,
              borderBottomWidth: 1,
              borderColor: 'gray',
            }}
            value={editJobText}
            onChangeText={(text) => setEditJobText(text)}
          />
        ) : (
          <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20 }}>{item.todojob}</Text>
          
        )}



         {editJobId === item.id ? (
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 20,
              borderBottomWidth: 1,
              borderColor: 'gray',
            }}
            value={editNameText}
            onChangeText={(text) => setEditJobText(text)}
          />
        ) : (
          <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20 }}>{item.name}</Text>
        )}


        
        <View style={{ flexDirection: 'row' }}>
          {editJobId === item.id ? (
            <>
              <Button title="Save" onPress={() => handleSaveEditJob(item.id)} />
              <Button title="Cancel" onPress={handleCancelEditJob} />
            </>
          ) : (
            
            <Button title="Edit" onPress={() => handleStartEditJob(item.id, item.todojob, item.name)} />
            
          )}
          <Button title="Remove" onPress={() => handleRemoveJob(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{alignItems:'center',marginTop:20}}>
      <TextInput
          style={{width:'80%', height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 10 ,borderRadius:10,fontSize:20,fontWeight:700}}
          placeholder="Enter new job"
          value={newJobText}
          onChangeText={(text) => setNewJobText(text)}
        />
          <TextInput
          style={{width:'80%', height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 10 ,borderRadius:10,fontSize:20,fontWeight:700}}
          placeholder="Name"
          value={newNameText}
          onChangeText={(text) => setNewNameText(text)}
        />
      </View>
      <Button title="Add Job" onPress={handleAddJob} />
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default JobList;
