import React, { useState, useEffect } from "react";
import { 
	Flex, 
	Box,
	Text, 
	Heading,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	Input,
	Stack,
	HStack,
	ButtonGroup,
	Button, 
	Select,
	Textarea,
	useColorModeValue
} from "@chakra-ui/react";
import { supabase_client as supabase } from "../supabase/client";
import InputChangeEvent from "../types/InputChangeEvent";


const Contact: React.FC = () => {
	const [fname, setFName] = useState<string>("");
	const [lname, setLName] = useState<string>("");
	const [email, setEmail] = useState<string>(""); 
	const [message, setMessage] = useState<string>("");
	const [validatingInfo, setValidatingInfo] = useState(false);

	const emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const validEmail = emailFormat.test(email);

	useEffect(() => {
	}, [email]);

	const validateData = () => {

	};

	const uploadData = async () => {

	};

	const handleSubmit = () => {
		setValidatingInfo(true);
	};

	return (
		<Flex width="full" justify="center" align="center">
			<Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
				<Stack align="center">
					<Heading as="h1" size="xl" textAlign="center" m={5}>
						Contact Form
					</Heading>
					<Text textAlign="center" m={3}>
						Feel free to reach out with any questions or if you want to contribute. We are looking to possibly expand past just New York City.
					</Text>
				</Stack>
				<Box rounded="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p={8}>
					<Stack>
						<HStack>
            	<Box>
               	<FormControl id="firstName" isRequired>
              	  <FormLabel>First Name</FormLabel>
             	    <Input type="text" placeholder="John" value={fname} onChange={(e: InputChangeEvent) => setFName(e.target.value)} />
            	  </FormControl>
           	   </Box>
              <Box>
                <FormControl id="lastName">
          	      <FormLabel>Last Name</FormLabel>
         	        <Input type="text" placeholder="Doe" value={lname} onChange={(e: InputChangeEvent) => setLName(e.target.value)}/>
        	      </FormControl>
       	      </Box>
      	    </HStack>
						<FormControl isRequired isInvalid={!validEmail}>
							<FormLabel>Email address</FormLabel>
							<Input type="email" placeholder="john.doe@example.com" value={email} onChange={(e: InputChangeEvent) => setEmail(e.target.value)}/>
							{ !validEmail && ( 
								<FormErrorMessage>
									Email address invalid
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl>
							<FormLabel>Best describes you</FormLabel>
							<Select placeholder="Select option">
								<option>Student</option>
								<option>Developer</option>
								<option>Government Official</option>
								<option>Other</option>
							</Select>
						</FormControl>
						<FormControl>
							<FormLabel>Message:</FormLabel>
							<Textarea 
								value={message} 
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
								placeholder="Enter your message here..."		
							/>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<ButtonGroup spacing={4}>
              	<Button
                	loadingText="Submitting"
                	type="submit"
									bg="blue.400"
									color="white"
									_hover={{ bg: "blue.500" }}
									onClick={handleSubmit}
              	>
                	Submit
              	</Button>
              	<Button
                	variant="outline"
									onClick={() => {
										setFName("");
										setLName("");
										setEmail("");
									}}
              	>
                	Reset
              	</Button>
            	</ButtonGroup>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Contact;