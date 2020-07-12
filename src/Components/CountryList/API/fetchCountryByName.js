import axios from "axios";
import { API_URL } from "../URLConst";
function getCountryByName(country) {
  var promise = new Promise(function (resolve, reject) {
    console.log(API_URL.getCountryName);
    axios
      .get(API_URL.getCountryName, {
        params: {
          country: country,
          // size: perpage,
          // start: start,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}
export default getCountryByName;
