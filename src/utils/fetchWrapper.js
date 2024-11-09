import {logout, setAutoLogout} from "../features/auth/authSlice"
import store from '../store'; // Import your Redux store


const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader()
        };
  console.log(body)
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = body.body;
            // requestOptions.mode= 'no-cors';
        }

        return fetch(url, requestOptions)
            .then(handleResponse)
            // .catch(error => {
            //     console.error('Fetch error:', error);
            //     throw error;
            // });
    };
}

function authHeader() {
    // Get user from Redux store
    const user = store.getState().auth.user;
    const token = user?.jwt;

    // If URL is to your API and user is logged in, add auth header
    // const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (token ) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
}


 function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // Dispatch logout action to Redux
          
            store.dispatch(logout());
            store.dispatch(setAutoLogout())
            console.log("asdddddddddddddddddd")
            window.location.replace("/login")
            
        }

    }
    console.log("asdddddddddddddddddd")
    return response
}
    // return response.json().then( text => {
    //     console.log("asdasd")
    //     console.log(text)
    //     // let data;
    //     // try {
    //     //     data = text && JSON.parse(text);
    //     // } catch {
    //     //     data = text;
    //     // }

    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // Dispatch logout action to Redux
    //             // store.dispatch(logout());
    //             // store.dispatch(setAutoLogout())
    //             console.log("asdddddddddddddddddd")
    //         }

    //         // const error = (data && data.message) || response.statusText;
    //         // return Promise.reject(error);
    //     }

    //     return text;
    // });
// }

export default fetchWrapper;