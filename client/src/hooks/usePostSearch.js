import { useState } from "react";

const usePostSearch = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        from: '',
        to: '',
        date: '',
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = Object.fromEntries(formData.entries());
        setSearchCriteria(search);
    }

    return {
        searchCriteria,
        submitHandler
    };
};

export default usePostSearch;
