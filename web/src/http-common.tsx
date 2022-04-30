import axios from "axios";

export default axios.create({
  baseURL: "https://ic-catharsis.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  }
});
