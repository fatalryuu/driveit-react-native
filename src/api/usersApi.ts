import {
  doc,
  setDoc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase";

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
}

class UsersApi {
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
    };
  }
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
    await setDoc(userRef, user);
  }
}

export const usersApi = new UsersApi();
