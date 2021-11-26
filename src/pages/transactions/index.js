/**
 * External dependencies
 */
import { usePagination } from "@mantine/hooks"; //TODO: usePagination for custom pagination
import { Pagination } from "@mantine/core";
/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
/**
 * Internal dependencies
 */
import FlutterwaveBody from "../../shared/layout/body";
import PaymentLogos from "../../icons";
import { NAMESPACE, TRANSACTIONS } from "../../constants";
import Table from "../../components/TableComponent";
import {
	extendTheme,
	ChakraProvider,
} from "../../../node_modules/@chakra-ui/react/dist/chakra-ui-react.cjs";

const f4bheading = [
	"Customer",
	"Amount",
	"Customer full name",
	"status",
	"Date",
];

const colors = {
	brand: {
		900: "#f5a623",
		800: "#f5a623",
		700: "#f5a623",
	},
};

export default function Transactions() {
	const [loading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const [activePage, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const theme = extendTheme({ colors });
	useEffect(() => {
		apiFetch({
			path: `${NAMESPACE}/${TRANSACTIONS}/?page=${activePage}`,
		}).then((res) => {
			// console.log(res.data);
			if (res.data != undefined || res.data != null) {
				// setTransactions([]);

				//get WordPress Transactions data
				let reg = new RegExp("^WP_FLW", "g");
				let sorted_data = [];
				res.data.filter((d) => {
					if (reg.test(d.tx_ref)) {
						sorted_data.push(d);
					}
				});
				console.log(sorted_data);
				let data_len = sorted_data.length > 10;
				data_len
					? setTotalPages(res.meta.page_info.total_pages)
					: setTotalPages(1);
				setTransactions(sorted_data);
			}
		});
	}, [activePage]);

	return (
		<FlutterwaveBody
			title="Transactions"
			attr={{
				marginTop: "-4px",
				paddingLeft: "24px",
				paddingRight: "24px",
			}}
		>
			<ChakraProvider theme={theme}>
				{transactions.length > 0 && (
					<>
						<Table
							head={f4bheading}
							data={transactions}
							type={"transactions"}
						/>

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

				{transactions.length === 0 && (
					<>
						<div style={{ marginLeft: "2em", marginTop: "2em" }}>
							<h4 className="no-plan-text">
								<span className="planheading flw-huge-text">
									You currently do not have any transactions
									yet,
								</span>
								<br />
								<span
									className="planheading"
									style={{ marginBottom: "24px" }}
								>
									but you can change that.
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
							onClick={() => console.log("test page")}
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
								Create a transaction +
							</span>
						</button>
					</>
				)}
			</ChakraProvider>
		</FlutterwaveBody>
	);
}
