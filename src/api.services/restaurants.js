import Axios from 'axios';
import API_URL from '../config/local.env';

const allRestaurants = `${API_URL.API_ENDPOINT}/restaurant`;
export default {

  // All New RESTAURANTS

  getAllNewRest() {
      console.log(API_URL)
    return Axios.get(allRestaurants);
  },

  createNewRest(data) {
    return Axios.post(allRestaurants, data);
  },
 
  updateNewRest(id, data) {
    return Axios.put(`${allRestaurants}/${id}`, data);
  },
 
  deleteNewRest(id) {
    return Axios.delete(`${allRestaurants}/${id}`);
  },

  getTopThreeNew(){
    return Axios.get(`${allRestaurants}/topnew`);
  },

  // All Popular RESTAURANTS

  getAllPopularRest() {
    console.log(API_URL)
  return Axios.get(`${allRestaurants}/popular`);
  },
  getTopThreePopular(){
    return Axios.get(`${allRestaurants}/popular/popularThree`);
  },

};
