import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchArtsIDs, fetchArts } from "../store/reducers/ArtsSlice";
import { toggleShowLikes } from "../store/reducers/ArtsSlice";
import styles from "./ArtsList.module.css";
import ArtCard from "./ArtCard";
import HeartIcon from "./HeartIcon";

export default function ArtsList() {
    const dispatch = useAppDispatch();
    const { ids, arts, likedArts, isLoading, error } = useAppSelector((state) => state.arts);

    const [isLikedOnly, setIsLikedOnly] = useState(false);

    useEffect(() => {
        dispatch(fetchArtsIDs());
    }, []);

    useEffect(() => {
        if (ids.length > 0) {
            dispatch(fetchArts());
        }
    }, [ids]);

    return (
        <div className={styles.container}>
            {isLoading && <h2 className={styles.loading}>Loading Art Gallery...</h2>}
            {error && <h2 className={styles.error}>Error: {error}.</h2>}

            {!isLoading && !error && (
                <div className={styles.content}>
                    <div className={styles.filter_likes}>
                        <h3>Show my favorite art</h3>
                        <div className={styles.toggle_like}>
                            <input type="checkbox" id="like" name="like"
                                checked={isLikedOnly}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setIsLikedOnly(checked);
                                    dispatch(toggleShowLikes(checked));
                                }}
                            />
                            <label htmlFor="like">
                                <HeartIcon />
                            </label>
                        </div>
                    </div>

                    <div className={styles.list}>
                        {isLikedOnly ? (
                            likedArts.length > 0 ? (
                                likedArts.map((art) => <ArtCard key={art.id} {...art} />)
                            ) : (
                                <p>You don't have any favorite arts.</p>
                            )
                        ) : (
                            arts.map((art) => <ArtCard key={art.id} {...art} />)
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
