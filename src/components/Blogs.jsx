import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import db, { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Blogs() {
  const navigate = useNavigate();
  const blogRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [user, setUser] = useState(null);
  // console.log("user",user.uid)

  // console.log("filteredBlogs",filteredBlogs)

  useGSAP(() => {
    gsap.from(".blog-card", {
      scale: 0,
      opacity: 0,
      duration: 1,
    });
  },[filteredBlogs]);

  useEffect(() => {
    if (searchQuery) {
      // Filter blogs based on search query
      const result = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(result);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  useEffect(() => {
    setLoading(true);

    const getDateThreeDaysAgo = () => {
      const date = new Date();
      date.setDate(date.getDate() - 3); // Subtract 3 days from current date
      return Timestamp.fromDate(date); // Convert to Firestore Timestamp
    };

    try {
      const blogsCollection = collection(db, "blogs");
      const q = query(
        blogsCollection,
        where("date", ">", getDateThreeDaysAgo()), // Only get blogs from the last 3 days
        orderBy("date", "desc")
      );

      onSnapshot(q, (snapshot) => {
        const blogsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log("blogsList", blogsList);
        setBlogs(blogsList);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  }, []);

  const handleAddNew = async () => {
    try {
      const title = prompt("Blog Title Here");
      const image = prompt("Paste Image URL Here");
      const desc = prompt("Blog Description Here");
      const category = prompt("Blog Category Here");

      if (!title || !image || !desc || !category) {
        return;
      }

      const payload = {
        title: title,
        image: image,
        description: desc,
        category: category,
        user_id: user.uid,
        date: Timestamp.now(),
      };

      const collectionRef = collection(db, "blogs");

      await addDoc(collectionRef, payload);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleEdit = async (id, blog_userID) => {
    if (user.uid != blog_userID) {
      alert("Sorry! Only Admin can edit");
      return;
    }
    try {
      const docRef = doc(db, "blogs", id);
      const docsnap = await getDoc(docRef);

      const title = prompt("", docsnap.data().title);
      const image = prompt("", docsnap.data().image);
      const desc = prompt("", docsnap.data().description);
      const category = prompt("", docsnap.data().category);

      if (!title || !image || !desc) {
        return;
      }
      const payload = {
        title: title,
        image: image,
        description: desc,
        category: category,
        user_id: user.uid,

        date: Timestamp.now(),
      };
      setDoc(docRef, payload);
    } catch (error) {}
  };

  const handleDelete = async (id, blog_userID) => {
    if (user.uid != blog_userID) {
      alert("Sorry! Only Admin can delete");
      return;
    }

    // console.log("blog_userID",blog_userID)
    try {
      const docRef = doc(db, "blogs", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log("Error", error);
    }
  };

  async function Logout() {
    await auth.signOut();
    navigate("/login");
  }

  const handleSearchClick = (blog) => {
    // When a user clicks a search result, navigate to the specific blog
    navigate(`/blog/${blog.id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-16 ">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold ">All Blogs</h1>

            <div className="relative w-96">
              <label htmlFor="Search" className="sr-only">
                Search
              </label>

              <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border-gray-900 p-2.5 pe-10 shadow-lg sm:text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && filteredBlogs.length > 0 && (
                <div className="absolute w-full bg-white shadow-md z-10 rounded-md">
                  {filteredBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="p-2 py-3 text-sm  cursor-pointer hover:bg-gray-200"
                      // onClick={() => handleSearchClick(blog)}
                    >
                      {blog.title}
                    </div>
                  ))}
                </div>
              )}
              <span className="absolute inset-y-0 end-0 h-12 grid w-10 place-content-center">
                <button
                  type="button"
                  className="text-gray-600  hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>

            <div>
              <a
                onClick={() => handleAddNew()}
                className="me-2 mb-5 group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                href="#"
              >
                <span className="block rounded-sm bg-white px-4 py-2  lg:px-8 lg:py-3 text-sm font-medium group-hover:bg-transparent">
                  Add Blog
                </span>
              </a>
              <a
                onClick={() => Logout()}
                className=" mb-5 group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                href="#"
              >
                <span className="block rounded-sm bg-white px-4 py-2  lg:px-8 lg:py-3 text-sm font-medium group-hover:bg-transparent">
                  Logout
                </span>
              </a>
            </div>
          </div>

          <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
            {filteredBlogs.map((data) => (
              <article
                key={data.id}
                className="blog-card overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    alt=""
                    src={data.image}
                    className="h-56 w-full object-cover"
                  />

                  {/* Buttons positioned at the top-right */}
                  <span className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(data.id, data.user_id)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded shadow-sm hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data.id, data.user_id)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded shadow-sm hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-6">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    {new Date(data.date.toDate()).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>

                  <a href="#">
                    <h3 className="mt-0.5 text-lg text-gray-900">
                      {data.title}
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                    {data.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Blogs;
