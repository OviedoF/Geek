import axios from "axios"

export const getData = async (dataToGet) => {
    const data = await axios.get(`${process.env.REACT_APP_ROOT_API}/api/${dataToGet}`)
        .then(res => res)
        .catch(err => console.log(err));
    
    return data;
}