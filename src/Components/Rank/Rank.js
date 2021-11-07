import './Rank.css';

const Rank = ({name,entries}) => {
    // console.log(name,entries)
    return (
        <div>
            <div>
                <p className="userinfo">{`Hi ${name}, Your current entry count is `}</p>
            </div>
            <div>
                <p className="userRank">{`${entries}`}</p>
            </div>
        </div>

    );
}

export default Rank;