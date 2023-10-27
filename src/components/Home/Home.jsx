import Cards from "../Cards/Cards";
import FiltersBar from "../FiltersBar/FiltersBar";


export default function Home({ characters }) {

    return (
        <div className='home'>
            <FiltersBar />
            <Cards characters={characters} />
        </div>
    );
}