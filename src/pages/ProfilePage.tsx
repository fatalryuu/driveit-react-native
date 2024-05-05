import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { signOut } from "firebase/auth";
import { Button } from "../components/common/Button/Button";
import { Typography } from "../components/common/Typography/Typography";
import { FirebaseError, Navigation } from "../types";
import { FIREBASE_AUTH } from "../../firebase";
import { FirestoreUser, usersApi } from "../api/usersApi";
import { Flex } from "../components/common/Flex/Flex";
import { ProfileInput } from "../components/common/ProfileInput/ProfileInput";
import { Spacer } from "../components/common/Spacer/Spacer";

const inputs: (keyof FirestoreUser)[] = [
  "name",
  "surname",
  "username",
  "birthday",
  "job",
  "country",
  "city",
  "education",
  "hobby",
  "social",
];

interface ProfilePageProps {
  navigation: Navigation;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ navigation }) => {
  const [user, setUser] = useState<FirestoreUser>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    usersApi
      .getUser(FIREBASE_AUTH.currentUser!.uid)
      .then((user) => setUser(user))
      .catch((err: FirebaseError) => alert(err.message));
  }, []);

  const handleEditClick = async () => {
    if (isEditing) {
      setIsLoading(true);
      try {
        await usersApi.updateUser(user!);
      } catch (err) {
        alert((err as FirebaseError).message);
      } finally {
        setIsLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    signOut(FIREBASE_AUTH);
    navigation.replace("SignIn");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.scrollContainer}>
        <Flex column gap={20}>
          <Flex column gap={12}>
            <Flex column gap={8}>
              <Typography size={38} weight="700">
                Profile
              </Typography>
              <Typography size={20} weight="600">
                {user?.email}
              </Typography>
            </Flex>
            {user ? (
              <Flex column gap={10} alignItems="center">
                {inputs.map((name) => (
                  <ProfileInput
                    placeholder={name.slice(0, 1).toUpperCase() + name.slice(1)}
                    name={name}
                    value={user[name] || ""}
                    disabled={!isEditing}
                    setUser={setUser}
                    key={name}
                  />
                ))}
              </Flex>
            ) : (
              <ActivityIndicator />
            )}
          </Flex>

          <Flex column alignItems="center" gap={10}>
            <Button onClick={handleEditClick} disabled={isLoading}>
              <Typography>
                {isEditing ? "Save changes" : "Edit profile"}
              </Typography>
            </Button>
            <Button onClick={handleLogout} disabled={isLoading}>
              <Typography>Logout</Typography>
            </Button>
            <Button onClick={() => {}} dark disabled={isLoading}>
              <Typography>Delete account</Typography>
            </Button>
          </Flex>
        </Flex>
        <Spacer size={120} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090909",
    width: "100%",
  },
  scrollContainer: {
    paddingTop: 70,
    width: "100%",
  },
});
