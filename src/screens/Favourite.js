import React,{useEffect,useState} from 'react';
import {View, StyleSheet,Text,FlatList,TouchableOpacity,Image} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {SearchBar} from 'react-native-elements';

import { remove_from_favourites } from '../redux/actions';

const Favourite = () => {
    const [search,setSearch]=useState('');
    const [FilteredData,setFilteredData]=useState([]);
    const state=useSelector(state=>state.moviesReducer);
    const dispatch=useDispatch();
    const removeFromFavorites = movie => dispatch(remove_from_favourites(movie));
    const handleRemoveFavorite = movie => {
        removeFromFavorites(movie);
  };

  useEffect(() => {
    setFilteredData(state.favourites);
  }, [state.favourites]);

  const updateSearch=(text)=>{
    if(text){
      const newData=state.favourites.filter(function (item){
        const itemData=item.title?item.title.toUpperCase():''.toUpperCase();
        const textData=text.toUpperCase();
        return itemData.indexOf(textData)>-1
      });
      setFilteredData(newData);
      setSearch(text)
    }else{
      setFilteredData(state.favourites);
      setSearch(text);
    }
  }

  return (
    <View style={{flex: 1, marginTop: 44, paddingHorizontal: 20}}>
      <Text style={{fontSize: 22}}>Favorites</Text>
      <SearchBar
       inputStyle={{backgroundColor: 'white'}}
       containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
       inputContainerStyle={{backgroundColor: 'white'}}
       placeholderTextColor={'#g5g5g5'}
        placeholder="Type Here..."
        onChangeText={(text)=>updateSearch(text)}
        onClear={(text)=>updateSearch('')}
        value={search}
      />
      <View style={{flex: 1, marginTop: 8}}>

        {state.favourites.length === 0 ? (
          <Text style={{color: '#010101', fontSize: 18}}>
            Add a movie to the list.
          </Text>
        ) : (
          <FlatList
            data={FilteredData}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const IMAGE_URL =
                'https://image.tmdb.org/t/p/w185' + item.poster_path;
              return (
                <View style={{marginVertical: 12}}>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Image
                      source={{
                        uri: IMAGE_URL,
                      }}
                      resizeMode="cover"
                      style={{width: 100, height: 150, borderRadius: 10}}
                    />
                    <View style={{flex: 1, marginLeft: 12}}>
                      <View>
                        <Text style={{fontSize: 22, paddingRight: 16}}>
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          alignItems: 'center',
                        }}>
                        <Ionicons
                          color="green"
                          name="thumbs-up"
                          size={32}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            paddingLeft: 10,
                            color: '#64676D',
                          }}>
                          {item.vote_count}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveFavorite(item)}
                          activeOpacity={0.7}
                          style={{
                            marginLeft: 14,
                            flexDirection: 'row',
                            padding: 2,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 40,
                            width: 40,
                          }}>
                          <Ionicons
                            color="orange"
                            size={32}
                            name="heart"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({})

export default Favourite;
