import axios from "axios";

export default class MiscFunc {
  constructor() {

  }



  async fetchUserDetails(token) {
    try {
      console.log(import.meta.env.BASE_URL);
      console.log('second');
      return await axios.get('http://localhost:8000/api/all', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(e => { return e.data })
        .catch(e => { return e.message });
    } catch (e) {
      return e.message;
    }
  }

}