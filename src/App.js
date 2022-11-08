import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./components/Todo";

function App() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <Todo />
                </div>
            </div>
        </div>
    );
}

export default App;
