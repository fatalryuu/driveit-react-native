import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  DocumentData,
  DocumentReference,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { getAuth, FIREBASE_DB } from "../../firebase";
import { FirestoreCar, carsApi } from "./carsApi";

export interface FirestoreUser {
  id: string;
  email: string;
  name?: string;
  surname?: string;
  username?: string;
  birthday?: string;
  job?: string;
  country?: string;
  city?: string;
  education?: string;
  hobby?: string;
  social?: string;
  favourites: DocumentReference[];
}

class UsersApi {
  async createUser(id: string, email: string): Promise<void> {
    const userRef = doc(FIREBASE_DB, "users", id);
    await setDoc(userRef, { id, email });
  }

  async getUser(id: string): Promise<FirestoreUser> {
    const userRef = doc(FIREBASE_DB, "users", id);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return this.getUserFromSnapshot(userSnapshot.data());
    } else {
      throw new Error("User not found");
    }
  }

  async updateUser(user: FirestoreUser): Promise<void> {
    const userRef = doc(FIREBASE_DB, "users", user.id);
    await setDoc(userRef, this.replaceUndefinedWithString(user));
  }

  async deleteUser(id: string): Promise<void> {
    await deleteUser(getAuth().currentUser!);
    const userRef = doc(FIREBASE_DB, "users", id);
    await deleteDoc(userRef);
  }

  async getFavouriteCars(): Promise<FirestoreCar[]> {
    const user = getAuth().currentUser!;
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    const userDocSnapshot = await getDoc(userRef);
    const userData = userDocSnapshot.data() as FirestoreUser;

    if (userData && userData.favourites) {
      const cars: FirestoreCar[] = [];
      await Promise.all(
        userData.favourites.map(async (fav: DocumentReference) => {
          cars.push(carsApi.getCarFromSnapshot((await getDoc(fav)).data()!));
        })
      );
      return cars;
    }

    return [];
  }

  async addCarToFavourites(carId: string): Promise<void> {
    const user = getAuth().currentUser!;
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    await updateDoc(userRef, {
      favourites: arrayUnion(carsApi.getCarDocumentReference(carId)),
    });
  }

  async removeCarFromFavourites(carId: string): Promise<void> {
    const user = getAuth().currentUser!;
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    await updateDoc(userRef, {
      favourites: arrayRemove(carsApi.getCarDocumentReference(carId)),
    });
  }

  private getUserFromSnapshot(snapshot: DocumentData): FirestoreUser {
    return {
      id: snapshot.id,
      email: snapshot.email,
      name: snapshot.name,
      surname: snapshot.surname,
      username: snapshot.username,
      birthday: snapshot.birthday,
      job: snapshot.job,
      country: snapshot.country,
      city: snapshot.city,
      education: snapshot.education,
      hobby: snapshot.hobby,
      social: snapshot.social,
      favourites: snapshot.favourites,
    };
  }

  private replaceUndefinedWithString = (user: FirestoreUser): FirestoreUser => {
    return {
      ...user,
      name: user.name ?? "",
      surname: user.surname ?? "",
      username: user.username ?? "",
      birthday: user.birthday ?? "",
      job: user.job ?? "",
      country: user.country ?? "",
      city: user.city ?? "",
      education: user.education ?? "",
      hobby: user.hobby ?? "",
      social: user.social ?? "",
      favourites: user.favourites ?? [],
    };
  };
}

export const usersApi = new UsersApi();
