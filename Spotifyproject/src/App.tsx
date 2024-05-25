import { Redirect, Route } from 'react-router-dom';
import { IonApp,IonContent,IonHeader,IonIcon,IonItem,IonLabel,IonList,IonMenu,IonMenuToggle,IonRouterOutlet,IonTabBar,IonTabButton,IonTabs,IonTitle,IonToggle,setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { flash, hammerOutline, homeOutline, libraryOutline, musicalNote, person, searchOutline, settings, time, triangle } from 'ionicons/icons';
import Tab1 from './pages/Home';
import Tab2 from './pages/Search';
import YourLibrary from './pages/YourLibrary';
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
import './theme/variables.css';
import Settings from './pages/Settings';
import Account from './pages/Account';
import History from './pages/History';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Lupapassword from './pages/Lupapassword';
import Lupapassword1 from './pages/Lupapassword1';
import Offline from './pages/OfflineM';
import PlaylistDetail1 from './pages/PlaylistDetail1';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Admin from './pages/Admin';
import { useState, useEffect, useContext, useRef } from 'react';
import Addartist from './pages/Addartist';
import PlayMusic2 from './pages/PlayMusic2';
import Genre0 from './pages/Genre0';
import Genre1 from './pages/Genre1';
import Genre2 from './pages/Genre2';
import Genre3 from './pages/Genre3';
import Genre4 from './pages/Genre4';
import Genre5 from './pages/Genre5';
import Genre6 from './pages/Genre6';
import artistDetail from './pages/artistDetail';
import LogicRoute from './pages/LogicRoute';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { AuthContext } from "./context/ContextProvider";
import { AuthContextType } from "./context/ContextProvider";
import Addsong from './pages/Addsong';
import Addalbum from './pages/Addalbum';
import Editartist from './pages/Editartist';
import Editalbum from './pages/Editalbum';
import Editsong from './pages/Editsong';

setupIonicReact();

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const db = getFirestore();

  const authContext = useContext(AuthContext) as AuthContextType;
  const { auth, setAuth } = authContext;

  const getStatusAdmin = async () => {
    if (!auth) return;

    const uid = auth.uid;
    const usersCollectionRef = collection(db, "users");

    try {
      const snapshot = await getDocs(
        query(usersCollectionRef, where("uid", "==", uid))
      );
      const currentProfile = snapshot.docs[0] as any;
      
      if (currentProfile.data().isAdmin == true) {
        setIsAdmin(true)
      }
      else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    getStatusAdmin();
  }, [auth]);

  return(
  <IonApp>
    <IonReactRouter>
      <IonMenu contentId="main">
        <IonHeader className="ion-padding">
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink="/account">
                <IonIcon icon={person}size="large" />
                <IonLabel className='menu'>Profile</IonLabel>
              </IonItem>
              <IonItem button routerLink="/new">
                <IonIcon icon={flash}size="large" />
                <IonLabel className='menu'>Downloaded Music</IonLabel>
              </IonItem>
              <IonItem button routerLink="/history">
                <IonIcon icon={time} size="large"/>
                <IonLabel className='menu'>Listening History</IonLabel>
              </IonItem>
              <IonItem button routerLink="/settings">
                <IonIcon icon={settings} size="large"/>
                <IonLabel className='menu'>Settings and privacy</IonLabel>
              </IonItem>
              { isAdmin && 
                <IonItem button routerLink="/admin">
                  <IonIcon icon={hammerOutline} size="large"/>
                  <IonLabel className='menu'>Admin</IonLabel>
                </IonItem>
              }
              {/* <IonItem button onClick={handleLogout}>
                <IonLabel className='menu'>Logout</IonLabel>
              </IonItem> */}
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonTabs>
        <IonRouterOutlet id="main">
          <Route exact path="/" component={LogicRoute} />
          <Route exact path="/tab1" component={Tab1} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/playmusic2" component={PlayMusic2} />
          <Route exact path="/history" component={History} />
          <Route exact path="/new" component={Offline} />
          <Route exact path="/tab2" component={Tab2} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/genre0" component={Genre0} />
          <Route exact path="/genre1" component={Genre1} />
          <Route exact path="/genre2" component={Genre2} />
          <Route exact path="/genre3" component={Genre3} />
          <Route exact path="/genre4" component={Genre4} />
          <Route exact path="/genre5" component={Genre5} />
          <Route exact path="/genre6" component={Genre6} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/addartist" component={Addartist} />
          <Route path="/editartist/:artistId" component={Editartist} />
          <Route exact path="/addalbum" component={Addalbum} />
          <Route path="/editalbum/:albumId" component={Editalbum} />
          <Route exact path="/addsong" component={Addsong} />
          <Route path="/editsong/:songId" component={Editsong} />
          <Route exact path="/lupa" component={Lupapassword} />
          <Route exact path="/lupa1" component={Lupapassword1} />
          <Route exact path="/YourLibrary" component={YourLibrary} />
          <Route path="/artist/:artistNamaartist" component={artistDetail} />
          <Route path="/playlist/:playlistId" component={PlaylistDetail1} />
        </IonRouterOutlet>
        { auth ?
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={searchOutline} />
              <IonLabel>Search</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/YourLibrary">
              <IonIcon aria-hidden="true" icon={libraryOutline} />
              <IonLabel>Your Library</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/playmusic2">
              <IonIcon aria-hidden="true" icon={musicalNote} />
              <IonLabel>Play Music</IonLabel>
            </IonTabButton>
          </IonTabBar>
        :
          <IonTabBar slot="bottom"></IonTabBar>
        }
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);
};
export default App;
