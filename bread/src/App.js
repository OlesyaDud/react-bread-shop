import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShipScreen from './screens/ShipScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrder';


function App() {
  return (
   <Router>
  <Header />
  <main className='py-5'>
    <Container>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/login' component={LoginScreen} />
      <Route path='/shipping' component={ShipScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/placeorder' component={PlaceOrder} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/products/:id' component={ProductScreen} />
      {/* id is optional */}
      <Route path='/cart/:id?' component={CartScreen} />
    </Container>
  </main>
  <Footer />
   </Router>
  );
}

export default App;
