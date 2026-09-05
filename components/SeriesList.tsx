import SeriesCard, {Serie} from "./SeriesCard";

function SeriesList({series}: {series: Serie[]}){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {series.map((serie) => (
                <SeriesCard key={serie.id} {...serie} />
            ))}
        </div>
    );
}

export default SeriesList;