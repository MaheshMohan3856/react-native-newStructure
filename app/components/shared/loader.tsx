import React,{useEffect} from 'react';
import { View,Modal } from 'react-native';
import {Spinner} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import {common} from '../../css/common';
import {RootState} from '../../appReducers';

const  Loading = () => {


    let loader = useSelector((state:RootState)=>state.common_r.loader)

    useEffect(() => {
      console.log("kkk",loader)
    },[loader]);
  
     console.log("checkkkkkkk",loader);  
        
        
        return(

            <Modal visible={loader===true} transparent={true}>
            <View style={{flex:1,alignItems:"center",justifyContent:"center", backgroundColor:"#000", opacity:.6}}>
                
              
                    <Spinner color='orange' />
                   
             
            </View>
            </Modal>
        )

 

}

export default Loading