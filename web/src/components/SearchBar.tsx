import React, { useState, useEffect } from "react";
import { Box, InputGroup, InputLeftElement, InputRightElement, Input, Flex, List, ListItem, Button, Center } from "@chakra-ui/react";
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

  let num = () => {
    return "hello world";
  };

  useEffect(() => {
    const newFilter = names.filter((value: TBuildingName) => {
      const curr = value.first.toLowerCase();
      return curr.includes(text.toLowerCase());
    });

    if (text === "") setFilteredData([]);
    else setFilteredData(newFilter);
  }, [text]);

  useEffect(() => {
    if (!focused) {
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
    const handlePointerDown = (event: PointerEvent) => {
      setFocused(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleSearchBtnClicked = () => {
    if (!focused || !filteredData || filteredData.length == 0) return;
    setBuildingSelected(filteredData[0].second.first);
    setFocused(false);
  };

  return (
    <Box userSelect="none" onPointerDown={(event: React.PointerEvent<HTMLDivElement>) => event.stopPropagation()}>
      <Flex>
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
        <Center p="0.5vmax" roundedTopRight="lg" roundedBottomRight="rg" _hover={{ cursor: "pointer" }} backgroundColor="gray.300">
          <SearchIcon w={4} h={4} />
        </Center>
      </Flex>
      <Box>
        { text.length !== 0 && focused &&
          <>
            { filteredData.length !== 0 ?
              <List>
                { filteredData.slice(0, Math.min(filteredData.length, 1000)).map((value: TBuildingName, key: number) => {
                  return (
                    <ListItem key={key} onClick={() => setBuildingSelected(value.second.first)}>
                      <Box border="2px" borderColor="black">
                        {formatAddress(value.first)}
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
              :
              <List>
                <ListItem>Not Found</ListItem>
              </List>
            }
          </>
        }
      </Box>
    </Box>
  );
};

export default SearchBar;
