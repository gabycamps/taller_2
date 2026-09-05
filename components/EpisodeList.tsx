import EpisodeCard, { Episode } from "./EpisodeCard";

function EpisodeList({episodes}: {episodes: Episode[]}){
    return(
        <div className="episodes">
            {episodes.length === 0 ? (
                <p>No hay episodios registrados.</p>
            ): (
                episodes.map((ep) => (
                    <EpisodeCard key={ep.id} {...ep} />
                ))
            )}
        </div>
    );
}

export default EpisodeList;