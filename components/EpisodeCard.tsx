export interface Episode {
    id: number;
    number: number;
    title: string;
    duration: number; // en minutos
}

function EpisodeCard({number, title, duration}: Episode){
    return(
        <div className="episode">
            <h2>E{number.toString()}</h2>
            <h3>{title}</h3>
            <p>{duration} min</p>
        </div>
    );
}

export default EpisodeCard;