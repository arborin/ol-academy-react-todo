import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from "./components/Todo";

function App() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    
                    <Todo/>                    
                                
                </div>
            </div>
        </div>
    );
}

export default App;
