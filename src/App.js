import { Toaster } from 'react-hot-toast';
import './App.css';
import Route from './components/Routes/Route/Route';
function App() {
  return (
		<div className='App min-h-screen'>
			<Route></Route>
			<Toaster></Toaster>
		</div>
	);
}

export default App;
