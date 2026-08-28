import { 
    FlatList, 
    Image, 
    StyleSheet, 
    Text, 
    View,
    useWindowDimensions
 } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';

import songs from '../model/data';
import colors from '../theme/colors';

export default function MusicPlayer() {
    const { width } = useWindowDimensions();
    const [selectedIndex, setSelectedIndex] = useState();
    
    const currentSong = songs[selectedIndex];
    const artworkSize = Math.min(width-40, 380);

    function handleMomentEnd(event) {
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.round(offset / width);
        setSelectedIndex(index);
    }

    function renderArtwork({ item }) {
        return (
            <View style={[styles.artworkPage, { width }]}>
                <Image
                source={ item.artwork }
                style={[
                    styles.artworkSize, 
                    { height: artworkSize, width: artworkSize }
                ]}
            />
            </View>
        );
    }

  return (
    <SafeAreaView> style={styles.container}
    <View styles={styles.header}>
        <Text style={styles.eyebrow}> TOCANDO AGORA </Text>
         <Text style={styles.counter}> 
            {selectedIndex + 1} de {songs.length} 
            </Text>
    </View>

    <FlatList
      data={songs}
      horizontal
      paddingEnabled
      renderItem={renderArtwork}
      keyExtractor={(item) => String(item.id)}
      showsHorizontalScrollIdicator={false}
      onMomentumScrollEnd={handleMomentEnd}
    />
    
    <View style={styles.metadata}>
        <Text style={styles.songTitle}>{currentSong.title}</Text>
        <Text style={styles.songArtist}>{currentSong.artist}</Text>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'colors.background',
    },
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        height: 70,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-betweet',
    },
    eyebrow:{
        color: colors.primary,
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.8,
    },
    title: {
        marginTop: 8,
        color: colors.text,
        foteSize: 32,
        fontWeight: '800',
    },
    counter: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    artworkPage:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    artwork: {
        borderRadius: 24,
    },
    metadata:{
        minHeight: 110,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    songsTitle: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center',
    },
    songArtist: {
        marginTop: 6,
        color: colors.textSecondary,
        fontSize: 14,
    },
    description: {
        marginTop: 10,
        color: colors.textSecondary,
        foteSize: 15,
    },
    })