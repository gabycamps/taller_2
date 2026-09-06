import SeriesList from "@/components/SeriesList";
import EpisodeList from "@/components/EpisodeList";

const seriesData = [
    { id: 1, title: "Breaking Bad", genre: "Drama", seasons: 5, platform: "Netflix", rating: 9.5, image: "/next.svg" },
];

const episodesData = [
    { id: 1, number: 1, title: "Piloto", duration: 45 },
];

export default function Home(){
    return (
    <main>
        <SeriesList />
        <EpisodeList episodes={episodesData} />
    </main>
    );
}