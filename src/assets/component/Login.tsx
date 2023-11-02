
import './stylesheeet/file.css'; // Import Bootstrap CSS file

const Login= () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Login</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id={"username"} />
                                </div>
                                <div>
                                    <label htmlFor="username">Password</label>
                                    <input type="password" className="form-control" id="password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
