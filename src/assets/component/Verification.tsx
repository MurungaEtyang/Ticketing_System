
const Verification = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Registration form</h3>
                            <form>
                                <div>
                                    <label htmlFor={"email"}>Verification Code</label>
                                    <input type="email" className={"form-control"} id={"verification"}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verification;