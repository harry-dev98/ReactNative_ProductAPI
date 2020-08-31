import React from 'react';
import {
    View, 
} from 'react-native';

import {Loading, NetworkBroken, Header} from './utils';
import Products from './products'
import styles from './styles';

const config = require('./config');

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: 0,
            isNetworkBroken: 0,
            productList: [],
        };
        this.listRef = undefined;
        this.refresh = this.refresh.bind(this);
        this.getRef = this.getRef.bind(this);
    }
     
    getRef(ref){
        this.listRef = ref||undefined;
    }

    refresh({
        isNetworkBroken,
        isLoaded
    }){
        isNetworkBroken = isNetworkBroken || 0;
        isLoaded = isLoaded || 0
        this.setState({
            isNetworkBroken: isNetworkBroken,
            isLoaded: isLoaded
        })
    }

    fetchData(){
        return new Promise((resolve, reject)=>{
            var products = [];
            fetch(config.api,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response)=>response.json())
            .then((json)=>{
                products = json.productList || [];
                resolve({products});
            })
            .catch((error)=>{
                reject();
            });
        })
    }
    componentDidMount(){
        this.fetchData()
        .then(({products})=>{
            this.setState({
                isLoaded: true,
                productList: products,
            });
        })
        .catch((err)=>{
            this.setState({
                isNetworkBroken: 1,
            })
        });        
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.isNetworkBroken == true && this.state.isNetworkBroken == false){
            this.fetchData()
            .then(({products})=>{
                this.setState({
                    isLoaded: true,
                    productList: products,
                });
            })
            .catch((err)=>{
                this.setState({
                    isNetworkBroken: true,
                })
            });
        }  
    }

    render(){
        return (
            <View style={styles.container}>
                <Header text={"Assignment"}/>
                {this.state.isNetworkBroken?
                    <NetworkBroken reload={this.refresh} />
                    :this.state.isLoaded?
                    <Products products={this.state.productList} />:
                    <Loading />
                    }
            </View>
        )
    }
}

export {
    HomeScreen
}