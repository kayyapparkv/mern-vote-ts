import React, {Component} from 'react';
import api from '../services/api';

// const App = () => <div>App Works</div>;

class App extends Component {
    async componentDidMount() {
        const result =  await api.call('post','auth/login',{
            username: 'kayyapparkv@gmail.com',
            password: '9848723169'
        });
        console.log(result);
    }
    render() {
        return <div>App Workers</div>; 
    }
}

export default App;