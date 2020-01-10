import Axios from 'axios';
import API_URL from '../config/local.env';

const recipes = `${API_URL.API_ENDPOINT}/recipe`;
export default {
    getAlldishes() {
        console.log(API_URL)
        return Axios.get(recipes);
    },

    createNewRest(data) {
        return Axios.post(allNewRestaurants, data);
    },

    updateNewRest(id, data) {
        return Axios.put(`${allNewRestaurants}/${id}`, data);
    },

    deleteNewRest(id) {
        return Axios.delete(`${allNewRestaurants}/${id}`);
    },

};
