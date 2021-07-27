import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  /* background-color: blue; */
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin-top: 14.63px;
  margin-left: 17px;

  background-color: "rgba(0,0,0,0.67)";
  z-index: 1;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #707070;
  font-family: "Raleway_400Regular";
  line-height: 15px;
  text-align: justify;
`;

export const MainInfo = styled.View`
  background-color: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 0 22px;
  margin-bottom: 3px;
`;

export const Artist = styled.TouchableOpacity`
  margin-top: 15px;
`;

export const ArtistText = styled.Text`
  font-size: 12px;
  font-family: "Raleway_400Regular";
`;

export const ProductName = styled.Text`
  font-size: 25px;
  font-family: "Raleway_400Regular";
  color: #707070;
  margin-top: 5px;
`;

export const Labels = styled.View`
  flex-direction: row;
  /* justify-content: space-between; */
  margin-top: 12px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

export const Option = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const OptionDetails = styled.View`
  margin-left: 10px;
`;

export const OptionTitle = styled.Text`
  font-family: "Raleway_600SemiBold";
  font-size: 12px;
  color: #707070;
`;

export const OptionDescription = styled.Text`
  font-family: "Raleway_400Regular";
  font-size: 11px;
  color: #b8b8b8;
  margin-top: 6px;
  text-align: justify;
`;

export const ContactButton = styled.TouchableOpacity`
  height: 39px;
  align-items: center;
  justify-content: center;
  background-color: #019b92;
  max-width: 154px;
  border-radius: 50px;
  margin-top: 8px;
`;

export const ContactButtonText = styled.Text`
  font-family: "Raleway_600SemiBold";
  font-size: 12px;
  color: white;
`;

export const Comment = styled.View``;

export const CommentHeader = styled.View`
  flex-direction: row;
  /* align-items: center; */
`;

export const CommentAuthor = styled.Text`
  margin: 0 5px 5px 0;
  font-family: "Raleway_600SemiBold";
  color: #707070;
`;

export const CommentContent = styled.Text`
  /* margin: 0 5px; */
  font-family: "Raleway_400Regular";
  color: #707070;
  font-size: 10px;
`;

export const CommentResponse = styled.View`
  margin-left: 40px;
  margin-top: 10px;
`;

export const More = styled.View`
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  align-items: center;
  padding: 22px 16px;
`;
