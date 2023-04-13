import React, { useState, useEffect } from "react";
import { 
  Box, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Flex, 
  List, 
  ListItem, 
  Center 
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import TBuildingName from "../types/TBuildingName";
import formatAddress from "../utils/formatAddress";
import { Home } from "react-feather";

interface SearchBarProps {
  placeholder: string;
  names: TBuildingName[];
  setBuildingSelected: Function; 
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, names, setBuildingSelected }) => {
  const [text, setText] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<TBuildingName[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);
  const onFocus = () => setFocused(true);

  // filter data based on text state 
  useEffect(() => {
    const newFilter = names.filter((value: TBuildingName) => {
      const curr = value.first.toLowerCase();
      return curr.includes(text.toLowerCase());
    });

    if (text === "") setFilteredData([]);
    else setFilteredData(newFilter);
  }, [text]);

  useEffect(() => {
    if (!focused) { // if not focused, clear search bar 
      setText("");
      setFilteredData(names);
      return;
    }
  }, [focused]);

  // Enter key event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // if enter key is pressed, select the first building in the filtered data list 
      if (e.key !== "Enter") return;
      if (!filteredData || filteredData.length === 0) return;
      setBuildingSelected(filteredData[0].second.first);
      setText("");
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredData]);

  // Unfocus when click elsewhere
  useEffect(() => {
    const handlePointerDown = () => {
      setFocused(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  // handle search icon is clicked
  const handleSearchBtnClicked = () => {
    if (!focused || !filteredData || filteredData.length == 0) return;
    setBuildingSelected(filteredData[0].second.first);
    setFocused(false);
  };

  return (
    <Box userSelect="none" onPointerDown={(event: React.PointerEvent<HTMLDivElement>) => event.stopPropagation()}>
      <Flex direction="row">
        <InputGroup>
          <InputLeftElement children={ <Home size={20} /> } />
          <Input
            backgroundColor="whitesmoke"
            _hover={{
              backgroundColor: "gray.100"
            }}
            roundedTopRight="none"
            roundedBottomRight="none"
            onChange={onChange}
            onFocus={onFocus}
            value={text}
            type="text"
            placeholder={placeholder}
          />
        </InputGroup>
        <Center p="0.5vmax" roundedTopRight="lg" roundedBottomRight="lg" _hover={{ cursor: "pointer" }} backgroundColor="gray.300" onClick={handleSearchBtnClicked}>
          <SearchIcon w={4} h={4} />
        </Center>
      </Flex>
      <Box>
        { text.length !== 0 && focused &&
          <List border="2px" borderColor="black" rounded="lg" backgroundColor="white" ml="auto" mr="auto" overflow="hidden" overflowY="auto" dropShadow="xl">
            { filteredData.length !== 0 ?
              <>
                { filteredData.slice(0, Math.min(filteredData.length, 500)).map((value: TBuildingName, key: number) => {
                  return (
                    <ListItem key={key} _hover={{ cursor: "pointer" }} onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      setBuildingSelected(value.second.first);
                      setFocused(false);
                    }}>
                      {formatAddress(value.first)}
                    </ListItem>
                  );
                })}
              </>
                :
              <ListItem>Not Found</ListItem>
            }
          </List>
        }
      </Box>
    </Box>
  );
};

export default SearchBar;
