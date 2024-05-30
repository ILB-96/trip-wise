import ChatList from "@components/Chat/ChatList"
import Contacts from "@components/Chat/Contacts"
import TopBar from "@components/Chat/TopBar"

const Chats = () => {
  return (
    <div className="h-screen flex justify-between gap-5 px-10 py-3 max-lg:gap-8 bg-gray-100">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <ChatList currentChatId={null} />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
        <Contacts />
      </div>
    </div>
  )
}

export default Chats