import { getAllInquiry } from "api/InquiryApi";
import { ListItemComponent } from "components/inquiry/ListItemComponent";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const InquiriesComponent = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async() => {
			const responseData = await getAllInquiry();
			if (!responseData.error) {
				setData(() => [...responseData]);
			}
		}

		getData();
	}, [])

	return (
		<>
			<div>
				{data !== null && data.map((item, index) => (
					<div key={`inquiry-${index}`}>
						<Link to={`/inquiries/${item.id}`}>
							<ListItemComponent
								inquiryId={item.id}
								inquiryTitle={item.title}
							/>
						</Link>
					</div>
				))}
			</div>
		</>
	)
}