import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Splash from "./pages/Splash";
import Tab1 from './pages/Tab1';
import Ofertas from './pages/Ofertas';
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./pages/Profile";
import PizzaDetail from "./pages/PizzaDetail";   // ⭐ IMPORTANTE
import { CartProvider } from "./context/CartContext";

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

setupIonicReact();

const App: React.FC = () => (
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

            <Route path="/tab1">
              <Tab1 />
            </Route>

            <Route exact path="/ofertas">
              <Ofertas />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            {/* ⭐ NUEVA RUTA PARA EL DETALLE DE PIZZA */}
            <Route exact path="/pizza/:id">
              <PizzaDetail />
            </Route>

            <Route exact path="/">
              <Redirect to="/splash" />
            </Route>

          </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </CartProvider>
);

export default App;
