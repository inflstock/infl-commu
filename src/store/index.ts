import configureStore from "./configure";
import api from 'services/api';

const store = configureStore({}, { api })

export default store;