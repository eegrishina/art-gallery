import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchArtsIDs, fetchArts } from "../store/reducers/ArtsSlice";
import styles from "./ArtsList.module.css";
import ArtCard from "./ArtCard";

export default function ArtsList() {
    const dispatch = useAppDispatch();
    const { ids, arts, isLoading, error } = useAppSelector((state) => state.arts);

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
            {isLoading && <div>Loading Art Gallery...</div>}
            {error && <div>Error: {error}</div>}
            <div className={styles.list}>
                {arts.length > 0 && arts.map(art => (
                    <ArtCard key={art.id} {...art} />
                ))}
            </div>
        </div>
    )
}
