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

    const likedArts = useMemo(() => {
        return arts.filter((art) => art.isLiked);
    }, [arts]);

    const [isLikedOnly, setIsLikedOnly] = useState(false);
    const [likedCurrentPage, setLikedCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * artsPerPage;
    const currentArts = arts.slice(startIndex, startIndex + artsPerPage);
    const totalPages = Math.ceil(arts.length / artsPerPage);

    const likedStartIndex = (likedCurrentPage - 1) * artsPerPage;
    const likedCurrentArts = likedArts.slice(likedStartIndex, likedStartIndex + artsPerPage);
    const likedTotalPages = Math.ceil(likedArts.length / artsPerPage);

    const pageNumbers = useMemo(() => {
        const pages = [];
        const totalPagesToUse = isLikedOnly ? likedTotalPages : totalPages;
        for (let i = 1; i <= totalPagesToUse; i++) {
            pages.push(i);
        }
        return pages;
    }, [totalPages, likedTotalPages, isLikedOnly]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setIsLikedOnly(checked);
                                    if (checked) {
                                        setLikedCurrentPage(1);
                                    }
                                }}
                            />
                            <label htmlFor="like">
                                <HeartIcon />
                            </label>
                        </div>
                    </div>

                    <div className={styles.list}>
                        {isLikedOnly
                            ? (likedArts.length > 0
                                ? (likedCurrentArts.map((art) => <ArtCard key={art.id} {...art} />))
                                : (<p>You don't have any favorite arts.</p>))
                            : (currentArts.map((art) => <ArtCard key={art.id} {...art} />))
                        }
                    </div>

                    <div className={styles.pagination}>
                        <button
                            style={isLikedOnly && likedArts.length === 0
                                ? { display: "none" }
                                : undefined}
                            disabled={isLikedOnly
                                ? likedCurrentPage === 1
                                : currentPage === 1}
                            onClick={() => {
                                if (isLikedOnly) {
                                    setLikedCurrentPage(likedCurrentPage - 1);
                                } else {
                                    handlePageChange(currentPage - 1);
                                }
                            }}>
                            Previous
                        </button>

                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={isLikedOnly
                                    ? likedCurrentPage === number ? styles.active : ""
                                    : currentPage === number ? styles.active : ""}
                                onClick={() => {
                                    if (isLikedOnly) {
                                        setLikedCurrentPage(number);
                                    } else {
                                        handlePageChange(number);
                                    }
                                }}>
                                {number}
                            </button>
                        ))}

                        <button
                            style={isLikedOnly && likedArts.length === 0
                                ? { display: "none" }
                                : undefined}
                            disabled={isLikedOnly
                                ? likedCurrentPage * artsPerPage >= likedArts.length
                                : currentPage * artsPerPage >= arts.length}
                            onClick={() => {
                                if (isLikedOnly) {
                                    setLikedCurrentPage(likedCurrentPage + 1);
                                } else {
                                    handlePageChange(currentPage + 1);
                                }
                            }}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
