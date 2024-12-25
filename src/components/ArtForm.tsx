import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ArtForm.module.css";
import { useAppDispatch } from "../store/store";
import { addArt, Art } from "../store/reducers/ArtsSlice";
import { useNavigate } from "react-router-dom";

type ArtFormValues = Art & Partial<Pick<Art, "isLiked">>;

export default function ArtForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ArtFormValues>();

    const onSubmit: SubmitHandler<ArtFormValues> = (data: ArtFormValues) => {
        const newArt = {
            ...data,
            id: Date.now(),
            date: data.date || String(new Date().getFullYear()),
            imageUrl: data.imageUrl || "/placeholder.png",
        };
        dispatch(addArt(newArt));
        navigate(`/products/${newArt.id}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <label htmlFor="title">Title <span>*</span></label>
                <input
                    className={errors.title ? styles.error_input : ""}
                    id="title"
                    placeholder="Art Title"
                    maxLength={50}
                    {...register("title", { required: "Please enter the title" })}
                />
                {errors.title &&
                    <p className={styles.error}>{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="date">Date</label>
                <input
                    className={errors.date ? styles.error_input : ""}
                    id="date"
                    placeholder="YYYY"
                    maxLength={4}
                    {...register("date", {
                        pattern: {
                            value: /^[1-9][0-9]{3}/,
                            message: "Please enter a valid year (e.g., 2024)",
                        }
                    })}
                />
                {errors.date &&
                    <p className={styles.error}>{errors.date.message}</p>}
            </div>

            <div>
                <label htmlFor="artist">Artist <span>*</span></label>
                <input
                    className={errors.artist ? styles.error_input : ""}
                    id="artist"
                    placeholder="Full Name"
                    maxLength={30}
                    {...register("artist", { required: "Please enter the artist name" })}
                />
                {errors.artist &&
                    <p className={styles.error}>{errors.artist.message}</p>}
            </div>

            <div>
                <label htmlFor="artistBio">Artist Bio</label>
                <textarea
                    id="artistBio"
                    rows={5}
                    maxLength={300}
                    {...register("artistBio")}
                />
            </div>

            <div>
                <label htmlFor="description">Description <span>*</span></label>
                <textarea
                    className={errors.description ? styles.error_input : ""}
                    id="description"
                    rows={5}
                    maxLength={300}
                    {...register("description", {
                        required: "Please enter the art description",
                    })}
                />
                {errors.description &&
                    <p className={styles.error}>{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    className={`${styles.input_img} ${errors.imageUrl ? styles.error_input : ""}`}
                    id="imageUrl"
                    {...register("imageUrl", {
                        pattern: {
                            value: /^(https?:\/\/.*\.(?:png|jpe?g|webp|gif|bmp|svg))$/i,
                            message: "Please enter the correct URL, e.g. https://site.com/path.jpg",
                        }
                    })}
                />
                {errors.imageUrl &&
                    <p className={styles.error}>{errors.imageUrl.message}</p>}
            </div>

            <div>
                <label htmlFor="medium">Medium</label>
                <input
                    id="medium"
                    placeholder="Oil on canvas"
                    maxLength={50}
                    {...register("medium")}
                />
            </div>

            <div>
                <label htmlFor="dimensions">Dimensions</label>
                <textarea
                    id="dimensions"
                    placeholder={`Overall 120 x 180 cm;\npainted surface 138 x 195 cm`}
                    rows={5}
                    maxLength={300}
                    {...register("dimensions")}
                />
                <p className={styles.notice}>
                    Use a semicolon <span>;</span> to separate the parts of dimensions
                </p>
            </div>

            <button type="submit">Create Art</button>
        </form>
    );
}
