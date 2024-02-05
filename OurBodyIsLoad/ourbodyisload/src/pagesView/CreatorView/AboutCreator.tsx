import styled from "@emotion/styled";
import { HeaderWithoutSearch } from "../../components/layout/HeaderComponent/HeaderWithoutSearch";
import image from "../../static/images/OurBodyIsLoveBackgroundCreator.png";
import { CreatorComponent } from "../../components/layout/CreatorComponent/CreatorComponent";

const StyledImg = styled("img")({});

const BackgroundWolfImage = (
  <StyledImg src={image} alt="my Image" width="auto" height="auto" />
);
export const AboutCreator = () => {
  return (
    <>
      <HeaderWithoutSearch />
      <CreatorComponent />
    </>
  );
};
