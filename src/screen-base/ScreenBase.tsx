import React, { ReactElement } from "react";
import { View } from "react-native";
import * as S from "./styles";
import StyledText from "../core/text-styled/StyledText";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  hasBack: boolean;
  hasMenu: boolean;
};

function ScreenBase(props: Props): ReactElement {
  return (
    <S.ScreenBack>
      <S.NavBar>
        {props.hasBack && (
          <Ionicons name="arrow-back-circle-sharp" size={34} color="black" />
        )}

        <StyledText style={{ fontSize: 40 }} text={"Home"} />
        {props.hasMenu && (
          <Ionicons name="ios-menu-sharp" size={34} color="black" />
        )}
      </S.NavBar>
      <S.ScreenContainer></S.ScreenContainer>
    </S.ScreenBack>
  );
}

export default ScreenBase;
