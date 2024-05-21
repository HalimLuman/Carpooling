import React, { createContext, useContext, useState } from 'react';

const PostFilterContext = createContext();

export const usePostSearch = () => {
    return useContext(PostFilterContext);
};

export const PostFilterProvider = ({ children }) => {
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
    };

    return (
        <PostFilterContext.Provider value={{ searchCriteria, submitHandler }}>
            {children}
        </PostFilterContext.Provider>
    );
};
