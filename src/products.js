import React from 'react';
import { Text,  
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { EmptyList,
        Notify,
        ImageView,
        Categories,
    } from './utils';
import styles from './styles';

function sortProductFromAPI(product){
    return {
        name: product.name,
        price: product.price,
        stock: product.stock,
        about: product.shortDescription,
        saleCount: product.saleCount,
        image: product.image,
        category: product.category,
    }
}

function CapsFirstAlph(str){
    return str[0].toUpperCase() + str.substring(1);
}

function HeaderText({text}){
    return (
        <Text style={[{
            alignSelf: 'center',
            }, styles.boldText
        ]}>{text}</Text>
    );
}

function BackSurf({func}){
    return (
        <View style={{flex:1, flexDirection: 'column-reverse'}}>
            <TouchableOpacity
                style={{alignSelf:'center', paddingTop: 5, backgroundColor: 'green', width: 50, height: 35, borderRadius: 5}}
                onPress={()=>func()}>
                <Text style={{alignSelf: 'center',color: 'white'}}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

function ProductDetails({product, colors, funcOnColorPress, backSurfFunc}){
    colors = colors || [];
    return (
        <View style={[styles.card, {
            alignItems: 'center',
            backgroundColor: 'white'
        }, styles.rowContainer]}>
            <ImageView imgs={product.image||[]}/>
            <View style={[{flex:1.25, margin:5, height: 200}]}>
                <Text style={styles.boldText}>{product.name?product.name:"N/A"}</Text>
                <Text style={styles.text}>Price: {product.price?product.price:"N/A"}</Text>
                <Text style={styles.text}>About: {product.about?product.about:"N/A"}</Text>
                <Text style={styles.text}>Sold Outs: {product.saleCount?product.saleCount:"N/A"}</Text>
                <Text style={styles.text}>Stock: {product.stock && (product.stock > 0)?product.stock:"N/A"}  <Notify text={product.stock && product.stock!==0 ?"HURRY!!":"OUT OF STOCK!!"} /> </Text>
                <Categories categories={product.category||[]}/>
                {colors.length!==0?<Text style={styles.text}>Colors:</Text>:<></>}
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                    {colors.map((color, index)=>(
                        <TouchableOpacity 
                            style={{ height: 35, width: 50, borderRadius: 5, padding: 5, backgroundColor:color['color'],}}
                            key={index}
                            onPress={()=>{
                                funcOnColorPress(color.size);
                            }}>
                            <Text style={{alignSelf: 'center', color: 'white'}}>{color['colorName']}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {backSurfFunc?<BackSurf func={backSurfFunc}/>:<></>}
            </View>
        </View>
    )
}

class ProductView extends React.Component{
    constructor(props){
        super(props);
        this.getSize = this.getSize.bind(this);
        this.backSurf = this.backSurf.bind(this);
        this.state = {
            isPressed: false,
            content: '',
            size: [],
            sizeDetail: [],
            material: [],
            materialDetail: []
        }
        let _ = this.props.item.variation || [];
        this.colors = [];
        _.map((item, index)=>{
            let str = item.color;
            str = str.toLowerCase();
            this.colors.push({
                color: str,
                colorName: item.color,
                size: item.size
            });
        })
    }

    backSurf(){
        switch(this.state.content){
            case 'sizeDetail':  
                this.setState({
                    content: 'size',
                });
                break;
            case 'size':
                this.setState({
                    content: '',
                    isPressed: false,
                });
                break;
            case 'material':
                this.setState({
                    content: '',
                    isPressed: false,
                });
                break;
            case 'materialDetail':
                this.setState({
                    content: 'material',
                });
                break;
            default: 
                break;
        };
    }

    getSize(list){
        let _ = [];
        list.map((item, index)=>{
            _.push({
                id: item.asinstance||"" + index,
                size: typeof(item.size) === "string"?item.size:index,
                sizeData: typeof(item.size) === "string"?item: item.size,
                
            });
        })
        this.setState({
            isPressed: true,
            content: 'size',
            size: _,
        });  
    }
    
    getSizeDetail(list){
        if(list instanceof Array){
            this.setState({
                material: list,
                content: 'material'
            });
        }
        else{
            let _ = {
                name: this.props.item.name,
                price: list.price || this.props.item.price,
                about: this.props.item.fullDescription,
                stock: list.stock || this.props.item.stock,
                saleCount: list.saleCount || this.props.item.saleCount,
                parent: 'size',
                type: list.size,
            };
            if(typeof(list.image) == "string"){
                _.image = [list.image];
            }
            else{
                _.image = list.image;
            }
            this.setState({
                sizeDetail: _,
                content: 'sizeDetail',
            });
        }
    }

    getMaterialDetail(list){
        let _ = {
            name: this.props.item.name,
            price: list.price || this.props.item.price,
            about: this.props.item.fullDescription,
            stock: list.stock || this.props.item.stock,
            saleCount: list.saleCount || this.props.item.saleCount,
            parent: 'material',
        };
        if(typeof(list.image) == "string"){
            _.image = [list.image];
        }
        else{
            _.image = list.image;
        }
        this.setState({
            materialDetail: _,
            content: 'materialDetail',
        });
    }


    render(){
        return (
            <View>
                {this.state.isPressed?
                <View>
                    {this.state.content === "size"?
                    <View style={[styles.card, { flex:1, height: 233}]}>
                        <View style={{alignSelf: 'center'}}>
                            <Text style={styles.boldText}>{this.props.item.name?this.props.item.name:"N/A"}</Text>
                            <Text style={styles.text}>About: {this.props.item.shortDescription?this.props.item.fullDescription:"N/A"}</Text>
                        </View> 
                        <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <Text style={[styles.boldText, {paddingTop: 5}]}>Size: </Text>
                            {this.state.size.map((item, index)=>(
                                <TouchableOpacity 
                                    style={{ height: 35, width: 50, borderRadius: 5, padding: 5, backgroundColor: 'green'}}
                                    key={item.id}
                                    onPress={()=>{
                                        this.getSizeDetail(item.sizeData);
                                    }}>
                                    <Text style={{alignSelf: 'center', color: 'white'}}>{item.size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <BackSurf func={this.backSurf} />
                    </View>
                    :
                    this.state.content === 'sizeDetail'?
                        <ProductDetails product={this.state.sizeDetail} backSurfFunc={this.backSurf}/>
                    :
                    this.state.content === 'materialDetail'?
                        <ProductDetails product={this.state.materialDetail} backSurfFunc={this.backSurf}/>
                    :
                        <View  style={[styles.card, { flex:1, height: 233}]}>
                            <View style={{alignSelf: 'center'}}>
                                <Text style={styles.boldText}>{this.props.item.name?this.props.item.name:"N/A"}</Text>
                                <Text style={styles.text}>About: {this.props.item.shortDescription?this.props.item.fullDescription:"N/A"}</Text>
                            </View> 
                            <View style={{marginTop: 40, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Text style={[styles.boldText, {paddingTop: 5}]}>Material: </Text>
                                {this.state.material.map((item, index)=>(
                                <TouchableOpacity 
                                    style={{ height: 35, width: 75, borderRadius: 5, padding: 5, backgroundColor: 'green'}}
                                    key={index}
                                    onPress={()=>{
                                        this.getMaterialDetail(item);
                                    }}>
                                    <Text style={{alignSelf: 'center', color: 'white'}}>{CapsFirstAlph(item.material)}</Text>
                                </TouchableOpacity>
                                ))}
                            </View>
                        <BackSurf func={this.backSurf} />
                        </View>
                    }
                        
                </View>
                :
                <ProductDetails product={sortProductFromAPI(this.props.item)} colors={this.colors} funcOnColorPress={this.getSize} />
                }
            </View>
        )
    }
}


export default function Products({products}){
    return (
        <View style={[styles.card, styles.container, {flex:1, backgroundColor: '#D3D3D3'}]}>
            <FlatList
                scrollEnabled = {true}
                showsVerticalScrollIndicator = {false}
                data = {products}
                ListHeaderComponent = {()=><HeaderText text="Buy Products Here"/>}
                ListEmptyComponent = {EmptyList}
                renderItem = {({ item }) => (
                <ProductView item={item} />
            )}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
}