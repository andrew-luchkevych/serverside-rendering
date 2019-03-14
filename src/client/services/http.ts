import axios from "axios";

const Http = axios.create();
const authToken = localStorage.getItem("auth");
Http.defaults.headers = {
	Authorization: `Bearer ${authToken}`,
	"Content-Type": "application/json",
};

export default Http;