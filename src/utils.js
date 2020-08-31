import React from 'react';
import {
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView, 
    Animated,
} from 'react-native'

import styles from './styles';


function Header({text}){
    return (
        <View style={styles.header}>
            <Text style={[{ 
                alignSelf: 'center'
            }, styles.boldText]}>{text}</Text>
        </View>
    )
}

function EmptyList(){
    return (
        <View style={[{
            alignItems: 'center',
        }]}>
            <Image
                source= {{
                    uri: "https://i.pinimg.com/originals/a8/93/67/a89367cc7d4d95be50920cadbfeb8e63.jpg"
                }}
                style={{ 
                    height:50,
                    resizeMode: 'contain', 
                    width: 50, 
                    padding: 10
                }}
            />
            <Text style={styles.text}>
                Oops.. No Image to Display. 
            </Text>
        </View>
    );
}

function Loading(){
    return (
        <View style={styles.loading}>
            <ActivityIndicator color='#228B22' size='large'></ActivityIndicator>
            <Text style={styles.text}>Please Wait.. Loading Data</Text>
        </View>
    );
}

function NetworkBroken({reload}){
    return (
        <View style={styles.loading}>
            <Text style={styles.text}>You Have Network Issue :( :'(</Text>
            <TouchableOpacity onPress={reload}>
                <Text style={styles.text}>Click To Reload</Text>
            </TouchableOpacity> 
        </View>
    )
}

function Notify({text}){
    return (
        
        <Text style={{ color: 'red', fontSize: 12}}>{text}</Text>
        
    );
}

function Categories({categories}){
    if(categories.length === 0){
        return (<></>);
    }
    return (
        <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.text}>Categories: </Text>
            {categories.map((item, index)=>(
                <View key={index}>
                    <Text style={styles.text}>{item}</Text>
                </View>
        ))}
        </View>
    )
}

function ImageView({imgs}){
    let scrollX = new Animated.Value(0);
    let postion = Animated.divide(scrollX, 143);
    return (
        <View style={[styles.container, {flex: 1}]}>
            {imgs.length>0?
            <View> 
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll = {Animated.event(
                        [{
                            nativeEvent: {contentOffset: {x: scrollX}}
                        }],
                        {
                            useNativeDriver: false,
                        }
                    )}
                    scrollEventThrottle={16}
                    >
                    {imgs.map((item, index) => (
                        <View
                        key={index} 
                        style={[{
                                // alignItems:"center",
                            },
                                // styles.container,
                            ]}>
                            <Image style={{ 
                                resizeMode: 'contain', 
                                width: 150, 
                                height:  175,
                            }}
                            source={{
                                uri: item,
                            }}
                            />
                        </View>
                    ))}
                    </ScrollView>
                    <View style={styles.rowContainer}>
                        {imgs.map((_, index)=>{
                            let opacity = postion.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: 'clamp'
                            });
                            return (
                                <Animated.View 
                                    key={index}
                                    style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }} 
                                />
                            )
                        })}
                    </View>
                </View>:
                <EmptyList/>
            }

        </View>
    )
}




export {
    Header,
    NetworkBroken,
    Loading,
    EmptyList,
    Notify,
    ImageView,
    Categories,
}