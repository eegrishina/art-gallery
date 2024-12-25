import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchArtsIDs, fetchArts, setPage } from "../store/reducers/ArtsSlice";
import styles from "./ArtsList.module.css";
import ArtCard from "./ArtCard";
import HeartIcon from "./HeartIcon";

export default function ArtsList() {
    const dispatch = useAppDispatch();
    const {
        ids,
        arts,
        isLoading,
        error,
        isDataFetched,
        currentPage,
        artsPerPage
    } = useAppSelector((state) => state.arts);

    const startIndex = (currentPage - 1) * artsPerPage;
    const currentArts = arts.slice(startIndex, startIndex + artsPerPage);
    const totalPages = Math.ceil(arts.length / artsPerPage);

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }, [totalPages]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const likedArts = useMemo(() => {
        return arts.filter((art) => art.isLiked);
    }, [arts]);

    const [isLikedOnly, setIsLikedOnly] = useState(false);

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(fetchArtsIDs());
        }
    }, [isDataFetched]);

    useEffect(() => {
        if (ids.length > 0 && !isDataFetched) {
            dispatch(fetchArts());
        }
    }, [ids, isDataFetched]);

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
                                onChange={(e) => setIsLikedOnly(e.target.checked)}
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
                            currentArts.map((art) => <ArtCard key={art.id} {...art} />)
                        )}
                    </div>

                    <div className={styles.pagination}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>

                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={currentPage === number ? styles.active : ""}
                                onClick={() => handlePageChange(number)}>
                                {number}
                            </button>
                        ))}

                        <button
                            disabled={currentPage * artsPerPage >= arts.length}
                            onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
