import { Link } from "react-router-dom";
import ArtForm from "../components/ArtForm";

export default function CreateProductPage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }}>
            <Link to="/products" id="return-link">Return to main page</Link>
            <ArtForm />
        </div>
    )
}
