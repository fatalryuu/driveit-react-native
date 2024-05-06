import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Loader } from "../../../../common/Loader/Loader";

interface AsyncImageProps {
  uri: string;
  width: number;
  height: number;
  radius?: number;
}

export const AsyncImage: React.FC<AsyncImageProps> = ({
  uri,
  width,
  height,
  radius,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <Image
        style={[{ width, height }, !!radius && { borderRadius: radius }]}
        source={{ uri }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={{ position: "absolute", top: "50%", left: "43%" }}>
          <Loader />
        </View>
      )}
    </View>
  );
};
