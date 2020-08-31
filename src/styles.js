import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    header: {
        paddingTop: 5,
        backgroundColor: 'white',
    },
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#228B22',
        padding: 0.5,
        margin: 0.5,
    },
    boldText: {
        color: '#228B22',
        padding: 0.5,
        margin: 0.5,
        fontWeight: "700",
    },
    card: {
        borderColor: '#D3D3D3',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        margin: 1.25,
    },
});


export default styles;