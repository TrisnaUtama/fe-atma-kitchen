import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import axios from 'axios';

const iconClasses = `h-6 w-6`;
const token = localStorage.getItem("token");
let routes = [];

const fetchData = async () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/user');
    const userLogin = response.data;
    if (userLogin.id_saldo != null) {
      userLogin.id_role = false;
    } else {
      userLogin.id_saldo = false;
    }

    if (userLogin.id_role !== false) {
      if (userLogin.id_role === 3) {
        routes = [
          {
            path: 'dashboard',
            icon: <Squares2X2Icon className={iconClasses} />,
            name: 'Dashboard Admin',
          },
          {
            path: 'produk',
            icon: <Squares2X2Icon className={iconClasses} />,
            name: 'Produk',
          },
        ];
      } else if (userLogin.id_role === 2) {
        routes = [
          {
            path: 'dashboard',
            icon: <Squares2X2Icon className={iconClasses} />,
            name: 'Dashboard MO',
          },
        ];
      }
    } else {
      routes = [
        {
          path: 'dashboard',
          icon: <Squares2X2Icon className={iconClasses} />,
          name: 'Dashboard User',
        },
      ];
    }
    return routes;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}

export default fetchData;

