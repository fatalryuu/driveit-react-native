import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  DocumentData,
  collection,
  QuerySnapshot,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";

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
