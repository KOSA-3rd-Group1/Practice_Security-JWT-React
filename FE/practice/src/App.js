import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from 'page/main/Main'
import { Login } from 'page/login/Login';
import { Inquiry } from 'page/Inquiry/Inquiry';
import { InquiryDetail } from 'page/Inquiry/InquiryDetail';
import { InquiryCreate } from 'page/Inquiry/InquiryCreate';

function App() {
	return (
	<div className="App">
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/inquiries' element={<Inquiry />} />
				<Route path='/inquiries/create' element={<InquiryCreate />} />
				<Route path='/inquiries/:id' element={<InquiryDetail />} />

			</Routes>
		</BrowserRouter>
    </div>
	);
}

export default App;
