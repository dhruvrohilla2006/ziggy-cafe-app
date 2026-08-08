import {create} from 'zustand'
import axiosInstance from '../utils/axios';


const foodStore = create((set)=>({
    allFood:[],
    fetchAllFood:async () => {
        try {
        const {data} = await axiosInstance.get('/food/getAll');
        
        if(data.success){
            set({allFood:data.data}) 
        }
        } catch (error) {
            console.log(error)
        }
    }
}))

export default foodStore;