import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import react, { useEffect, useState } from 'react';
import "../firebaseConfig";
import bcrypt from 'bcryptjs';
import { collection, addDoc, getFirestore, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const Admin:React.FC = () => {
    const db = getFirestore();
    const [artists, setArtists] = useState<Array<any>>([]);
    const [lagus, setLagu] = useState<Array<any>>([]);

    useEffect(() => {
        async function getData() {
            try {
                const querySnapshot = await getDocs(collection(db, "artists"));
                setArtists(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        }
        getData();
    }, [db]);

    useEffect(() => {
        async function getData() {
            try {
                const querySnapshot0 = await getDocs(collection(db, "lagu"));
                setLagu(querySnapshot0.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        }
        getData();
    }, [db]);

    async function deleteArtist(artistId: string) {
        try {
            await deleteDoc(doc(db, "artists", artistId));
            setArtists(artists.filter(artist => artist.id !== artistId));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    }

    async function deleteLagu(laguId: string) {
        try {
            await deleteDoc(doc(db, "lagu", laguId));
            setLagu(lagus.filter(lagu => lagu.id !== laguId));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    }

    return(
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Admin</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='ion-padding'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                                <IonGrid className='ion-no-padding'>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton routerLink='/addartist'>Add Artist</IonButton>
                                                <table border={1}>
                                                    <tbody>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Nama</th>
                                                            <th>Foto</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                        {artists.map((artist, index) => (
                                                            <tr key={artist.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{artist.namaartist}</td>
                                                                <td>{artist.foto}</td>
                                                                <td><IonButton routerLink={`/admin/${artist.id}`}>Edit</IonButton></td>
                                                                <td><IonButton onClick={() => deleteArtist(artist.id)}>Delete</IonButton></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton routerLink='/addsong'>Add Song</IonButton>
                                                <table border={1}>
                                                    <tbody>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Nama</th>
                                                            <th>Artis</th>
                                                            <th>Foto</th>
                                                            <th>Lagu</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                        {lagus.map((lagu, index) => (
                                                            <tr key={lagu.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{lagu.namalagu}</td>
                                                                <td>{lagu.namaartist}</td>
                                                                <td>{lagu.foto0}</td>
                                                                <td>{lagu.foto1}</td>
                                                                <td><IonButton routerLink={`/admin/${lagu.id}`}>Edit</IonButton></td>
                                                                <td><IonButton onClick={() => deleteLagu(lagu.id)}>Delete</IonButton></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )
};
export default Admin;
