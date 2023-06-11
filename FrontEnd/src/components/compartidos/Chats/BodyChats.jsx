import FilaChats from "./FilaChats";

function BodyChats({ chats }) {
  console.log("Chats en body:",chats)
  if (chats.length == 0)
    return <tbody className="bg-white divide-y divide-gray-200"></tbody>;
  return (
    <tbody className="bg-white divide-y divide-gray-200 text-center">
      {chats.map((chat, index) => (
        <FilaChats key={index} chat={chat} index={index} />
      ))}
    </tbody>
  );
}

export default BodyChats;

