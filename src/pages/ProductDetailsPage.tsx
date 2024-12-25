import { Link, useParams } from "react-router-dom";
import { toggleLike } from "../store/reducers/ArtsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import styles from "./ProductDetailsPage.module.css";
import HeartIcon from "../components/HeartIcon";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const artDetails = useAppSelector((state) =>
        state.arts.arts.find((art) => art.id === Number(id))
    );

    const handleLike = (id: number) => {
        dispatch(toggleLike(id));
    }

    const splitDimensions = artDetails?.dimensions?.split(";")
        .map((item, idx) => <p key={idx}>{item}</p>);

    return (
        <div className={styles.container}>
            <Link to="/products" id="return-link">Return to main page</Link>

            {!artDetails
                ? <p>Art with id: {id} not found.</p>
                : (
                    <div className={styles.content}>
                        <div className={styles.image}>
                            <img src={artDetails.imageUrl} alt={artDetails.title} id={styles.img} />
                        </div>

                        <div className={styles.info}>
                            <h2>{artDetails.title} ({artDetails.date})</h2>
                            <h3>{artDetails.artist}</h3>
                            <small>{artDetails.artistBio}</small>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Description:</td>
                                        <td>{artDetails.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Medium:</td>
                                        <td>{artDetails.medium}</td>
                                    </tr>
                                    <tr>
                                        <td>Dimensions:</td>
                                        <td>{splitDimensions}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <button onClick={() => handleLike((artDetails.id))}
                            className={artDetails.isLiked ? styles.liked : styles.like}>
                            <HeartIcon />
                        </button>
                    </div>
                )}
        </div>
    )
}
