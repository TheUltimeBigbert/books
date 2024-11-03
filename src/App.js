import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BookDetails from './Components/BookDetails';
import BookForm from './Components/BookForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/add-book" element={<BookForm />} />
            </Routes>
        </Router>
    );
}


export default App;