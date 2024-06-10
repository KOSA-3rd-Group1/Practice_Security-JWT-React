
export const ListItemComponent = (props) => {

	const moveHandler = () => {
	}

	return (
		<div onClick={moveHandler}>
			<div>{props.inquiryId}</div>
			<div>{props.inquiryTitle}</div>
		</div>
	)
}