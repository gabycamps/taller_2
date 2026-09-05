export interface Serie {
    id: number;
    title: string;
    genre: string;
    seasons: number;
    platform: string;
    rating: number;
    image: string;
}


function SeriesCard({title, genre, seasons, platform, rating, image}: Serie) {
    return(
        <div className="border rounded-lg p-4 mb-4 shadow-sm">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{genre} - {seasons} temporadas - {platform}</p>
        </div>
    );
}

export default SeriesCard;