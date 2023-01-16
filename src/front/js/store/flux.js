const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      tuits: [],
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3MzkwODEzOCwianRpIjoiNTFiOTM5NjEtNjk3MC00NDIyLWJkYzgtNGY0NWE5OTI2NGJkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InNhbXVlbGljIiwibmJmIjoxNjczOTA4MTM4LCJleHAiOjE2NzM5MDkwMzh9.Tben_ZRzSKtsGMDepu8ZwzXGt6cp4A2GqmWcfqdTbW8",
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");

          const data = await resp.json();

          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      getFeed: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/tweets");
          const data = await resp.json();

          setStore({ tuits: data });
        } catch (err) {
          console.log(err);
        }
      },

      getProfile: async () => {
        console.log("Vamos a recapitular 🥝");
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      postChuit: async (chuit, url) => {
        const store = getStore();

        let response = await fetch(process.env.BACKEND_URL + "/api/tweets", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            content: chuit,
            image: url,
          }), // body data type must match "Content-Type" header
        });
        let data = await response.json();
        if (data) {
          alert("Chuit creado con exito");
          setStore({ tuits: [data, ...store.tuits] });
        }
      },
    },
  };
};

export default getState;
