import React,{useEffect,useState} from 'react';
import {View, StyleSheet,Text,FlatList,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { fetchMovies,add_to_favourites,remove_from_favourites} from '../redux/actions';

const Movies = () => {
    //const {movies} =useSelector(state=>state.moviesReducer);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const state=useSelector(state=>state.moviesReducer);
    //console.log(state)
    const dispatch = useDispatch();
    const fetchMovie =(page) => dispatch(fetchMovies(page));
    //const [data,setData]=useState(movies.results);


    useEffect(() => {
      if(state.pageNumber==1){
        setIsLoading(true);
        console.log("loading")
        fetchMovie(state.pageNumber)
        setIsLoading(false);
      }else{
        fetchMovie(state.pageNumber);
      }
  },[dispatch])

  const addToFavorites = movie => dispatch(add_to_favourites(movie));
  const removeFromFavorites = movie => dispatch(remove_from_favourites(movie));
  const handleAddFavorite = movie => {
  addToFavorites(movie);
  };
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
};

const exists = movie => {
  const favorites=state.favourites
  if (favorites.filter(item => item.id === movie.id).length > 0) {
    return true;
  }
  return false;
};


    const _handleLoadMore=()=>{
          dispatch(fetchMovies(state.pageNumber))      
    }

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }

    return (
        <View style={{flex: 1, marginTop: 44, paddingHorizontal: 20}}>
          <Text style={{fontSize: 22}}>Popular Movies</Text>

          <View style={{flex: 1, marginTop: 12}}>

            <FlatList
              data={state.movies}
              onEndReached={_handleLoadMore}
              onEndReachedThreshold={0.5}
              keyExtractor={item => item.id.toString()}
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
                          <Ionicons color="green" name="thumbs-up" size={32} />
                          <Text
                            style={{
                              fontSize: 18,
                              paddingLeft: 10,
                              color: '#64676D',
                            }}>
                            {item.vote_count}
                          </Text>
                          <TouchableOpacity
                            onPress={() => exists(item)?handleRemoveFavorite(item):handleAddFavorite(item)}
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
                              name={exists(item)?'heart':'heart-outline'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              initialNumToRender={20}
            />
          </View>
        </View>
      );
}

const styles = StyleSheet.create({})

export default Movies;
