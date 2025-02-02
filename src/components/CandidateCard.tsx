function CandidateCard(props:any) {
    // console.log(props);
    return (
        <div className="card bg-secondary">
            <img src={props.image} className="card-img-top" alt={props.username} />
            <div className="card-body">
                <h4 className="card-title">{props.username}</h4>
                <ul className="list-group bg-secondary">
                    <li className="list-group-item">Location: {props.location}</li>
                    <li className="list-group-item">Email: {props.email}</li>
                    <li className="list-group-item">Company: {props.company}</li>
                    <li className="list-group-item">Bio: {props.bio}</li>
                </ul>
            </div>
        </div>
    )
}
export default CandidateCard