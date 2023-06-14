import FilaChats from "./FilaChats";

function BodyChats({ chats }) {
  if (chats.length == 0)
    return <tbody className="bg-white divide-y divide-gray-200"></tbody>;
  return (
    <tbody className="bg-white divide-y divide-gray-200 text-center p-3 m-2">
      {chats.map((chat, index) => (
        <FilaChats key={index} chat={chat} index={index} />
      ))}
    </tbody>
  );
}

export default BodyChats;

