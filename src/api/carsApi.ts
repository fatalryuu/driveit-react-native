import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  DocumentData,
  collection,
  QuerySnapshot,
  DocumentReference,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { FirestoreUser } from "./usersApi";

export interface FirestoreCar {
  id: string;
  name: string;
  description: string;
  images: string[];
}

class CarsApi {
  async getCars() {
    const carsCollection = collection(FIREBASE_DB, "cars");
    const querySnapshot = await getDocs(carsCollection);
    const cars: FirestoreCar[] = [];

    querySnapshot.forEach((doc) => {
      cars.push(this.getCarFromSnapshot(doc.data()));
    });

    return cars;
  }

  async isCarFavourite(id: string): Promise<boolean> {
    const user = FIREBASE_AUTH.currentUser!;
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    const userDocSnapshot = await getDoc(userRef);

    const userData = userDocSnapshot.data() as FirestoreUser;
    if (userData && userData.favourites) {
      const carRef = this.getCarDocumentReference(id);
      return userData.favourites.some(
        (fav: DocumentReference) => fav.path === carRef.path
      );
    }
    return false;
  }

  getCarDocumentReference(id: string): DocumentReference {
    return doc(FIREBASE_DB, "cars", id);
  }

  private getCarFromSnapshot(snapshot: DocumentData): FirestoreCar {
    return {
      id: snapshot.id,
      name: snapshot.name,
      description: snapshot.description,
      images: snapshot.images,
    };
  }
}

export const carsApi = new CarsApi();
