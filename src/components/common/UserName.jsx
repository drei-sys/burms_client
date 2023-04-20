const UserName = ({ user }) => {
    const { lastname, firstname, middlename, extname } = user;
    return (
        <>
            {lastname}, {firstname} {middlename} {extname}
        </>
    );
};

export default UserName;
