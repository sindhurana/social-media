
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Header from "./components/Header"
import SideBar from "./components/SideBar"
import Footer from "./components/Footer"
import PostList from "./components/PostList"
import CreatePost from "./components/CreatePost"
import { useState } from "react"
import PostListProvider from "./store/post-list-store"
import { Outlet } from "react-router"


function App() {

  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <>
      <PostListProvider>
        <div className="container">
          <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <div>
            <Header />
            {/* {selectedTab === "Home" ? <PostList /> : <CreatePost />} */}
            <Outlet />
            <Footer />
          </div>

        </div >
      </PostListProvider>
    </>
  )
}

export default App
