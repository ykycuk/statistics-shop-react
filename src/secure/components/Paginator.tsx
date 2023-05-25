import React, {useState} from 'react';

const Paginator = ({page, countAllDataFetched, setPage}: {page: number, countAllDataFetched: number, setPage:  React.Dispatch<React.SetStateAction<number>>}) => {
    const [countCurrentNumbersProducts, setCountCurrentNumbersProducts] = useState(15);

    function prevPage() {
        console.log(countAllDataFetched, countCurrentNumbersProducts)
        if (countCurrentNumbersProducts <= countAllDataFetched || page === 1) {
            console.log('hi')
            return
        } else {
            setCountCurrentNumbersProducts((prevCount: number) => prevCount -= 15)
            setPage((prevPage)  => prevPage - 1);
        }
    }

    function nextPage() {
        if (countCurrentNumbersProducts >= countAllDataFetched) {
            return
        } else {
            setCountCurrentNumbersProducts((prevCount: number) => prevCount += 15)
            setPage(prevPage => prevPage + 1);
        }
    }
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link" onClick={() => prevPage()}>Previous</a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link" onClick={() => nextPage()}>Next</a>
                </li>
            </ul>
        </nav>
    );
};

export default Paginator;