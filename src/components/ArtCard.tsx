import { useState } from "react";
import { Art } from "../store/reducers/ArtsSlice";
import styles from "./ArtCard.module.css";
import HeartIcon from "./HeartIcon";
import TrashIcon from "./TrashIcon";

export default function ArtCard({ title, artist, description, imageUrl }: Art) {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className={styles.container}>
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
                <button onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? styles.liked : styles.like}>
                    <HeartIcon />
                </button>
                <button className={styles.delete}>
                    <TrashIcon />
                </button>
            </div>
        </div>
    )
}
