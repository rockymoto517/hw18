export default function TodosContainer({ name, id, children }) {
	return (
		<div className={"todo__div"} id={id}>
			<h1>{name} ({ children.length })</h1>
			{children}
		</div>
	)
}
