export interface Series {
    id: number;
    title: string;
    genre: string;
    seasons: number;
    platform: string;
    rating: number;
    image: string;
}


function SeriesCard({title, genre, seasons, platform, rating, image}: Series) {
    return(
        <div className="card">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{genre} - {seasons} temporadas - {platform}</p>
        </div>
    );
}

export default SeriesCard;