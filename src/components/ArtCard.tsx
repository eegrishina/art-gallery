import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { toggleLike, deleteArt } from "../store/reducers/ArtsSlice";
import { Art } from "../store/reducers/ArtsSlice";
import styles from "./ArtCard.module.css";
import HeartIcon from "./HeartIcon";
import TrashIcon from "./TrashIcon";

export default function ArtCard({ id, title, artist, description, imageUrl, isLiked }: Art) {
    const [isDeleted, setIsDeleted] = useState(false);
    
    const dispatch = useAppDispatch();

    const handleLike = (id: number) => {
        dispatch(toggleLike(id));
    }

    const handleDelete = (id: number) => {
        setIsDeleted(true);
        setTimeout(() => {
            dispatch(deleteArt(id));
        }, 300);
    }

    return (
        <div className={`${styles.container} ${isDeleted ? styles.deleted : ''}`}>
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={imageUrl} alt={title} id={styles.img} />
                </div>
                <div className={styles.info}>
                    <h3>{title.replace(/[\\(\\,\\:].*/, ' ...')}</h3>
                    <h4>{artist.replace(/[\\(\\,\\:].*/, '')}</h4>
                    <p>{description}</p>
                </div>
            </div>

            <div className={styles.btns}>
                <button onClick={() => handleLike(id)}
                    className={isLiked ? styles.liked : styles.like}>
                    <HeartIcon />
                </button>
                <button onClick={() => handleDelete(id)}
                    className={styles.delete}>
                    <TrashIcon />
                </button>
            </div>
        </div>
    )
}
