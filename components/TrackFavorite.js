import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import tracks from './tracks';
import FavoriteTracksContext from './FavoriteTracksContext';

const TrackFavorite = ({ navigation }) => {
  const { favoriteTracks } = useContext(FavoriteTracksContext);
  const filteredTracks = favoriteTracks
    ? tracks.filter(track => favoriteTracks.includes(track.id))
    : [];
  const playTrack = async (trackId) => {
    const parsedTrackId = parseInt(trackId, 10); // Chuyển đổi trackId sang kiểu số

    await TrackPlayer.skip(parsedTrackId); // Nhảy đến bài hát được chọn

    // Điều hướng đến màn hình trình phát nhạc
    navigation.navigate('Music Player');
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.trackItem} onPress={() => playTrack(item.id)}>
        <Text style={styles.stt}>{index + 1}</Text>
        <Image source={item.artwork} style={styles.artwork} />
        <View style={styles.trackInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTracks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  stt: {
    width: '10%',
    textAlign: 'center',
    paddingRight: 7,
  },
  trackItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  trackInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TrackFavorite;
