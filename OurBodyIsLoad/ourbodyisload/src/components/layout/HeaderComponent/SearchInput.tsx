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
          marginTop: "35px",
          padding: "10px",
          "@media (max-width: 768px)": {
            marginTop: "25px",
          },
        }}
      />
      <Button>
        <SearchIcon
          sx={{
            color: "#5e008c",
            fontSize: "25px",
            marginTop: "10px",
            "@media (max-width: 768px)": {
              fontSize: "20px",
              marginTop: "10px",
              marginRight: "10px",
            },
          }}
        />
      </Button>
    </>
  );
};
