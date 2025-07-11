import api from "./api";

export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return { data: response.data, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.message || "Failed to fetch users!" };
    }
};


// useEffect(() => {
//     const fetchUsers = async () => {
//       dispatch(setLoading(true));
//       const { data, error } = await getUsers();
//       if (data) {
//         setUsers(data);
//       } else {
//         dispatch(setError({ message: error, type: "error" }));
//       }
//       dispatch(setLoading(false));
//     };

//     fetchUsers();
//   }, [dispatch]);

// call it like this wherever you want to use