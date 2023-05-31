import React, { useEffect, ReactElement, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

type Props = {
  text: string;
  style?: any;
};

function StyledText(props: Props): ReactElement {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "custom-font": require(`../../../assets/fonts/Comfortaa-Bold.ttf`),
      });

      setIsLoad(true);
    }

    loadFont();
  }, []);

  return (
    <>
      {isLoad && (
        <Text style={{ ...props?.style, fontFamily: "custom-font" }}>
          {props.text}
        </Text>
      )}
    </>
  );
}
export default StyledText;
