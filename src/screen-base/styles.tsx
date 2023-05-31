import styled from "styled-components";
import { ScrollView, View, SafeAreaView } from "react-native";

export const ScreenBack = styled(SafeAreaView)`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #0e0326;
`;

export const NavBar = styled(View)`
  flex: 1;
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #f28e13;
`;

export const ScreenContainer = styled(ScrollView)`
  flex: 5;
  display: flex;
  width: 100%;
  height: 80%;
  background-color: #0e0326;
`;

export const MenuContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
