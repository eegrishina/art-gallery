import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { addArt, Art } from "../store/reducers/ArtsSlice";

export default function CreateProductPage() {
    const dispatch = useAppDispatch();

    const handleAdd = (art: Art) => {
        dispatch(addArt(art));
    }

    const testArt = {
        id: 1,
        title: "test",
        date: "test",
        artist: "test",
        artistBio: "test",
        description: "test",
        imageUrl: "",
        medium: "test",
        dimensions: "test",
        isLiked: false,
    }

    return (
        <div>
            <Link to="/products" id="return-link">Return to main page</Link>

            <button onClick={() => handleAdd(testArt)}>Add My Own Art</button>
        </div>
    )
}
