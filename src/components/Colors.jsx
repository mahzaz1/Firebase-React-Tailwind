import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const Dot = ({ color }) => {
  const style = {
    height: 20,
    width: 20,
    margin: "0 10px",
    backgroundColor: color,
    display: "inline-block",
    borderRadius: "50px",
  };
  return <span style={style}></span>;
};

function Colors() {
  const [colors, setColors] = useState([]);
  console.log("colors", colors);

  useEffect(() => {
    const colorCollection = collection(db, "colors");
    const q = query(colorCollection, orderBy("date", "asc"));
    // const q = query(colorCollection, where("name", "==", "Red"));

    onSnapshot(q, (snapshot) => {
      const colorlist = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setColors(colorlist);
    });
  }, []);

  // const FetchColors = async () => {
  //   const colorCollection = collection(db, "colors");
  //   const colorSnapshot = await getDocs(colorCollection);
  //   const colorList = colorSnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   setColors(colorList);
  // };

  // useEffect(() => {
  //   FetchColors();
  // }, []);

  const handleNew = async () => {
    const name = prompt("Enter Color Name");
    const value = prompt("Enter Color Value");

    if (!name || !value) {
      alert("Name and color value are required!");
      return;
    }

    const collectionRef = collection(db, "colors");

    const q = query(
      collectionRef,
      where("name", "==", name) || where("value", "==", value)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("This color name or code already exists!");
      return;
    }

    const payload = { name: name, value: value, date: Timestamp.now() };

    await addDoc(collectionRef, payload);
  };

  const handleEdit = async (id) => {
    const docRef = doc(db, "colors", id);
    const docSnap = await getDoc(docRef);

    const currentName = docSnap.data().name;
    const currentValue = docSnap.data().value;

    const name = prompt("Enter Color Name", currentName);
    const value = prompt("Enter Color Value", currentValue);

    if (!name || !value) {
      alert("Name and color value are required!");
      return;
    }

    const payload = { name: name, value: value, date: Timestamp.now() };

    await setDoc(docRef, payload);
    // await updateDoc(docRef, payload);
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "colors", id);
    await deleteDoc(docRef);
  };

  const handleQueryDelete = async () => {
    const colorName = prompt("Enter Color Name");

    const colorCollection = collection(db, "colors");
    const q = query(colorCollection, where("name", "==", colorName));

    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    results.forEach(async (result) => {
      const docRef = doc(db, "colors", result.id);
      await deleteDoc(docRef);
    });
  };

  return (
    <div className="p-4 space-y-4 max-w-[800px] mx-auto">
      <div className="flex space-x-4">
        <button
          onClick={handleNew}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          New
        </button>
        <button
          onClick={handleQueryDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Query Delete
        </button>
      </div>

      <ul className="space-y-2  ">
        {colors.map((data) => (
          <li
            key={data.id}
            className="flex items-center justify-start p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={() => handleEdit(data.id)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleDelete(data.id)}
              >
                Delete
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Dot color={data.value} />
              <span className="text-sm font-semibold">{data.name}</span>
            </div>
            {/* {data.date && (
              typeof data.date.toDate === 'function' 
              ? new Date(data.date.toDate()).toLocaleDateString() 
              : new Date(data.date).toLocaleDateString()
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Colors;
