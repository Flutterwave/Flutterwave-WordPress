/**
 * External dependencies
 */
import { usePagination } from "@mantine/hooks"; //TODO: usePagination for custom pagination
import { Pagination } from "@mantine/core";
/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect, useRef } from "@wordpress/element";
/**
 * Internal dependencies
 */
import FlutterwaveBody from "../../shared/layout/body";
import PaymentLogos from "../../icons";
import Table from "../../components/TableComponent";
import { NAMESPACE, PLAN } from "../../constants";
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Button,
	Select,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	extendTheme,
	ChakraProvider,
} from "../../../node_modules/@chakra-ui/react/dist/chakra-ui-react.cjs";

const f4bheading = [
	"Name",
	"Amount",
	"Duration",
	"Interval",
	"Currency",
	"status",
];

const colors = {
	brand: {
		900: "#f5a623",
		800: "#f5a623",
		700: "#f5a623",
	},
};

export default function Plans() {
	const [loading, setLoading] = useState(true);
	const [plans, setPlans] = useState([]);
	const [activePage, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const theme = extendTheme({ colors });
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [newPlan, setNewPlan] = useState({
		name: "Woo-plan1",
		amount: 100,
		interval: "monthly",
		duration: 5,
	});
	const [country, setCountry] = useState("NGN");

	const initialRef = useRef();
	const finalRef = useRef();
	useEffect(() => {
		apiFetch({ path: `${NAMESPACE}/${PLAN}/?page=${activePage}` }).then(
			(res) => {
				// console.log(res.data);
				if (res.data != undefined || res.data != null) {
					// setPlans([]);
					setPlans(res.data);
					setPage(res.meta.page_info.current_page);
					setTotalPages(res.meta.page_info.total_pages);
				}
			}
		);
	}, [activePage]);

	const handleSavePlan = () => {
		// POST
		apiFetch({
			path: `${NAMESPACE}/${PLAN}`,
			method: "POST",
			data: newPlan,
		}).then((res) => {
			// console.log(res.data);
			window.location.reload();
		});
	};

	return (
		<FlutterwaveBody
			title="Plans"
			attr={{
				marginTop: "-4px",
				paddingLeft: "24px",
				paddingRight: "24px",
			}}
		>
			<ChakraProvider theme={theme}>
				{plans.length > 0 && (
					<>
						<Table head={f4bheading} data={plans} type={"plans"} />

						<Pagination
							style={{ marginTop: "24px", alignSelf: "center" }}
							color={"yellow"}
							page={activePage}
							onChange={setPage}
							total={totalPages}
							size="sm"
							withEdges
						/>
					</>
				)}

				{plans.length === 0 && (
					<>
						<div style={{ marginLeft: "2em" }}>
							<h4 className="no-plan-text">
								<span className="planheading flw-huge-text">
									You currently do not have any payment
								</span>
								<br />
								<span
									className="planheading"
									style={{ marginBottom: "24px" }}
								>
									plans created.
								</span>
							</h4>
						</div>
						<button
							style={{
								backgroundColor: "#F5A623",
								height: "56px",
								width: "276.3333435058594px",
								left: "203px",
								top: "326px",
								borderRadius: "4px",
								padding: "17px, 32px, 17px, 32px",
								border: "none",
								marginTop: "2em",
								marginLeft: "2em",
							}}
							onClick={onOpen}
						>
							<span
								style={{
									fontFamily: "Inter",
									fontSize: "18px",
									fontStyle: "normal",
									fontWeight: "500",
									lineHeight: "22px",
									letterSpacing: "0.002400000113993883px",
									textAlign: "center",
								}}
							>
								Create a payment plan +
							</span>
						</button>

						<Modal
							initialFocusRef={initialRef}
							finalFocusRef={finalRef}
							isOpen={isOpen}
							onClose={onClose}
						>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader style={{ fontWeight: "300" }}>
									Create Plan
								</ModalHeader>
								<ModalCloseButton />
								<ModalBody pb={6}>
									<FormControl>
										<FormLabel>Plan name</FormLabel>
										<Input
											ref={initialRef}
											placeholder="Netflix Monthly.."
											value={newPlan.name}
											onChange={(e) =>
												setNewPlan({
													...newPlan,
													name: e.target.value,
												})
											}
										/>
									</FormControl>

									<FormControl mt={4}>
										<FormLabel>Amount</FormLabel>
										<NumberInput
											defaultValue={newPlan.amount}
											precision={2}
											step={0.2}
										>
											<NumberInputField
												onChange={(e) =>
													setNewPlan({
														...newPlan,
														amount: parseInt(
															e.target.value
														),
													})
												}
											/>
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									</FormControl>

									<FormControl mt={4}>
										<FormLabel>Country</FormLabel>
										<Select
											placeholder="Select a Currency"
											defaultValue={country}
											onChange={(e) =>
												setCountry(e.target.value)
											}
										>
											<option value="NGN">NGN</option>
											<option value="KES">KES</option>
											<option value="UGX">UGX</option>
											<option value="USD">USD</option>
										</Select>
									</FormControl>

									<FormControl mt={4}>
										<FormLabel>Interval</FormLabel>
										<Select
											placeholder="Select an Interval"
											defaultValue={newPlan.interval}
											onChange={(e) =>
												setNewPlan({
													...newPlan,
													interval: e.target.value,
												})
											}
										>
											<option value="weekly">
												Weekly
											</option>
											<option value="monthly">
												Monthly
											</option>
											<option value="anually">
												Anually
											</option>
											<option value="quarterly">
												Quaterly
											</option>
										</Select>
									</FormControl>

									<FormControl mt={4}>
										<FormLabel>Duration</FormLabel>
										<NumberInput value={newPlan.duration}>
											<NumberInputField
												onChange={(e) =>
													setNewPlan({
														...newPlan,
														duration:
															e.target.value,
													})
												}
											/>
										</NumberInput>
									</FormControl>
								</ModalBody>

								<ModalFooter>
									<Button
										style={{ backgroundColor: "#f5a623" }}
										mr={3}
										onClick={handleSavePlan}
									>
										Create Plan +
									</Button>
									<Button onClick={onClose}>Cancel</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</>
				)}
			</ChakraProvider>
		</FlutterwaveBody>
	);
}
