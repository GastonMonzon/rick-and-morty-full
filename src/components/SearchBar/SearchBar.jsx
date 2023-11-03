import styles from './SearchBar.module.css';

export default function SearchBar({ query, handleQuery }) {
   
   return (
      <div className={styles.searchBarDiv}>
         <input
            type="search"
            id='searchBarQuery'
            placeholder='Search'
            value={query}
            onChange={handleQuery}
         />
      </div>
   );
}
