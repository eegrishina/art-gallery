import { Link, useParams } from "react-router-dom"

export default function ProductDetailsPage() {
    const { id } = useParams();

    return (
        <div>
            <Link to="/products" id="return-link">Return to main page</Link>
            <h2>Art with ID: {id}</h2>
        </div>
    )
}
