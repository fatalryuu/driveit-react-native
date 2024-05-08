import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { getAuth } from "../../firebase";
import { FirestoreUser, usersApi } from "../api/usersApi";
import { Button } from "../components/common/Button/Button";
import { Flex } from "../components/common/Flex/Flex";
import { Loader } from "../components/common/Loader/Loader";
import { ProfileInput } from "../components/common/ProfileInput/ProfileInput";
import { Spacer } from "../components/common/Spacer/Spacer";
import { Typography } from "../components/common/Typography/Typography";
import { COLORS } from "../palette";
import { FirebaseError, Navigation } from "../types";

const inputs: (keyof Omit<FirestoreUser, "favourites">)[] = [
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
      .getUser(getAuth().currentUser!.uid)
      .then(setUser)
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

  const handleLogoutClick = () => {
    signOut(getAuth());
    navigation.navigate("SignIn");
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);
    try {
      await usersApi.deleteUser(user!.id);
    } catch (err) {
      alert((err as FirebaseError).message);
    } finally {
      setIsLoading(false);
    }
    handleLogoutClick();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.scrollContainer}>
        <Flex column gap={20}>
          <Flex column gap={12}>
            <Flex column gap={8}>
              <Typography size={38} weight="700">
                My Profile
              </Typography>
              <Typography size={20} weight="600">
                {user?.email}
              </Typography>
            </Flex>
            <Flex column gap={12} alignItems="center">
              {inputs.map((name) => (
                <ProfileInput
                  title={name.slice(0, 1).toUpperCase() + name.slice(1)}
                  name={name}
                  value={user[name] || ""}
                  disabled={!isEditing}
                  setUser={setUser}
                  key={name}
                />
              ))}
            </Flex>
          </Flex>

          <Flex column alignItems="center" gap={20}>
            <Flex column alignItems="center" gap={10}>
              <Button onClick={handleEditClick} disabled={isLoading}>
                <Typography size={18}>
                  {isEditing ? "Save changes" : "Edit profile"}
                </Typography>
              </Button>
              <Button onClick={handleLogoutClick} disabled={isLoading}>
                <Typography size={18}>Logout</Typography>
              </Button>
            </Flex>
            <Button onClick={handleDeleteClick} dark disabled={isLoading}>
              <Typography size={18}>Delete account</Typography>
            </Button>
          </Flex>
        </Flex>
        <Spacer size={100} />
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
    backgroundColor: COLORS.BLACK,
    width: "100%",
  },
  scrollContainer: {
    paddingTop: 60,
    width: "100%",
  },
});
