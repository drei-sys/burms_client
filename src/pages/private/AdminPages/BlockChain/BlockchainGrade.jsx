import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import http from "services/httpService";

const BlockchainGrades = () => {
    const [refetchUsersRef, setRefetchUsersRef] = useState(0);
    const [grades, setGrades] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [scrollToTop, setScrollToTop] = useState(false);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/grades");
                setGrades(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUsers();
    }, [refetchUsersRef]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [scrollToTop]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return <>gg</>;
};

export default BlockchainGrades;
