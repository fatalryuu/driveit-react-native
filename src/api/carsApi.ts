import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { FIREBASE_DB, getAuth } from "../../firebase";
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
    const user = getAuth().currentUser!;
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

  async addReview(): Promise<void> {}

  getCarDocumentReference(id: string): DocumentReference {
    return doc(FIREBASE_DB, "cars", id);
  }

  getCarFromSnapshot(snapshot: DocumentData): FirestoreCar {
    return {
      id: snapshot.id,
      name: snapshot.name,
      description: snapshot.description,
      images: snapshot.images,
    };
  }
}

export const carsApi = new CarsApi();
