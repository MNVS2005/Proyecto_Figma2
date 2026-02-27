import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Splash from "./pages/Splash";
import Tab1 from './pages/Tab1';
import Ofertas from './pages/Ofertas';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PizzaDetail from "./pages/PizzaDetail";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';
import OfertaDetail from './pages/OfertaDetail';

setupIonicReact();

const App: React.FC = () => (
  <UserProvider>
    <CartProvider>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>

              <Route exact path="/splash">
                <Splash />
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/signup">
                <Signup />
              </Route>

              <Route path="/tab1">
                <Tab1 />
              </Route>

              <Route exact path="/ofertas">
                <Ofertas />
              </Route>

              <Route exact path="/profile">
                <Profile />
              </Route>

              <Route exact path="/pizza/:id">
                <PizzaDetail />
              </Route>

              <Route exact path="/">
                <Redirect to="/splash" />
              </Route>

              <Route exact path="/oferta/:id">
                <OfertaDetail />
              </Route>

            </IonRouterOutlet>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </CartProvider>
  </UserProvider>
);

export default App;
