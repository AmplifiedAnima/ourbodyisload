import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

interface SearchInputProps {
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleSearchSubmit: () => void;
  searchQuery: string;
}
export const SearchInput: React.FC<SearchInputProps> = ({
  handleInputValue,
  onHandleSearchSubmit,
  searchQuery,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onHandleSearchSubmit();
    }
  };

  return (
    <>
      <Input
        type="text"
        onChange={handleInputValue}
        onKeyUp={handleKeyPress}
        value={searchQuery}
        disableUnderline={true}
        placeholder={"Search here..."}
        sx={{
          backgroundColor: "#5e008c",
          color: "white",
          width: "auto",
          height: "33px",
          borderRadius: "6px",
          marginTop: "0",
          padding: "10px",
        }}
      />
      <Button onClick={onHandleSearchSubmit}>
        <SearchIcon
          sx={{
            color: "white",
            fontSize: "25px",
            marginTop: "0px",
            "@media (max-width: 768px)": {
              fontSize: "20px",
              marginTop: "0px",
              marginRight: "10px",
            },
          }}
        />
      </Button>
    </>
  );
};
