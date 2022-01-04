/*"StAuth10244: I Hetal Patel, 000821900 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else." */
/* API link: http://makeup-api.herokuapp.com/ */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,TextInput,Button,Image,Picker,ImageBackground } from 'react-native';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [brand, setBrands] = useState("");
  const [type, setType] = useState("");
  const [error,setError]="";

  
  async function getBrands(num) {
    let newData=[];
      setData([]);
      
    try {
      const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand='+brand+'&product_type='+type);      
      const json = await response.json();
      //setData(json);
      for(let i=0;i<num;i++){
        newData.push(json[i]);
      }
      setData(newData);
    } catch (error) {
      console.error(error);
      setError("<Text>There are no product for brand {brand} and type {type}");

    } finally{
      setLoading(false);
    }
  }

  function displayItemChange(){
    setDisplayItems(20);
  }
 


  return (    
    <View style={{flex: 1}}>
      <View style={{ flex: 0.8, backgroundColor: "lightblue" }}>
      <h1 style={{textAlign:'center',fontFamily:'monospace',fontSize:60}}>Makeup API</h1>
      </View>
        <View style={{ flex: 3, backgroundColor: "white", justifyContent:'center', marginLeft:300}}>          
          <Text style={{marginLeft:50 ,fontSize:25,color:'#841584',fontWeight:800}}> Enter any Makeup Brand name: 
          <TextInput
            style={{ height: 40, marginLeft:20, marginRight:15,
              borderWidth: 1,
              padding: 10, width:500,backgroundColor:"lightpink"}}
              onChangeText={brand=>setBrands(brand)}
              value={brand}
              placeholder="Ex. Covergirl, Maybelline,revlon,dior etc"
          />
           <Picker
              selectedValue={type}
              style={{ height: 60, width: 150,marginRight:15 ,height:35,borderWidth:1}}
              onValueChange={(type, id) => setType(type)}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Lipstick" value="lipstick" />
              <Picker.Item label="Foundation" value="foundation" />
              <Picker.Item label="Blush" value="blush" />
              <Picker.Item label="Eyeliner" value="eyeliner" />
              <Picker.Item label="Eyeshadow" value="eyeshadow" />
              <Picker.Item label="Mascara" value="mascara" />
              <Picker.Item label="Nail polish" value="nail_polish" />
            </Picker>
          <Button
            onPress={()=>getBrands(10)}
            title="Enter"
            color="#841584"            
            accessibilityLabel="Show the list for that perticular Brand"
          /> &nbsp;
          <Button
            onPress={()=>getBrands(20)}
            title="20 Product"
            color="#841584"  
                  
            accessibilityLabel="Show the list for that perticular Brand"
          />
          </Text>
          {isLoading ? <Text>{error}</Text>: (            
            <FlatList                           
              data={data}
              keyExtractor={({ id}, index) => id}
              renderItem={({ item }) => (
                
                <Text style={{fontSize:20,borderWidth:1}}>
                <Image style={{width:100,height:60,marginTop:20,marginLeft:10,borderRadius:2}}
                source={{uri: item.image_link}}/>    

                <Text style={{color:'purple',marginRight:10}}>Brand : {item.brand}</Text>,
                <Text>Description : {item.name}</Text>,
                <Text style={{color:'lightpink',marginRight:10}}> Price : {item.price}$ </Text>,
                <Text> Product : {item.product_type}</Text>
                </Text>
                
              )}
            />
          )}
        
        </View>     
      <View style={{ flex: 2, backgroundColor: "lightblue"}}>
        <ImageBackground source='https://hips.hearstapps.com/ghk.h-cdn.co/assets/15/42/1444838685-beauty-products-row.jpg' resizeMode="cover" style={{height:600}}>  
        <h4>Assignment 7 by Hetal Patel </h4>
        </ImageBackground>
      </View>
    </View>     
  );        
};



export default App;
