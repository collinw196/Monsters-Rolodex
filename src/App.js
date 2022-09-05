import logo from './logo.svg';
import './App.css';
import './search-box.styles.css'
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

  const [searchText, setSearchText] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => setMonsters(users))
    }, []) 

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchText);
    })
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchText])

  const onSearchChange = (event) => {
    const searchTextString = event.target.value.toLowerCase();
    setSearchText(searchTextString);
  }

  const onSetTitle = (event) => {
    const title = event.target.value;
    setTitle(title);
  }

  return (
    <div className='App'>
      <h1 className='app-title'>{title}</h1>
      <SearchBox searchEvent={onSearchChange} placeholder='search monsters' className='search-box' />
      <br />
      <SearchBox searchEvent={onSetTitle} placeholder='set title' className='search-box' />
      <CardList monsters={filteredMonsters} className='card-list' />
    </div>
  );
}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((res) => res.json())
//       .then((users) => this.setState(() => {
//         return {monsters: users, filteredMonsters: users};
//       }))
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField }
//     });
//   }
//   render () {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this; 
//     const filteredMonsters = monsters.filter(el => {
//       return el.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox searchEvent={onSearchChange} placeholder='search monsters' className='search-box'/>
//         <CardList monsters={filteredMonsters} className='card-list'/>
//       </div>
//     );
//   } 
// }

export default App;
