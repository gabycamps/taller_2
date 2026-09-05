import EpisodeCard, { Episodes } from "./EpisodeCard";

function EpisodeList({episodes}: {episodes: Episodes[]}){
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