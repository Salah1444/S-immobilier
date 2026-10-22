import axios from 'axios';
const Api = axios.create({
baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
withCredentials: true,
withXSRFToken: true,
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
});

export default Api;