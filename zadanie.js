import React, { useState } from 'react';
import './App.css';

const data = [
  {
    id: 1,
    firstName: 'Dobromir',
    lastName: 'Sprytny',
    dateOfBirth: '1.7.1990 11:35',
    function: 'kamerdyner',
    experience: 4,
  },
  {
    id: 4,
    firstName: 'Helga',
    lastName: 'Uczynna',
    dateOfBirth: '4.02.1976 14:37',
    function: 'pokojówka',
    experience: 12,
  },
  {
    id: 2,
    firstName: 'Marianna',
    lastName: 'Prostota',
    dateOfBirth: '28.10.1976 2:15',
    function: 'pokojówka',
    experience: 12,
  },
  {
    id: 3,
    firstName: 'Walerian',
    lastName: 'Szybki',
    dateOfBirth: '03.01.1986 23:10',
    function: 'kamerdyner',
    experience: 10,
  },
  {
    id: 5,
    firstName: 'Krzysztof',
    lastName: 'Klucznik',
    dateOfBirth: '10.10.1986 18:00',
    function: 'lokaj',
    experience: 3,
  },
];

const App = () => {
  const [filter, setFilter] = useState({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    function: '',
    experience:'',
  });
  
const [sort, setSort] = useState({
   column:null,
   direction:'asc'
});

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage =5;

const handleFilterChange = (event) => {
   setFilter({...filter,[event.target.name]:event.target.value});
}

const handleSort = (column) => {
   const direction = sort.column ? (sort.direction ==='asc' ? 'desc':'asc') : 'asc';
   setSort({column,direction});
}

const handlePageChange = (newPage) => {
   setCurrentPage(newPage);
}

const getFilteredData = () => {
   let filteredData = data;
   
   Object.keys(filter).forEach((key) => {
      filteredData=filteredData.filter((row) => row[key].toString().includes(filter[key]));
   });
   
   return filteredData;
}

const getSortedData = (filteredData) => {
   if(!sort.column){
      return filteredData;
   }
   
   const sortedData = [...filteredData];
   
   sortedData.sort((a,b) => {
      if(a[sort.column] < b[sort.column]){
         return sort.direction ==='asc' ? -1 :1;
      }
      
      if(a[sort.column] > b[sort.column]){
         return sort.direction ==='asc' ? 1 :-1;
      }
      
      return 0;
   });
   
   return sortedData;
}

const getPageData = (sortedData) => {
   const startIndex = (currentPage-1)*itemsPerPage;
   
   return sortedData.slice(startIndex,startIndex+itemsPerPage);
}

const filteredData = getFilteredData();
const sortedData = getSortedData(filteredData);
const pageData = getPageData(sortedData);

return (
<div className="App">
<table>
<thead>
<tr>
<th onClick={() => handleSort('id')}>ID</th>
<th onClick={() => handleSort('firstName')}>First Name</th>
<th onClick={() => handleSort('lastName')}>Last Name</th>
<th onClick={() => handleSort('dateOfBirth')}>Date of Birth</th>
<th onClick={() => handleSort('function')}>Function</th>
<th onClick={() => handleSort('experience')}>Experience</th>
</tr>
<tr>
<td><input type="text" name="id" onChange={handleFilterChange}/></td>
<td><input type="text" name="firstName" onChange={handleFilterChange}/></td>
<td><input type="text" name="lastName" onChange={handleFilterChange}/></td>
<td><input type="text" name="dateOfBirth" onChange={handleFilterChange}/></td>
<td><input type="text" name="function" onChange={handleFilterChange}/></td>
<td><input type="text" name="experience" onChange={handleFilterChange}/></td>
</tr>
</thead>
<tbody>
{pageData.map((row) => (
<tr key={row.id}>
<td>{row.id}</td>
<td>{row.firstName}</td>
<td>{row.lastName}</td>
<td>{row.dateOfBirth}</td>
<td>{row.function}</td>
<td>{row.experience}</td>
</tr>
))}
</tbody>
</table>
<div className="pagination">
{[...Array(Math.ceil(sortedData.length/itemsPerPage)).keys()].map((pageIndex) => (
<button key={pageIndex} onClick={() => handlePageChange(pageIndex+1)}>
{pageIndex+1}
</button>
))}
</div>
</div>
);
};

export default App;
