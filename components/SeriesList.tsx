import SeriesCard, {Series} from "./SeriesCard";

function SeriesList({series}: {series: Series[]}){
    return(
        <div className="series-grid">
            {series.map((serie) => (
                <SeriesCard key={serie.id} {...serie} />
            ))}
        </div>
    );
}

export default SeriesList;